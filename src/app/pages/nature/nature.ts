import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nature',
  imports: [RouterLink],
  templateUrl: './nature.html',
  styleUrl: './nature.scss',
  host: { '(document:keydown.escape)': 'onEscape()' },
})
export class Nature {
  private sanitizer = inject(DomSanitizer);
  private meta = inject(Meta);
  private titleSvc = inject(Title);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    const title = 'Nature & Wildlife of Ladakh â€” Snow Leopards, Lakes & Himalayan Ecosystems';
    const description = 'Explore Ladakh\'s extraordinary wildlife and nature: snow leopards, black-necked cranes, Tibetan wild ass, Himalayan ibex, Pangong Tso, Tso Moriri, glaciers, alpine flora, and the world\'s highest cold desert ecosystem.';
    this.titleSvc.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: 'Ladakh wildlife, snow leopard Ladakh, Pangong Tso, Tso Moriri, black-necked crane, Hemis National Park, Himalayan ibex, Tibetan wild ass, Ladakh birds, Ladakh flora, high altitude lakes, Ladakh conservation' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: 'https://theladakh.org/nature' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }

  selectedanimal = signal<any>(null);
  activeVideo = signal<SafeResourceUrl | null>(null);
  activeVideoTitle = signal<string>('');

  openAnimal(a: any) {
    this.selectedanimal.set(a);
    document.body.style.overflow = 'hidden';
  }

  closeanimalModal() {
    this.selectedanimal.set(null);
    document.body.style.overflow = '';
  }

  playVideo(vid: any) {
    const url = `https://www.youtube.com/embed/${vid.youtubeId}?autoplay=1&rel=0`;
    this.activeVideo.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
    this.activeVideoTitle.set(vid.title);
    document.body.style.overflow = 'hidden';
  }

  closeVideo() {
    this.activeVideo.set(null);
    this.activeVideoTitle.set('');
    document.body.style.overflow = '';
  }

  onEscape() {
    if (this.activeVideo()) {
      this.closeVideo();
    } else {
      this.closeanimalModal();
    }
  }

  getDonutOffset(index: number): number {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += this.speciesData[i].pct;
    }
    return -(offset * 4.712);
  }

  // ===== Key Stats =====
  stats = [
    { number: '73', label: 'Mammal Species', icon: 'bi-piggy-bank' },
    { number: '320+', label: 'Bird Species', icon: 'bi-feather' },
    { number: '12', label: 'Major Lakes', icon: 'bi-water' },
    { number: '2', label: 'National Parks', icon: 'bi-tree-fill' },
    { number: '4,500m', label: 'avg. Elevation', icon: 'bi-arrow-up-circle' },
    { number: '3', label: 'Climate Zones', icon: 'bi-thermometer-half' },
  ];

  // ===== Ecosystems =====
  ecosystems = [
    {
      name: 'Cold Desert',
      elevation: '3,000 â€“ 4,500m',
      icon: 'bi-wind',
      color: '#c8702a',
      gradient: 'linear-gradient(135deg, #7d5a29, #c8702a, #e59866)',
      desc: 'The Indus Valley and surrounding areas form one of the world\'s highest cold deserts, with sparse vegetation, extreme temperature swings, and less than 100mm annual rainfall.',
      features: ['Sparse scrubland', 'Sand dunes (Hunder)', 'Extreme aridity', 'Boulder fields'],
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'alpine Meadows',
      elevation: '4,000 â€“ 5,000m',
      icon: 'bi-flower1',
      color: '#059669',
      gradient: 'linear-gradient(135deg, #0b3d2e, #059669, #34d399)',
      desc: 'Seasonal alpine meadows burst with wildflowers during the brief summer â€” edelweiss, blue poppies, and wild roses carpet the high passes, providing critical grazing for wildlife.',
      features: ['Wildflower carpets', 'Grazing pastures', 'Medicinal herbs', 'Summer-only bloom'],
      image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Wetlands & Lakes',
      elevation: '4,200 â€“ 4,600m',
      icon: 'bi-water',
      color: '#0284c7',
      gradient: 'linear-gradient(135deg, #0f2b46, #0284c7, #38bdf8)',
      desc: 'High-altitude wetlands and salt lakes â€” including Pangong Tso, Tso Moriri, and Tso Kar â€” are critical stopover habitats for migratory birds on the Central asian Flyway.',
      features: ['Salt & freshwater lakes', 'Migratory bird habitat', 'Marshlands', 'Birdwatcher paradise'],
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Glacial & Nival Zone',
      elevation: '5,000m+',
      icon: 'bi-snow3',
      color: '#7c3aed',
      gradient: 'linear-gradient(135deg, #4a1942, #7c3aed, #a78bfa)',
      desc: 'Permanent glaciers and snowfields dominate the highest reaches. Glaciers like Siachen, Drang Drung, and Khardung feed the rivers that sustain all life below.',
      features: ['Permanent glaciers', 'Snowfields', 'River sources', 'Permafrost zones'],
      image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800'
    },
  ];

  // ===== Wildlife Photo Gallery =====
  gallery = [
    { title: 'Snow Leopard', caption: 'The elusive ghost cat stalking blue sheep across Hemis peaks', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800', icon: 'bi-binoculars', area: 'a' },
    { title: 'Black-Necked Crane', caption: 'a breeding pair at Hanle marshlands â€” one of the rarest cranes on Earth', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-feather', area: 'b' },
    { title: 'Pangong Tso', caption: 'Crystal-blue waters stretching 134km between India and Tibet', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-water', area: 'c' },
    { title: 'Wild Kiang', caption: 'Herds of Tibetan wild ass galloping across the Changthang grasslands', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-speedometer', area: 'd' },
    { title: 'Himalayan Marmot', caption: 'Plump golden marmots sunbathing at their burrow entrance', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800', icon: 'bi-emoji-smile', area: 'e' },
    { title: 'Drang Drung Glacier', caption: 'a massive glacier feeding the Zanskar River system', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow2', area: 'f' },
    { title: 'Blue Sheep (Bharal)', caption: 'Primary prey of the snow leopard grazing on steep cliff faces', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800', icon: 'bi-dribbble', area: 'g' },
    { title: 'apricot Blossoms', caption: 'Pink-white blossoms transforming the Indus Valley each april', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800', icon: 'bi-flower2', area: 'h' },
  ];

  // ===== Iconic animals =====
  animals = [
    {
      name: 'Snow Leopard',
      slug: 'snow-leopard',
      scientific: 'Panthera uncia',
      population: '~477 in Ladakh (2024 SPaI Census)',
      status: 'Vulnerable',
      statusColor: '#eab308',
      icon: 'bi-binoculars-fill',
      color: '#7c3aed',
      habitat: 'Rocky mountains, 3,500–5,500m',
      diet: 'Blue sheep (bharal), ibex, marmots',
      desc: 'The Ghost of the Mountains — Ladakh is the global stronghold for this elusive big cat. With 477 individuals (2024 census), Hemis National Park holds the world\'s highest snow leopard density on Earth.',
      overview: 'The Snow Leopard is Ladakh\'s most iconic predator, perfectly adapted to the harsh Trans-Himalayan terrain. With dense fur, wide padded paws for snow walking, and a meter-long tail for cliff-balance, it is a masterwork of evolution. Hemis National Park holds roughly 1 per 10 sq km — the highest known density globally. The Snow Leopard Conservancy India Trust\'s community-based conservation model has turned former herders into guardian-guides. Winter treks to Rumbak and Ulley valleys attract wildlife photographers globally. The 2024 SPaI census confirmed 477 individuals in Ladakh, representing 65%+ of India\'s entire population.',
      highlights: ['477 individuals in Ladakh (2024)', 'Hemis National Park hotspot', 'World\'s highest big cat density', 'Community conservation model', '"Ghost cat" winter treks', 'Camera trap & scat DNA monitoring', 'Prey: bharal & ibex'],
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Black-Necked Crane',
      slug: 'black-necked-crane',
      scientific: 'Grus nigricollis',
      population: '~120–130 breeding pairs (2025 data)',
      status: 'Near Threatened',
      statusColor: '#0284c7',
      icon: 'bi-feather2',
      color: '#1a365d',
      habitat: 'Changthang wetlands, 4,200m+',
      diet: 'Roots, tubers, insects, small fish',
      desc: 'A deeply sacred bird in Himalayan Buddhism and the state bird of Ladakh — the only Indian breeding ground for this rare alpine crane is the high-altitude wetlands of Hanle and Chushul.',
      overview: 'The Black-Necked Crane (Cha-Thung-Thung) is the only alpine crane species on Earth, breeding exclusively above 4,000m. Ladakhi Buddhists revere them as incarnations of past lamas. Folklore says the cranes circumambulate monasteries three times upon arrival and departure. The high-altitude bogs of Hanle, Chushul, and Tso Kar are the sole Indian breeding grounds. They arrive from wintering grounds in Bhutan as lake ice fractures in April. Community conservation programs paying Changpa nomads to guard nests have raised fledgling survival rates by 40%.',
      highlights: ['State Bird of Ladakh', 'Sacred Buddhist symbol', 'Only alpine crane species', 'Exclusive Indian breeding site', 'Intricate courtship dances', 'Migratory (winters in Bhutan/SE Tibet)'],
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Tibetan Wild ass (Kiang)',
      slug: 'tibetan-wild-ass',
      scientific: 'Equus kiang',
      population: '~2,500+ (2025 WII Estimates)',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-speedometer2',
      color: '#c8702a',
      habitat: 'Changthang plateau steppe, 4,000–5,200m',
      diet: 'Hard sedges, Stipa grasses, alpine herbs',
      desc: 'The largest wild ass species on Earth — the Kiang roams the vast Changthang plateau in herds up to 400, galloping at 60 km/h across the high-altitude grasslands of eastern Ladakh.',
      overview: 'The Kiang is the galloping monarch of the Changthang. As the world\'s largest wild ass, stallions stand 142cm at the shoulder. They contrast a rich chestnut-red coat with a stark white belly. In summer they form colossal nomadic herds exceeding 400 individuals. While Least Concern globally, the Ladakhi population faces increasing competition with domestic livestock and habitat fragmentation from border military infrastructure. The Changthang Cold Desert Wildlife Sanctuary provides protection across 4,000 sq km.',
      highlights: ['Largest wild ass species globally', 'Herds up to 400', 'Sustained gallops of 60 km/h', 'Extreme altitude blood adaptations', 'Dominant grazer of the Changthang', 'Complex harem social structure'],
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Himalayan Brown Bear',
      slug: 'himalayan-brown-bear',
      scientific: 'Ursus arctos isabellinus',
      population: '~40–50 in Ladakh (2025 WII estimate)',
      status: 'Critically Endangered',
      statusColor: '#dc2626',
      icon: 'bi-shield-fill-exclamation',
      color: '#7b2d26',
      habitat: 'Zanskar, Suru Valley, Drass, 3,000–4,500m',
      diet: 'Omnivore — roots, berries, marmots, livestock',
      desc: 'The elusive "Red Bear" of the Himalayas — fewer than 50 individuals survive in Ladakh\'s deep western valleys, facing severe human-wildlife conflict and genetic isolation.',
      overview: 'The Himalayan Brown Bear, distinguished by its sandy reddish-brown fur, is the largest mammal in the western Himalayas. The Ladakhi population is terrifyingly small at fewer than 50 individuals, trapped between the Line of Control and high passes. Bears raid crops, damage stores, and kill livestock, triggering retaliatory killing. 2025–2026 conservation efforts by WII include genome mapping of the Suru Valley population and distribution of steel bear-proof grain containers, which reduced conflict by 60%. This creature likely influenced the Yeti myths prevalent among early European mountaineers.',
      highlights: ['Fewer than 50 in Ladakh', 'Origin of "Yeti" footprint myths', 'Endemic to western Ladakh/Kargil', 'Severe human-wildlife conflict', 'Bear-proof storage interventions', 'Scat-DNA profiling (2026)'],
      image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Himalayan Ibex',
      slug: 'himalayan-ibex',
      scientific: 'Capra sibirica hemalayanus',
      population: '~4,000+ in Ladakh',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-chevron-double-up',
      color: '#059669',
      habitat: 'Steep cliffs and ridges, 3,800–5,200m',
      diet: 'Grasses, herbs, shrubs',
      desc: 'A magnificent wild goat with massive curved horns up to 130cm — the key prey species for snow leopards, commonly seen on sheer rock faces above Ladakhi valleys.',
      overview: 'The Himalayan Ibex is a subspecies of the Siberian ibex, perfectly at home on the most vertiginous terrain Ladakh offers. Males sport enormous backward-curving horns reaching 130cm, used in spectacular head-clashing battles during the autumn rut. Their sure-footed agility on near-vertical cliff faces is legendary. The ibex is a critical prey species for the snow leopard and golden eagle. Relatively abundant compared to other Ladakhi megafauna, the ibex nevertheless faces pressure from competition with domestic goats, trophy hunting proposals, and habitat disturbance from road construction. Best spotted in Markha Valley, Hemis NP, and the ridges above Leh.',
      highlights: ['Horns up to 130cm', 'Key snow leopard prey', 'Vertical cliff specialists', 'Autumn rutting head-clashes', 'Abundant in Hemis NP', 'Males weigh up to 130kg'],
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Tibetan Wolf',
      slug: 'tibetan-wolf',
      scientific: 'Canis lupus chanko',
      population: '~350 in Ladakh (2025 WII)',
      status: 'Endangered (Regional)',
      statusColor: '#ea580c',
      icon: 'bi-moon-fill',
      color: '#475264',
      habitat: 'Changthang steppe and wide valleys, 3,500–5,000m',
      diet: 'Marmots, pikas, domestic livestock, kiang foals',
      desc: 'The highly persecuted apex pack-hunter of the Ladakhi plains — suffering extreme retaliatory violence despite being critically vital to the steppe ecosystem balance.',
      overview: 'The Tibetan Wolf (locally known as "Shang") is a high-altitude lineage of the grey wolf with a distinctly pale, tawny-grey coat and longer legs for steppe running. Because the Changthang offers sparse wild prey, wolves inevitably target Pashmina goat herds, making them the most hated and heavily persecuted predator in Ladakh. Ancient "Shang-dong" stone wolf-trapping pits still stand in many remote areas. The NCF\'s "Shang-dong Conversion" project is dismantling these lethal traps and repurposing the stones to build Buddhist Stupas, formally bringing Buddhist ethics into wolf conservation.',
      highlights: ['Apex pack-predator of the plains', 'Distinct pale, tawny-grey coat', 'Highly persecuted by herders', 'Ancient "Shang-dong" stone traps', 'Packs of 3–8 individuals', 'Massive nightly hunting ranges (40+ km)'],
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800',
    },
  ];

  // ===== Birds =====
  birds: { name: string; slug: string; scientific: string; icon: string; color: string; status: string; statusColor: string; habitat: string; desc: string; image: string; }[] = [
    { name: 'Black-Necked Crane', slug: 'black-necked-crane', scientific: 'Grus nigricollis', icon: 'bi-feather2', color: '#1a365d', status: 'Near Threatened', statusColor: '#0284c7', habitat: 'Hanle, Chushul wetlands', desc: 'Iconic high-altitude crane breeding only in Ladakh within India. Revered in Buddhist culture as a symbol of longevity.', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
    { name: 'Golden Eagle', slug: 'golden-eagle', scientific: 'aquila chrysaetos', icon: 'bi-sun-fill', color: '#c8702a', status: 'Least Concern', statusColor: '#16a34a', habitat: 'Mountain ridges, open valleys', desc: 'Ladakh\'s largest raptor with a 2.3m wingspan. Hunts marmots, hares, and young ibex across high-altitude terrain.', image: 'https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&q=80&w=800' },
    { name: 'Lammergeier (Bearded Vulture)', slug: 'lammergeier', scientific: 'Gypaetus barbatus', icon: 'bi-wind', color: '#7b2d26', status: 'Near Threatened', statusColor: '#0284c7', habitat: 'Cliffs and gorges, 2,000â€“5,000m', desc: 'a spectacular vulture that drops bones from great heights to crack them open. Wingspan up to 2.8m. Known locally as "bone-breaker."', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
    { name: 'Himalayan Snowcock', slug: 'himalayan-snowcock', scientific: 'Tetraogallus himalayensis', icon: 'bi-snow2', color: '#7c3aed', status: 'Least Concern', statusColor: '#16a34a', habitat: 'alpine meadows, 3,600â€“5,300m', desc: 'a large, plump grouse-like bird found above the treeline. Its loud whistling call echoes across the high passes at dawn.', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800' },
    { name: 'Tibetan Sandgrouse', slug: 'tibetan-sandgrouse', scientific: 'Syrrhaptes tibetanus', icon: 'bi-compass', color: '#059669', status: 'Least Concern', statusColor: '#16a34a', habitat: 'Changthang steppe, 4,000â€“5,500m', desc: 'a perfectly camouflaged ground bird of the Changthang plateau. Males fly up to 30km daily to collect water in specialized belly feathers for chicks.', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800' },
    { name: 'Bar-headed Goose', slug: 'bar-headed-goose', scientific: 'anser indicus', icon: 'bi-arrow-up-right', color: '#0284c7', status: 'Least Concern', statusColor: '#16a34a', habitat: 'Tso Moriri, Tso Kar, Pangong wetlands', desc: 'Famous for migrating over Mt. Everest at 8,800m â€” the highest-flying bird in the world. Breeds at Ladakh\'s high-altitude lakes.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800' },
    { name: 'Brown-headed Gull', slug: 'brown-headed-gull', scientific: 'Chroicocephalus brunnicephalus', icon: 'bi-water', color: '#475264', status: 'Least Concern', statusColor: '#16a34a', habitat: 'Pangong Tso, Tso Kar, Tso Moriri', desc: 'Breeds at Ladakh\'s high-altitude lakes, creating floating nest colonies. One of the highest-altitude breeding gulls in the world.', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800' },
    { name: 'Robin accentor', slug: 'robin-accentor', scientific: 'Prunella rubeculoides', icon: 'bi-music-note', color: '#dc2626', status: 'Least Concern', statusColor: '#16a34a', habitat: 'Scrublands, 3,000â€“5,200m', desc: 'a small, robin-like bird common across Ladakh. Its sweet melodic song brightens the otherwise silent, barren landscape.', image: 'https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&q=80&w=800' },
  ];

  // ===== Flora & Vegetation =====
  flora = [
    { name: 'Blue Poppy (Meconopsis)', slug: 'blue-poppy', icon: 'bi-flower2', color: '#2e86c1', type: 'Wildflower', elevation: '3,800â€“5,000m', desc: 'The legendary Himalayan blue poppy â€” one of the most sought-after alpine flowers. Delicate sky-blue petals bloom briefly in July at high passes.' },
    { name: 'Edelweiss', slug: 'edelweiss', icon: 'bi-snow', color: '#7c3aed', type: 'alpine Flower', elevation: '3,500â€“5,200m', desc: 'The iconic white-woolly alpine flower found on rocky slopes. Its felt-like petals are an adaptation to UV radiation and extreme cold.' },
    { name: 'Sea Buckthorn', slug: 'sea-buckthorn', icon: 'bi-tree-fill', color: '#c8702a', type: 'Shrub / Superfruit', elevation: '2,500â€“4,500m', desc: 'The "wonder berry" of Ladakh â€” bright orange berries rich in Vitamin C, omega oils, and antioxidants. Used in juices, jams, and traditional medicine.' },
    { name: 'Wild Rose (Rosa webbiana)', slug: 'wild-rose', icon: 'bi-flower1', color: '#dc2626', type: 'Shrub', elevation: '3,000â€“4,200m', desc: 'Pink and white wild roses line Ladakh\'s streams and irrigation channels. Rose hip tea is a popular local remedy for colds and altitude sickness.' },
    { name: 'Juniper (Shukpa)', slug: 'juniper', icon: 'bi-tree', color: '#059669', type: 'Conifer Shrub', elevation: '3,200â€“4,800m', desc: 'Sacred juniper is burned as incense in every monastery and household. Its aromatic smoke is believed to purify spaces and ward off evil spirits.' },
    { name: 'Ephedra (Somlata)', slug: 'ephedra', icon: 'bi-capsule', color: '#7b2d26', type: 'Medicinal Plant', elevation: '3,000â€“5,000m', desc: 'an ancient medicinal plant used in traditional amchi medicine for respiratory ailments, altitude sickness, and fatigue. Source of the compound ephedrine.' },
    { name: 'Willow (Changma)', slug: 'willow', icon: 'bi-bezier2', color: '#1a365d', type: 'Tree', elevation: '2,800â€“4,000m', desc: 'The only significant tree in Ladakh\'s harsh landscape. Willows line irrigation channels, provide firewood, and their branches are used for making baskets.' },
    { name: 'Caragana (Burtse)', slug: 'caragana', icon: 'bi-fire', color: '#475264', type: 'Desert Shrub', elevation: '3,500â€“5,000m', desc: 'a thorny, nitrogen-fixing shrub that is the primary fuel source for Changpa nomads. Its roots stabilize the fragile desert soil against erosion.' },
  ];

  // ===== Lakes & Water Bodies =====
  lakes = [
    {
      name: 'Pangong Tso',
      slug: 'pangong-tso',
      elevation: '4,350m',
      length: '134 km',
      type: 'Endorheic (salt)',
      icon: 'bi-water',
      color: '#0284c7',
      gradient: 'linear-gradient(135deg, #0f2b46, #0284c7, #38bdf8)',
      desc: 'The crown jewel of Ladakh â€” a startling blue lake stretching 134km across the India-China border. Its colour shifts from azure to turquoise to deep blue throughout the day.',
      facts: ['70% in Tibet, 30% in India', 'Salinity: ~0.9% (brackish)', 'Freezes completely in winter', 'Breeding ground for bar-headed geese', 'No fish survive due to salinity', 'Highest motorable-access salt lake'],
      image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Tso Moriri',
      slug: 'tso-moriri',
      elevation: '4,522m',
      length: '28 km',
      type: 'Oligotrophic (freshwater)',
      icon: 'bi-droplet-fill',
      color: '#7c3aed',
      gradient: 'linear-gradient(135deg, #4a1942, #7c3aed, #a78bfa)',
      desc: 'a pristine freshwater lake in the Changthang â€” Ladakh\'s largest high-altitude lake entirely within India. Home to breeding bar-headed geese and the endangered black-necked crane.',
      facts: ['Ramsar Wetland site', 'Entirely within India', 'Depth: up to 40m', 'Surrounded by 6,000m peaks', 'Korzok village (highest settlement)', 'Community-managed conservation'],
      image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Tso Kar',
      slug: 'tso-kar',
      elevation: '4,530m',
      length: '8 km',
      type: 'Hypersaline (salt)',
      icon: 'bi-brightness-high',
      color: '#c8702a',
      gradient: 'linear-gradient(135deg, #7d5a29, #c8702a, #e59866)',
      desc: 'The "White Lake" â€” named for the thick salt crust that surrounds it. a critical wetland for migratory birds and one of Ladakh\'s most important Ramsar sites.',
      facts: ['Ramsar Wetland since 2020', 'White salt deposits on shores', 'Key black-necked crane habitat', 'Historical salt trade source', 'Surrounded by hot springs', 'Changpa nomad summer camp'],
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Zanskar River',
      slug: 'zanskar-river',
      elevation: '3,800 â€“ 3,000m',
      length: '230 km',
      type: 'Glacial river',
      icon: 'bi-tsunami',
      color: '#059669',
      gradient: 'linear-gradient(135deg, #0b3d2e, #059669, #34d399)',
      desc: 'Ladakh\'s most dramatic river â€” carving through deep gorges and freezing into the legendary "Chadar" ice road in winter, which remains the only route to Zanskar for centuries.',
      facts: ['Chadar frozen river trek', 'Feeds into Indus River', 'Gorge depths: 600m+', 'Rafting rapids: Grade III-IV', 'Traditional trade route', 'Threatened by Zanskar dam project'],
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800'
    },
  ];

  // ===== Species Distribution (for SVG chart) =====
  speciesData = [
    { category: 'Mammals', count: 73, color: '#c8702a', pct: 12 },
    { category: 'Birds', count: 320, color: '#0284c7', pct: 54 },
    { category: 'Reptiles', count: 18, color: '#059669', pct: 3 },
    { category: 'Fish', count: 12, color: '#7c3aed', pct: 2 },
    { category: 'Butterflies', count: 95, color: '#dc2626', pct: 16 },
    { category: 'Plants', count: 800, color: '#1a365d', pct: 13 },
  ];

  // ===== Elevation Zone Chart (species richness) =====
  elevationZones = [
    { zone: '2,500â€“3,500m', label: 'Valley Floor', species: 280, barHeight: 90, color: '#059669' },
    { zone: '3,500â€“4,000m', label: 'Lower alpine', species: 340, barHeight: 100, color: '#0284c7' },
    { zone: '4,000â€“4,500m', label: 'Upper alpine', species: 220, barHeight: 72, color: '#7c3aed' },
    { zone: '4,500â€“5,000m', label: 'Sub-Nival', species: 120, barHeight: 40, color: '#c8702a' },
    { zone: '5,000m+', label: 'Nival/Glacial', species: 35, barHeight: 12, color: '#7b2d26' },
  ];

  // ===== Monthly Temperature Data (for climate chart) =====
  climate = [
    { month: 'Jan', high: -3, low: -14, precip: 10 },
    { month: 'Feb', high: 1, low: -12, precip: 8 },
    { month: 'Mar', high: 7, low: -5, precip: 10 },
    { month: 'apr', high: 13, low: 0, precip: 9 },
    { month: 'May', high: 18, low: 4, precip: 6 },
    { month: 'Jun', high: 23, low: 8, precip: 5 },
    { month: 'Jul', high: 27, low: 12, precip: 15 },
    { month: 'aug', high: 26, low: 11, precip: 15 },
    { month: 'Sep', high: 22, low: 6, precip: 8 },
    { month: 'Oct', high: 15, low: -1, precip: 5 },
    { month: 'Nov', high: 8, low: -6, precip: 4 },
    { month: 'Dec', high: 1, low: -12, precip: 7 },
  ];

  // ===== Protected areas =====
  protectedAreas = [
    { name: 'Hemis National Park', slug: 'hemis-national-park', area: '4,400 kmÂ²', established: '1981', icon: 'bi-shield-check', color: '#059669', desc: 'India\'s largest national park â€” home to the world\'s highest density of snow leopards plus ibex, wolf, bear, and over 200 bird species.', status: 'National Park' },
    { name: 'Changthang Cold Desert Sanctuary', slug: 'changthang-sanctuary', area: '4,000 kmÂ²', established: '1987', icon: 'bi-compass-fill', color: '#c8702a', desc: 'Protects the Changthang plateau ecosystem â€” kiang herds, Tibetan gazelle, wolves, and critical wetlands for the black-necked crane.', status: 'Wildlife Sanctuary' },
    { name: 'Karakoram Wildlife Sanctuary', slug: 'karakoram-sanctuary', area: '5,000 kmÂ²', established: '1987', icon: 'bi-mountain', color: '#7c3aed', desc: 'Remote sanctuary in the Karakoram Range covering some of the world\'s highest terrain â€” snow leopard, Ladakh urial, and ibex.', status: 'Wildlife Sanctuary' },
    { name: 'Tso Moriri Wetland (Ramsar)', slug: 'tso-moriri-wetland', area: '120 kmÂ²', established: '2002', icon: 'bi-water', color: '#0284c7', desc: 'a Ramsar-designated wetland of international importance â€” breeding ground for bar-headed geese, brahminy ducks, and black-necked cranes.', status: 'Ramsar Site' },
  ];

  // ===== Conservation Threats =====
  threats = [
    { title: 'Climate Change', icon: 'bi-thermometer-sun', desc: 'Glaciers retreating at alarming rates. Ladakh\'s glaciers have lost 12% of their area since 2000. Rising temperatures are shifting vegetation zones and disrupting wildlife breeding cycles.' },
    { title: 'Human-Wildlife Conflict', icon: 'bi-exclamation-triangle', desc: 'Snow leopards and wolves kill livestock; bears raid crops. Retaliatory killing remains the single greatest direct threat to endangered carnivores in Ladakh.' },
    { title: 'Road Construction', icon: 'bi-signpost-split', desc: 'Strategic highway projects fragment critical habitats, disrupt wildlife corridors, and accelerate erosion. The Zojila tunnel and Nyoma airfield projects are major concerns.' },
    { title: 'Overgrazing', icon: 'bi-flower3', desc: 'Pashmina goat herds have exploded â€” from 60,000 to 200,000+ in decades â€” degrading fragile grasslands and competing with wild herbivores like kiang and ibex.' },
    { title: 'Tourism Pressure', icon: 'bi-camera', desc: 'Unregulated tourism at Pangong, Nubra, and Hanle generates waste, disturbs breeding grounds, and strains water resources in this water-scarce region.' },
    { title: 'Feral Dog Packs', icon: 'bi-exclamation-diamond', desc: 'Stray dogs near military camps and towns form hunting packs that prey on marmots, hares, young kiang, and even attack nesting cranes at wetlands.' },
  ];

  // ===== Wildlife Videos =====
  videos = [
    { title: 'Snow Leopard: Ghost of the Mountains', desc: 'Rare footage of a snow leopard hunting bharal across the cliffs of Hemis National Park.', duration: '22 min', type: 'Wildlife', gradient: 'linear-gradient(135deg, #4a1942, #7c3aed)', icon: 'bi-camera-reels', youtubeId: 'KRF7jWqSdPw' },
    { title: 'Secret Life of Pangong Tso', desc: 'Discover the extraordinary ecosystem of the world\'s highest salt lake â€” from bar-headed geese to microscopic life.', duration: '18 min', type: 'Nature', gradient: 'linear-gradient(135deg, #0f2b46, #0284c7)', icon: 'bi-film', youtubeId: 'zNFmzjxQGHk' },
    { title: 'Chadar: Walking on Frozen Rivers', desc: 'The legendary frozen Zanskar River trek â€” one of the world\'s most extreme winter journeys.', duration: '35 min', type: 'adventure', gradient: 'linear-gradient(135deg, #1a365d, #2b5797)', icon: 'bi-camera-reels', youtubeId: '5PEbw7r3mYE' },
    { title: 'Flowers of the Trans-Himalaya', desc: 'The stunning wildflower blooms that transform Ladakh\'s barren passes into carpets of colour each summer.', duration: '14 min', type: 'Botanical', gradient: 'linear-gradient(135deg, #0b3d2e, #059669)', icon: 'bi-film', youtubeId: 'QJuvqMfXLqs' },
  ];
}




