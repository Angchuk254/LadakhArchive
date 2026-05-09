import { Component, signal, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-back-to-top',
  template: `
    @if (visible()) {
      <button class="btt" (click)="scrollToTop()" aria-label="Back to top">
        <i class="bi bi-chevron-up"></i>
      </button>
    }
  `,
  styles: `
    .btt {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 900;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: none;
      background: var(--la-primary);
      color: var(--la-white);
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
      transition: all 0.3s ease;
      animation: btt-in 0.3s ease;

      &:hover {
        background: var(--la-accent);
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.22);
      }
    }

    @keyframes btt-in {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,
})
export class BackToTop {
  private platformId = inject(PLATFORM_ID);
  visible = signal(false);

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.addEventListener('scroll', () => {
          this.visible.set(window.scrollY > 400);
        }, { passive: true });
      }
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
