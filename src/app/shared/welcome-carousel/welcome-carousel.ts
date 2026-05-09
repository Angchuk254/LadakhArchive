import { Component, signal, computed, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Slide {
  icon: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  bullets?: { icon: string; text: string }[];
  cta?: { label: string; route?: string; external?: boolean };
}

const SLIDES: Slide[] = [
  {
    icon: 'bi-cone-striped',
    tag: 'Early Access',
    tagColor: '#eab308',
    title: 'We\'re Just Getting Started',
    description:
      'LadakhArchive is in its initial stage of development. We\'re building the most comprehensive digital archive of Ladakh — its history, culture, nature, routes, and more. Things are evolving fast!',
    bullets: [
      { icon: 'bi-tools', text: 'Active development — new pages & features weekly' },
      { icon: 'bi-layers', text: '14+ pages covering every aspect of Ladakh' },
      { icon: 'bi-code-slash', text: 'Open-source and community-driven project' },
    ],
  },
  {
    icon: 'bi-exclamation-triangle',
    tag: 'Heads Up',
    tagColor: '#dc2626',
    title: 'Content May Have Errors',
    description:
      'Since we\'re still in the early stages, some data, descriptions, facts, or historical details might be inaccurate or incomplete. We\'re working hard to verify everything, but please don\'t treat this as a definitive source — yet.',
    bullets: [
      { icon: 'bi-pencil-square', text: 'Text & descriptions are being reviewed and refined' },
      { icon: 'bi-bar-chart', text: 'Statistics & figures are approximate and being verified' },
      { icon: 'bi-image', text: 'Placeholder visuals — real images coming soon' },
    ],
  },
  {
    icon: 'bi-rocket-takeoff',
    tag: 'Roadmap',
    tagColor: '#0284c7',
    title: 'What\'s Happening Now',
    description:
      'We\'re actively building content for every section — from deep-dive wildlife pages to detailed trekking routes. Here\'s what we\'re focused on right now:',
    bullets: [
      { icon: 'bi-check2-circle', text: 'Rich internal detail pages for Nature & Wildlife' },
      { icon: 'bi-map', text: 'Interactive maps and route guides for travelers' },
      { icon: 'bi-clock-history', text: 'Expanding the historical timeline with verified sources' },
      { icon: 'bi-camera', text: 'Adding real photography and multimedia content' },
    ],
  },
  {
    icon: 'bi-heart',
    tag: 'Join Us',
    tagColor: '#16a34a',
    title: 'How You Can Contribute',
    description:
      'LadakhArchive is a community effort. Whether you\'re a local, a traveler, a historian, or just passionate about Ladakh — there are many ways to help:',
    bullets: [
      { icon: 'bi-flag', text: 'Report errors — spot something wrong? Let us know!' },
      { icon: 'bi-pen', text: 'Contribute content — stories, photos, research, corrections' },
      { icon: 'bi-share', text: 'Spread the word — share with fellow Ladakh enthusiasts' },
      { icon: 'bi-github', text: 'Developers — contribute code and features' },
    ],
    cta: { label: 'Go to Contribute Page', route: '/contribute' },
  },
];

@Component({
  selector: 'app-welcome-carousel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome-carousel.html',
  styleUrl: './welcome-carousel.scss',
  host: { '(document:keydown.escape)': 'close()' },
})
export class WelcomeCarousel implements OnInit {
  private isBrowser: boolean;

  visible = signal(false);
  current = signal(0);
  slides = SLIDES;
  total = SLIDES.length;
  animating = signal(false);

  slide = computed(() => this.slides[this.current()]);

  progress = computed(() => ((this.current() + 1) / this.total) * 100);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) return;
    const dismissed = localStorage.getItem('la_welcome_dismissed');
    if (!dismissed) {
      setTimeout(() => this.visible.set(true), 800);
    }
  }

  next() {
    if (this.animating()) return;
    if (this.current() < this.total - 1) {
      this.animateSlide(() => this.current.update(c => c + 1));
    }
  }

  prev() {
    if (this.animating()) return;
    if (this.current() > 0) {
      this.animateSlide(() => this.current.update(c => c - 1));
    }
  }

  goTo(i: number) {
    if (this.animating() || i === this.current()) return;
    this.animateSlide(() => this.current.set(i));
  }

  close() {
    if (!this.visible()) return;
    this.visible.set(false);
    if (this.isBrowser) {
      localStorage.setItem('la_welcome_dismissed', Date.now().toString());
    }
  }

  dontShowAgain() {
    this.close();
  }

  private animateSlide(changeFn: () => void) {
    this.animating.set(true);
    changeFn();
    setTimeout(() => this.animating.set(false), 350);
  }
}
