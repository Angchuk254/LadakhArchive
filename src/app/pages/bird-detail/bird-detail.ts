import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LeafletMapComponent } from '../../shared/leaflet-map/leaflet-map';

interface BirdPhoto { title: string; image: string; icon: string; location: string; desc: string; }
interface BirdFact { icon: string; label: string; value: string; }

interface BirdData {
  slug: string; name: string; scientific: string; population: string;
  status: string; statusColor: string; icon: string; color: string;
  habitat: string; diet: string; description: string; overview: string;
  image: string;
  heroImage: string;
  highlights: string[];
  photos: BirdPhoto[];
  facts: BirdFact[];
  behavior: string; conservation: string;
  threats: string[];
  lat: number; lng: number; zoom?: number;
  relatedSlugs: string[];
}

@Component({
  selector: 'app-bird-detail',
  imports: [RouterLink, LeafletMapComponent],
  templateUrl: './bird-detail.html',
  styleUrl: './bird-detail.scss',
  host: { '(document:keydown.escape)': 'onEscape()' },
})
export class BirdDetail {
  private route = inject(ActivatedRoute);

  lightboxItem = signal<BirdPhoto | null>(null);
  bird = signal<BirdData | null>(null);
  relatedBirds = computed(() => {
    const b = this.bird();
    if (!b) return [];
    return b.relatedSlugs.map(s => this.birds.find(x => x.slug === s)).filter(Boolean) as BirdData[];
  });

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.bird.set(this.birds.find(b => b.slug === slug) ?? null);
  }

  openLightbox(p: BirdPhoto) { this.lightboxItem.set(p); document.body.style.overflow = 'hidden'; }
  closeLightbox() { this.lightboxItem.set(null); document.body.style.overflow = ''; }
  onEscape() { if (this.lightboxItem()) this.closeLightbox(); }

  birds: BirdData[] = [
    {
      slug: 'black-necked-crane',
      name: 'Black-Necked Crane',
      scientific: 'Grus nigricollis',
      population: '~50 breeding pairs in Ladakh',
      status: 'Near Threatened',
      statusColor: '#0284c7',
      icon: 'bi-feather2',
      color: '#1a365d',
      habitat: 'Hanle & Chushul wetlands, 4,200m+',
      diet: 'Roots, tubers, insects, small fish',
      description: 'One of the world\'s rarest cranes — Ladakh hosts the only breeding population in India, revered in Buddhist culture as A symbol of longevity.',
      lat: 32.7766, lng: 78.9818, zoom: 10,
      overview: 'The Black-Necked Crane is A revered bird in Ladakhi Buddhist culture, symbolizing longevity and faithfulness. Standing 139cm tall with A striking black head, red crown patch, and white-grey body, it is one of the last crane species to be scientifically described (1876).\n\nLadakh\'s Hanle and Chushul wetlands at 4,200m+ are the only breeding grounds in India. The birds arrive in late March and breed through summer before migrating south to Yunnan (China) and Bhutan.\n\nThe WWF and Wildlife Institute of India have established community-managed crane reserves. Farmers are compensated for crop damage and incentivized to maintain traditional irrigation systems that create the marshy habitats cranes depend on. Despite this, wetland degradation, feral dogs, and disturbance from military installations remain threats.',
      highlights: ['Hanle breeding grounds', 'Buddhist cultural symbol', 'Only Indian breeding site', 'Community crane reserves', '139cm tall wading bird', 'Migratory — winters in Yunnan & Bhutan'],
      behavior: 'Black-necked cranes are monogamous and mate for life. They perform elaborate courtship dances involving synchronized jumping, bowing, and trumpeting calls that echo across the vast wetlands. Pairs build flat nests in shallow marshy areas and typically lay two eggs in May. Both parents incubate for ~31 days and fiercely defend the nest against predators.',
      conservation: 'The WWF-India Crane Conservation Programme funds community-managed reserves around Hanle. Farmers receive compensation for crop damage and are incentivized to maintain traditional flood irrigation that creates marshland habitat. Herders restrict grazing near nest sites during breeding season. Feral dog control programs have improved chick survival rates.',
      threats: ['Wetland degradation', 'Feral dog predation on chicks', 'Military disturbance near nesting sites', 'Climate change drying marshes', 'Power line collisions', 'Overgrazing near wetlands'],
      photos: [
        { title: 'Courtship Dance', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-feather2', location: 'Hanle Wetland', desc: ' A breeding pair performing their legendary synchronized courtship dance at dawn.' },
        { title: 'Feeding in Marsh', image: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?auto=format&fit=crop&q=80&w=800', icon: 'bi-water', location: 'Chushul', desc: 'Cranes probing the shallow marsh for tubers and invertebrates in golden morning light.' },
        { title: 'In Flight', image: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=800', icon: 'bi-arrow-up-right', location: 'Changthang', desc: 'Majestic wingspan revealed as A crane takes flight across the vast Changthang wetland.' },
        { title: 'Nest with Eggs', image: 'https://images.unsplash.com/photo-1522000240402-a4234b77c46a?auto=format&fit=crop&q=80&w=800', icon: 'bi-egg', location: 'Hanle Marshland', desc: ' A shallow nest with two olive-brown eggs carefully guarded by the pair.' },
        { title: 'Winter Migration', image: 'https://images.unsplash.com/photo-1506220926022-cc2c17377c86?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow2', location: 'Over Himalayan Pass', desc: 'Cranes flying in V-formation as they cross A frozen pass heading south to Yunnan.' },
      ],
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-rulers', label: 'Height', value: '139 cm' },
        { icon: 'bi-arrows-fullscreen', label: 'Wingspan', value: '235 cm' },
        { icon: 'bi-speedometer2', label: 'Weight', value: '5.5–7 kg' },
        { icon: 'bi-geo-alt', label: 'Breeding altitude', value: '4,200m+' },
        { icon: 'bi-heart-pulse', label: 'Lifespan', value: '25–30 years' },
        { icon: 'bi-people', label: 'India Population', value: '~50 breeding pairs' },
      ],
      relatedSlugs: ['bar-headed-goose', 'brown-headed-gull', 'golden-eagle'],
    },
    {
      slug: 'golden-eagle',
      name: 'Golden Eagle',
      scientific: 'aquila chrysaetos',
      population: 'Uncommon resident',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-sun-fill',
      color: '#c8702a',
      habitat: 'Mountain ridges, open valleys, 3,000–5,500m',
      diet: 'Marmots, hares, young ibex, pikas',
      description: 'Ladakh\'s largest and most powerful raptor — A 2.3m wingspan hunting machine soaring above the Trans-Himalayan ridges.',
      lat: 33.8583, lng: 77.3000, zoom: 8,
      overview: 'The Golden Eagle is the supreme aerial predator of Ladakh\'s mountains, commanding territories of up to 200 sq km from ridgeline thermals. With A wingspan reaching 2.3 metres and talons capable of exerting 440 psi of pressure, it can take prey as large as young ibex and fox cubs.\n\nIn Ladakh, golden eagles are most commonly spotted along the Markha Valley, above Hemis, and along the Changthang ridges. They build massive stick nests (eyries) on cliff ledges, often reusing and expanding the same nest for decades.\n\nPairs are monogamous and share A territory year-round. The female typically lays two eggs, but siblicide is common — the older chick often kills the younger. This brutal strategy ensures at least one strong fledgling survives in the harsh environment.',
      highlights: ['2.3m wingspan', 'Talons: 440 psi grip', 'Territories up to 200 sq km', 'Monogamous pairs', 'Cliff-ledge eyries reused for decades', 'Hunts marmots, hares, and young ibex'],
      behavior: 'Golden eagles hunt by soaring at great heights and stooping in spectacular dives at speeds exceeding 240 km/h. They use the terrain masterfully — contouring ridgelines to surprise prey. Pairs often hunt cooperatively, with one eagle flushing prey towards the other. Their incredible eyesight can spot A marmot from 3 km away.',
      conservation: 'Golden eagles are not specifically targeted by conservation programs in Ladakh but benefit from general habitat protection in Hemis National Park and the Changthang Sanctuary. The main conservation need is maintaining healthy populations of prey species like marmots and hares.',
      threats: ['Poisoned carcasses (set for wolves)', 'Power line electrocution', 'Disturbance at nest sites', 'Declining prey from overgrazing', 'Climate change altering prey distribution', 'Feral dogs competing for prey'],
      photos: [
        { title: 'Ridge Soaring', image: 'https://images.unsplash.com/photo-1469013078759-3836d5334d49?auto=format&fit=crop&q=80&w=800', icon: 'bi-sun-fill', location: 'Hemis National Park', desc: ' A golden eagle riding thermals above the ridgeline, scanning for prey far below.' },
        { title: 'Stoop attack', image: 'https://images.unsplash.com/photo-1470124475582-78906969cf94?auto=format&fit=crop&q=80&w=800', icon: 'bi-lightning', location: 'Markha Valley', desc: 'Wings tucked, diving at tremendous speed towards an unsuspecting marmot.' },
        { title: 'Eyrie on Cliff', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-house', location: 'Rumbak Valley', desc: ' A massive stick nest on A cliff ledge, used by the same pair for over 15 years.' },
        { title: 'With Prey', image: 'https://images.unsplash.com/photo-1510522103504-297929785002?auto=format&fit=crop&q=80&w=800', icon: 'bi-trophy', location: 'Changthang', desc: 'Talons gripping A freshly caught Himalayan marmot — A key food source in summer.' },
        { title: 'Juvenile in Flight', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-feather', location: 'Spituk', desc: ' A young eagle on its first flights — note the white patches on wings and tail.' },
      ],
      image: 'https://images.unsplash.com/photo-1469013078759-3836d5334d49?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1469013078759-3836d5334d49?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-arrows-fullscreen', label: 'Wingspan', value: '2.0–2.3 m' },
        { icon: 'bi-speedometer2', label: 'Dive Speed', value: '240+ km/h' },
        { icon: 'bi-speedometer2', label: 'Weight', value: '3.6–6.4 kg' },
        { icon: 'bi-geo-alt', label: 'Territory', value: 'Up to 200 sq km' },
        { icon: 'bi-heart-pulse', label: 'Lifespan', value: '30+ years' },
        { icon: 'bi-eye', label: 'Vision Range', value: '3 km (prey detection)' },
      ],
      relatedSlugs: ['lammergeier', 'himalayan-snowcock', 'tibetan-sandgrouse'],
    },
    {
      slug: 'lammergeier',
      name: 'Lammergeier (Bearded Vulture)',
      scientific: 'Gypaetus barbatus',
      population: 'Uncommon resident',
      status: 'Near Threatened',
      statusColor: '#0284c7',
      icon: 'bi-wind',
      color: '#7b2d26',
      habitat: 'Cliffs and gorges, 2,000–5,000m',
      diet: 'Bones, bone marrow, carrion',
      description: 'The legendary "bone-breaker" — A spectacular vulture that drops bones from great heights to crack them open and feast on the marrow within.',
      lat: 33.7222, lng: 76.8402, zoom: 8,
      overview: 'The Lammergeier, or Bearded Vulture, is one of the most extraordinary birds on Earth. With A wingspan up to 2.8 metres, it is one of the largest flying birds in the Old World. Unlike other vultures, it has evolved to feed almost exclusively on bones and bone marrow — hence its local name "bone-breaker."\n\nLammergeiers swallow bones whole (their stomach acid has A pH below 1, dissolving bone within 24 hours) or carry larger ones to "ossuary" rocks — favourite cliff faces where they repeatedly drop bones from heights of 50–80 metres to shatter them.\n\nIn Ladakh, they are seen soaring above the Zanskar gorge, Hemis National Park, and the Indus Valley. Their rust-orange breast feathers are not natural — they deliberately bathe in iron-rich mud and springs, A rare example of cosmetic behaviour in birds.',
      highlights: ['2.8m wingspan', 'Drops bones from 80m height', 'Stomach acid dissolves bone', 'Rust-orange cosmetic bathing', '"Bone-breaker" nickname', 'One of world\'s largest raptors'],
      behavior: 'Lammergeiers are solitary or seen in pairs. They soar for hours on mountain thermals, scanning for bones on the ground. When they find A large bone, they carry it aloft and drop it onto their favourite "ossuary" rock — some of these dropping sites have been used for decades. They have been observed carrying bones weighing up to 4 kg. Their cosmetic mud-bathing behaviour remains one of ornithology\'s most fascinating puzzles.',
      conservation: 'Listed as Near Threatened globally due to population declines in Europe and africa. In Ladakh, the population appears stable in protected areas. Poisoned carcasses set for wolves and snow leopards are the greatest direct threat — vultures are extremely vulnerable to secondary poisoning.',
      threats: ['Secondary poisoning from carcasses', 'Power line collisions', 'Habitat disturbance at nest sites', 'Declining carrion availability', 'Lead poisoning from bullet fragments', 'Disturbance from tourism and infrastructure'],
      photos: [
        { title: 'Bone Drop', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-wind', location: 'Zanskar Gorge', desc: ' A lammergeier releasing A large bone from 60 metres above its favourite ossuary rock.' },
        { title: 'Soaring above Gorge', image: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=800', icon: 'bi-arrow-up-right', location: 'Hemis National Park', desc: 'Diamond-shaped tail and massive wingspan silhouetted against the Ladakhi sky.' },
        { title: 'Rust-Orange Breast', image: 'https://images.unsplash.com/photo-1510522103504-297929785002?auto=format&fit=crop&q=80&w=800', icon: 'bi-palette', location: 'Indus Valley', desc: 'Close view showing the distinctive orange breast — coloured by deliberate iron-rich mud bathing.' },
        { title: 'Feeding on Bones', image: 'https://images.unsplash.com/photo-1522000240402-a4234b77c46a?auto=format&fit=crop&q=80&w=800', icon: 'bi-egg', location: 'Markha Valley', desc: 'Swallowed whole — stomach acid pH <1 dissolves even the thickest bones.' },
        { title: 'Nest on Cliff', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-house', location: 'Stok Range', desc: ' A massive nest deep in A cliff crevice — lammergeiers breed in winter when food is most available.' },
      ],
      image: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-arrows-fullscreen', label: 'Wingspan', value: '2.5–2.8 m' },
        { icon: 'bi-speedometer2', label: 'Weight', value: '5–7 kg' },
        { icon: 'bi-arrow-down', label: 'Bone Drop Height', value: '50–80 m' },
        { icon: 'bi-droplet', label: 'Stomach pH', value: '<1.0 (dissolves bone)' },
        { icon: 'bi-heart-pulse', label: 'Lifespan', value: '40+ years' },
        { icon: 'bi-geo-alt', label: 'Elevation Range', value: '2,000–5,000m' },
      ],
      relatedSlugs: ['golden-eagle', 'himalayan-snowcock', 'bar-headed-goose'],
    },
    {
      slug: 'himalayan-snowcock',
      name: 'Himalayan Snowcock',
      scientific: 'Tetraogallus himalayensis',
      population: 'Locally common',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-snow2',
      color: '#7c3aed',
      habitat: 'alpine meadows, rocky slopes, 3,600–5,300m',
      diet: 'Roots, bulbs, seeds, shoots, insects',
      description: ' A large, plump grouse-like bird found above the treeline — its loud whistling call is the soundtrack of Ladakh\'s high passes at dawn.',
      lat: 33.8583, lng: 77.3000, zoom: 8,
      overview: 'The Himalayan Snowcock is one of the largest members of the pheasant family, standing up to 72cm tall and weighing up to 3 kg. It lives permanently above the treeline in the harshest Alpine terrain, from 3,600m to over 5,300m.\n\nIn Ladakh, snowcocks are most commonly seen on steep grassy slopes and rocky meadows above the Markha Valley, Hemis National Park, and the high passes. They spend their days feeding uphill in small coveys of 5–15 birds, then glide downslope in the evening to roost on cliff ledges.\n\nTheir loud, whistling call — A descending "whee-oo-whee" — carries across vast distances and is often the first sign of wildlife at high passes. They are extremely wary and run uphill with surprising speed before bursting into flight.',
      highlights: ['Up to 72cm tall', 'Lives above 3,600m treeline', 'Coveys of 5–15 birds', 'Dawn whistling call at high passes', 'Feeds uphill, glides down to roost', 'Extremely wary and fast runner'],
      behavior: 'Snowcocks are gregarious, forming coveys of 5–15 birds. They spend mornings feeding slowly uphill on Alpine meadows, scratching for roots and bulbs. When disturbed, they run uphill at astonishing speed before launching into A steep gliding flight. Males perform dawn calls from prominent rocks. Nests are simple scrapes on the ground, hidden among rocks, with 5–12 eggs.',
      conservation: 'Not specifically targeted by conservation programmes. The species benefits from the general protection of Alpine habitats within Hemis National Park and other protected areas. The main conservation need is preventing overgrazing that degrades Alpine meadow habitat.',
      threats: ['Overgrazing degrading Alpine meadows', 'Climate change shifting vegetation zones', 'Disturbance from trekking routes', 'Feral dog predation on nests', 'Habitat loss to road construction', 'Hunting (rare but occurs)'],
      photos: [
        { title: 'Dawn Call', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow2', location: 'Hemis National Park', desc: ' A male snowcock delivering its haunting dawn call from A prominent rock at 4,800m.' },
        { title: 'Covey on Meadow', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-people-fill', location: 'Markha Valley', desc: ' A covey of 8 snowcocks feeding slowly uphill through Alpine grasses.' },
        { title: 'In Flight', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', icon: 'bi-arrow-up-right', location: 'Ganda La Pass', desc: 'Wings set in A steep glide downhill — snowcocks prefer gliding to sustained flight.' },
        { title: 'Nest with Eggs', image: 'https://images.unsplash.com/photo-1522000240402-a4234b77c46a?auto=format&fit=crop&q=80&w=800', icon: 'bi-egg', location: 'Rumbak Valley, 4,500m', desc: ' A well-camouflaged ground nest with 7 speckled eggs among Alpine rocks.' },
        { title: 'Winter Plumage', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow', location: 'Stok Range', desc: 'Magnificent winter plumage — the grey, white and chestnut markings provide perfect camouflage.' },
      ],
      image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-rulers', label: 'Length', value: '56–72 cm' },
        { icon: 'bi-speedometer2', label: 'Weight', value: '2.0–3.1 kg' },
        { icon: 'bi-geo-alt', label: 'altitude Range', value: '3,600–5,300m' },
        { icon: 'bi-people', label: 'Covey Size', value: '5–15 birds' },
        { icon: 'bi-egg', label: 'Clutch Size', value: '5–12 eggs' },
        { icon: 'bi-heart-pulse', label: 'Lifespan', value: '5–8 years' },
      ],
      relatedSlugs: ['tibetan-sandgrouse', 'golden-eagle', 'robin-accentor'],
    },
    {
      slug: 'tibetan-sandgrouse',
      name: 'Tibetan Sandgrouse',
      scientific: 'Syrrhaptes tibetanus',
      population: 'Locally common on Changthang',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-compass',
      color: '#059669',
      habitat: 'Changthang steppe, 4,000–5,500m',
      diet: 'Seeds, shoots, small invertebrates',
      description: ' A perfectly camouflaged ground bird of the Changthang plateau — males fly up to 30km daily to collect water in specialized belly feathers for their chicks.',
      lat: 33.2000, lng: 78.8500, zoom: 8,
      overview: 'The Tibetan Sandgrouse is one of the most remarkable birds of the high plateau. Perfectly camouflaged against the sandy-brown steppe, it is almost invisible until it explodes into fast, direct flight.\n\nThe most extraordinary adaptation of this species is the male\'s specialized belly feathers, which can absorb and hold water like A sponge. During the breeding season, males fly up to 30 km each way to reach water sources, soak their belly feathers, and return to the nest where chicks drink the water directly from the soaked plumage.\n\nIn Ladakh, Tibetan sandgrouse are found across the Changthang plateau, particularly around Hanle, Puga, and the shores of high-altitude lakes. They gather at water sources in large flocks at dawn, making these gatherings one of the most spectacular bird-watching experiences in the region.',
      highlights: ['Males carry water in belly feathers', 'Fly 30km to water sources daily', 'Perfect steppe camouflage', 'Dawn water-hole gatherings', 'Fast, direct flight', 'Changthang plateau specialist'],
      behavior: 'Sandgrouse are gregarious, gathering in large flocks at dawn water holes. Males arrive first, wade belly-deep, and absorb water for 15–20 minutes. The specialized belly feathers have A unique structure that traps water between micro-fibres. Males then fly back to nests where chicks drink directly from the plumage. Nests are simple scrapes on open ground with 2–3 eggs.',
      conservation: 'Not A targeted conservation species. Benefits from the protection afforded by the Changthang Cold Desert Sanctuary. The main threats are indirect — overgrazing and vehicle tracks on the steppe can destroy nests and reduce seed availability.',
      threats: ['Overgrazing reducing seed availability', 'Vehicle tracks destroying nests', 'Military vehicle disturbance', 'Feral dog predation', 'Climate change affecting water sources', 'Habitat degradation on steppe'],
      photos: [
        { title: 'Water Collection', image: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?auto=format&fit=crop&q=80&w=800', icon: 'bi-droplet', location: 'Puga Valley', desc: ' A male wading belly-deep to soak his specialized feathers with water for waiting chicks.' },
        { title: 'Camouflaged on Steppe', image: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=800', icon: 'bi-compass', location: 'Changthang Plateau', desc: 'Nearly invisible against the sandy-brown earth — perfect camouflage in the open steppe.' },
        { title: 'Dawn Flock at Waterhole', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-people-fill', location: 'Hanle', desc: ' A large gathering of sandgrouse at A dawn waterhole — one of Changthang\'s great birding spectacles.' },
        { title: 'In Flight', image: 'https://images.unsplash.com/photo-1506220926022-cc2c17377c86?auto=format&fit=crop&q=80&w=800', icon: 'bi-arrow-right', location: 'Tso Kar', desc: 'Fast, direct flight showing the pointed wings and distinctive barred plumage pattern.' },
        { title: 'Nest with Eggs', image: 'https://images.unsplash.com/photo-1522000240402-a4234b77c46a?auto=format&fit=crop&q=80&w=800', icon: 'bi-egg', location: 'Changthang, 4,800m', desc: ' A simple scrape nest with 3 perfectly camouflaged eggs on the open steppe.' },
      ],
      image: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-rulers', label: 'Length', value: '40–48 cm' },
        { icon: 'bi-speedometer2', label: 'Weight', value: '250–400 g' },
        { icon: 'bi-droplet', label: 'Water Carry', value: 'Up to 30 km each way' },
        { icon: 'bi-geo-alt', label: 'altitude Range', value: '4,000–5,500m' },
        { icon: 'bi-egg', label: 'Clutch Size', value: '2–3 eggs' },
        { icon: 'bi-heart-pulse', label: 'Lifespan', value: '5–10 years' },
      ],
      relatedSlugs: ['himalayan-snowcock', 'bar-headed-goose', 'robin-accentor'],
    },
    {
      slug: 'bar-headed-goose',
      name: 'Bar-headed Goose',
      scientific: 'anser indicus',
      population: 'Common summer breeder',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-arrow-up-right',
      color: '#0284c7',
      habitat: 'Tso Moriri, Tso Kar, Pangong wetlands, 4,200–4,600m',
      diet: 'Grasses, barley, wheat, aquatic plants',
      description: 'The highest-flying bird in the world — famous for migrating over Mount Everest at 8,800m. Breeds at Ladakh\'s pristine high-altitude lakes.',
      lat: 32.9333, lng: 78.3167, zoom: 9,
      overview: 'The Bar-headed Goose holds one of the most extraordinary records in the animal kingdom — it migrates directly over the Himalayan range, flying at altitudes of up to 8,800 metres (over Mount Everest). Special haemoglobin that binds oxygen more efficiently, larger lungs, and A heart that can pump at extreme rates allow this seemingly ordinary-looking goose to survive where jet aircraft need pressurised cabins.\n\nIn Ladakh, bar-headed geese breed in summer colonies at Tso Moriri, Tso Kar, and Pangong Tso. They build nests on small islands and shorelines, laying 3–6 eggs. The sight of hundreds of geese on the turquoise waters of these high-altitude lakes is one of Ladakh\'s most iconic wildlife spectacles.\n\nThey depart in autumn, flying non-stop over the Himalayas to winter in the wetlands of lowland India.',
      highlights: ['Flies over Everest at 8,800m', 'Special high-altitude haemoglobin', 'Breeds at Ladakh\'s highest lakes', 'Non-stop Himalayan crossing', 'Summer colonies at Pangong & Tso Moriri', 'Heart rate: 328 bpm at altitude'],
      behavior: 'Bar-headed geese are gregarious and breed in large colonies on islands and lakeshores. Both parents build the nest and share incubation. Goslings can swim within 24 hours of hatching. During migration, they fly in V-formation, gaining altitude gradually and crossing the highest peaks in 7–8 hours. They have been recorded at 8,800m — higher than any other bird.',
      conservation: 'Breeding sites at Tso Moriri (Ramsar site) and Tso Kar (Ramsar site since 2020) are protected. Community conservation initiatives prevent egg collection and nest disturbance. The main gaps are protection of stopover sites along the migration route.',
      threats: ['Egg collection by locals', 'Nest disturbance from tourism', 'Feral dog attacks on nesting colonies', 'Wetland pollution', 'Climate change affecting lake levels', 'Disease from domestic poultry'],
      photos: [
        { title: 'Colony at Tso Moriri', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-arrow-up-right', location: 'Tso Moriri', desc: 'Hundreds of bar-headed geese on the turquoise waters of Ladakh\'s pristine high-altitude lake.' },
        { title: 'V-Formation Migration', image: 'https://images.unsplash.com/photo-1506220926022-cc2c17377c86?auto=format&fit=crop&q=80&w=800', icon: 'bi-chevron-up', location: 'Over Himalayan Range', desc: 'Flying in formation at extreme altitude — crossing the highest mountains on Earth.' },
        { title: 'Nesting on Island', image: 'https://images.unsplash.com/photo-1522000240402-a4234b77c46a?auto=format&fit=crop&q=80&w=800', icon: 'bi-house', location: 'Tso Kar', desc: ' A female incubating eggs on A small island — protected from terrestrial predators.' },
        { title: 'Goslings Swimming', image: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?auto=format&fit=crop&q=80&w=800', icon: 'bi-heart-fill', location: 'Pangong Tso', desc: 'Newly hatched goslings taking their first swim on the brackish waters of Pangong.' },
        { title: 'autumn Departure', image: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=800', icon: 'bi-arrow-right', location: 'Changthang', desc: 'Geese gathering in pre-migration flocks before their incredible Himalayan crossing.' },
      ],
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-arrow-up', label: 'Max altitude', value: '8,800 m (over Everest)' },
        { icon: 'bi-arrows-fullscreen', label: 'Wingspan', value: '140–160 cm' },
        { icon: 'bi-speedometer2', label: 'Weight', value: '2.0–3.2 kg' },
        { icon: 'bi-heart-pulse', label: 'Heart Rate (altitude)', value: '328 bpm' },
        { icon: 'bi-egg', label: 'Clutch Size', value: '3–6 eggs' },
        { icon: 'bi-geo-alt', label: 'Breeding altitude', value: '4,200–4,600m' },
      ],
      relatedSlugs: ['black-necked-crane', 'brown-headed-gull', 'tibetan-sandgrouse'],
    },
    {
      slug: 'brown-headed-gull',
      name: 'Brown-headed Gull',
      scientific: 'Chroicocephalus brunnicephalus',
      population: 'Common summer breeder',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-water',
      color: '#475264',
      habitat: 'Pangong Tso, Tso Kar, Tso Moriri, 4,200–4,600m',
      diet: 'Fish, insects, crustaceans, scraps',
      description: 'One of the highest-altitude breeding gulls in the world — creating floating nest colonies on Ladakh\'s pristine mountain lakes.',
      lat: 33.7595, lng: 78.6674, zoom: 8,
      overview: 'The Brown-headed Gull is A medium-sized gull that breeds at extraordinary altitudes — the nesting colonies on Pangong Tso, Tso Kar, and Tso Moriri are among the highest-altitude gull breeding sites on Earth, at over 4,200m.\n\nDuring breeding season (May–July), their heads turn A distinctive chocolate-brown colour, fading to white in winter. They build floating nests or nest on small islands, creating noisy, bustling colonies of hundreds of pairs.\n\nIn Ladakh, they are one of the most commonly seen waterbirds and serve as an important indicator species for lake ecosystem health. Their presence attracts tourists and birdwatchers, contributing to the local economy.\n\nafter breeding, they migrate south to coastal and lowland areas of South and Southeast Asia.',
      highlights: ['Breeds above 4,200m', 'Floating nest colonies', 'Brown head in breeding season', 'Indicator of lake health', 'Colonies of hundreds of pairs', 'Migrates to coastal lowlands in winter'],
      behavior: 'Brown-headed gulls are highly gregarious, nesting in dense colonies on islands and floating vegetation. Both parents incubate the 2–3 eggs. They are vocal and aggressive in defending nests, dive-bombing intruders. Opportunistic feeders, they scavenge around human settlements and military camps as well as fishing on the lakes.',
      conservation: 'Benefits from Ramsar site protection at Tso Kar and Tso Moriri. The species serves as A useful indicator of lake ecosystem health — declining gull numbers can signal pollution or disturbance. No specific conservation programmes target the species in Ladakh.',
      threats: ['Lake pollution from tourism', 'Egg collection', 'Feral dog nest predation', 'Climate change affecting lake levels', 'Disturbance from boating at Pangong', 'Decline in aquatic invertebrates'],
      photos: [
        { title: 'Breeding Colony', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-water', location: 'Pangong Tso', desc: ' A bustling colony of brown-headed gulls on the shores of Pangong — the world\'s highest gull nursery.' },
        { title: 'Brown-headed Plumage', image: 'https://images.unsplash.com/photo-1506220926022-cc2c17377c86?auto=format&fit=crop&q=80&w=800', icon: 'bi-palette', location: 'Tso Kar', desc: 'Close-up showing the distinctive chocolate-brown breeding head and red bill.' },
        { title: 'Floating Nest', image: 'https://images.unsplash.com/photo-1522000240402-a4234b77c46a?auto=format&fit=crop&q=80&w=800', icon: 'bi-house', location: 'Tso Moriri', desc: ' A floating platform nest made of aquatic vegetation with three speckled eggs.' },
        { title: 'In Flight', image: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=800', icon: 'bi-arrow-up-right', location: 'Pangong Tso', desc: 'White wings and grey mantle contrasting against the deep blue of Pangong\'s waters.' },
        { title: 'Winter Plumage', image: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow', location: 'Indus River, Leh', desc: ' A gull in non-breeding white-headed plumage resting by the frozen Indus River.' },
      ],
      image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-rulers', label: 'Length', value: '42–44 cm' },
        { icon: 'bi-arrows-fullscreen', label: 'Wingspan', value: '100–115 cm' },
        { icon: 'bi-speedometer2', label: 'Weight', value: '500–700 g' },
        { icon: 'bi-geo-alt', label: 'Breeding altitude', value: '4,200–4,600m' },
        { icon: 'bi-egg', label: 'Clutch Size', value: '2–3 eggs' },
        { icon: 'bi-heart-pulse', label: 'Lifespan', value: '10–15 years' },
      ],
      relatedSlugs: ['bar-headed-goose', 'black-necked-crane', 'robin-accentor'],
    },
    {
      slug: 'robin-accentor',
      name: 'Robin accentor',
      scientific: 'Prunella rubeculoides',
      population: 'Common resident',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-music-note',
      color: '#dc2626',
      habitat: 'Scrublands, rocky slopes, 3,000–5,200m',
      diet: 'Insects, spiders, seeds, berries',
      description: ' A small, robin-like bird common across Ladakh — its sweet melodic song brightens the otherwise silent, barren high-altitude landscape.',
      lat: 34.1526, lng: 77.5771, zoom: 9,
      overview: 'The Robin accentor is A small passerine that brings A touch of warmth to Ladakh\'s otherwise stark and silent landscape. With its orange-red breast patch, grey head, and streaked brown back, it resembles A European robin and sings A similarly melodious, rising song.\n\nFound across Ladakh from 3,000m to over 5,200m, it is one of the most commonly encountered small birds on treks and around settlements. It frequents scrublands, rocky slopes, and the edges of streams and irrigation channels.\n\nDespite its ubiquity, the robin accentor is remarkably adapted to extreme conditions. It can maintain its body temperature at ambient temperatures of -30ÂaC, and its metabolic rate increases dramatically at altitude to compensate for lower oxygen levels.\n\nFor trekkers and visitors, the sweet, bright song of the robin accentor is often the defining sound memory of A Ladakh journey.',
      highlights: ['Common across all of Ladakh', 'Sweet melodic song', 'Orange-red breast patch', 'Survives at -30ÂaC', 'Found up to 5,200m', 'Defining sound of Ladakh treks'],
      behavior: 'Robin accentors are usually seen singly or in pairs, hopping actively among rocks and bushes. They feed by gleaning insects and spiders from the ground and low vegetation. Males sing from prominent perches — rock tops, fence posts, and building corners — especially at dawn and dusk. They build cup-shaped nests in rock crevices and low scrub, laying 3–5 blue eggs.',
      conservation: 'No specific conservation measures are needed. This is one of Ladakh\'s most common and adaptable birds. It benefits from the presence of human settlements, gardens, and irrigated fields which provide food and nesting opportunities.',
      threats: ['Cat predation near settlements', 'Loss of scrubland to development', 'Pesticide use in agriculture', 'Harsh winter die-offs', 'Window collisions in new buildings', 'Climate change affecting insects'],
      photos: [
        { title: 'Singing Male', image: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=800', icon: 'bi-music-note', location: 'Leh', desc: ' A male robin accentor in full song from A prominent rock — the sweet sound carries across the valley.' },
        { title: 'Orange Breast Display', image: 'https://images.unsplash.com/photo-1506220926022-cc2c17377c86?auto=format&fit=crop&q=80&w=800', icon: 'bi-heart-fill', location: 'Hemis', desc: 'Close-up showing the distinctive orange-red breast patch and grey hood.' },
        { title: 'Feeding on Ground', image: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?auto=format&fit=crop&q=80&w=800', icon: 'bi-search', location: 'Markha Valley', desc: 'Hopping among rocks, gleaning tiny insects and spiders from the barren ground.' },
        { title: 'High altitude Territory', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-geo-alt', location: 'Khardung La, 5,200m', desc: 'One of the highest-living passerines — spotted near the world\'s highest motorable pass.' },
        { title: 'Nest with Eggs', image: 'https://images.unsplash.com/photo-1522000240402-a4234b77c46a?auto=format&fit=crop&q=80&w=800', icon: 'bi-egg', location: 'Spituk', desc: ' A neat cup nest hidden in A rock crevice with 4 beautiful blue eggs.' },
      ],
      image: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-rulers', label: 'Length', value: '15–17 cm' },
        { icon: 'bi-speedometer2', label: 'Weight', value: '18–25 g' },
        { icon: 'bi-geo-alt', label: 'altitude Range', value: '3,000–5,200m' },
        { icon: 'bi-thermometer-snow', label: 'Cold Tolerance', value: '-30ÂaC' },
        { icon: 'bi-egg', label: 'Clutch Size', value: '3–5 eggs' },
        { icon: 'bi-heart-pulse', label: 'Lifespan', value: '3–5 years' },
      ],
      relatedSlugs: ['himalayan-snowcock', 'tibetan-sandgrouse', 'golden-eagle'],
    },
  ];
}




