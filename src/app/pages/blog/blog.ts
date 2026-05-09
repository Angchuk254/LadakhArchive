import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {
  private meta = inject(Meta);
  private titleSvc = inject(Title);

  constructor() {
    const title = 'Ladakh Blog — Stories, History, Nature & Travel | The Ladakh archive';
    const desc = 'In-depth articles about Ladakh: forgotten kingdoms, living with snow leopards, the demand for statehood, Hemis Tsechu festival, Chadar trek, Changpa nomads, Silk Route trade history, and much more.';
    this.titleSvc.setTitle(title);
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ name: 'keywords', content: 'Ladakh blog, Ladakh articles, Ladakh stories, Ladakh travel blog, Ladakh history articles, Chadar trek, snow leopard Ladakh, Changpa nomads blog, Ladakh statehood' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:url', content: 'https://theladakh.org/blog' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: desc });
  }

  activeFilter = signal('all');

  categories = ['all', 'History', 'Culture', 'Nature', 'Politics', 'Travel', 'Education', 'People'];

  posts = [
    {
      slug: 'forgotten-kingdom-before-dogra-rule',
      title: 'The Forgotten Kingdom: Ladakh Before the Dogra Rule',
      excerpt: 'Tracing the independent kingdom of Ladakh from the Namgyal dynasty through centuries of Central Asian trade routes, monastic patronage, and diplomatic alliances that shaped its golden era.',
      category: 'History',
      date: 'Jan 15, 2025',
      readTime: '8 min read',
      icon: 'bi-clock-history',
      color: '#1a365d',
      featured: true,
    },
    {
      slug: 'living-with-snow-leopards',
      title: 'Living with Snow Leopards: Conservation in Hemis',
      excerpt: 'How local communities and researchers work together to protect the elusive ghost of the mountains in Hemis National Park — India\'s largest national park.',
      category: 'Nature',
      date: 'Feb 3, 2025',
      readTime: '6 min read',
      icon: 'bi-tree',
      color: '#059669',
      featured: false,
    },
    {
      slug: 'demand-for-statehood',
      title: 'The Demand for Statehood: Ladakh\'s Political Journey',
      excerpt: 'Understanding the ongoing movement for constitutional safeguards, the hunger strikes, and the voices driving the demand for full statehood.',
      category: 'Politics',
      date: 'Mar 22, 2025',
      readTime: '10 min read',
      icon: 'bi-bank',
      color: '#dc2626',
      featured: false,
    },
    {
      slug: 'hemis-tsechu-sacred-dance',
      title: 'Hemis Tsechu: The Sacred Dance Festival of Ladakh',
      excerpt: ' A deep dive into Ladakh\'s grandest monastic festival — the sacred Cham dances, the giant thangka, and the spiritual significance of Guru Padmasambhava\'s birth celebration.',
      category: 'Culture',
      date: 'apr 10, 2025',
      readTime: '7 min read',
      icon: 'bi-mask',
      color: '#7c3aed',
      featured: false,
    },
    {
      slug: 'khardung-la-gateway-to-nubra',
      title: 'Khardung La: Gateway to the Nubra Valley',
      excerpt: 'Riding one of the world\'s highest motorable passes — what to expect, how to prepare, and the breathtaking views that await on the other side.',
      category: 'Travel',
      date: 'May 5, 2025',
      readTime: '5 min read',
      icon: 'bi-signpost-split',
      color: '#c8702a',
      featured: false,
    },
    {
      slug: 'secmol-alternative-education',
      title: 'SECMOL: Reimagining Education in Ladakh',
      excerpt: 'How Sonam Wangchuk\'s Students\' Educational and Cultural Movement of Ladakh transformed education by embracing solar-powered, student-run campuses.',
      category: 'Education',
      date: 'Jun 18, 2025',
      readTime: '9 min read',
      icon: 'bi-mortarboard',
      color: '#0284c7',
      featured: false,
    },
    {
      slug: 'changpa-nomads-of-changthang',
      title: 'The Changpa: Nomads of the Changthang Plateau',
      excerpt: 'The last nomadic communities of Ladakh — their pashmina goats, seasonal migrations, and the challenges of preserving A centuries-old way of life.',
      category: 'People',
      date: 'Jul 2, 2025',
      readTime: '8 min read',
      icon: 'bi-people',
      color: '#475264',
      featured: true,
    },
    {
      slug: 'pangong-tso-beyond-bollywood',
      title: 'Pangong Tso: Beyond the Bollywood Frame',
      excerpt: 'Exploring the real Pangong Lake — not just the film set, but A fragile high-altitude ecosystem stretching 134 km between India and Tibet.',
      category: 'Nature',
      date: 'aug 14, 2025',
      readTime: '6 min read',
      icon: 'bi-water',
      color: '#059669',
      featured: false,
    },
    {
      slug: 'silk-route-ladakh-trade-history',
      title: 'The Silk Route Through Ladakh: A Trade History',
      excerpt: 'For centuries, Ladakh was A vital link in the trans-Himalayan trade network connecting India, Tibet, Central Asia, and China. A look at the caravans, bazaars, and treaties.',
      category: 'History',
      date: 'Sep 20, 2025',
      readTime: '11 min read',
      icon: 'bi-globe-americas',
      color: '#1a365d',
      featured: false,
    },
    {
      slug: 'chadar-trek-frozen-river',
      title: 'Walking on Ice: The Chadar Trek Experience',
      excerpt: ' A first-hand account of walking the frozen Zanskar River in -25ÂaC — one of the most extreme and unforgettable treks on the planet.',
      category: 'Travel',
      date: 'Oct 8, 2025',
      readTime: '7 min read',
      icon: 'bi-snow2',
      color: '#c8702a',
      featured: false,
    },
    {
      slug: 'balti-culture-kargil',
      title: 'Balti Heritage: The Cultural Tapestry of Kargil',
      excerpt: 'Exploring the rich Balti and Purig traditions of Kargil district — the music, cuisine, architecture, and the unique cultural identity that sets it apart.',
      category: 'Culture',
      date: 'Nov 15, 2025',
      readTime: '8 min read',
      icon: 'bi-music-note-beamed',
      color: '#7c3aed',
      featured: false,
    },
    {
      slug: 'ladakh-ut-what-changed',
      title: 'Ladakh as A Union Territory: What Really Changed?',
      excerpt: 'Three years after becoming A UT — assessing the impact on governance, development, employment, and the demand for the Sixth Schedule.',
      category: 'Politics',
      date: 'Dec 1, 2025',
      readTime: '12 min read',
      icon: 'bi-building',
      color: '#dc2626',
      featured: false,
    },
  ];

  filteredPosts = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.posts;
    return this.posts.filter(p => p.category === filter);
  });

  featuredPosts = computed(() => this.posts.filter(p => p.featured));

  setFilter(cat: string): void {
    this.activeFilter.set(cat);
  }
}




