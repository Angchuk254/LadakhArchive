import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
import { WelcomeCarousel } from './shared/welcome-carousel/welcome-carousel';
import { TranslationLoader } from './shared/translation-loader/translation-loader';
import { BackToTop } from './shared/back-to-top/back-to-top';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, WelcomeCarousel, TranslationLoader, BackToTop],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('LadakhArchive');
}
