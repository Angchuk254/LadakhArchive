import { Component, Input, inject, computed } from '@angular/core';
import { BookmarkService } from '../../core/bookmark.service';

@Component({
  selector: 'app-bookmark-btn',
  template: `
    <button
      class="bm-btn"
      [class.bm-btn--active]="active()"
      (click)="bookmarkSvc.toggle(path, title, icon)"
      [attr.aria-label]="active() ? 'Remove bookmark' : 'Bookmark this page'">
      <i class="bi" [class.bi-bookmark-fill]="active()" [class.bi-bookmark]="!active()"></i>
    </button>
  `,
  styles: `
    .bm-btn {
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
        border-color: var(--la-accent);
        color: var(--la-accent);
      }

      &--active {
        border-color: var(--la-accent);
        color: var(--la-accent);
        background: rgba(200, 112, 42, 0.08);
      }
    }
  `,
})
export class BookmarkBtn {
  readonly bookmarkSvc = inject(BookmarkService);

  @Input() path = '';
  @Input() title = '';
  @Input() icon = 'bi-bookmark-fill';

  active = computed(() => this.bookmarkSvc.isBookmarked(this.path));
}
