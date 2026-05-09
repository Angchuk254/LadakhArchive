import { Component, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { LocationExplorerComponent } from '../../shared/location-explorer/location-explorer';

@Component({
  selector: 'app-home',
  imports: [RouterLink, LocationExplorerComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private meta = inject(Meta);
  private titleSvc = inject(Title);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    const title = 'The Ladakh archive — Complete Guide to Ladakh\'s History, Culture & Nature';
    const description = 'The Ladakh archive is the most comprehensive digital encyclopedia of Ladakh. Explore 1,000+ years of history, Buddhist monasteries, snow leopard wildlife, high-altitude lakes like Pangong Tso, road trips, treks, festivals, villages, and the diverse peoples of Ladakh.';
    this.titleSvc.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: 'Ladakh guide, Ladakh history, Ladakh monasteries, Ladakh wildlife, Pangong Tso, snow leopard, Nubra Valley, Hemis, Leh, Kargil, Ladakh travel, Ladakh culture, Ladakh Buddhism, Ladakh festivals' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: 'https://theladakh.org/' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    // Canonical
    if (isPlatformBrowser(this.platformId)) {
      let link: HTMLLinkElement = this.document.querySelector('link[rel="canonical"]') || this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', 'https://theladakh.org/');
      this.document.head.appendChild(link);
    }
  }
  categories = [
    { icon: 'bi-clock-history', title: 'History', desc: 'ancient kingdoms, Silk Route trade and centuries of cultural evolution.', link: '/history', color: '#1a365d', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
    { icon: 'bi-people-fill', title: 'Culture & People', desc: 'Traditions, festivals, languages, cuisine and the warm-hearted people of Ladakh.', link: '/culture', color: '#7c3aed', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
    { icon: 'bi-tree-fill', title: 'Nature & Wildlife', desc: 'Snow leopards, high-altitude lakes, and the extraordinary flora of the Trans-Himalayas.', link: '/nature', color: '#059669', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800' },
    { icon: 'bi-bank', title: 'Politics & Society', desc: 'From Princely State to Union Territory — the political journey of A frontier region.', link: '/politics', color: '#dc2626', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
    { icon: 'bi-mortarboard-fill', title: 'Education', desc: 'Reforming learning for the mountains — SECMOL, HIAL and the future of Ladakhi youth.', link: '/education', color: '#0284c7', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800' },
    { icon: 'bi-signpost-split-fill', title: 'Routes & Journeys', desc: 'Plan your journey across the highest motorable passes and Ancient trade routes.', link: '/routes', color: '#c8702a', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800' },
    { icon: 'bi-search', title: 'Village Search', desc: 'Explore villages across Ladakh — search by name, pincode, block or district.', link: '/village-search', color: '#6d28d9', image: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?auto=format&fit=crop&q=80&w=800' },
  ];

  stats = [
    { value: '1000+', label: 'Years of History' },
    { value: '45,000', label: 'Sq Km area' },
    { value: '3,500m', label: 'avg altitude' },
    { value: '300K+', label: 'Population' },
  ];

  featuredPlaces = [
    { name: 'Pangong Tso', tag: 'Nature', altitude: '4,225 m', desc: 'The world\'s highest saltwater lake, famous for its changing colours and dramatic mountain backdrop.', link: '/nature/lake/pangong-tso', icon: 'bi-water', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800' },
    { name: 'Hemis Monastery', tag: 'Culture', altitude: '3,600 m', desc: 'The largest and wealthiest monastery in Ladakh, home to the famous Hemis Tsechu festival.', link: '/monasteries/hemis', icon: 'bi-building', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
    { name: 'Khardung La', tag: 'Routes', altitude: '5,359 m', desc: 'One of the world\'s highest motorable passes, the gateway to the Nubra and Shyok Valleys.', link: '/routes/pass/khardung-la', icon: 'bi-signpost-split', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800' },
    { name: 'Nubra Valley', tag: 'Nature', altitude: '3,000 m', desc: ' A high-altitude desert valley known for its sand dunes, double-humped camels, and lush orchards.', link: '/nature/protected/nubra-valley', icon: 'bi-tree', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800' },
  ];

  latestArticles = [
    { title: 'The Forgotten Kingdom: Ladakh Before Dogras', category: 'History', date: 'Jan 15, 2025', readTime: '8 min', excerpt: 'Exploring the 400-year rule of the Namgyal dynasty and the strategic importance of the Silk Route trade.', link: '/blog/forgotten-kingdom-before-dogra-rule', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
    { title: 'Living with Snow Leopards: Hemis Story', category: 'Nature', date: 'Feb 3, 2025', readTime: '6 min', excerpt: 'How community-led conservation is saving the "Ghost of the Mountains" while supporting local herders.', link: '/blog/living-with-snow-leopards', image: 'https://images.unsplash.com/photo-1563811771046-ba984ff30900?auto=format&fit=crop&q=80&w=800' },
    { title: 'The Demand for Statehood: A Political Journey', category: 'Politics', date: 'Mar 22, 2025', readTime: '10 min', excerpt: 'Understanding the Sixth Schedule demand and Ladakh\'s quest for constitutional safeguards and identity.', link: '/blog/demand-for-statehood', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
  ];

  galleryImages: { title: string; location: string; image: string; gradient: string; icon: string; area: string }[] = [
    { title: 'Chadar Trek', location: 'Zanskar River', image: 'assets/img/chadar-trek.png', gradient: 'linear-gradient(135deg, #0b3d2e, #1e8449, #27ae60)', icon: 'bi-snow2', area: 'd' },
    { title: 'Diskit Buddha', location: 'Nubra Valley', image: 'assets/img/diskit-buddha.png', gradient: 'linear-gradient(135deg, #7d5a29, #c8702a, #e59866)', icon: 'bi-building', area: 'e' },
    { title: 'Nomad Life', location: 'Changthang', image: 'assets/img/nomad-life.png', gradient: 'linear-gradient(135deg, #1a365d, #2b5797, #5499c7)', icon: 'bi-people', area: 'f' },
  ];

  scrollToContent(): void {
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
  }

  festivals = [
    { name: 'Hemis Tsechu', month: 'June / July', desc: 'The grandest monastic festival celebrating Guru Padmasambhava\'s birth with sacred mask dances.', icon: 'bi-mask' },
    { name: 'Losar', month: 'December / January', desc: 'Ladakhi New Year celebrated with traditional rituals, feasts, archery, and polo.', icon: 'bi-stars' },
    { name: 'Sindhu Darshan', month: 'June', desc: ' A festival celebrating the Indus River (Sindhu) at its banks near Leh, promoting national unity.', icon: 'bi-tsunami' },
    { name: 'Ladakh Festival', month: 'September', desc: ' A cultural extravaganza showcasing traditional music, dance, archery, and polo competitions.', icon: 'bi-music-note-beamed' },
  ];

  funFacts = [
    { fact: 'Ladakh has the highest motorable pass in India — Umling La at 5,883m (19,300 ft).', icon: 'bi-signpost-2-fill', color: '#c8702a' },
    { fact: 'The Indus River flows through all of Ladakh, from its source near Mount Kailash to beyond Kargil.', icon: 'bi-water', color: '#0284c7' },
    { fact: 'Ladakh receives barely 100mm of rainfall A year — making it one of the driest inhabited places on Earth.', icon: 'bi-cloud-sun', color: '#eab308' },
    { fact: 'Snow leopards outnumber humans in some valleys of the Hemis National Park.', icon: 'bi-binoculars', color: '#059669' },
    { fact: 'The Chadar Trek is the only route to Zanskar in winter — walking on A frozen river for 7 days.', icon: 'bi-snow2', color: '#5499c7' },
    { fact: 'Ladakh was an independent kingdom for over 400 years under the Namgyal dynasty.', icon: 'bi-crown', color: '#7c3aed' },
    { fact: 'Pangong Tso changes color throughout the day — from blue to green to grey to red at sunset.', icon: 'bi-palette', color: '#dc2626' },
    { fact: 'Ladakh has the highest concentration of Buddhist monasteries in India.', icon: 'bi-building', color: '#1a365d' },
  ];

  private factIndex = signal(0);
  currentFact = computed(() => this.funFacts[this.factIndex()]);

  nextFact(): void {
    this.factIndex.update(i => (i + 1) % this.funFacts.length);
  }
}




