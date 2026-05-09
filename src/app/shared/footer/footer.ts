import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageSelector } from '../language-selector/language-selector';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, LanguageSelector],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  currentYear = new Date().getFullYear();
}
