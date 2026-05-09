import { Component, Input, inject, signal, ElementRef, DestroyRef, afterNextRender } from '@angular/core';
import { TranslationService } from '../../core/translation.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.html',
  styleUrl: './language-selector.scss',
  host: { 'data-no-translate': '' },
})
export class LanguageSelector {
  readonly service = inject(TranslationService);
  readonly isOpen = signal(false);

  @Input() theme: 'light' | 'dark' = 'light';

  private el = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const handler = (event: MouseEvent) => {
        if (!this.el.nativeElement.contains(event.target as Node)) {
          this.isOpen.set(false);
        }
      };
      document.addEventListener('click', handler, true);
      this.destroyRef.onDestroy(() => document.removeEventListener('click', handler, true));
    });
  }

  toggle() {
    this.isOpen.update(v => !v);
  }

  select(code: string) {
    this.isOpen.set(false);
    this.service.switchLanguage(code);
  }
}
