import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/translation.service';

@Component({
  selector: 'app-translation-loader',
  templateUrl: './translation-loader.html',
  styleUrl: './translation-loader.scss',
  host: { 'data-no-translate': '' },
})
export class TranslationLoader {
  readonly service = inject(TranslationService);
}
