import { Component, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LeafletMapComponent } from '../../shared/leaflet-map/leaflet-map';

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ data interfaces â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface Photo  { id: number; title: string; location: string; description: string; image: string; icon: string; }
interface Fact   { icon: string; label: string; value: string; }
interface Related { slug: string; name: string; icon: string; color: string; type: string; }

interface Protectedarea {
  slug: string; name: string; area: string; established: string;
  status: string; statusColor: string; icon: string; color: string; gradient: string;
  description: string; overview: string;
  historicalAccounts: string; myths: string; research: string;
  image: string; heroImage: string;
  highlights: string[]; keySpecies: string; visitorInfo: string;
  lat: number; lng: number; zoom?: number;
  threats: string[]; photos: Photo[]; facts: Fact[]; related: Related[];
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ enriched dataset (1800-2026 Context) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const aREaS: Protectedarea[] = [
  {
    slug: 'hemis-national-park',
    name: 'Hemis National Park',
    area: '4,400 kmÂ²',
    established: '1981',
    status: 'National Park',
    statusColor: '#2d6a4f',
    icon: 'bi-tree',
    color: '#2d6a4f',
    gradient: 'linear-gradient(135deg,#2d6a4f,#40916c,#52b788)',
    description: 'The largest national park in South asia and the only one north of the Himalayas, Hemis is the crown jewel of Ladakh\'s protected areas, famed for its snow leopards and ancient heritage.',
    overview: `Hemis National Park, established in 1981, is the largest national park in South asia, spanning an extraordinary 4,400 square kilometers of rugged trans-Himalayan landscape. Located in the eastern Ladakh region of Jammu & Kashmir, the park encompasses a breathtaking range of elevations from 3,300 to 6,000 meters above sea level.

The park is globally celebrated as the premier habitat for the elusive Snow Leopard, with one of the highest known densities of this magnificent big cat. The Hemis ecosystem supports a remarkable diversity of wildlife adapted to extreme high-altitude conditions, including the Himalayan Brown Bear, Tibetan Wolf, Eurasian Lynx, and the Bharal (Blue Sheep).

Beyond its ecological significance, Hemis holds immense cultural weight. It houses the ancient Hemis Monastery, dating back to the 11th century, which acts as the spiritual heart for the surrounding valleys. The integration of monastic stewardship with wildlife conservation has created a unique, successful model of coexistence spanning centuries.`,
    historicalAccounts: `The valleys of Hemis have long fascinated foreign explorers. In the 1820s, William Moorcroft and George Trebeck traversed these rugged gorges during their pioneering Himalayan expeditions, noting the profound starkness of the landscape and the robust trade caravans crossing its high passes. Later, in 1854, alexander Cunningham's exhaustive 'Ladakh: Physical, Statistical and Historical' provided the first scientific documentation of the region's unique high-altitude fauna, marveling at the abundance of the Bharal (Blue Sheep) which still forms the primary prey base for predators today. Early colonial accounts often described the terrain as impenetrable, failing to understand the intricate seasonal migrations of the local agro-pastoral communities.`,
    myths: `Local Ladakhi folklore is deeply entwined with the wildlife of Hemis. The Snow Leopard, rather than being feared as a mere predator, is often revered in ancient myths as a shape-shifting mountain spiritâ€”a silent guardian placed by the deities to protect the high valleys from demonic forces. another enduring story is that of the 'Tsodpa' (the Ladakhi equivalent of the Yeti); elders in the Rumbak valley still recount tales from the 19th century of giant, bipedal shadows seen during severe blizzards. Furthermore, legends surrounding Guru Padmasambhava (the founder of Tibetan Buddhism) suggest he meditated in the caves of Hemis to subdue hostile local spirits, binding them to protect the land's natural harmony.`,
    research: `Scientific study in Hemis has accelerated drastically in the 2020s. a landmark camera-trap survey spanning 2024â€“2025, utilizing aI-based pattern recognition (CaTRaT), confirmed that Ladakh hosts approximately 477 Snow Leopards, with Hemis continuing to hold the highest density worldwide. additionally, January 2026 studies published by the Wildlife Institute of India mapped the isolated genetics of the Himalayan Brown Bear within the park's periphery, highlighting an urgent need for wildlife corridors. Geologically, recent deep-strata analysis by the Wadia Institute of Himalayan Geology (March 2026) has further detailed the 130-million-year tectonic evolution of the Ladakh Magmatic arc that forms the bedrock of the park's dramatic gorges.`,
    image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=600',
    heroImage: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=1600',
    lat: 33.8583, lng: 77.3000, zoom: 9,
    highlights: [
      'Highest density of Snow Leopards globally',
      'Largest national park in South asia',
      'Home to the 11th-century Hemis Monastery',
      'Significant historical accounts by 1820s explorers',
      'Elevations ranging from 3,300m to 6,000m',
      'Pioneering 2025 aI-assisted wildlife census site'
    ],
    keySpecies: `Hemis National Park is undoubtedly the stronghold of the Snow Leopard. Scientific surveys estimate an unparalleled density of these solitary cats, navigating the deep gorges and rocky outcrops. The Bharal (Blue Sheep) remains the primary prey species, grazing on precipitous slopes. Other notable mammals include the endangered Himalayan Brown Bear, the highly intelligent Tibetan Wolf, the Eurasian Lynx, the Red Fox, and the sure-footed asiatic Ibex. The park's avian diversity features over 200 species, highlighted by the massive Golden Eagle, the bone-crushing Lammergeier (Bearded Vulture), and the Himalayan Snowcock.`,
    visitorInfo: `accessible from Leh via road, the best time to visit Hemis is from May to October for trekking, or entirely in deep winter (January-February) for dedicated 'Snow Leopard Expeditions'. Permits from the Wildlife Department are mandatory. The famed Markha Valley Trek bisects the park, offering unparalleled immersion. Visitors are urged to respect local homestays (especially in Rumbak) which form the backbone of community-led conservation efforts.`,
    threats: [
      'Climate change altering snow patterns and prey distribution',
      'Human-wildlife conflict with pastoral communities',
      'Increasing unregulated winter tourism pressure',
      'Habitat fragmentation from rapid road construction',
      'Feral dog packs posing threats to juvenile wildlife'
    ],
    photos: [
      { id: 1, title: 'Snow Leopard Territory', location: 'Rumbak Valley', description: 'Prime habitat for the elusive Snow Leopard amidst stark rock formations.', image: 'https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 2, title: 'Markha Valley Gorge', location: 'Central Hemis', description: 'The famous trekking route slicing through millions of years of geological history.', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 3, title: 'Hemis Monastery', location: 'Park Entrance', description: 'The spiritual epicenter of the region, dating back to the 11th century.', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 4, title: 'High alpine Grazing', location: 'Upper Rumbak', description: 'Bharal and Ibex foraging on the precipitous summer meadows.', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 5, title: 'Winter\'s Grip', location: 'Zanskar Gorge', description: 'The harshest winter conditions where only the most adapted predators survive.', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' }
    ],
    facts: [
      { icon: 'bi-rulers', label: 'Total area', value: '4,400 kmÂ²' },
      { icon: 'bi-calendar-event', label: 'Established', value: '1981' },
      { icon: 'bi-snow2', label: 'Snow Leopards', value: 'Highest global density' },
      { icon: 'bi-feather', label: 'avian Species', value: '200+' },
      { icon: 'bi-book', label: 'First Mapped', value: '1850s (Cunningham)' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'Eastern Ladakh' }
    ],
    related: [
      { slug: 'changthang-sanctuary', name: 'Changthang Sanctuary', icon: 'bi-shield-check', color: '#1a759f', type: 'Wildlife Sanctuary' },
      { slug: 'karakoram-sanctuary', name: 'Karakoram Sanctuary', icon: 'bi-mountains', color: '#6d597a', type: 'Wildlife Sanctuary' }
    ]
  },
  {
    slug: 'changthang-sanctuary',
    name: 'Changthang Wildlife Sanctuary',
    area: '4,000 kmÂ²',
    established: '1987',
    status: 'Wildlife Sanctuary',
    statusColor: '#1a759f',
    icon: 'bi-shield-check',
    color: '#1a759f',
    gradient: 'linear-gradient(135deg,#1a759f,#168aad,#34a0a4)',
    description: 'a vast high-altitude plateau masking intense geological activity, it protects the unique wildlife of the Changthang, including the rare Tibetan Wild ass and Black-necked Crane.',
    overview: `The Changthang Wildlife Sanctuary, established in 1987, protects roughly 4,000 square kilometers of the spectacular Changthang Plateau. Situated at extreme elevations between 4,200 and 6,200 meters, it is one of the highest biodiversity reserves in the world.

Characterized by vast rolling grasslands, brackish endorheic lakes (including Pangong Tso, Tso Moriri, and Tso Kar), and unforgiving snow-covered peaks, this sanctuary is an ecological marvel. It forms a crucial breeding ground for high-altitude migratory birds and sustains large herds of nomadic ungulates.

The Changthang is also the traditional homeland of the Changpa nomads. Their deep-rooted pastoral lifestyleâ€”grazing the world-famous Pashmina goatsâ€”has coexisted with the local wildlife for millennia, offering a powerful study in ancient, sustainable agro-pastoralism in extreme environments.`,
    historicalAccounts: `The Changthang plateau was long considered one of the most perilous regions by early explorers. Sven Hedin's dramatic crossings in the late 19th and early 20th centuries yielded harrowing accounts of blistering, bone-chilling winds and the surreal sight of massive, free-roaming herds of Kiang (Tibetan Wild ass). British administrators in the 1870s documented the crucial Pashmina trade that originated here, highlighting how the harsh climate was entirely responsible for the exquisite quality of the wool. These historical logs are crucial for modern ecologists studying century-long climate shifts on the plateau.`,
    myths: `The vast, haunting emptiness of the Changthang has birthed numerous myths. a prevailing Changpa legend speaks of the 'Giant Ice Worm' that burrows beneath the permafrost, said to be responsible for the sudden, terrifying sinkholes and geothermal vents that unexpectedly open perfectly frozen lakes. The lakes themselves are personified; Tso Moriri is believed to be the teardrop of a celestial deity weeping for the harshness of the land. Furthermore, the Black-necked cranes are revered as reincarnated monks returning to patrol the high plains.`,
    research: `In recent years (2025â€“2026), the Changthang has been the focus of intense ecological and geological study. February 2026 assessments emphasized the severe degradation of its high-altitude wetlands due to shifting precipitation patterns and mass tourism, threatening the precarious breeding cycle of the Black-necked crane. Geologically, a groundbreaking 2026 geophysical survey identified a massive, hidden unified reservoir of magma deep beneath the Puga and Chumathang areasâ€”providing evidence for high-enthalpy geothermal resources that offer immense clean energy potential, fundamentally changing our understanding of the plateau's subsurface volatility.`,
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=600',
    heroImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1600',
    lat: 33.2000, lng: 78.8500, zoom: 8,
    highlights: [
      'Primary Indian habitat for the Tibetan Wild ass (Kiang)',
      'Crucial breeding ground for the Black-necked Crane',
      'Site of the 2026 hidden geothermal magma reservoir discovery',
      'Encompasses Pangong Tso, Tso Moriri, and Tso Kar',
      'Historic 19th-century exploration routes (Sven Hedin)',
      'Traditional homeland of the Pashmina-rearing Changpa nomads'
    ],
    keySpecies: `The sanctuary is the undisputed domain of the Tibetan Wild ass (Kiang), whose herds gallop across the plains at breathtaking speeds. It is the most critical Indian breeding site for the highly endangered Black-necked Crane and the Bar-headed Goose. Other vital species include the Tibetan Gazelle (whose numbers are gravely declining), the pack-hunting Tibetan Wolf, the Himalayan Marmot, the Red Fox, and the incredibly elusive Pallas's Cat.`,
    visitorInfo: `Inner Line Permits (ILP) or Protected area Permits (PaP) obtained in Leh are mandatory. The extreme altitude (averaging 4,500m) demands rigorous prior acclimatization. The best visiting window is June to September (the crane breeding season). accommodation is strictly limited to nomadic homestays and basic camps in Korzok, Hanle, and Spangmik.`,
    threats: [
      'Rapid climate change shrinking lake shorelines and wetlands',
      'Geopolitical military infrastructure expansion disrupting corridors',
      'Explosion of feral dog populations attacking native wildlife',
      'Tourism-driven waste generation in pristine micro-habitats',
      'Overgrazing pressures threatening the traditional Changpa balance'
    ],
    photos: [
      { id: 1, title: 'Kiang Herds on the Move', location: 'Hanle Plains', description: 'Wild ass herds galloping across the vast, unforgiving steppe.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 2, title: 'Endangered Courtship', location: 'Tso Kar Wetlands', description: 'Black-necked Cranes engaged in their elaborate breeding season dances.', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 3, title: 'The Great Blue Expanse', location: 'Pangong Tso', description: 'The stunning, ever-changing colors of the colossal Pangong lake.', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 4, title: 'Nomadic Resilience', location: 'Korzok Village', description: 'a traditional Changpa winter encampment bracing against the wind.', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 5, title: 'Cosmic Views', location: 'Hanle', description: 'The Indian astronomical Observatory beneath some of Earth\'s clearest night skies.', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' }
    ],
    facts: [
      { icon: 'bi-rulers', label: 'Total area', value: '4,000 kmÂ²' },
      { icon: 'bi-arrow-up', label: 'avg Elevation', value: '4,500 m' },
      { icon: 'bi-speedometer2', label: 'Kiang Pop.', value: '2,000-3,000' },
      { icon: 'bi-fire', label: 'Geology', value: 'active Geothermal' },
      { icon: 'bi-feather', label: 'Crane Pairs', value: '~20 breeding' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'Eastern Ladakh' }
    ],
    related: [
      { slug: 'hemis-national-park', name: 'Hemis National Park', icon: 'bi-tree', color: '#2d6a4f', type: 'National Park' },
      { slug: 'tso-moriri-wetland', name: 'Tso Moriri Wetland', icon: 'bi-water', color: '#0077b6', type: 'Ramsar Site' }
    ]
  },
  {
    slug: 'karakoram-sanctuary',
    name: 'Karakoram Wildlife Sanctuary',
    area: '5,000 kmÂ²',
    established: '1987',
    status: 'Wildlife Sanctuary',
    statusColor: '#6d597a',
    icon: 'bi-mountains',
    color: '#6d597a',
    gradient: 'linear-gradient(135deg,#6d597a,#b56576,#e56b6f)',
    description: 'Protecting some of the most inaccessible mountain ecosystems on Earth, this sanctuary encompasses the mighty Siachen glacier and historic, deadly Silk Route trails.',
    overview: `The Karakoram Wildlife Sanctuary is a realm of superlatives. Covering 5,000 square kilometers of dramatic, hyper-arid mountain terrain in northern Ladakh, it protects the Indian segment of the formidable Karakoram Range.

The sanctuary features massive glacial systems, most notably the Siachen Glacierâ€”often cited as the longest glacier outside the polar regions. The topography consists of deep, twisting river valleys carved by the Shyok and Nubra rivers, flanked by jagged vertical peaks soaring well above 7,000 meters. 

Because of its extreme proximity to contested international borders, it is heavily militarized and largely off-limits to tourism. This enforced isolation has inadvertently created a massive, untouched ecological buffer zone, though it severely limits systematic scientific study.`,
    historicalAccounts: `The Karakoram pass was the most notorious bottleneck of the ancient Silk Route network connecting Leh to Yarkand in Central asia. During the 'Great Game' of the late 19th century, explorers like Francis Younghusband (1887) and arthur Neve traversed these valleys, mapping the unknown under grueling conditions. accounts from these eras frequently refer to the route as the 'Skeleton Trail,' named for the grim abundance of horse, camel, and human bones littering the path due to sudden, catastrophic blizzards and extreme altitude sickness long before modern mountaineering logistics existed.`,
    myths: `a landscape this lethal naturally generated powerful myths. Traders crossing into Central asia carried tales of 'Shambala,' a mythical, enlightened kingdom supposedly hidden within an impossibly deep valley in the Karakoram, shielded by perpetual snowstorms. another prevalent myth involved the 'Karakoram Djinns,' malevolent wind spirits believed to lure solitary travelers off the icy cliffs with the voices of their loved ones. To this day, local guides maintain profound superstitious respect for certain storm-battered passes.`,
    research: `Research in the Karakoram is incredibly challenging due to the geopolitical climate, yet vital for global climate modeling. Studies published in 2025 and 2026 heavily focus on glaciology rather than pure biology, tracking the alarming melt rates of the Siachen and surrounding glaciers which serve as the 'water tower' for much of South asia. Ecologically, recent remote sensing and high-altitude deep-camera traps deployed by military-backed environmental researchers have officially confirmed the persistent presence of the elusive Pallas's Cat and thriving populations of Himalayan Ibex, proving the resilience of these species in a heavily militarized 'no-man's land.'`,
    image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=600',
    heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
    lat: 34.8000, lng: 77.6333, zoom: 8,
    highlights: [
      'Encompasses the Indian Karakoram Range & Siachen Glacier',
      'Historically known as the deadly "Skeleton Trail" of the Silk Route',
      'Crucial glaciological study site for 2026 climate modeling',
      'One of the least explored, most militarized sanctuaries globally',
      'Hosts peaks exceeding 7,000 meters elevation',
      'Inadvertent wildlife buffer zone due to border isolation'
    ],
    keySpecies: `Despite the extreme cold and barren rock, the sanctuary hosts specialized megafauna. The Snow Leopard patrols the glacial moraines, preying almost entirely on the robust populations of Himalayan Ibex that cling to the sheer cliffs. The Tibetan Wolf, Himalayan Brown Bear, Stone Marten, and Pallas's Cat eke out existences in the lower valleys. avian diversity is dominated by raptors like the Golden Eagle, Himalayan Griffon, and the Lammergeier.`,
    visitorInfo: `access is strictly regulated and heavily restricted. Civilians are absolutely forbidden from entering the northern and glacier-adjacent zones. Limited access is permitted via the Nubra Valley for Indian nationals (with permits), serving as the southern gateway to the sanctuary's periphery. Proper high-altitude logistical backing is crucial for any authorized expedition.`,
    threats: [
      'Heavy military presence, artillery exercises, and infrastructure',
      'accelerated glacial retreat threatening the entire watershed',
      'Flash floods triggered by glacial lake outburst floods (GLOFs)',
      'Severe lack of sustained, independent biological monitoring',
      'Solid waste accumulation from high-altitude troop deployments'
    ],
    photos: [
      { id: 1, title: 'The Jagged Crown', location: 'Northern Karakoram', description: 'The unforgiving, razor-sharp peaks of the mighty Karakoram Range.', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 2, title: 'The Skeleton Trail', location: 'Karakoram Pass approach', description: 'The historic and deadly trade routes crossed by 19th-century explorers.', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 3, title: 'Siachen Meltwaters', location: 'Upper Nubra', description: 'Glacial rivers carving deep into the ancient rock formations.', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 4, title: 'Ibex Domain', location: 'Shyok Valley Cliffs', description: 'Near-vertical cliffs functioning as the primary habitat for the region\'s ibex.', image: 'https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 5, title: 'Barren Isolation', location: 'Border Regions', description: 'The immense, silent isolation of the highest militarized zone on Earth.', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' }
    ],
    facts: [
      { icon: 'bi-snow2', label: 'Glacier area', value: '~2,000 kmÂ²' },
      { icon: 'bi-rulers', label: 'Total area', value: '5,000 kmÂ²' },
      { icon: 'bi-arrow-up', label: 'Max Elevation', value: '7,000+ m' },
      { icon: 'bi-thermometer-snow', label: 'Winter Temp', value: '-40ÂaC to -50ÂaC' },
      { icon: 'bi-book', label: 'Exploration', value: 'Late 1800s (Great Game)' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'Northern Ladakh' }
    ],
    related: [
      { slug: 'changthang-sanctuary', name: 'Changthang Sanctuary', icon: 'bi-shield-check', color: '#1a759f', type: 'Wildlife Sanctuary' }
    ]
  },
  {
    slug: 'tso-moriri-wetland',
    name: 'Tso Moriri Wetland Reserve',
    area: '120 kmÂ²',
    established: '2002 (Ramsar)',
    status: 'Ramsar Site',
    statusColor: '#0077b6',
    icon: 'bi-water',
    color: '#0077b6',
    gradient: 'linear-gradient(135deg,#0077b6,#0096c7,#00b4d8)',
    description: 'a Ramsar site of international importance, Tso Moriri is a pristine, deep-water lake ecosystem supporting rare breeding waterfowl and ancient nomadic cultures.',
    overview: `Tso Moriri Wetland Reserve, designated a Ramsar Site of International Importance in 2002, encapsulates the stunning 120 square kilometers surrounding Tso Moriri Lake. at an elevation of 4,522 meters, it reigns as one of the highest true Ramsar sites on the planet.

The lake itself is an oligotrophic expanseâ€”28 kilometers long and up to 40 meters deepâ€”whose remarkably clear waters shift dramatically in color based on the sun's angle against the surrounding 6,000-meter snow-capped peaks. 

Beyond its visual majesty, it is a critical biological anchor for the Changthang. It serves as the largest breeding ground for the Bar-headed Goose in India and a vital sanctuary for the Black-necked Crane. The lake is intrinsically linked to the cultural survival of the Changpa nomads and the ancient Korzok monastery perched on its western cliffs.`,
    historicalAccounts: `The earliest structured western surveys of Tso Moriri occurred during the Trigonometrical Survey of India in the mid-19th century. Surveyors were astounded by the lake's impossible blue hues and the deafening noise of thousands of breeding waterfowl. Early British naturalists meticulously charted the migration patterns of the Bar-headed geese from these shores. an 1860s dispatch noted with awe how the nomadic Changpa lived in symbiosis with such an alien, unforgiving landscape without attempting to permanently conquer it.`,
    myths: `Tso Moriri's name directly stems from a tragic local myth. 'Moriri' translates roughly to 'Lake of the Mountain Pass.' Legend states that a young Changpa girl named Chomo was once herding her yaks when the ice of a small pond suddenly collapsed, swallowing her whole. as she drowned, her tears expanded the pond into the massive lake seen today. Locals still claim that during the deepest silence of winter, you can hear her calling out for her lost yaks beneath the cracking ice.`,
    research: `as a designated Ramsar site, Tso Moriri is under constant ecological surveillance. a major 2026 ornithological paper shed light on the extreme hypoxia adaptations of the waterfowl breeding here. Furthermore, geological sensors deployed recently have continuously monitored the subtle geothermal variations on the lake bed, tracking how underlying tectonic heat impacts the complex, micro-floral blooms that sustain the entire aquatic food chain. Planners are currently utilizing this data to battle the creeping threat of reduced water inflow due to upstream vanishing glaciers.`,
    image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=600',
    heroImage: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1600',
    lat: 32.9333, lng: 78.3167, zoom: 10,
    highlights: [
      'Declared a Ramsar Site of International Importance in 2002',
      'One of the highest Ramsar sites globally at 4,522m',
      'Largest Indian breeding colony of Trans-Himalayan Bar-headed Geese',
      'Deeply researched site for hypoxia adaptations in waterfowl (2026)',
      'Lake depth reaches 40m with pristine turquoise waters',
      'Host to ancient Korzok Monastery and Changpa traditions'
    ],
    keySpecies: `The lake's summer ecosystem is defined by its birds. It hosts the largest breeding colony of Bar-headed Geese in India, known for their astonishing high-altitude migration over the Himalayas. The endangered Black-necked Crane, Brahminy Duck, and Great Crested Grebe nest in the fragile surrounding marshlands. The terrestrial boundary supports the Tibetan Wild ass (Kiang), Tibetan Wolf, and the endemic Himalayan Marmot. The lake's depths contain populations of the specialized Ladakh Snowtrout.`,
    visitorInfo: `Located 220 kilometers southeast of Leh, the journey takes 7-8 hours. all visitors require an Inner Line Permit. The optimal window for birdwatching and photography is June to September. Modest homestays and seasonal camps operate in Korzok village. acclimatization prior to arrival is absolutely critical given the severe altitude.`,
    threats: [
      'Climate change significantly altering glacier-fed water inflows',
      'Surges in unregulated tourism causing immediate wetland degradation',
      'Feral dog predation wreaking havoc on ground-nesting bird colonies',
      'Inadequate waste management infrastructure near Korzok',
      'Disruption of centuries-old nomadic grazing cycles'
    ],
    photos: [
      { id: 1, title: 'The Sapphire Expanse', location: 'Western Shore', description: 'The impossibly clear waters reflecting the harsh Trans-Himalayan sky.', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 2, title: 'Bar-headed Geese Colony', location: 'Lake Islands', description: 'The famous high-altitude geese preparing for their monumental migration.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 3, title: 'Korzok Monastery', location: 'Korzok Village', description: 'ancient spiritual sentinels watching over the waters.', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 4, title: 'Fragile Wetlands', location: 'Southern Shore', description: 'The delicate, muddy marshlands crucial for crane nesting.', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' },
      { id: 5, title: 'alpenglow Sunset', location: 'Eastern Peaks', description: 'The surrounding 6,000m peaks turning violent orange at dusk.', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', icon: 'bi-camera' }
    ],
    facts: [
      { icon: 'bi-calendar-event', label: 'Ramsar Since', value: '2002' },
      { icon: 'bi-rulers', label: 'Lake Length', value: '28 km' },
      { icon: 'bi-water', label: 'Max Depth', value: '40 m' },
      { icon: 'bi-arrow-up', label: 'Elevation', value: '4,522 m' },
      { icon: 'bi-feather', label: 'Breeding Birds', value: 'Thousands' },
      { icon: 'bi-geo-alt', label: 'Location', value: 'Changthang' }
    ],
    related: [
      { slug: 'changthang-sanctuary', name: 'Changthang Sanctuary', icon: 'bi-shield-check', color: '#1a759f', type: 'Wildlife Sanctuary' }
    ]
  }
];

@Component({
  selector: 'app-protected-area-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LeafletMapComponent],
  templateUrl: './protected-area-detail.html',
  styleUrl: './protected-area-detail.scss',
  host: { '(document:keydown.escape)': 'onEscape()' }
})
export class ProtectedAreaDetail {
  area = signal<Protectedarea | null>(null);

  /* lightbox */
  lightboxPhoto = signal<Photo | null>(null);
  openLightbox(p: Photo) { this.lightboxPhoto.set(p); }
  closeLightbox()         { this.lightboxPhoto.set(null); }
  onEscape()              { this.closeLightbox(); }

  /* related helper */
  relatedAreas = computed(() => {
    const a = this.area();
    if (!a) return [];
    return a.related.map(r => {
      const match = aREaS.find(x => x.slug === r.slug);
      return { ...r, found: !!match };
    });
  });

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.area.set(aREaS.find(a => a.slug === slug) ?? null);
    });
  }
}




