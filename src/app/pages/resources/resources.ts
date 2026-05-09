import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Resource {
  title: string;
  authorOrOrg: string;
  year?: number;
  type: 'Historical account' | 'Book' | 'Documentary' | 'NGO' | 'Scientific Journal' | 'archive Document';
  desc: string;
  link?: string;
  icon: string;
  tags: string[];
  era: '1800s' | '1900s' | '2000s' | '2020s';
}

@Component({
  selector: 'app-resources',
  imports: [RouterLink],
  templateUrl: './resources.html',
  styleUrl: './resources.scss',
})
export class Resources {
  activeCategory = signal<string>('all');
  categories = ['all', 'Historical accounts', 'Books', 'Scientific Journals', 'archive Documents', 'NGOs'];

  resources: Resource[] = [
    // â•â•â•â• 1800s: The Great Game & Early Explorers â•â•â•â•
    {
      title: 'Travels in the Himalayan Provinces of Hindustan and the Panjab',
      authorOrOrg: 'William Moorcroft & George Trebeck',
      year: 1841,
      type: 'Historical account',
      era: '1800s',
      desc: 'Written during their expedition from 1819 to 1825, this is one of the earliest and most detailed firsthand British intelligence accounts of the thriving Silk Route trade in Leh before the Dogra invasion.',
      icon: 'bi-journal-richtext',
      tags: ['Primary Source', 'Silk Route', 'Great Game'],
    },
    {
      title: 'Ladak: Physical, Statistical, and Historical',
      authorOrOrg: 'alexander Cunningham',
      year: 1854,
      type: 'Historical account',
      era: '1800s',
      desc: 'a monumental work by the British boundary commissioner. Cunningham provided the first comprehensive map of Ladakh, alongside extensive data on weather, sociology, and the devastating impacts of the Dogra conquest.',
      icon: 'bi-globe-americas',
      tags: ['Geography', 'Primary Source', 'Cartography'],
    },
    {
      title: 'Trans-Himalaya: Discoveries and adventures in Tibet',
      authorOrOrg: 'Sven Hedin',
      year: 1909,
      type: 'Historical account',
      era: '1900s',
      desc: 'The famed Swedish geographer vividly describes crossing the brutal, bone-strewn Karakoram Pass into Ladakh, detailing the severe physiological toll of high-altitude caravan travel.',
      icon: 'bi-compass',
      tags: ['Exploration', 'Karakoram', 'Survival'],
    },
    {
      title: 'a History of Western Tibet',
      authorOrOrg: 'a. H. Francke',
      year: 1907,
      type: 'Historical account',
      era: '1900s',
      desc: 'Reverend Francke of the Moravian Mission compiled the first definitive history of the Ladakhi kings (the Namgyal Dynasty) by translating ancient Tibetan chronicles found in local monasteries.',
      icon: 'bi-book-half',
      tags: ['Moravian Mission', 'Namgyal Dynasty', 'Translation'],
    },

    // â•â•â•â• 1900s: Cultural Shifts & Early Modernization â•â•â•â•
    {
      title: 'ancient Futures: Learning from Ladakh',
      authorOrOrg: 'Helena Norberg-Hodge',
      year: 1991,
      type: 'Book',
      era: '1900s',
      desc: 'a seminal, globally recognized work examining the catastrophic impact of sudden Western modernization on Ladakh\'s traditional culture and fragile environment, arguing fiercely for localized, sustainable solutions.',
      link: 'https://www.localfutures.org/programs/ancient-futures/',
      icon: 'bi-book',
      tags: ['anthropology', 'Environment', 'Development'],
    },
    {
      title: 'Ladakh: Crossroads of High asia',
      authorOrOrg: 'Janet Rizvi',
      year: 1996,
      type: 'Book',
      era: '1900s',
      desc: 'Considered the modern Bible on the region. a comprehensive historical, cultural, and geographical overview of Ladakh, drawing on decades of personal experience and rigorous academic research.',
      icon: 'bi-book',
      tags: ['History', 'Culture', 'Geography'],
    },
    {
      title: 'a Cultural History of Tibet',
      authorOrOrg: 'David Snellgrove & Hugh Richardson',
      year: 1968,
      type: 'Book',
      era: '1900s',
      desc: 'Provides vital context for understanding Ladakhi Buddhism and its deep, undeniable historical connections to the broader Tibetan cultural sphere before the closing of the borders in 1962.',
      icon: 'bi-book',
      tags: ['Buddhism', 'Tibet', 'Theology'],
    },

    // â•â•â•â• 2000s & 2020s: Scientific Research & Modern NGOs â•â•â•â•
    {
      title: 'Snow Leopard Population assessment in India (SPaI)',
      authorOrOrg: 'Wildlife Institute of India (WII)',
      year: 2024,
      type: 'Scientific Journal',
      era: '2020s',
      desc: 'The groundbreaking national census utilizing spatial capture-recapture models. It officially established Ladakh as holding the world\'s highest density of Snow Leopards, estimating the regional population at 477 individuals.',
      icon: 'bi-file-earmark-medical',
      tags: ['Census', 'Zoology', 'Snow Leopard'],
    },
    {
      title: 'Holocene Paleoclimate Records from Tso Moriri Core Samples',
      authorOrOrg: 'Wadia Institute of Himalayan Geology',
      year: 2025,
      type: 'Scientific Journal',
      era: '2020s',
      desc: 'Deep-strata core sampling extracted from the bed of Tso Moriri yielding an uninterrupted 10,000-year timeline of Holocene climate shifts across High asia, revealing profound historical drought cycles.',
      icon: 'bi-funnel',
      tags: ['Geology', 'Limnology', 'Climate Change'],
    },
    {
      title: 'Treaty of Tingmosgang (1684)',
      authorOrOrg: 'Tibet-Ladakh-Mughal Negotiators',
      year: 1684,
      type: 'archive Document',
      era: '1800s', // Placed here for era grouping simplicity
      desc: 'The foundational historical treaty ending the Tibet-Ladakh-Mughal War. It strictly regulated the lucrative Pashmina wool trade, granting Ladakh an exclusive monopoly that defined its economy for three centuries.',
      icon: 'bi-file-earmark-text',
      tags: ['Treaty', 'Pashmina', 'Geopolitics'],
    },
    {
      title: 'Snow Leopard Conservancy India Trust (SLC-IT)',
      authorOrOrg: 'NGO Based in Leh',
      year: 2000,
      type: 'NGO',
      era: '2000s',
      desc: 'Pioneered community-based conservation in Hemis National Park. They successfully eliminated 95% of retaliatory snow leopard killings by installing predator-proof corrals and initiating village homestay ecotourism.',
      link: 'https://snowleopardindia.org/',
      icon: 'bi-globe',
      tags: ['Wildlife', 'Conservation', 'Ecotourism'],
    },
    {
      title: 'Students\' Educational and Cultural Movement of Ladakh (SECMOL)',
      authorOrOrg: 'Founded by Sonam Wangchuk',
      year: 1988,
      type: 'NGO',
      era: '1900s',
      desc: 'World-renowned for revolutionizing the Ladakhi educational system. Their solar-heated campus in Phey is entirely off-grid, emphasizing practical knowledge, ecology, and cultural preservation over rote memorization.',
      link: 'https://secmol.org/',
      icon: 'bi-building',
      tags: ['Education', 'Solar Energy', 'Youth'],
    },
    {
      title: 'Nature Conservation Foundation (NCF)',
      authorOrOrg: 'High altitude Programme',
      year: 2010,
      type: 'NGO',
      era: '2000s',
      desc: 'Conducts crucial field research on the Tibetan Wolf and Kiang populations in the Changthang, actively working to mitigate human-wildlife conflict and advocate for unrestricted migratory wildlife corridors.',
      link: 'https://www.ncf-india.org/',
      icon: 'bi-globe',
      tags: ['Wildlife', 'Changthang', 'Research'],
    },
  ];

  filteredResources = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'all') return this.resources;
    if (cat === 'Books') return this.resources.filter(r => r.type === 'Book');
    if (cat === 'Historical accounts') return this.resources.filter(r => r.type === 'Historical account');
    if (cat === 'Scientific Journals') return this.resources.filter(r => r.type === 'Scientific Journal');
    if (cat === 'archive Documents') return this.resources.filter(r => r.type === 'archive Document');
    if (cat === 'NGOs') return this.resources.filter(r => r.type === 'NGO');
    return this.resources;
  });

  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }
}




