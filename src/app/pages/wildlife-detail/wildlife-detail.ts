import { Component, inject, signal, computed } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LeafletMapComponent } from '../../shared/leaflet-map/leaflet-map';

interface WildlifePhoto { title: string; image: string; icon: string; location: string; desc: string; }
interface WildlifeFact { icon: string; label: string; value: string; }

interface WildlifeData {
  slug: string; name: string; scientific: string; population: string;
  status: string; statusColor: string; icon: string; color: string;
  habitat: string; diet: string; description: string; overview: string;
  highlights: string[];
  photos: WildlifePhoto[];
  facts: WildlifeFact[];
  behavior: string; conservation: string;
  threats: string[];
  relatedSlugs: string[];
  taxonomy: { kingdom: string; phylum: string; class: string; order: string; family: string; genus: string; species: string };
  lat: number; lng: number; zoom?: number;
  didYouKnow: string[];
  sightingGuide: { bestSeason: string; bestMonths: string; locations: string[]; difficulty: string; tip: string };
  videoId?: string;
  image: string;
  heroImage: string;
}

@Component({
  selector: 'app-wildlife-detail',
  imports: [RouterLink, LeafletMapComponent],
  templateUrl: './wildlife-detail.html',
  styleUrl: './wildlife-detail.scss',
  host: { '(document:keydown.escape)': 'onEscape()' },
})
export class WildlifeDetail {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  activeTab = signal<string>('overview');
  lightboxItem = signal<WildlifePhoto | null>(null);
  animal = signal<WildlifeData | null>(null);
  videoUrl = computed<SafeResourceUrl | null>(() => {
    const a = this.animal();
    if (!a?.videoId) return null;
    if (!/^[a-zA-Z0-9_-]{10,12}$/.test(a.videoId)) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube-nocookie.com/embed/' + a.videoId + '?rel=0&modestbranding=1'
    );
  });
  relatedAnimals = computed(() => {
    const a = this.animal();
    if (!a) return [];
    return a.relatedSlugs.map(s => this.animals.find(x => x.slug === s)).filter(Boolean) as WildlifeData[];
  });

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    const found = this.animals.find(a => a.slug === slug) ?? null;
    this.animal.set(found);
    if (found) {
      const meta = inject(Meta);
      const titleSvc = inject(Title);
      const title = `${found.name} (${found.scientific}) — Ladakh Wildlife | The Ladakh Archive`;
      const description = `${found.description} Population: ${found.population}. Conservation status: ${found.status}. Habitat: ${found.habitat}. Best time to spot: ${found.sightingGuide.bestMonths}.`;
      titleSvc.setTitle(title);
      meta.updateTag({ name: 'description', content: description.slice(0, 300) });
      meta.updateTag({ name: 'keywords', content: `${found.name}, ${found.scientific}, Ladakh wildlife, ${found.status} species, Hemis National Park, Ladakh animals, ${found.habitat}` });
      meta.updateTag({ property: 'og:title', content: title });
      meta.updateTag({ property: 'og:description', content: description.slice(0, 200) });
      meta.updateTag({ property: 'og:url', content: `https://theladakh.org/nature/wildlife/${found.slug}` });
      meta.updateTag({ name: 'twitter:title', content: title });
      meta.updateTag({ name: 'twitter:description', content: description.slice(0, 200) });
    }
  }

  openLightbox(p: WildlifePhoto) { this.lightboxItem.set(p); document.body.style.overflow = 'hidden'; }
  closeLightbox() { this.lightboxItem.set(null); document.body.style.overflow = ''; }
  setTab(tab: string) { this.activeTab.set(tab); }
  onEscape() { if (this.lightboxItem()) this.closeLightbox(); }

  animals: WildlifeData[] = [
    {
      slug: 'snow-leopard',
      name: 'Snow Leopard',
      scientific: 'Panthera uncia',
      population: '~477 in Ladakh (2024 SPaI Census)',
      status: 'Vulnerable',
      statusColor: '#eab308',
      icon: 'bi-binoculars-fill',
      color: '#7c3aed',
      habitat: 'Rocky mountains, 3,500â€“5,500m',
      diet: 'Blue sheep (bharal), ibex, marmots',
      description: 'The Ghost of the Mountains â€” Ladakh is the global stronghold for this elusive big cat, deeply entrenched in both cutting-edge science and ancient Himalayan mythology.',
      lat: 33.8583, lng: 77.3000, zoom: 8,
      overview: 'The Snow Leopard is the undisputed apex predator of the Trans-Himalaya. Known locally as "Shan", it is perfectly adapted to sub-zero temperatures with extra-large nasal cavities to warm the freezing air, dense fur up to 12cm thick on its belly, and a meter-long tail used as a blanket during sleep.\n\nHistorically, the snow leopard was both feared as a livestock-killer and revered. 19th-century British naturalists dismissed local accounts of the "white ghost cat" as mountain delirium until skins began appearing in Kashmir\'s bazaars in the 1890s. In traditional Ladakhi lore, particularly in Zanskar, the Shan is sometimes viewed as the physical manifestation of protective mountain deities punishing herders who graze their flocks too high into sacred territories.\n\nToday, Ladakh is ground-zero for global snow leopard conservation. The 2024 Snow Leopard Population assessment in India (SPaI) officially estimated the Ladakhi population at 477 individuals, representing over 65% of India\'s entire population, cementing Hemis National Park as the highest density habitat on Earth.',
      highlights: ['477 individuals globally (2024 census)', 'Hemis National Park hotspot', 'World\'s highest big cat density', 'Community conservation model', '"Ghost cat" winter treks', 'Camera trap & Scat DNa monitoring', 'Prey: bharal & ibex'],
      behavior: 'Snow leopards are highly solitary and crepuscular. They patrol vast, overlapping home ranges of 12â€“40 sq km, demarcating territory via scrape marks, scat, and scent-spraying on prominent cliff overhangs. Unlike other large Cats (Panthera), they cannot roar due to the absence of a fully ossified hyoid bone; instead, they communicate via non-aggressive "chuffing", hissing, and high-pitched yowls during the brief mating season. Their phenomenal musculature allows for vertical leaps exceeding 15 meters down sheer cliff faces when ambushing Blue Sheep.',
      conservation: 'Conservation science in Ladakh is deeply sophisticated. The Wildlife Institute of India (WII) and the Snow Leopard Conservancy India Trust utilize spatial capture-recapture (SCR) models based on thousands of heat-triggered remote camera traps. Recently (2025â€“2026), non-invasive genetic sampling via scat collection has allowed biologists to build family trees and track genetic diversity across fragmented valleys. On the ground, the implementation of predator-proof corrals ("wire-mesh roofing") has reduced retaliatory killings by herders by an astonishing 95% over the last decade. The shift from hunting to hosting "snow leopard ecotourism" brings over â‚¹2 crore annually to remote villages.',
      threats: ['Climate change forcing tree-lines higher, reducing alpine habitat', 'Feral dog packs competing for prey and transmitting diseases (CDV)', 'Unregulated winter tourism severely stressing pregnant females', 'Fragmented corridors due to heavy border military infrastructure'],
      photos: [
        { title: 'The Ghost', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800', icon: 'bi-binoculars-fill', location: 'Hemis National Park', desc: 'a snow leopard surveying its territory from a rocky ridge above the Rumbak Valley.' },
        { title: 'Winter Hunt', image: 'https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow2', location: 'Ulley Valley', desc: 'Perfectly camouflaged against snow-covered rocks during a winter hunt for bharal.' },
        { title: 'Mountain King', image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&q=80&w=800', icon: 'bi-star-fill', location: 'Rumbak Valley', desc: 'a rare sighting of a female snow leopard with her young cub in spring.' },
        { title: 'Stealth Presence', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera-fill', location: 'Hemis NP, 4,800m', desc: 'Night-time camera trap photo showing the distinctive rosette pattern on thick grey fur.' },
        { title: 'agile Descent', image: 'https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&q=80&w=800', icon: 'bi-chevron-double-down', location: 'Markha Valley', desc: 'Incredible agility on near-vertical rock faces â€” snow leopards can descend cliffs no other big cat would attempt.' },
      ],
      facts: [
        { icon: 'bi-rulers', label: 'Body Length', value: '100â€“130 cm (+ 100cm tail)' },
        { icon: 'bi-speedometer2', label: 'Weight', value: '27â€“54 kg' },
        { icon: 'bi-map', label: 'Home Range', value: '20â€“40 sq km' },
        { icon: 'bi-thermometer-snow', label: 'Elevation', value: '3,000â€“5,400m' },
        { icon: 'bi-heart-pulse', label: 'Lifespan', value: '15â€“18 years (wild)' },
        { icon: 'bi-people', label: 'Ladakh Population', value: '~477 (2024)' },
      ],
      relatedSlugs: ['himalayan-ibex', 'tibetan-wolf', 'himalayan-brown-bear'],
      taxonomy: { kingdom: 'animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Felidae', genus: 'Panthera', species: 'P. uncia' },
      didYouKnow: [
        'Despite being grouped in the Panthera genus with lions and tigers, Snow leopards cannot roar due to their throat anatomy.',
        'Extensive 2024 geospatial mapping proved that Ladakh\'s Hemis National Park holds the highest density of snow leopards anywhere on Earth.',
        'During treacherous descents, their 1-meter long tail acts as an aerodynamic rudder, allowing mid-air direction changes.',
        'ancient Ladakhi folklore describes the Snow Leopard as a shape-shifting guardian deity of the high mountain passes.',
      ],
      sightingGuide: { bestSeason: 'Deep Winter', bestMonths: 'January â€“ March', locations: ['Hemis National Park (Rumbak)', 'Ulley Valley', 'Sham Valley'], difficulty: 'Challenging & Extreme Cold', tip: 'Winter pushes their primary prey (Blue Sheep) into lower valleys, bringing the cats with them. Local spotters in Rumbak use high-powered spotting scopes for an astonishing 70% success rate during February expeditions.' },
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&q=80&w=1600'
    },
    {
      slug: 'black-necked-crane',
      name: 'Black-Necked Crane',
      scientific: 'Grus nigricollis',
      population: '~120-130 breeding pairs (2025 data)',
      status: 'Near Threatened',
      statusColor: '#0284c7',
      icon: 'bi-feather2',
      color: '#1a365d',
      habitat: 'Changthang wetlands, 4,200m+',
      diet: 'Roots, tubers, insects, small fish',
      description: 'a deeply sacred bird in Himalayan Buddhism and the state bird of Ladakh, utilizing the extreme high-altitude wetlands as its exclusive Indian breeding ground.',
      lat: 32.7766, lng: 78.9818, zoom: 10,
      overview: 'Towering at 139cm, the Black-Necked Crane (known locally as "Cha-Thung-Thung") is the only alpine crane species in the world, breeding exclusively at altitudes exceeding 4,000 meters. First scientifically documented relatively late in 1876 by the Russian naturalist Nikolay Przhevalsky, these elegant birds are defined by their pale ashy-grey bodies, stark black necks, and a vivid red skin patch atop their heads.\n\nIn spiritual terms, Ladakhi Buddhists revere them as incarnations of past lamas. Folklore dictates that the birds circumambulate the revered monasteries of Changthang three times upon arrival in spring and departure in autumn. Harming a crane is considered a severe karmic offense.\n\nThe high-altitude bogs of Hanle, Chushul, and Tso Kar in the vast Changthang plateau represent the sole breeding grounds for this species within India. They arrive from their wintering grounds in Bhutan and southern Tibet exactly as the lake ice begins to fracture in april.',
      highlights: ['State Bird of Ladakh', 'Sacred Buddhist symbol', 'Only alpine crane species', 'Exclusive Indian breeding site', 'Intricate courtship dances', 'Migratory (winters in Bhutan/SE Tibet)'],
      behavior: 'Black-necked cranes are strictly monogamous. Their arrival in Ladakh triggers their famous courtship displayâ€”a mesmerizing, synchronized dance encompassing deep bows, massive leaps with outspread wings, and the tossing of marsh grass into the air, all accompanied by a loud, bugling call that resonates for miles across the silent plateau. They construct flat, mound-like nests constructed from mud and sedge directly in the shallow wetlands to deter ground predators. Both parents fiercely defend the typical clutch of two eggs against foxes and ravens.',
      conservation: 'The Wildlife Institute of India (WII) and WWF have prioritized the crane as an umbrella species for wetland health. 2025/2026 satellite telemetry (GPS tagging) studies have precisely mapped their trans-Himalayan flyways, definitively proving they navigate over mountain passes exceeding 6,500m. a highly successful community conservation project pays Changpa nomads to physically guard nests from feral dog packs, resulting in a 40% increase in fledgling survival rates over the last five years. "Wetland wardens" are recruited directly from local villages to manage the water flow of ancient irrigation channels to sustain the bog environments.',
      threats: ['Explosion of feral dog populations near military camps preying on chicks', 'Climate change rapidly accelerating the drying of the high-altitude breeding bogs', 'Electrocution from new high-tension power lines extending to remote border outposts', 'Unregulated off-road tourism crushing fragile nesting environments'],
      photos: [
        { title: 'Morning Dance', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-feather2', location: 'Hanle Wetland', desc: 'a breeding pair performing their legendary synchronized courtship dance at dawn.' },
        { title: 'Hanle Marshes', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-water', location: 'Chushul', desc: 'Cranes probing the shallow marsh for tubers and invertebrates in the golden morning light.' },
        { title: 'Flight Patterns', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-arrow-up-right', location: 'Changthang', desc: 'Majestic wingspan revealed as a crane takes flight across the vast Changthang wetland.' },
        { title: 'Safe Nesting', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-egg', location: 'Hanle Marshland', desc: 'a shallow nest with two olive-brown eggs carefully guarded by the pair.' },
        { title: 'alpine crossing', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow2', location: 'Over Himalayan pass', desc: 'Cranes flying in V-formation as they cross a frozen pass heading south to Yunnan.' },
      ],
      facts: [
        { icon: 'bi-rulers', label: 'Height', value: '139â€“145 cm' },
        { icon: 'bi-arrows-fullscreen', label: 'Wingspan', value: '235 cm' },
        { icon: 'bi-speedometer2', label: 'Weight', value: '5.5â€“7 kg' },
        { icon: 'bi-geo-alt', label: 'Breeding altitude', value: '4,200â€“5,000m' },
        { icon: 'bi-heart-pulse', label: 'Lifespan', value: '25â€“30 years' },
        { icon: 'bi-people', label: 'India Population', value: '~130 breeding pairs' },
      ],
      relatedSlugs: ['tibetan-wild-ass', 'himalayan-ibex', 'snow-leopard'],
      taxonomy: { kingdom: 'animalia', phylum: 'Chordata', class: 'aves', order: 'Gruiformes', family: 'Gruidae', genus: 'Grus', species: 'G. nigricollis' },
      didYouKnow: [
        'Black-necked cranes are deeply sacred in Ladakhi Buddhist culture; older nomads believe the birds house the souls of deceased high lamas.',
        'They are the only species of crane in the world that breeds exclusively above 4,000 meters.',
        '2026 GPS tracking revealed they routinely fly over Himalayan peaks higher than 6,500m during their autumn migration.',
        'They construct shallow mud-nests in the middle of freezing wetlands as a moated defense against wolves and foxes.',
      ],
      sightingGuide: { bestSeason: 'Summer Breeding Season', bestMonths: 'May â€“ august', locations: ['Hanle Wetland Reserve', 'Chushul Marshes', 'Tso Kar Basin'], difficulty: 'Moderate', tip: 'approach slowly and remain strictly in vehicles or at long distances using telephoto lenses (600mm+). Startling a brooding bird off its nest leaves the eggs instantly vulnerable to freezing winds and ravens.' },
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1600'
    },
    {
      slug: 'tibetan-wild-ass',
      name: 'Tibetan Wild ass (Kiang)',
      scientific: 'Equus kiang',
      population: '~2,500+ (2025 WII Estimates)',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-speedometer2',
      color: '#c8702a',
      habitat: 'Changthang plateau steppe, 4,000â€“5,200m',
      diet: 'Hard sedges, Stipa grasses, alpine herbs',
      description: 'The largest wild ass species on Earth, possessing extraordinary altitude adaptations, galloping in massive herds across the high-altitude deserts of eastern Ladakh.',
      lat: 33.2000, lng: 78.8500, zoom: 8,
      overview: 'The Kiang is the undisputed galloping monarch of the Changthang. as the largest wild ass species in the world, stallions stand a dominant 142cm at the shoulder. Visually striking, they contrast a rich chestnut-red upper coat against a stark white belly and legs, topped with an upright dark mane.\n\nEarly 19th-century British explorers originally misidentified them as wild horses (Equus ferus) due to their impressive stature and untamable aggression. Historically, the Kiang held a contentious relationship with the Changpa nomads, frequently competing with vast herds of Pashmina goats for the incredibly sparse vegetation of the plateau.\n\nToday, they are the most visibly abundant large mammal on the eastern plains. During the brief summer monsoon shadow, they group into colossal nomadic herds exceeding 400 individuals, raising massive dust plumes visible from miles away as they traverse the basins of Tso Moriri and Hanle.',
      highlights: ['Largest wild equid species globally', 'aggregates in herds up to 400', 'Sustained gallops of 60 km/h', 'Extreme altitude blood adaptations', 'Dominant grazer of the Changthang', 'Complex harem social structure'],
      behavior: 'Kiangs are remarkably athletic and aggressively territorial during the autumn rut. Herds are typically fluid, but structured around a dominant stallion aggressively defending a harem of 10-15 mares. When rival bachelor stallions attempt to usurp a harem, vicious battles ensue involving violent biting, rearing, and lethal kicking. Unlike domestic horses, Kiangs have adapted an incredibly slow metabolism requiring drastically less water, extracting moisture from morning frost and tough sedge roots. In winter, they use hardened hooves to smash through ice crusts to access dormant grass.',
      conservation: 'While classified globally as Least Concern, the Ladakhi population exists in a highly volatile geopolitical space. 2026 research from the Wadia Institute of Himalayan Geology and WII highlights severe habitat fragmentation. The rapid construction of paved border highways and the unchecked expansion of razor-wire military fences along the LaC have severed ancient migratory corridors, cutting herds off from winter grazing valleys. Furthermore, the skyrocketing global demand for Pashmina wool has led to massive over-stocking of domestic goats, systematically starving out the Kiang in critical borderline habitats.',
      threats: ['Fragmentation of migration routes by military razor-wire fencing', 'Intense grazing competition with exploding populations of Pashmina goats', 'Roadkill fatalities on the new high-speed border highways', 'Climate change altering the fundamental composition of steppe grasses'],
      photos: [
        { title: 'Steppe Gallop', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-speedometer2', location: 'Changthang Plateau', desc: 'a herd of kiangs galloping across the vast steppe â€” dust clouds rising against snow-capped peaks.' },
        { title: 'Kiang Portrait', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800', icon: 'bi-star-fill', location: 'Hanle Plains', desc: 'a magnificent stallion with its distinctive reddish-brown coat and cream-white belly.' },
        { title: 'Huddled Herd', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow2', location: 'Puga Valley', desc: 'Kiangs huddled together in sub-zero temperatures, their winter coats darkened and thick.' },
        { title: 'Ice Forging', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-water', location: 'Indus Headwaters', desc: 'a small group fording a glacial stream â€” water barely reaching their powerful legs.' },
        { title: 'autumn Duel', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-lightning', location: 'Changthang', desc: 'Two stallions engaged in a fierce kicking battle during the autumn breeding season.' },
      ],
      facts: [
        { icon: 'bi-rulers', label: 'Shoulder Height', value: '132â€“142 cm' },
        { icon: 'bi-speedometer2', label: 'Top Speed', value: '60 km/h' },
        { icon: 'bi-speedometer2', label: 'Weight', value: '350â€“400 kg (males)' },
        { icon: 'bi-geo-alt', label: 'Elevation Range', value: '4,000â€“5,200m' },
        { icon: 'bi-heart-pulse', label: 'Lifespan', value: '20+ years (wild)' },
        { icon: 'bi-people', label: 'Herd Size', value: 'Up to 400 (summer)' },
      ],
      relatedSlugs: ['tibetan-wolf', 'snow-leopard', 'himalayan-brown-bear'],
      taxonomy: { kingdom: 'animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Perissodactyla', family: 'Equidae', genus: 'Equus', species: 'E. kiang' },
      didYouKnow: [
        'To survive at 5,000 meters, Kiang blood contains remarkably higher levels of hemoglobin than domestic horses, maximizing oxygen transport.',
        'Early 19th-century explorers frequently tried to capture and tame them to replace exhausted pack mules, but the Kiang is entirely untamable due to extreme aggression toward riders.',
        'They are technically not horses; they belong to the ass subgenus, making their closest relative the critically endangered african Wild ass.',
        'In the deep winter, their reddish coat grows incredibly dense and turns a dark, muddy brown to absorb maximum solar radiation.'
      ],
      sightingGuide: { bestSeason: 'Summer to Early autumn', bestMonths: 'June â€“ September', locations: ['Changthang Plateau', 'Nyoma to Hanle Drive', 'Tso Kar Basin', 'Karu-Chumathang Route'], difficulty: 'Very Easy', tip: 'Drive the Lehâ€“Hanle road shortly after dawn. You are almost guaranteed to see large herds grazing near the highway or galloping parallel to vehicles.' },
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=1600'
    },
    {
      slug: 'himalayan-brown-bear',
      name: 'Himalayan Brown Bear',
      scientific: 'Ursus arctos isabellinus',
      population: '~40-50 in Ladakh (2025 WII estimate)',
      status: 'Critically Endangered',
      statusColor: '#dc2626',
      icon: 'bi-shield-fill-exclamation',
      color: '#7b2d26',
      habitat: 'Zanskar, Suru Valley, Drass, 3,000-4,500m',
      diet: 'Omnivore â€” roots, berries, marmots, livestock',
      description: 'The elusive "Red Bear" of the Himalayas, hanging by a genetic thread in the deep western valleys of Kargil and Zanskar amidst intense human-wildlife conflict.',
      lat: 34.1200, lng: 75.9200, zoom: 9,
      overview: 'The Himalayan Brown Bear, distinguished by its sandy, reddish-brown fur, is the largest mammal in the western Himalayas. Unlike the high-altitude specialist Snow Leopard, the Brown Bear prefers the mid-level alpine meadows and rugged scree slopes of the Suru, Drass, and Zanskar valleys.\n\nHistorically, this creature heavily influenced regional folklore, frequently cited as the biological reality behind the "Yeti" myths prevalent among early European mountaineers, given its tendency to stand upright and leave massive bipedal footprints in the melting snow. During the 19th century, it was hunted mercilessly by British sporting officers for its pale fur.\n\nToday, the Ladakhi population is terrifyingly small, estimated at fewer than 50 individuals. Trapped geographically between the Line of Control (LoC) and high passes, they face an existential crisis of genetic isolation, habitat loss due to militarization, and intense conflict with local farmers whose crops and livestock they raid during late autumn.',
      highlights: ['Critically small population (~50)', 'Origin of "Yeti" footprint myths', 'Endemic to western Ladakh/Kargil', 'Severe human-wildlife conflict', 'Bear-proof storage interventions', 'Scat-DNa profiling (2026)'],
      behavior: 'Primarily crepuscular and solitary, these massive omnivores spend their brief summers in a frenzied feeding state (hyperphagia) to build fat reserves. They use incredibly powerful shoulders and 5-inch claws to literally excavate hundreds of pounds of earth to dig out Himalayan Marmots. Come late November, they enter deep rock caves for a 5-6 month hibernation. Females uniquely give birth to tiny, blind cubs mid-hibernation, relying solely on fat reserves to nurse them until spring emergence.',
      conservation: '2025â€“2026 conservation efforts led by WII mark a desperate push to save the Ladakhi lineage. Researchers have completely mapped the genome of the Suru Valley population via scat-DNa collection, confirming dangerous levels of inbreeding due to habitat fragmentation by the massive Zojila infrastructure projects. To combat retaliatory poisoning by angry farmers, the local government and NGOs have distributed hundreds of heavy-duty, steel bear-proof grain containers, which successfully dropped human-bear conflict incidents by 60% in the last two years.',
      threats: ['Retaliatory killing and poisoning by farmers losing vital winter food stores', 'Total genetic isolation causing inbreeding depression (no corridor to Pakistan populations)', 'Massive infrastructure blasting (Zojila tunnel) destroying ancient hibernation caves', 'Poaching for the illegal wildlife trade (bear bile and gallbladders)'],
      photos: [
        { title: 'Rare Forager', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800', icon: 'bi-shield-fill-exclamation', location: 'Suru Valley', desc: 'a rare Himalayan brown bear foraging in the alpine meadows above the Suru River.' },
        { title: 'High Den', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow2', location: 'Drass Sector', desc: 'The entrance to a rock cave used for 6-month winter hibernation in the Drass mountains.' },
        { title: 'Bear Generations', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800', icon: 'bi-heart-fill', location: 'Deosai Border', desc: 'an extremely rare sighting of a female with two cubs near the Deosai-Ladakh corridor.' },
        { title: 'Seasonal Dig', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-search', location: 'Rangdum', desc: 'Using powerful claws to dig out a marmot burrow â€” a key food source in summer.' },
        { title: 'Guard Protection', image: 'https://images.unsplash.com/photo-1469012812239-d04849646452?auto=format&fit=crop&q=80&w=800', icon: 'bi-lock-fill', location: 'Suru Village', desc: 'Steel bear-proof grain containers installed to reduce human-wildlife conflict.' },
      ],
      facts: [
        { icon: 'bi-rulers', label: 'Body Length', value: '150â€“200 cm' },
        { icon: 'bi-speedometer2', label: 'Weight', value: '130â€“250 kg (male)' },
        { icon: 'bi-calendar', label: 'Hibernation', value: '5â€“6 months' },
        { icon: 'bi-geo-alt', label: 'Primary Range', value: 'Suru / Drass Valleys' },
        { icon: 'bi-heart-pulse', label: 'Lifespan', value: '20â€“25 years' },
        { icon: 'bi-people', label: 'Ladakh Population', value: '< 50 individuals' },
      ],
      relatedSlugs: ['snow-leopard', 'tibetan-wolf', 'himalayan-ibex'],
      taxonomy: { kingdom: 'animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Ursidae', genus: 'Ursus', species: 'U. arctos isabellinus' },
      didYouKnow: [
        'The melting bipedal footprints of the Himalayan Brown Bear are the most widely accepted scientific explanation for the "Yeti" or abominable Snowman sightings.',
        'They give birth to 1-3 cubs while entirely asleep mid-hibernation; the cubs simply navigate to the milk and nurse while the mother sleeps.',
        'Despite their tremendous bulk, they can sprint uphill at speeds exceeding 45 km/h over treacherous scree.',
        '2026 DNa analysis proved the Ladakhi population is genetically distinct, having been isolated from other brown bear populations for over 10,000 years.'
      ],
      sightingGuide: { bestSeason: 'Summer', bestMonths: 'June â€“ Early September', locations: ['Suru Valley (Sankoo to Rangdum)', 'Drass Sector', 'Zanskar border areas'], difficulty: 'Extremely Difficult & Dangerous', tip: 'Hire specialized local spotters in the Suru Valley. Sightings almost exclusively occur scanning high alpine meadow slopes with binoculars at dawn before the bears retreat from the heat.' },
      image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1469012812239-d04849646452?auto=format&fit=crop&q=80&w=1600'
    },
    {
      slug: 'tibetan-wolf',
      name: 'Tibetan Wolf',
      scientific: 'Canis lupus chanko',
      population: '~350 in Ladakh (2025 WII)',
      status: 'Endangered (Regional)',
      statusColor: '#ea580c',
      icon: 'bi-moon-fill',
      color: '#475264',
      habitat: 'Changthang steppe and wide valleys, 3,500â€“5,000m',
      diet: 'Marmots, pikas, domestic livestock, kiang foals',
      description: 'The highly persecuted apex pack-hunter of the Ladakhi plains, suffering extreme retaliatory violence despite being critically vital to the steppe ecosystem.',
      lat: 33.2000, lng: 78.8500, zoom: 8,
      overview: 'The Tibetan Wolf (locally known as "Shang") is a high-altitude lineage of the grey wolf. adapted to the stark, open Changthang plateau, it boasts a distinctly pale, tawny-grey coat, a broader head, and longer legs for rapid steppe running compared to timber wolves.\n\nHistorically, the Tibetan Wolf features heavily in Ladakhi demonology, often depicted in Thangka paintings as the mount of wrathful deities. However, the real-world relationship with humans is purely antagonistic. Because the Changthang offers sparse wild prey, wolves invariably target the massive herds of vulnerable Pashmina goats and sheep owned by the Changpa nomads. \n\nThis dynamic makes the Tibetan Wolf the most hated and heavily persecuted predator in Ladakh. In many remote areas, deep, ancient "Shang-dong" (wolf-trapping pits) built of stone still stand, historically used to capture and stone wolves to death. Today, retaliatory poisoning remains their greatest existential threat.',
      highlights: ['apex pack-predator of the plains', 'Distinct pale, tawny-grey coat', 'Highly persecuted by herders', 'ancient "Shang-dong" stone traps', 'Packs of 3â€“8 individuals', 'Massive nightly hunting ranges (40+ km)'],
      behavior: 'Tibetan wolves utilize extreme cooperative pack hunting to bring down prey. Packs generally range from 3 to 8 individuals, led by an alpha breeding pair. Without the cover of trees, they rely on complex flanking maneuvers across the open steppe. They dig extensive den networks into sandy hillsides for spring pupping. In winter, they travel enormous distances across the frozen ground; recent satellite collar data shows single packs covering up to 50 km in one night patrolling territory.',
      conservation: 'The Tibetan Wolf has long been the neglected step-child of Ladakhi conservation, overshadowed by the glamorous Snow Leopard. However, 2025/2026 has seen a massive policy shift. The Nature Conservation Foundation (NCF) spearheaded the "Shang-dong Conversion" projectâ€”literally dismantling ancient stone wolf traps and repurposing the stones to build Stupas (religious monuments), formally bringing Buddhist ethics into wolf conservation. Furthermore, the mass construction of predator-proof corrals is finally separating domestic herds from nocturnal wolf attacks, slowly shifting village attitudes from extermination to reluctant tolerance.',
      threats: ['Widespread retaliatory poisoning of carcasses by enraged herders', 'Feral dog hybridization and the transmission of canine distemper and rabies', 'Severe fragmentation of the open steppe by paved military highways', 'Targeted shooting to protect the lucrative Pashmina goat industry'],
      photos: [
        { title: 'Steppe Scan', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-moon-fill', location: 'Changthang Plateau', desc: 'a pack of Tibetan wolves scanning the open steppe for kiang herds at dawn.' },
        { title: 'Grassland Prowl', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-search', location: 'Hanle Plains', desc: 'a solitary wolf moving through the golden grasslands â€” pale coat blending with the terrain.' },
        { title: 'active Den', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-house', location: 'Puga Valley', desc: 'a hillside den entrance with fresh digging â€” a pack\'s spring breeding site.' },
        { title: 'Frost Pack', image: 'https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow2', location: 'Changthang, 4,800m', desc: 'Wolves moving as a tight pack through deep snow during a harsh Changthang winter.' },
        { title: 'Secure Boundary', image: 'https://images.unsplash.com/photo-1469012812239-d04849646452?auto=format&fit=crop&q=80&w=800', icon: 'bi-shield-check', location: 'Korzok Village', desc: 'a stone-and-wire mesh corral protecting Changpa livestock from wolf predation.' },
      ],
      facts: [
        { icon: 'bi-rulers', label: 'Body Length', value: '110â€“130 cm' },
        { icon: 'bi-speedometer2', label: 'Weight', value: '25â€“35 kg' },
        { icon: 'bi-people-fill', label: 'Pack Size', value: '3â€“8 wolves' },
        { icon: 'bi-geo-alt', label: 'Elevation', value: '3,800â€“5,000m' },
        { icon: 'bi-heart-pulse', label: 'Lifespan', value: '10â€“12 years (wild)' },
        { icon: 'bi-compass', label: 'Daily Range', value: 'Up to 50 km' },
      ],
      relatedSlugs: ['tibetan-wild-ass', 'snow-leopard', 'himalayan-ibex'],
      taxonomy: { kingdom: 'animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Canidae', genus: 'Canis', species: 'C. lupus chanko' },
      didYouKnow: [
        'The genome of the Tibetan Wolf includes a specific gene mutation (EPaS1) that regulates red blood cell production, preventing altitude sickness at 5,000m.',
        'Historically, Ladakhi villagers constructed massive stone pit-traps called "Shang-dong" to catch and kill wolves.',
        'Unlike the howl of a North american timber wolf, the Tibetan wolf\'s howl is shorter and higher-pitched, adapted to carry over barren acoustic landscapes.',
        'Conservationists are actively dismantling the ancient lethal stone wolf traps and using the stones to build Buddhist Stupas to promote coexistence.',
      ],
      sightingGuide: { bestSeason: 'Winter', bestMonths: 'November â€“ March', locations: ['Changthang Plateau', 'Hanle Plains', 'Chumur Sector', 'Puga Valley'], difficulty: 'Difficult', tip: 'Scan the open ridges of the Changthang at first light. Wolves are incredibly wary of humans; sightings usually happen from the safety of a vehicle at long distances. Look for scattered, nervous Marmot behavior.' },
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&q=80&w=1600'
    },
    {
      slug: 'himalayan-ibex',
      name: 'Himalayan Ibex',
      scientific: 'Capra sibirica hemalayanus',
      population: '~4,000+ in Ladakh',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-chevron-double-up',
      color: '#059669',
      habitat: 'Steep cliffs and ridges, 3,800â€“5,200m',
      diet: 'Grasses, herbs, alpine shrubs',
      description: 'A sure-footed wild goat with massive curved horns up to 130cm â€” the Himalayan Ibex is a critical prey species for snow leopards and one of the most agile climbers on Earth.',
      lat: 33.7000, lng: 76.8500, zoom: 9,
      overview: 'The Himalayan Ibex is a subspecies of the Siberian ibex, perfectly at home on the most vertiginous terrain Ladakh offers. Males sport enormous backward-curving horns reaching 130cm, heavily ridged and used in spectacular head-clashing battles during the autumn rut. Their sure-footed agility on near-vertical cliff faces is legendary.\n\nThe ibex is a critical prey species for the snow leopard and golden eagle, forming the backbone of the high-altitude food web. The ibexâ€“snow leopard predator-prey relationship is one of the most studied in alpine ecology.\n\nRelatively abundant compared to other Ladakhi megafauna, the ibex nevertheless faces increasing pressure from competition with domestic goats for alpine grazing, and habitat disturbance from road construction through high mountain passes.',
      highlights: ['Horns up to 130cm', 'Key snow leopard prey', 'Vertical cliff specialists', 'Autumn rutting head-clashes', 'Abundant in Hemis NP', 'Males weigh up to 130kg'],
      behavior: 'Himalayan Ibex are highly social and form single-sex herds for most of the year. Males live in bachelor groups and only join female herds during the autumn rut (Octoberâ€“December), when fierce battles erupt between rivals who rear and clash horns with tremendous force. Their extraordinary climbing ability is maintained by hard outer hooves that grip rock and soft inner pads that provide friction, allowing them to stand on near-vertical surfaces and escape most predators. They descend to lower elevations in winter, sometimes visible from the Lehâ€“Manali highway.',
      conservation: 'The Himalayan Ibex is protected under the Wildlife Protection Act (1972). Populations remain relatively healthy within Hemis National Park and Karakoram Wildlife Sanctuary, but outside these areas they face pressure from the 200,000+ Pashmina goats on the Changthang. The Wildlife Institute of India monitors populations through annual transect surveys. Community-based conservation programs in the Markha Valley have shown an 18% population increase over 5 years where ibex habitat is actively protected.',
      threats: ['Competition with domestic Pashmina goats for alpine grazing land', 'Habitat fragmentation from new military roads through high passes', 'Disease transmission from domestic goats (foot-and-mouth, scabies)', 'Proposed trophy hunting concessions in certain sanctuary buffer zones'],
      photos: [
        { title: 'Cliff Master', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800', icon: 'bi-chevron-double-up', location: 'Hemis National Park', desc: 'A large male ibex navigating a sheer cliff face with effortless precision.' },
        { title: 'Horn Clash', image: 'https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&q=80&w=800', icon: 'bi-lightning', location: 'Markha Valley', desc: 'Two males engaged in a dramatic rutting clash on a rocky ridge in October.' },
        { title: 'Alpine Herd', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800', icon: 'bi-people', location: 'Zanskar Range', desc: 'A mixed herd grazing on sparse alpine vegetation at 4,800m in late summer.' },
        { title: 'Ridge Silhouette', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-arrow-up', location: 'Stok Range', desc: 'The unmistakable silhouette of a male ibex with sweeping horns against a mountain sky.' },
        { title: 'Winter Descent', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow2', location: 'Indus Valley', desc: 'A small herd descending to lower elevations during winter â€” visible from the Leh highway.' },
      ],
      facts: [
        { icon: 'bi-rulers', label: 'Horn Length', value: 'Up to 130 cm' },
        { icon: 'bi-speedometer2', label: 'Weight (male)', value: '90â€“130 kg' },
        { icon: 'bi-rulers', label: 'Shoulder Height', value: '80â€“100 cm' },
        { icon: 'bi-thermometer-snow', label: 'Elevation Range', value: '3,800â€“5,200m' },
        { icon: 'bi-heart-pulse', label: 'Lifespan', value: '15â€“20 years (wild)' },
        { icon: 'bi-people', label: 'Ladakh Population', value: '~4,000+ (stable)' },
      ],
      relatedSlugs: ['snow-leopard', 'tibetan-wolf', 'black-necked-crane'],
      taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Artiodactyla', family: 'Bovidae', genus: 'Capra', species: 'C. s. hemalayanus' },
      didYouKnow: [
        'The Himalayan Ibex is the primary prey of the snow leopard â€” one ibex provides a snow leopard with food for 2â€“3 weeks.',
        'Their horns can weigh up to 10 kg â€” more than 10% of their body weight â€” yet they navigate sheer cliffs effortlessly.',
        'Males shed and regrow their horns annually; each year of growth adds a new ridge, allowing precise age-reading.',
        'The inner hoof pad is composed of hard skin that works like a rubber pad, providing friction for grip on near-smooth vertical surfaces.',
      ],
      sightingGuide: { bestSeason: 'Summer & Winter', bestMonths: 'July â€“ September & December â€“ February', locations: ['Hemis National Park', 'Markha Valley', 'Stok Range above Leh', 'Zanskar ridges'], difficulty: 'Moderate', tip: 'Scan rocky cliffs and ridgelines above 4,000m with binoculars in early morning. The large curved horns of males are visible even at great distances. In winter, herds descend to valley slopes visible from the Lehâ€“Manali highway.' },
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=1600'
    },
  ];
}
