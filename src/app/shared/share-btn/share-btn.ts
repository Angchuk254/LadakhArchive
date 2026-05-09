import { Component, Input, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-share-btn',
  template: `
    <div class="sh" data-no-translate>
      <button class="sh__toggle" (click)="open.set(!open())" aria-label="Share this page">
        <i class="bi bi-share"></i>
      </button>
      @if (open()) {
        <div class="sh__panel">
          <a class="sh__link sh__link--x" [href]="twitterUrl" target="_blank" rel="noopener" aria-label="Share on X">
            <i class="bi bi-twitter-x"></i>
          </a>
          <a class="sh__link sh__link--fb" [href]="facebookUrl" target="_blank" rel="noopener" aria-label="Share on Facebook">
            <i class="bi bi-facebook"></i>
          </a>
          <a class="sh__link sh__link--wa" [href]="whatsappUrl" target="_blank" rel="noopener" aria-label="Share on WhatsApp">
            <i class="bi bi-whatsapp"></i>
          </a>
          <button class="sh__link sh__link--copy" (click)="copyLink()" [attr.aria-label]="copied() ? 'Copied!' : 'Copy link'">
            <i class="bi" [class.bi-check-lg]="copied()" [class.bi-link-45deg]="!copied()"></i>
          </button>
        </div>
      }
    </div>
  `,
  styles: `
    .sh {
      position: relative;
      display: inline-block;
    }

    .sh__toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 1.5px solid var(--la-gray-200);
      background: var(--la-white);
      color: var(--la-gray-400);
      cursor: pointer;
      transition: all 0.25s ease;

      &:hover {
        border-color: var(--la-primary);
        color: var(--la-primary);
      }
    }

    .sh__panel {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.5rem;
      display: flex;
      gap: 0.4rem;
      padding: 0.5rem;
      background: var(--la-white);
      border: 1px solid var(--la-gray-100);
      border-radius: var(--la-radius-lg);
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      z-index: 50;
      animation: sh-in 0.2s ease;
    }

    .sh__link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      font-size: 0.9rem;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s ease;

      &--x { background: #0f1419; color: #fff; &:hover { background: #333; } }
      &--fb { background: #1877f2; color: #fff; &:hover { background: #1565d8; } }
      &--wa { background: #25d366; color: #fff; &:hover { background: #1fb855; } }
      &--copy { background: var(--la-gray-100); color: var(--la-gray-600); &:hover { background: var(--la-gray-200); } }
    }

    @keyframes sh-in {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,
})
export class ShareBtn {
  private platformId = inject(PLATFORM_ID);

  @Input() title = '';
  @Input() url = '';
  open = signal(false);
  copied = signal(false);

  private get pageUrl(): string {
    if (this.url) return this.url;
    return isPlatformBrowser(this.platformId) ? window.location.href : '';
  }

  get twitterUrl(): string {
    return `https://x.com/intent/tweet?text=${encodeURIComponent(this.title)}&url=${encodeURIComponent(this.pageUrl)}`;
  }

  get facebookUrl(): string {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.pageUrl)}`;
  }

  get whatsappUrl(): string {
    return `https://wa.me/?text=${encodeURIComponent(this.title + ' ' + this.pageUrl)}`;
  }

  copyLink(): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(this.pageUrl);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }
  }
}
