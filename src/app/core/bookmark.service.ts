import { Injectable, inject, signal, PLATFORM_ID, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Bookmark {
  path: string;
  title: string;
  icon: string;
  addedAt: number;
}

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  private platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'la-bookmarks';

  readonly bookmarks = signal<Bookmark[]>([]);

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        try {
          const raw = localStorage.getItem(this.STORAGE_KEY);
          if (raw) this.bookmarks.set(JSON.parse(raw));
        } catch { /* ignore corrupt data */ }
      }
    });
  }

  isBookmarked(path: string): boolean {
    return this.bookmarks().some(b => b.path === path);
  }

  toggle(path: string, title: string, icon = 'bi-bookmark-fill'): void {
    if (this.isBookmarked(path)) {
      this.bookmarks.update(list => list.filter(b => b.path !== path));
    } else {
      this.bookmarks.update(list => [...list, { path, title, icon, addedAt: Date.now() }]);
    }
    this.persist();
  }

  private persist(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.bookmarks()));
    }
  }
}
