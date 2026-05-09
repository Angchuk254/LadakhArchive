import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LeafletMapComponent } from '../../shared/leaflet-map/leaflet-map';

interface LakePhoto { title: string; image: string; icon: string; location: string; desc: string; }
interface LakeFact { icon: string; label: string; value: string; }

interface LakeData {
  slug: string; name: string; elevation: string; length: string;
  type: string; icon: string; color: string; gradient: string;
  description: string; overview: string;
  historicalAccounts: string; myths: string; research: string;
  image: string; heroImage: string;
  highlights?: string[];
  photos: LakePhoto[];
  facts: LakeFact[];
  lat: number; lng: number;
  ecology: string; visitorInfo: string;
  threats: string[];
  relatedSlugs: string[];
}

@Component({
  selector: 'app-lake-detail',
  imports: [RouterLink, LeafletMapComponent],
  templateUrl: './lake-detail.html',
  styleUrl: './lake-detail.scss',
  host: { '(document:keydown.escape)': 'onEscape()' },
})
export class LakeDetail {
  private route = inject(ActivatedRoute);

  lightboxItem = signal<LakePhoto | null>(null);
  lake = signal<LakeData | null>(null);
  relatedLakes = computed(() => {
    const l = this.lake();
    if (!l) return [];
    return l.relatedSlugs.map(s => this.lakes.find(x => x.slug === s)).filter(Boolean) as LakeData[];
  });

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.lake.set(this.lakes.find(l => l.slug === slug) ?? null);
  }

  openLightbox(p: LakePhoto) { this.lightboxItem.set(p); document.body.style.overflow = 'hidden'; }
  closeLightbox() { this.lightboxItem.set(null); document.body.style.overflow = ''; }
  onEscape() { if (this.lightboxItem()) this.closeLightbox(); }

  lakes: LakeData[] = [
    {
      slug: 'pangong-tso',
      name: 'Pangong Tso',
      elevation: '4,350m',
      length: '134 km',
      type: 'Endorheic (salt)',
      icon: 'bi-water',
      color: '#0284c7',
      gradient: 'linear-gradient(135deg, #0f2b46, #0284c7, #38bdf8)',
      description: 'The crown jewel of Ladakh â€” a startling blue lake stretching 134km across the India-China border, deeply ingrained in geopolitical history and trans-Himalayan ecology.',
      lat: 33.7595, lng: 78.6674,
      overview: 'Pangong Tso is among the most mesmerizing natural wonders on Earth. Stretching 134 km across the India-Tibet border (with approximately 70% lying in Tibet), this endorheic lake sits at 4,350m in the Changthang region. Its waters are brackishâ€”too salty for fish but home to specialized micro-organisms that give the lake its legendary, dramatically shifting colors. Throughout a single day, the waters shift from midnight blue at dawn, to turquoise at midday, to fiery orange during sunset.',
      historicalAccounts: 'The strategic and physical enormity of Pangong Tso has captivated explorers for centuries. During his 1820-1825 expedition, William Moorcroft reached the shores of Pangong, noting the eerie deadness of its salty waters in contrast to the vibrant avian life above. Later, during the tragic Sino-Indian War of 1962, the lake became a major flashpoint, permanently splitting the serene waters into heavy military zonesâ€”a geopolitical fracture that defines the lake\'s modern reality and drastically restricts comprehensive, cross-border biological studies.',
      myths: 'ancient Ladakhi cosmology views the high-altitude lakes as sentient. a prominent myth holds that Pangong Tso is connected via vast, subterranean subterranean rivers to the ultra-sacred Lake Mansarovar in Tibet. It is said that certain revered monks, known as \'Lung-gom-pa\' (trance walkers), could navigate these underwater spiritual channels during deep meditation. Furthermore, locals historically believed that the lake\'s sudden shifts from blue to stark blood-red (likely caused by rare algal blooms) portended great wars.',
      research: 'Contemporary limnological research (2025â€“2026) at Pangong Tso has heavily focused on the unique copepod and cladoceran micro-crustaceans that thrive in its brackish waters. These organisms form the critical dietary foundation for migratory birds crossing the Central asian Flyway. Recent water-column analyses have also raised alarms regarding micro-plastic accumulation from surging tourism bases in Spangmik, leading to aggressive new proposals (slated for late 2026) to classify the Indian-administered sector as a highly restricted eco-sensitive zone.',
      ecology: 'Despite its salinity, Pangong supports a surprisingly active ecosystem. Microscopic crustaceans provide food for bar-headed geese, brahminy ducks, and brown-headed gulls that breed on its shores. The surrounding marshlands support breeding black-necked cranes. The lake serves as a critical stopover on the Central asian Flyway for migratory birds. Kiangs, foxes, and marmots inhabit the surrounding steppe.',
      visitorInfo: 'Pangong is accessible from Leh via a 5-6 hour drive (160km) over Chang La pass (5,360m). an Inner Line Permit is mandatory. accommodation is available in luxury and basic camps along the Spangmik to Lukung stretch. The best season is Juneâ€“September. The harsh winters feature a complete freeze, allowing unique ice-walking, but survival logistics are extreme.',
      highlights: ['134 km long salt lake', '70% located in Tibet', 'Changes color from blue to red', 'Highest motorable salt lake'],
      threats: ['Geopolitical military infrastructure along the LaC', 'Micro-plastic pollution from unregulated mass tourism', 'Fossil fuel spills from boats and off-road vehicles', 'Warming-induced shifts in the micro-crustacean populations'],
      photos: [
        { title: 'azure Dawn', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-sunrise', location: 'Spangmik', desc: 'First light on Pangong â€” the waters shift from midnight blue to startling azure.' },
        { title: 'Turquoise Noon', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-brightness-high', location: 'Lukung', desc: 'The iconic midday turquoise that has made Pangong one of the world\'s most photographed lakes.' },
        { title: 'Emerald Green Bend', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-water', location: 'Man-Merak', desc: 'The lake takes on an emerald green hue where shallow waters meet the rocky shoreline.' },
        { title: 'Frozen Winter', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow2', location: 'Pangong Tso', desc: 'The entire 134km lake frozen solid in January â€” a vast ice sheet at 4,350m.' },
        { title: 'Sunset Fire', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', icon: 'bi-sunset', location: 'Spangmik', desc: 'Fiery oranges and reds dance across the lake surface during a Pangong sunset.' },
      ],
      image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-rulers', label: 'Length', value: '134 km' },
        { icon: 'bi-arrows-fullscreen', label: 'Width', value: '5 km (max)' },
        { icon: 'bi-arrow-up', label: 'Elevation', value: '4,350 m' },
        { icon: 'bi-droplet', label: 'Salinity', value: '~0.9% (brackish)' },
        { icon: 'bi-globe', label: 'In India', value: '30% (40 km)' },
        { icon: 'bi-snow2', label: 'Freezes', value: 'Completely in winter' },
      ],
      relatedSlugs: ['tso-moriri', 'tso-kar', 'zanskar-river'],
    },
    {
      slug: 'tso-moriri',
      name: 'Tso Moriri',
      elevation: '4,522m',
      length: '28 km',
      type: 'Oligotrophic (freshwater)',
      icon: 'bi-droplet-fill',
      color: '#7c3aed',
      gradient: 'linear-gradient(135deg, #4a1942, #7c3aed, #a78bfa)',
      description: 'a deeply studied Ramsar Wetland, Tso Moriri is the largest high-altitude freshwater lake entirely within India, acting as a crucial sanctuary for trans-Himalayan biodiversity.',
      lat: 32.9333, lng: 78.3167,
      overview: 'Tso Moriri is often hailed as the most beautiful lake in Ladakhâ€”pristine, utterly remote, and critically important to global avian conservation. Sitting at 4,522m, it is surrounded by a towering amphitheater of 6,000-meter peaks. Designated a Ramsar Wetland, its oligotrophic (low nutrient, incredibly clear) waters plummet to depths of 40 meters. Unlike Pangong, Tso Moriri falls entirely within Indian sovereign territory.',
      historicalAccounts: 'In 1847, the British boundary commission, mapping the volatile borders of the Dogra and Tibetan empires, stood on the shores of Tso Moriri in sheer disbelief at its vastness. Early surveyors, attempting to calculate evaporation rates in the hyper-arid climate, noted the absolute reliance of the local Changpa nomads on the delicate ring of grazing land surrounding the water. Century-old accounts frequently cite the deafening clamor of breeding waterfowl that shattered the intense silence of the Changthang.',
      myths: 'The lake\'s origin myth is rooted in the tragedy of the nomadic people. \'Chomo-riri\' holds the legend of Chomo, a young female yak herder. The story warns that she was riding her most prized yak across the fragile winter ice when it shattered. as she drowned, her tears of despair combined with the rising waters to form the massive lake. It remains a potent cautionary tale discouraging crossing the deep center ice, preventing countless winter drownings over the centuries.',
      research: 'Tso Moriri is a prime site for 2026 paleoclimatology. Deep-strata core sampling extracted from the lake bed has recently yielded an uninterrupted 10,000-year timeline of Holocene climate shifts across High asia. Biologically, extensive genomic studies (published in late 2025) on the breeding Bar-headed geese here have uncovered unprecedented genetic markers explaining their ability to rapidly synthesize oxygen while migrating directly over Mount Everest. Conservationists use this data to aggressively lobby against new military road projects near the nesting areas.',
      ecology: 'Its freshwater supports aquatic plants and invertebrates that sustain massive breeding populations of bar-headed geese, brahminy ducks, and ruddy shelducks. The surrounding marshlands are one of the few breeding sites for the black-necked crane in India. The lake and its shores support over 50 bird species. Kiangs, Tibetan wolves, and foxes inhabit the surrounding steppe.',
      visitorInfo: 'Tso Moriri is 240km from Leh (7-8 hours via Chumur or Mahe). an Inner Line Permit is absolutely required. Basic guesthouses exist in Korzok, the ancient village perched on the lake ridge. Juneâ€“September offers the optimal window for specialized birding photography.',
      highlights: ['Ramsar Wetland Site', 'Deepest freshwater lake in Ladakh (40m)', 'Primary breeding ground for Bar-headed Geese'],
      threats: ['Feral dog pack predation on ground-nesting cranes', 'accelerated glacial retreat depleting tributary streams', 'Uncontrolled waste disposal from Korzok village altering lake nutrients', 'Tour vehicle off-roading crushing sensitive marshlands'],
      photos: [
        { title: 'Mountain Mirror', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-droplet-fill', location: 'Korzok', desc: 'Tso Moriri as a perfect mirror reflecting the surrounding 6,000m peaks at dawn.' },
        { title: 'Korzok Monastery', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-building', location: 'Korzok', desc: 'The ancient monastery overlooking the lake â€” one of the highest in the world.' },
        { title: 'Bar-headed Geese', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-feather', location: 'Western Shore', desc: 'Hundreds of bar-headed geese on the lake â€” breeding before their incredible Himalayan crossing.' },
        { title: 'Sunset Over Lake', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', icon: 'bi-sunset', location: 'Southern Shore', desc: 'alpenglow turning the surrounding peaks gold as the lake shifts to deep violet.' },
        { title: 'Changpa Camp', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-house', location: 'Near Korzok', desc: 'Black yak-hair Changpa nomad tents with Tso Moriri as a backdrop â€” timeless Ladakh.' },
      ],
      image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-rulers', label: 'Length', value: '28 km' },
        { icon: 'bi-arrows-fullscreen', label: 'Width', value: '3â€“5 km' },
        { icon: 'bi-arrow-up', label: 'Elevation', value: '4,522 m' },
        { icon: 'bi-arrow-down', label: 'Max Depth', value: '40 metres' },
        { icon: 'bi-droplet', label: 'Water Type', value: 'Freshwater' },
        { icon: 'bi-shield-check', label: 'Status', value: 'Ramsar Wetland Site' },
      ],
      relatedSlugs: ['pangong-tso', 'tso-kar', 'zanskar-river'],
    },
    {
      slug: 'tso-kar',
      name: 'Tso Kar',
      elevation: '4,530m',
      length: '8 km',
      type: 'Hypersaline (salt)',
      icon: 'bi-brightness-high',
      color: '#c8702a',
      gradient: 'linear-gradient(135deg, #7d5a29, #c8702a, #e59866)',
      description: 'The "White Lake" â€” famed for the thick salt crust expanding upon its shores, serving as the historical epicenter of the trans-Himalayan salt trade and a haven for rare extremophiles.',
      lat: 33.3000, lng: 78.0000,
      overview: 'Tso Kar, widely known as the "White Lake," derives its name from the brilliant, blinding deposits of white salt (sodium chloride and borax) that encrust its shoreline. The basin actually contains a dual-lake system: the hypersaline Tso Kar itself, and the adjacent freshwater Startsapuk Tso. This stark contrast in water chemistry within the same enclosed basin creates an unbelievably diverse micro-habitat at 4,530m altitude.',
      historicalAccounts: 'For centuries, Tso Kar was the absolute heart of the Ladakhi economy. British trade intelligence reports from the 1850s detailed massive Changpa caravans mining the borax and salt here, transporting it on sheep and goats down into the Kashmir valley and across to Tibet. This brutal "Salt Route" sustained the vast monastic architectures of Leh and Thiksey. When cheap, sea-harvested iodine salt reached Ladakh via modern roads in the 1970s, the Tso Kar salt trade collapsed entirely, ending a multi-century way of life.',
      myths: 'The blinding white salt flats gave rise to legends of the "White Devils" (Lu Karpo) of the basin. Nomadic laborers mining the salt under the punishing high-altitude sun would often suffer profound snow-blindness and dehydration-induced hallucinations, attributing geometric mirages shimmering on the plains to mischievous salt spirits attempting to steal away their livestock. Offerings of butter and juniper were mandatory before chipping the crust.',
      research: 'Declared a Ramsar Wetland of International Importance in 2020, Tso Kar is an active laboratory for extremophile biology. Microbiologists in 2026 successfully sequenced several novel archaea species thriving in the lake\'s extreme hypersaline and alkaline conditionsâ€”microbes that possess unique UV-radiation repair mechanisms. additionally, ornithologists continue vital tracking of the Black-necked Crane pairs that utilize the adjacent freshwater Startsapuk Tso for breeding, noting alarming habitat compression due to changing rain patterns.',
      ecology: 'The hypersaline main lake plus freshwater Startsapuk Tso creates crucial ecological niches. The freshwater marshes support breeding black-necked cranes, bar-headed geese, and brahminy ducks. The salt flats attract specialized ground-nesting species. Brine shrimp in the saline water provide food for wading birds. The surrounding steppe supports kiangs, Tibetan wolves, and foxes.',
      visitorInfo: 'Located 160km from Leh (5-6 hour drive via the Leh-Manali Highway before diverting). The road is largely paved but the final stretch requires high clearance. Visitors must stay on strictly marked pathsto prevent irreparable damage to the fragile millennia-old salt crusts. Birdwatching is preeminent from May to august.',
      highlights: ['Blinding white salt flats', 'Dual freshwater/saltwater ecosystem', 'Extremophile archaea studies', 'Historic Changpa Salt Trade epicenter'],
      threats: ['Vehicle off-roading destroying ancient salt crusts forming the ecosystem base', 'Tourism waste contamination accumulating at Thukje camp sites', 'Feral dog packs hunting low-altitude nesting species', 'Changes in hydro-geology starving the freshwater feeder lake'],
      photos: [
        { title: 'White Salt Shores', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-brightness-high', location: 'Tso Kar', desc: 'Thick white salt deposits encrusting the shoreline â€” creating a surreal lunar landscape.' },
        { title: 'Dual Lake System', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-water', location: 'aerial View', desc: 'The hypersaline Tso Kar and freshwater Startsapuk Tso â€” twin lakes of contrasting chemistry.' },
        { title: 'Black-necked Cranes', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-feather', location: 'Marshlands', desc: 'a breeding pair of black-necked cranes in the freshwater marshes â€” Tso Kar\'s most precious inhabitants.' },
        { title: 'Hot Springs', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-thermometer-sun', location: 'Southern Shore', desc: 'Steaming hot springs near the lake â€” geothermal activity adds warmth to this frozen landscape.' },
        { title: 'Changpa Salt Collection', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-basket3', location: 'Tso Kar Flats', desc: 'Traditional salt collection on the flats â€” a practice that sustained trade routes for centuries.' },
      ],
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-rulers', label: 'Length', value: '8 km' },
        { icon: 'bi-arrow-up', label: 'Elevation', value: '4,530 m' },
        { icon: 'bi-droplet', label: 'Salinity', value: 'Hypersaline' },
        { icon: 'bi-shield-check', label: 'Ramsar Status', value: 'Since 2020' },
        { icon: 'bi-thermometer-sun', label: 'Hot Springs', value: 'Multiple active' },
        { icon: 'bi-clock-history', label: 'Salt Trade', value: 'Defunct (1970s)' },
      ],
      relatedSlugs: ['pangong-tso', 'tso-moriri', 'zanskar-river'],
    },
    {
      slug: 'zanskar-river',
      name: 'Zanskar River',
      elevation: '3,800 â€“ 3,000m',
      length: '230 km',
      type: 'Glacial river',
      icon: 'bi-tsunami',
      color: '#059669',
      gradient: 'linear-gradient(135deg, #0b3d2e, #059669, #34d399)',
      description: 'Ladakh\'s most dramatic riverâ€”carving through 600m deep gorges and freezing into the legendary Chadar winter highway, currently threatened by shifting climate realities.',
      lat: 33.7222, lng: 76.8402,
      overview: 'The Zanskar River is not a lake, but it is unequivocally Ladakh\'s most crucial internal waterway. Over 230km long, it violently carves its way through the Zanskar Range, creating sheer vertical cliff gorges over 600 meters deep before merging into the mighty Indus River near Nimu. In the summer, it presents a thundering, turquoise torrent that offers world-renowned Grade IV whitewater rafting.',
      historicalAccounts: 'The Zanskar River gorge was historically considered virtually impassable during summer months. Pioneer mapping by alexander Csoma de KÅ‘rÃ¶s, the brilliant Hungarian philologist who spent years in Zanskar compiling the first Tibetan-English dictionary in the 1820s, highlighted how the freezing of the river (the Chadar) in winter was the solitary lifeline connecting the remote Zanskar kingdom to the markets of Leh. 19th-century British records often marveled at the Zanskari porters hauling vast loads of butter and copper across treacherous, paper-thin ice over a roaring, lethal undercurrent.',
      myths: 'The Chadar (ice blanket) is steeped in visceral, terrifying lore. The "Roar of the Chadar" is said to be the river demon attempting to crack the ice beneath travelers who lack pure intentions. Specifically, the perilous Nerak gorgeâ€”where a colossal frozen waterfall hangs over the trailâ€”is believed to be guarded by protective deities. Local guides traditionally execute complex incense rituals at cave entrances before sleeping, appealing to these deities to hold the ice firm for one more night.',
      research: 'The Zanskar river is currently Ground Zero for high-altitude climate impact studies. Hydrological surveys (2025â€“2026) have definitively recorded significant delays in the river\'s deep-winter freezing cycle, with the ice becoming dangerously thinner and fundamentally unpredictable compared to data from the 1990s. Furthermore, extensive environmental impact assessments are actively debating the catastrophic potential of proposed large-scale hydroelectric dam projects, which independent ecologists argue would drown the historic gorge, destroy the breeding grounds of native snow trout, and permanently erase the Chadar trekking route.',
      ecology: 'The gorge supports a highly specific riparian corridor. Snow leopards use the craggy overhangs to ambush blue sheep, while Tibetan wolves actually utilize the frozen Chadar as a winter hunting superhighway. The river hosts specialized cold-water species like the Tibetan Snow Trout and Loach. The sheer cliff faces are critical nesting sites for massive birds of prey, notably the Lammergeier.',
      visitorInfo: 'Summer allows for intense, multi-day rafting expeditions (June-September). The famed Chadar Trek occurs strictly in January-February. However, due to recent climate instability, authorities frequently close the route mid-season. Elite physical fitness and highly experienced local Zanskari guides are non-negotiable for attempting the winter crossing.',
      highlights: ['Grade III-IV Whitewater Rafting', 'Legendary Chadar Winter Trek', '600m Deep Vertical Gorges', 'Crucial Trans-Himalayan River System'],
      threats: ['Climate change permanently preventing safe ice (Chadar) formation', 'Massive ecological disruption from proposed Zanskar hydroelectric dams', 'Lethal pollution and solid waste from over-commercialized trekking troops', 'Destruction of the ancient trade culture by rapid road tunnel completion'],
      photos: [
        { title: 'Chadar Frozen River', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow2', location: 'Zanskar Gorge', desc: 'The legendary Chadar â€” a frozen river highway that has been Zanskar\'s winter lifeline for centuries.' },
        { title: 'Deep Gorge', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-arrow-down', location: 'Near Nimu', desc: 'The Zanskar River carving through gorges over 600 metres deep â€” sheer vertical walls of rock.' },
        { title: 'Summer Rapids', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-tsunami', location: 'Zangla Section', desc: 'Thundering turquoise whitewater in summer â€” Grade III-IV rapids drawing rafters worldwide.' },
        { title: 'Cave Camp on Chadar', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-fire', location: 'Riverside Cave', desc: 'Trekkers camping in a riverside cave during the Chadar trek â€” temperatures drop to -30ÂaC.' },
        { title: 'Indus Confluence', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-signpost-split', location: 'Nimu', desc: 'The Zanskar meeting the Indus â€” two rivers of contrasting colours merging dramatically.' },
      ],
      image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-rulers', label: 'Length', value: '230 km' },
        { icon: 'bi-arrow-down', label: 'Gorge Depth', value: '600+ metres' },
        { icon: 'bi-arrow-up', label: 'Elevation Drop', value: '3,800 â†’ 3,000m' },
        { icon: 'bi-snow2', label: 'Chadar Season', value: 'Januaryâ€“February' },
        { icon: 'bi-speedometer', label: 'Rapids Grade', value: 'IIIâ€“IV' },
        { icon: 'bi-thermometer-snow', label: 'Winter Temp', value: '-30ÂaC' },
      ],
      relatedSlugs: ['pangong-tso', 'tso-moriri', 'tso-kar'],
    },
  ];
}




