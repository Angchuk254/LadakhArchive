import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface SearchItem {
  name: string;
  slug: string;
  category: string;
  icon: string;
  color: string;
  desc: string;
  route: string;
  tag?: string;
}

interface CategoryDef {
  label: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {

  query = signal('');
  activeCategory = signal('all');

  categories: CategoryDef[] = [
    { label: 'all', icon: 'bi-grid-3x3-gap-fill', color: '#1a365d' },
    { label: 'Villages', icon: 'bi-houses-fill', color: '#059669' },
    { label: 'Monasteries', icon: 'bi-building', color: '#7c3aed' },
    { label: 'Wildlife', icon: 'bi-binoculars-fill', color: '#c8702a' },
    { label: 'Birds', icon: 'bi-feather2', color: '#b45309' },
    { label: 'Flora', icon: 'bi-flower2', color: '#16a34a' },
    { label: 'Lakes', icon: 'bi-water', color: '#0284c7' },
    { label: 'Treks', icon: 'bi-signpost-split-fill', color: '#10b981' },
    { label: 'Road Trips', icon: 'bi-truck', color: '#dc2626' },
    { label: 'Monuments', icon: 'bi-bank2', color: '#854d0e' },
    { label: 'Festivals', icon: 'bi-sun-fill', color: '#d97706' },
    { label: 'Institutions', icon: 'bi-mortarboard-fill', color: '#2563eb' },
    { label: 'Blog', icon: 'bi-journal-richtext', color: '#6d28d9' },
  ];

  items: SearchItem[] = [
    // â”€â”€ Villages â”€â”€
    { name: 'Leh', slug: 'leh', category: 'Villages', icon: 'bi-building', color: '#1a365d', desc: 'Capital of Ladakh, Ancient trade hub, Leh Palace', route: '/village-search/leh', tag: 'Leh' },
    { name: 'Diskit', slug: 'diskit', category: 'Villages', icon: 'bi-flag', color: '#c8702a', desc: 'Diskit Gompa, Nubra gateway, Maitreya Buddha', route: '/village-search/diskit', tag: 'Leh' },
    { name: 'Hunder', slug: 'hunder', category: 'Villages', icon: 'bi-umbrella', color: '#059669', desc: 'Bactrian camels, sand dunes, Silk Road heritage', route: '/village-search/hunder', tag: 'Leh' },
    { name: 'Hemis', slug: 'hemis-village', category: 'Villages', icon: 'bi-bank', color: '#7c3aed', desc: 'Hemis Gompa, Hemis Festival, Snow Leopard habitat', route: '/village-search/hemis', tag: 'Leh' },
    { name: 'Turtuk', slug: 'turtuk', category: 'Villages', icon: 'bi-geo-alt', color: '#dc2626', desc: 'Last village on LOC, Balti culture, apricots', route: '/village-search/turtuk', tag: 'Leh' },
    { name: 'Pangong', slug: 'pangong', category: 'Villages', icon: 'bi-water', color: '#0284c7', desc: 'Pangong Tso, colour-shifting lake, 3 Idiots location', route: '/village-search/pangong', tag: 'Leh' },
    { name: 'Kargil', slug: 'kargil', category: 'Villages', icon: 'bi-shield', color: '#0f2240', desc: 'Kargil War Memorial, Suru Valley gateway, Purig culture', route: '/village-search/kargil', tag: 'Kargil' },
    { name: 'Dras', slug: 'dras', category: 'Villages', icon: 'bi-snow', color: '#475264', desc: 'Second coldest inhabited place, Kargil War theatre', route: '/village-search/dras', tag: 'Kargil' },
    { name: 'Zanskar (Padum)', slug: 'padum', category: 'Villages', icon: 'bi-snow2', color: '#6d28d9', desc: 'Chadar Trek, remote Buddhist kingdom, frozen river walks', route: '/village-search/padum', tag: 'Kargil' },
    { name: 'Thiksey', slug: 'thiksey', category: 'Villages', icon: 'bi-building', color: '#b45309', desc: 'Thiksey Gompa, Mini Potala, morning prayer ceremony', route: '/village-search/thiksey', tag: 'Leh' },
    { name: 'Lamayuru', slug: 'lamayuru', category: 'Villages', icon: 'bi-moon', color: '#854d0e', desc: 'Moonland landscape, Ancient monastery, butter festivals', route: '/village-search/lamayuru', tag: 'Leh' },
    { name: 'Hanle', slug: 'hanle', category: 'Villages', icon: 'bi-stars', color: '#1e3a5f', desc: 'Dark Sky Reserve, astronomical observatory', route: '/village-search/hanle', tag: 'Leh' },
    { name: 'Chumathang', slug: 'chumathang', category: 'Villages', icon: 'bi-droplet-half', color: '#d97706', desc: 'Natural hot springs, geothermal energy, Indus Valley scenery', route: '/village-search/chumathang', tag: 'Leh' },
    { name: 'Chilling', slug: 'chilling', category: 'Villages', icon: 'bi-hammer', color: '#92400e', desc: 'Copper craftsmanship, Markha Valley trailhead', route: '/village-search/chilling', tag: 'Leh' },
    { name: 'Tso Kar', slug: 'tso-kar', category: 'Villages', icon: 'bi-droplet', color: '#1e40af', desc: 'Ramsar wetland, salt lake, Changpa nomads', route: '/village-search/tso-kar', tag: 'Leh' },

    // â”€â”€ Monasteries â”€â”€
    { name: 'Hemis Monastery', slug: 'hemis', category: 'Monasteries', icon: 'bi-building', color: '#7c3aed', desc: 'Largest Buddhist monastery in Ladakh, Drukpa Kagyu sect, founded 1672', route: '/monasteries/hemis' },
    { name: 'Thiksay Monastery', slug: 'thiksay', category: 'Monasteries', icon: 'bi-building', color: '#c8702a', desc: 'Resembles Potala Palace, Gelug sect, founded 1430', route: '/monasteries/thiksay' },
    { name: 'Diskit Monastery', slug: 'diskit', category: 'Monasteries', icon: 'bi-building', color: '#059669', desc: 'Oldest in Nubra Valley, 32m Maitreya Buddha, Gelug sect', route: '/monasteries/diskit' },
    { name: 'alchi Monastery', slug: 'alchi', category: 'Monasteries', icon: 'bi-building', color: '#2563eb', desc: 'UNESCO-nominated, 1000-year-old Kashmiri Buddhist art', route: '/monasteries/alchi' },
    { name: 'Lamayuru Monastery', slug: 'lamayuru', category: 'Monasteries', icon: 'bi-building', color: '#854d0e', desc: 'Oldest monastery in Ladakh, moonland landscape', route: '/monasteries/lamayuru' },
    { name: 'Spituk Monastery', slug: 'spituk', category: 'Monasteries', icon: 'bi-building', color: '#dc2626', desc: '11th century, Gustor festival, overlooks Indus Valley', route: '/monasteries/spituk' },
    { name: 'Phyang Monastery', slug: 'phyang', category: 'Monasteries', icon: 'bi-building', color: '#0f766e', desc: 'Drikung Kagyu sect, 16th century, museum of Buddhist art', route: '/monasteries/phyang' },
    { name: 'Stakna Monastery', slug: 'stakna', category: 'Monasteries', icon: 'bi-building', color: '#b91c1c', desc: 'Tiger\'s Nose hilltop, Bhutanese Drukpa Kagyu, founded 1580', route: '/monasteries/stakna' },
    { name: 'Chemrey Monastery', slug: 'chemrey', category: 'Monasteries', icon: 'bi-building', color: '#6d28d9', desc: 'Founded 1664, hillside gompa, annual masked dance festival', route: '/monasteries/chemrey' },
    { name: 'Likir Monastery', slug: 'likir', category: 'Monasteries', icon: 'bi-building', color: '#0284c7', desc: '11th century Gelug gompa, giant outdoor Maitreya Buddha', route: '/monasteries/likir' },
    { name: 'Shey Monastery', slug: 'shey', category: 'Monasteries', icon: 'bi-building', color: '#d97706', desc: 'Former summer palace, copper-gilt Shakyamuni Buddha', route: '/monasteries/shey' },
    { name: 'Phuktal Monastery', slug: 'phuktal', category: 'Monasteries', icon: 'bi-building', color: '#475264', desc: 'Cave monastery in Zanskar, accessible only on foot', route: '/monasteries/phuktal' },

    // â”€â”€ Wildlife â”€â”€
    { name: 'Snow Leopard', slug: 'snow-leopard', category: 'Wildlife', icon: 'bi-binoculars-fill', color: '#7c3aed', desc: 'The Ghost of the Mountains — approx. 200 in Ladakh', route: '/nature/wildlife/snow-leopard' },
    { name: 'Black-Necked Crane', slug: 'black-necked-crane', category: 'Wildlife', icon: 'bi-feather2', color: '#1a365d', desc: 'Near Threatened; breeds at Hanle & Chushul wetlands', route: '/nature/wildlife/black-necked-crane' },
    { name: 'Tibetan Wild ass (Kiang)', slug: 'tibetan-wild-ass', category: 'Wildlife', icon: 'bi-speedometer2', color: '#059669', desc: 'Largest wild ass species, roams Changthang Plateau', route: '/nature/wildlife/tibetan-wild-ass' },
    { name: 'Himalayan Brown Bear', slug: 'himalayan-brown-bear', category: 'Wildlife', icon: 'bi-shield-fill', color: '#92400e', desc: 'Critically Endangered, found in Deosai & Suru Valley', route: '/nature/wildlife/himalayan-brown-bear' },
    { name: 'Tibetan Wolf', slug: 'tibetan-wolf', category: 'Wildlife', icon: 'bi-wind', color: '#475264', desc: 'apex predator of the Changthang, pack hunter', route: '/nature/wildlife/tibetan-wolf' },
    { name: 'Himalayan Marmot', slug: 'himalayan-marmot', category: 'Wildlife', icon: 'bi-emoji-sunglasses', color: '#c8702a', desc: 'Social ground squirrel found across high-altitude meadows', route: '/nature/wildlife/himalayan-marmot' },

    // â”€â”€ Birds â”€â”€
    { name: 'Black-Necked Crane', slug: 'black-necked-crane', category: 'Birds', icon: 'bi-feather2', color: '#1a365d', desc: 'Near Threatened; breeds at Hanle & Chushul wetlands', route: '/nature/bird/black-necked-crane' },
    { name: 'Golden Eagle', slug: 'golden-eagle', category: 'Birds', icon: 'bi-feather', color: '#b45309', desc: 'Powerful raptor soaring over Changthang & Hemis NP', route: '/nature/bird/golden-eagle' },
    { name: 'Lammergeier', slug: 'lammergeier', category: 'Birds', icon: 'bi-feather', color: '#dc2626', desc: 'Bearded Vulture — bone-dropping feeding technique', route: '/nature/bird/lammergeier' },
    { name: 'Himalayan Snowcock', slug: 'himalayan-snowcock', category: 'Birds', icon: 'bi-feather', color: '#6d28d9', desc: 'High-altitude gamebird of Alpine meadows', route: '/nature/bird/himalayan-snowcock' },
    { name: 'Brown-Headed Gull', slug: 'brown-headed-gull', category: 'Birds', icon: 'bi-feather', color: '#0284c7', desc: 'Breeds at Pangong Tso and Tso Kar lakes', route: '/nature/bird/brown-headed-gull' },
    { name: 'Eurasian Magpie', slug: 'eurasian-magpie', category: 'Birds', icon: 'bi-feather', color: '#059669', desc: 'Ubiquitous in Leh, one of the most intelligent birds', route: '/nature/bird/eurasian-magpie' },
    { name: 'Robin accentor', slug: 'robin-accentor', category: 'Birds', icon: 'bi-feather', color: '#854d0e', desc: 'Small passerine of rocky slopes above 3,500 m', route: '/nature/bird/robin-accentor' },
    { name: 'Chukar Partridge', slug: 'chukar-partridge', category: 'Birds', icon: 'bi-feather', color: '#475264', desc: 'National bird of Pakistan, found across Ladakh\'s arid hills', route: '/nature/bird/chukar-partridge' },

    // â”€â”€ Flora â”€â”€
    { name: 'Blue Poppy (Meconopsis)', slug: 'blue-poppy', category: 'Flora', icon: 'bi-flower2', color: '#2e86c1', desc: 'Rare Himalayan wildflower at 3,800–5,000 m', route: '/nature/flora/blue-poppy' },
    { name: 'Edelweiss', slug: 'edelweiss', category: 'Flora', icon: 'bi-flower1', color: '#6d28d9', desc: 'alpine icon found in rocky meadows above 4,000 m', route: '/nature/flora/edelweiss' },
    { name: 'Sea Buckthorn', slug: 'sea-buckthorn', category: 'Flora', icon: 'bi-tree', color: '#c8702a', desc: 'Orange berry bush, Ladakh\'s superfood of the cold desert', route: '/nature/flora/sea-buckthorn' },
    { name: 'Juniper (Shukpa)', slug: 'juniper', category: 'Flora', icon: 'bi-tree-fill', color: '#059669', desc: 'Sacred incense plant used in Buddhist ceremonies', route: '/nature/flora/juniper' },
    { name: 'Ephedra', slug: 'ephedra', category: 'Flora', icon: 'bi-flower3', color: '#dc2626', desc: 'Medicinal plant of amchi traditional healing', route: '/nature/flora/ephedra' },
    { name: 'Willow (Changma)', slug: 'willow', category: 'Flora', icon: 'bi-tree', color: '#1a365d', desc: 'Most common tree in Ladakh, lines irrigation channels', route: '/nature/flora/willow' },
    { name: 'apricot (Chulli)', slug: 'apricot', category: 'Flora', icon: 'bi-tree', color: '#f59e0b', desc: 'Economic backbone of Nubra and Sham valleys', route: '/nature/flora/apricot' },
    { name: 'Rhodiola (Sro-lo Dmar-po)', slug: 'rhodiola', category: 'Flora', icon: 'bi-flower2', color: '#b91c1c', desc: 'adaptogenic herb thriving above 4,000 m', route: '/nature/flora/rhodiola' },

    // â”€â”€ Lakes â”€â”€
    { name: 'Pangong Tso', slug: 'pangong-tso', category: 'Lakes', icon: 'bi-water', color: '#0284c7', desc: 'Iconic 134 km colour-shifting lake at 4,350 m', route: '/nature/lake/pangong-tso' },
    { name: 'Tso Moriri', slug: 'tso-moriri', category: 'Lakes', icon: 'bi-water', color: '#6d28d9', desc: 'High-altitude Ramsar wetland at 4,522 m', route: '/nature/lake/tso-moriri' },
    { name: 'Tso Kar', slug: 'tso-kar', category: 'Lakes', icon: 'bi-water', color: '#1e40af', desc: 'Salt lake, Changpa nomads, Black-necked Crane habitat', route: '/nature/lake/tso-kar' },
    { name: 'Zanskar River', slug: 'zanskar-river', category: 'Lakes', icon: 'bi-water', color: '#059669', desc: 'Frozen Chadar trek route, thrilling white-water rafting', route: '/nature/lake/zanskar-river' },

    // â”€â”€ Treks â”€â”€
    { name: 'Markha Valley Trek', slug: 'markha-valley', category: 'Treks', icon: 'bi-signpost-split', color: '#10b981', desc: '65 km through Hemis NP, 6–8 days, Kongmaru La at 16,700 ft', route: '/routes/trek/markha-valley', tag: 'Moderate–Hard' },
    { name: 'Chadar Trek (Frozen River)', slug: 'chadar-frozen-river', category: 'Treks', icon: 'bi-snow', color: '#0284c7', desc: 'Walk on frozen Zanskar River in -30ÂaC winter', route: '/routes/trek/chadar-frozen-river', tag: 'Extreme' },
    { name: 'Stok Kangri Climb', slug: 'stok-kangri', category: 'Treks', icon: 'bi-triangle-fill', color: '#dc2626', desc: 'Non-technical 6,153 m summit, most accessible 6000er', route: '/routes/trek/stok-kangri', tag: 'Extreme' },
    { name: 'Sham Valley Trek', slug: 'sham-valley', category: 'Treks', icon: 'bi-signpost-split', color: '#f59e0b', desc: 'Gentle 3-day trek through traditional villages', route: '/routes/trek/sham-valley', tag: 'Easy' },
    { name: 'Rumtse to Tso Moriri', slug: 'rumtse-tso-moriri', category: 'Treks', icon: 'bi-signpost-split', color: '#7c3aed', desc: 'Cross high passes to reach remote Tso Moriri lake', route: '/routes/trek/rumtse-tso-moriri', tag: 'Hard' },
    { name: 'Padum to Darcha', slug: 'padum-darcha', category: 'Treks', icon: 'bi-signpost-split', color: '#475264', desc: 'Classic Zanskar traverse via Shingo La at 16,600 ft', route: '/routes/trek/padum-darcha', tag: 'Hard' },

    // â”€â”€ Road Trips â”€â”€
    { name: 'Leh â†’ Nubra Valley', slug: 'leh-nubra-valley', category: 'Road Trips', icon: 'bi-truck', color: '#10b981', desc: 'Cross Khardung La (17,582 ft) to Hunder sand dunes', route: '/routes/trip/leh-nubra-valley', tag: 'Must-Do' },
    { name: 'Leh â†’ Pangong Tso', slug: 'leh-pangong-tso', category: 'Road Trips', icon: 'bi-truck', color: '#0284c7', desc: 'Drive through Chang La to the iconic blue lake', route: '/routes/trip/leh-pangong-tso', tag: 'Iconic' },
    { name: 'Leh â†’ Tso Moriri', slug: 'leh-tso-moriri', category: 'Road Trips', icon: 'bi-truck', color: '#7c3aed', desc: 'Remote journey to pristine Ramsar wetland', route: '/routes/trip/leh-tso-moriri', tag: 'Off-Beat' },
    { name: 'Manali â†’ Leh Highway', slug: 'manali-leh-highway', category: 'Road Trips', icon: 'bi-truck', color: '#c8702a', desc: '474 km through 5 high passes, iconic road journey', route: '/routes/trip/manali-leh-highway', tag: 'Epic' },
    { name: 'Srinagar â†’ Leh Highway', slug: 'srinagar-leh', category: 'Road Trips', icon: 'bi-truck', color: '#dc2626', desc: 'NH1 via Sonamarg, Zoji La, Kargil — 434 km', route: '/routes/trip/srinagar-leh', tag: 'Classic' },
    { name: 'Leh â†’ Hanle', slug: 'leh-hanle', category: 'Road Trips', icon: 'bi-truck', color: '#1e3a5f', desc: 'Journey to India\'s first Dark Sky Reserve', route: '/routes/trip/leh-hanle', tag: 'Off-Beat' },

    // â”€â”€ Monuments â”€â”€
    { name: 'Leh Palace', slug: 'leh-palace', category: 'Monuments', icon: 'bi-bank2', color: '#1a365d', desc: '17th-century royal palace, 9 storeys, built by Sengge Namgyal', route: '/history/monument/leh-palace' },
    { name: 'Hemis Monastery', slug: 'hemis-monastery', category: 'Monuments', icon: 'bi-bank2', color: '#7c3aed', desc: 'Largest monastery in Ladakh, founded 1630', route: '/history/monument/hemis-monastery' },
    { name: 'alchi Monastery', slug: 'alchi-monastery', category: 'Monuments', icon: 'bi-bank2', color: '#2563eb', desc: '1000-year-old Kashmiri Buddhist murals, UNESCO-nominated', route: '/history/monument/alchi-monastery' },
    { name: 'Basgo Fortress', slug: 'basgo-fortress', category: 'Monuments', icon: 'bi-bank2', color: '#854d0e', desc: '15th-century citadel, survived A 3-year Mongol siege', route: '/history/monument/basgo-fortress' },
    { name: 'Shey Palace', slug: 'shey-palace', category: 'Monuments', icon: 'bi-bank2', color: '#d97706', desc: 'Former summer capital, copper-gilt Shakyamuni statue', route: '/history/monument/shey-palace' },
    { name: 'Diskit Monastery', slug: 'diskit-monastery', category: 'Monuments', icon: 'bi-bank2', color: '#059669', desc: 'Oldest gompa in Nubra, 14th century, 32 m Maitreya Buddha', route: '/history/monument/diskit-monastery' },

    // â”€â”€ Festivals â”€â”€
    { name: 'Losar (Ladakhi New Year)', slug: 'losar', category: 'Festivals', icon: 'bi-sun-fill', color: '#c8702a', desc: '15-day celebration of Buddhist New Year in Dec/Jan', route: '/culture/festival/losar' },
    { name: 'Hemis Tsechu', slug: 'hemis-tsechu', category: 'Festivals', icon: 'bi-music-note-beamed', color: '#7c3aed', desc: 'Famous masked dance festival in June/July', route: '/culture/festival/hemis-tsechu' },
    { name: 'Saga Dawa', slug: 'saga-dawa', category: 'Festivals', icon: 'bi-brightness-high', color: '#d97706', desc: 'Birth, enlightenment & parinirvana of Buddha', route: '/culture/festival/saga-dawa' },
    { name: 'Ladakh Festival', slug: 'ladakh-festival', category: 'Festivals', icon: 'bi-flag', color: '#0284c7', desc: 'Government-organized cultural extravaganza in September', route: '/culture/festival/ladakh-festival' },
    { name: 'Dosmoche', slug: 'dosmoche', category: 'Festivals', icon: 'bi-mask', color: '#dc2626', desc: 'Scapegoat festival to drive away evil spirits', route: '/culture/festival/dosmoche' },
    { name: 'Matho Nagrang', slug: 'matho-nagrang', category: 'Festivals', icon: 'bi-eye', color: '#059669', desc: 'Oracle festival — monks enter trance at Matho Gompa', route: '/culture/festival/matho-nagrang' },
    { name: 'Stok Guru Tsechu', slug: 'stok-guru-tsechu', category: 'Festivals', icon: 'bi-stars', color: '#854d0e', desc: 'Masked dance at Stok Monastery honouring Guru Rinpoche', route: '/culture/festival/stok-guru-tsechu' },

    // â”€â”€ Institutions â”€â”€
    { name: 'University of Ladakh', slug: 'university-of-ladakh', category: 'Institutions', icon: 'bi-bank2', color: '#1a365d', desc: 'UT\'s premier university, est. 2022, 3,500+ students', route: '/education/institution/university-of-ladakh' },
    { name: 'SECMOL', slug: 'secmol', category: 'Institutions', icon: 'bi-lightbulb', color: '#059669', desc: 'alternative solar-powered school transforming education since 1988', route: '/education/institution/secmol' },
    { name: 'Lamdon Model School', slug: 'lamdon-model-school', category: 'Institutions', icon: 'bi-mortarboard', color: '#c8702a', desc: 'Premier private school, est. 1974, 2,800+ students', route: '/education/institution/lamdon-model-school' },
    { name: 'Mahabodhi Intl Meditation Centre', slug: 'mahabodhi-international-meditation-centre', category: 'Institutions', icon: 'bi-peace', color: '#7c3aed', desc: 'Buddhist education & meditation centre for underprivileged', route: '/education/institution/mahabodhi-international-meditation-centre' },
    { name: 'EJM College', slug: 'ejm-college', category: 'Institutions', icon: 'bi-building', color: '#0284c7', desc: 'Oldest degree college in Ladakh, est. 1976', route: '/education/institution/ejm-college' },

    // â”€â”€ Blog â”€â”€
    { name: 'The Forgotten Kingdom: Ladakh Before the Dogra Rule', slug: 'forgotten-kingdom-before-dogra-rule', category: 'Blog', icon: 'bi-clock-history', color: '#1a365d', desc: 'History of the independent Ladakhi kingdom', route: '/blog/forgotten-kingdom-before-dogra-rule', tag: 'History' },
    { name: 'Living with Snow Leopards: Conservation in Hemis', slug: 'living-with-snow-leopards', category: 'Blog', icon: 'bi-binoculars', color: '#059669', desc: 'How locals and scientists protect the Ghost of the Mountains', route: '/blog/living-with-snow-leopards', tag: 'Nature' },
    { name: 'The Demand for Statehood', slug: 'demand-for-statehood', category: 'Blog', icon: 'bi-megaphone', color: '#dc2626', desc: 'Why Ladakh is demanding full statehood and constitutional safeguards', route: '/blog/demand-for-statehood', tag: 'Politics' },
    { name: 'Vanishing Tongues: Languages of Ladakh', slug: 'vanishing-tongues-languages-of-ladakh', category: 'Blog', icon: 'bi-chat-text', color: '#7c3aed', desc: 'The endangered linguistic diversity of the region', route: '/blog/vanishing-tongues-languages-of-ladakh', tag: 'Culture' },
    { name: 'Walking the Chadar: A Frozen River Journey', slug: 'walking-the-chadar', category: 'Blog', icon: 'bi-snow', color: '#0284c7', desc: ' A first-person account of the legendary frozen river trek', route: '/blog/walking-the-chadar', tag: 'Travel' },
    { name: 'Monasteries & Modern Life', slug: 'monasteries-and-modern-life', category: 'Blog', icon: 'bi-building', color: '#c8702a', desc: 'How Ladakhi monasteries are adapting to the 21st century', route: '/blog/monasteries-and-modern-life', tag: 'Culture' },
  ];

  filteredItems = computed(() => {
    const q = this.query().toLowerCase().trim();
    const cat = this.activeCategory();

    return this.items.filter(item => {
      const matchesCat = cat === 'all' || item.category === cat;
      const matchesQuery = !q
        || item.name.toLowerCase().includes(q)
        || item.desc.toLowerCase().includes(q)
        || item.category.toLowerCase().includes(q)
        || (item.tag?.toLowerCase().includes(q) ?? false);
      return matchesCat && matchesQuery;
    });
  });

  resultCount = computed(() => this.filteredItems().length);

  categoryCount(cat: string): number {
    const q = this.query().toLowerCase().trim();
    if (cat === 'all') {
      return this.items.filter(i => {
        return !q
          || i.name.toLowerCase().includes(q)
          || i.desc.toLowerCase().includes(q)
          || i.category.toLowerCase().includes(q)
          || (i.tag?.toLowerCase().includes(q) ?? false);
      }).length;
    }
    return this.items.filter(i => {
      const matchesCat = i.category === cat;
      const matchesQuery = !q
        || i.name.toLowerCase().includes(q)
        || i.desc.toLowerCase().includes(q)
        || i.category.toLowerCase().includes(q)
        || (i.tag?.toLowerCase().includes(q) ?? false);
      return matchesCat && matchesQuery;
    }).length;
  }

  getCategoryDef(label: string): CategoryDef {
    return this.categories.find(c => c.label === label) ?? this.categories[0];
  }
}




