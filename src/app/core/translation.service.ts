import { Injectable, inject, signal, computed, PLATFORM_ID, afterNextRender, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private zone = inject(NgZone);

  readonly languages: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'bo', name: 'Tibetan', nativeName: 'བོད་སྐད།' },
  ];

  readonly currentLang = signal<string>(this.getSavedLang());
  readonly loading = signal(false);
  readonly loadingMessage = signal('Translating…');

  readonly currentLanguage = computed(() =>
    this.languages.find(l => l.code === this.currentLang()) || this.languages[0]
  );

  /** lang → (originalText → translatedText) */
  private cache = new Map<string, Map<string, string>>();
  private staticLoaded = new Map<string, boolean>();
  private mutationTimer: ReturnType<typeof setTimeout> | null = null;
  private observer: MutationObserver | null = null;
  /** Track already-translated text nodes so they don't get re-translated on MutationObserver passes */
  private translatedNodes = new WeakSet<Node>();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(
        filter(e => e instanceof NavigationEnd),
      ).subscribe(() => {
        if (this.currentLang() !== 'en') {
          setTimeout(() => this.retranslateCurrentPage(), 250);
        }
      });
    }

    afterNextRender(() => {
      // Expose export function globally for console access
      (window as any).__exportTranslations = () => this.exportTranslations();

      // Watch <main> for DOM changes (e.g. @if tab switches) and re-translate
      this.setupMutationObserver();

      // Pre-load the static JSON for all non-English languages
      this.loadStaticTranslations('bo').then(() => {
        if (this.currentLang() !== 'en') {
          this.loading.set(true);
          this.loadingMessage.set('Translating…');
          // Initial load: translate entire page including navbar/footer
          setTimeout(() => this.translateFullPage(), 400);
        }
      });
    });
  }

  /* ── public ── */

  async switchLanguage(langCode: string): Promise<void> {
    if (langCode === this.currentLang()) return;
    if (!isPlatformBrowser(this.platformId)) return;

    this.currentLang.set(langCode);
    localStorage.setItem('la-lang', langCode);
    document.documentElement.lang = langCode;

    if (langCode === 'en') {
      this.loadingMessage.set('Switching to English…');
      this.loading.set(true);
      await this.tick();
      // Reload page to get fresh English DOM — restoring stale node refs is unreliable after navigation
      window.location.reload();
      return;
    }

    // Switching to a non-English language
    await this.loadStaticTranslations(langCode);
    // Fresh language switch — clear tracking so everything gets translated
    this.translatedNodes = new WeakSet<Node>();
    const needsApi = this.hasUncachedTexts(langCode);
    if (needsApi) {
      this.loadingMessage.set('Translating to བོད་སྐད།…');
      this.loading.set(true);
      await this.tick();
    }

    try {
      await this.translatePage(langCode);
      await this.translatePlaceholders(langCode);
    } catch (err) {
      console.error('Translation failed:', err);
    } finally {
      this.loading.set(false);
    }
  }

  /* ── private: page-level ── */

  private async retranslateCurrentPage(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    // Only translate inside <main> on route change — navbar/footer are already translated
    const main = document.querySelector('main') || document.body;
    const needsApi = this.hasUncachedTexts(this.currentLang(), main);

    if (needsApi) {
      this.loadingMessage.set('Translating…');
      this.loading.set(true);
      await this.tick();
    }

    try {
      await this.translatePage(this.currentLang(), main);
      await this.translatePlaceholders(this.currentLang(), main);
    } catch (err) {
      console.error('Re-translation failed:', err);
    } finally {
      this.loading.set(false);
    }
  }

  /** Full-page translation (navbar + footer + main) — used on initial load / site reopen */
  private async translateFullPage(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const lang = this.currentLang();
    // Fresh full-page pass — clear tracking so everything gets translated
    this.translatedNodes = new WeakSet<Node>();
    const needsApi = this.hasUncachedTexts(lang);

    if (needsApi) {
      this.loadingMessage.set('Translating…');
      this.loading.set(true);
      await this.tick();
    }

    try {
      await this.translatePage(lang);
      await this.translatePlaceholders(lang);
    } catch (err) {
      console.error('Full-page translation failed:', err);
    } finally {
      this.loading.set(false);
    }
  }

  /* ── private: DOM helpers ── */

  /**
   * Observe <main> for child-list mutations (e.g. Angular @if tab switches).
   * Debounce to avoid duplicate calls, then translate only the new content.
   */
  private setupMutationObserver(): void {
    const main = document.querySelector('main');
    if (!main) return;

    this.observer = new MutationObserver(() => {
      if (this.currentLang() === 'en') return;

      if (this.mutationTimer) clearTimeout(this.mutationTimer);
      this.mutationTimer = setTimeout(() => {
        this.zone.run(() => this.retranslateCurrentPage());
      }, 150);
    });

    this.observer.observe(main, { childList: true, subtree: true });
  }

  private collectTextNodes(root: Node = document.body): { node: Node; text: string }[] {
    const nodes: { node: Node; text: string }[] = [];
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      { acceptNode: node => this.shouldTranslate(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT },
    );
    let n: Node | null;
    while ((n = walker.nextNode())) {
      const text = n.textContent?.trim();
      if (text && text.length >= 2) nodes.push({ node: n, text });
    }
    return nodes;
  }

  /** Check if there are any texts on the current page not yet in cache */
  private hasUncachedTexts(targetLang: string, root: Node = document.body): boolean {
    const langCache = this.cache.get(targetLang);
    if (!langCache || langCache.size === 0) return true;

    const nodes = this.collectTextNodes(root);
    return nodes.some(n => !langCache.has(n.text));
  }

  private shouldTranslate(node: Node): boolean {
    const parent = node.parentElement;
    if (!parent) return false;

    const tag = parent.tagName?.toLowerCase();
    if (['script', 'style', 'code', 'pre', 'noscript', 'svg'].includes(tag)) return false;
    if (parent.closest('[data-no-translate]')) return false;

    // Skip nodes that have already been translated (prevents double-translation)
    if (this.translatedNodes.has(node)) return false;

    const text = node.textContent?.trim();
    if (!text || text.length < 2) return false;
    if (/^[\d\s.,\-+%$@#!?:\/()©;=<>{}[\]|_&*^~`'"\\]+$/.test(text)) return false;

    return true;
  }

  /* ── private: translation engine ── */

  private async translatePage(targetLang: string, root: Node = document.body): Promise<void> {
    const nodes = this.collectTextNodes(root);
    if (!nodes.length) return;

    const langCache = this.getOrCreateCache(targetLang);
    const unique = [...new Set(nodes.map(n => n.text))];
    const missing = unique.filter(t => !langCache.has(t));

    if (missing.length) {
      const batchSize = 100;
      for (let i = 0; i < missing.length; i += batchSize) {
        const batch = missing.slice(i, i + batchSize);
        const results = await this.callApi(batch, targetLang);
        batch.forEach((t, idx) => { if (results[idx]) langCache.set(t, results[idx]); });
      }
    }

    nodes.forEach(({ node, text }) => {
      const translated = langCache.get(text);
      if (!translated || !node.parentNode) return;
      const orig = node.textContent || text;
      const lead = orig.match(/^\s*/)?.[0] || '';
      const trail = orig.match(/\s*$/)?.[0] || '';
      node.textContent = lead + translated + trail;
      this.translatedNodes.add(node);
    });
  }

  private async translatePlaceholders(targetLang: string, root: Element = document.body): Promise<void> {
    const langCache = this.getOrCreateCache(targetLang);
    const items: { el: HTMLInputElement; text: string }[] = [];

    root.querySelectorAll<HTMLInputElement>('input[placeholder], textarea[placeholder]').forEach(el => {
      if (el.closest('[data-no-translate]')) return;
      const text = el.placeholder?.trim();
      if (text && text.length >= 2) {
        items.push({ el, text });
      }
    });

    const unique = [...new Set(items.map(i => i.text))];
    const missing = unique.filter(t => !langCache.has(t));

    if (missing.length) {
      const results = await this.callApi(missing, targetLang);
      missing.forEach((t, idx) => { if (results[idx]) langCache.set(t, results[idx]); });
    }

    items.forEach(({ el, text }) => {
      const translated = langCache.get(text);
      if (translated) el.placeholder = translated;
    });
  }

  /* ── private: API ── */

  private async callApi(texts: string[], targetLang: string): Promise<string[]> {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(environment.googleTranslateApiKey)}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: texts, target: targetLang, source: 'en', format: 'text' }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Translation API error: ${res.status}`);
    }

    const data = await res.json();
    return (data.data.translations as { translatedText: string }[]).map(t => this.decodeEntities(t.translatedText));
  }

  /* ── helpers ── */

  /** Load static translations from assets/i18n/{lang}.json */
  private async loadStaticTranslations(lang: string): Promise<void> {
    if (this.staticLoaded.get(lang)) return;
    try {
      const res = await fetch(`/assets/i18n/${lang}.json`);
      if (!res.ok) return;
      const data: Record<string, string> = await res.json();
      const langCache = this.getOrCreateCache(lang);
      for (const [key, value] of Object.entries(data)) {
        langCache.set(key, value);
      }
      this.staticLoaded.set(lang, true);
    } catch {
      // Static file not found or invalid — continue without it
    }
  }

  /**
   * Export all cached translations as a downloadable JSON file.
   * Browse your site in Tibetan to capture all text, then call:
   *   (window as any).__exportTranslations()
   * from the browser console. Place the downloaded file at src/assets/i18n/bo.json
   */
  exportTranslations(lang: string = 'bo'): void {
    const langCache = this.cache.get(lang);
    if (!langCache || langCache.size === 0) {
      console.warn(`No cached translations for "${lang}". Browse pages in Tibetan first.`);
      return;
    }

    const sorted: Record<string, string> = {};
    [...langCache.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([k, v]) => sorted[k] = v);

    const blob = new Blob([JSON.stringify(sorted, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lang}.json`;
    a.click();
    URL.revokeObjectURL(url);

    console.log(`Exported ${langCache.size} translations for "${lang}".`);
  }

  private getSavedLang(): string {
    try { return localStorage.getItem('la-lang') || 'en'; } catch { return 'en'; }
  }

  private getOrCreateCache(lang: string): Map<string, string> {
    let m = this.cache.get(lang);
    if (!m) { m = new Map(); this.cache.set(lang, m); }
    return m;
  }

  private decodeEntities(text: string): string {
    const el = document.createElement('textarea');
    el.innerHTML = text;
    return el.value;
  }

  private tick(): Promise<void> {
    return new Promise(r => setTimeout(r, 60));
  }
}
