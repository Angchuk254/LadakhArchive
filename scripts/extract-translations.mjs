#!/usr/bin/env node
/**
 * extract-translations.mjs
 *
 * Extracts all translatable text from the prerendered site, translates via
 * Google Cloud Translation API (one-time cost), and writes src/assets/i18n/bo.json.
 *
 * Usage:
 *   1. Build the site first:  npx ng build --configuration=development
 *   2. Run this script:       node scripts/extract-translations.mjs
 *
 * The script:
 *   - Reads every prerendered index.html from dist/
 *   - Extracts text nodes using the same filtering as the runtime service
 *   - Merges with existing bo.json (already-translated strings are kept)
 *   - Only calls the API for NEW strings (saves money)
 *   - Writes the complete bo.json
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { JSDOM } from 'jsdom';
import { readdir, stat } from 'fs/promises';

// ─── Config ──────────────────────────────────────────────────────────

const ROOT        = resolve(import.meta.dirname, '..');
const DIST_DIR    = join(ROOT, 'dist', 'LadakhArchive', 'browser');
const OUTPUT_FILE = join(ROOT, 'src', 'assets', 'i18n', 'bo.json');
const TARGET_LANG = 'bo';
const BATCH_SIZE  = 100;  // Google Translate max per request

// Read API key from environment.ts
const envFile = readFileSync(join(ROOT, 'src', 'environments', 'environment.ts'), 'utf-8');
const keyMatch = envFile.match(/googleTranslateApiKey:\s*'([^']+)'/);
if (!keyMatch) { console.error('Could not find API key in environment.ts'); process.exit(1); }
const API_KEY = keyMatch[1];

// ─── Text extraction ─────────────────────────────────────────────────

const SKIP_TAGS = new Set(['script', 'style', 'code', 'pre', 'noscript', 'svg']);
const JUNK_RE   = /^[\d\s.,\-+%$@#!?:\/()©;=<>{}[\]|_&*^~`'"\\]+$/;

function shouldTranslate(node) {
  const parent = node.parentElement;
  if (!parent) return false;
  const tag = parent.tagName?.toLowerCase();
  if (SKIP_TAGS.has(tag)) return false;
  if (parent.closest('[data-no-translate]')) return false;
  const text = node.textContent?.trim();
  if (!text || text.length < 2) return false;
  if (JUNK_RE.test(text)) return false;
  return true;
}

function extractTextsFromHtml(html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const texts = new Set();

  // Walk text nodes
  const walker = doc.createTreeWalker(doc.body, 4 /* NodeFilter.SHOW_TEXT */);
  let node;
  while ((node = walker.nextNode())) {
    if (shouldTranslate(node)) {
      const t = node.textContent.trim();
      if (t.length >= 2) texts.add(t);
    }
  }

  // Placeholders
  doc.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
    if (el.closest('[data-no-translate]')) return;
    const ph = el.getAttribute('placeholder')?.trim();
    if (ph && ph.length >= 2) texts.add(ph);
  });

  dom.window.close();
  return texts;
}

// ─── File discovery ──────────────────────────────────────────────────

async function findHtmlFiles(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findHtmlFiles(full));
    } else if (entry.name === 'index.html') {
      files.push(full);
    }
  }
  return files;
}

// ─── Google Translate API ────────────────────────────────────────────

async function translateBatch(texts) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(API_KEY)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: texts, target: TARGET_LANG, source: 'en', format: 'text' }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }
  const data = await res.json();
  return data.data.translations.map(t => decodeEntities(t.translatedText));
}

function decodeEntities(text) {
  return text
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

// ─── Main ────────────────────────────────────────────────────────────

async function main() {
  console.log('📂 Scanning prerendered pages in dist/ ...');
  const htmlFiles = await findHtmlFiles(DIST_DIR);
  console.log(`   Found ${htmlFiles.length} prerendered pages.\n`);

  // Extract all unique text
  const allTexts = new Set();
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf-8');
    const texts = extractTextsFromHtml(html);
    for (const t of texts) allTexts.add(t);
  }
  console.log(`📝 Extracted ${allTexts.size} unique translatable strings.\n`);

  // Load existing translations
  let existing = {};
  if (existsSync(OUTPUT_FILE)) {
    try {
      existing = JSON.parse(readFileSync(OUTPUT_FILE, 'utf-8'));
    } catch { /* empty or invalid file */ }
  }
  const existingCount = Object.keys(existing).length;
  console.log(`📖 Existing translations in bo.json: ${existingCount}`);

  // Find what's missing
  const missing = [...allTexts].filter(t => !existing[t]);
  console.log(`🆕 New strings to translate: ${missing.length}`);

  if (missing.length === 0) {
    console.log('\n✅ All strings are already translated! Nothing to do.');
    // Still write sorted output in case we want to clean it up
    writeSortedJson(existing, allTexts);
    return;
  }

  // Estimate cost: Google Translate charges $20 per 1M characters
  const totalChars = missing.reduce((sum, t) => sum + t.length, 0);
  console.log(`📊 Characters to translate: ${totalChars.toLocaleString()} (~$${(totalChars / 1_000_000 * 20).toFixed(4)})\n`);

  // Translate in batches
  const translations = { ...existing };
  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    const batch = missing.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(missing.length / BATCH_SIZE);
    process.stdout.write(`   Translating batch ${batchNum}/${totalBatches} (${batch.length} strings)...`);

    try {
      const results = await translateBatch(batch);
      batch.forEach((text, idx) => {
        if (results[idx]) translations[text] = results[idx];
      });
      console.log(' ✓');
    } catch (err) {
      console.log(` ✗ Error: ${err.message}`);
      console.log('   Saving progress so far and exiting...');
      break;
    }

    // Small delay between batches to avoid rate limits
    if (i + BATCH_SIZE < missing.length) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  writeSortedJson(translations, allTexts);
}

function writeSortedJson(translations, activeTexts) {
  // Sort alphabetically for clean diffs
  const sorted = {};
  Object.keys(translations)
    .sort((a, b) => a.localeCompare(b))
    .forEach(k => sorted[k] = translations[k]);

  writeFileSync(OUTPUT_FILE, JSON.stringify(sorted, null, 2), 'utf-8');
  console.log(`\n✅ Wrote ${Object.keys(sorted).length} translations to src/assets/i18n/bo.json`);
  console.log('   Run "npx ng build" to include the updated JSON in the bundle.\n');
}

main().catch(err => { console.error('Fatal error:', err); process.exit(1); });
