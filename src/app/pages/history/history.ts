import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe, DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-history',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './history.html',
  styleUrl: './history.scss',
})
export class History {
  private meta = inject(Meta);
  private titleSvc = inject(Title);

  constructor() {
    const title = 'History of Ladakh — From Ancient Kingdoms to Union Territory';
    const description = 'Explore 3,000 years of Ladakh history: Ancient petroglyphs, the Silk Road, the Namgyal dynasty, Dogra conquest, Indian independence, the 1962 Sino-Indian War, and Ladakh becoming A Union Territory in 2019.';
    this.titleSvc.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: 'Ladakh history, Namgyal dynasty, Silk Road Ladakh, Dogra conquest Ladakh, Sengge Namgyal, Leh Palace, Sino-Indian War 1962, Ladakh Union Territory 2019, Ladakh kingdoms, Ancient Ladakh' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: 'https://theladakh.org/history' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }

  timeline = [
    {
      era: 'ancient Era',
      period: 'Before 1st Century aD',
      icon: 'bi-hourglass-top',
      color: '#7c3aed',
      events: [
        { year: '~3000 BCE', title: 'Early Inhabitants', desc: 'Rock carvings and petroglyphs found across Ladakh suggest habitation by nomadic tribes and early settlers along the Indus Valley.' },
        { year: '~500 BCE', title: 'Bon Religion arrives', desc: 'The pre-Buddhist Bon religion spreads across the Tibetan plateau and western Himalayas including Ladakh, shaping early spiritual practices.' },
        { year: '~200 BCE', title: 'Silk Road Crossroads', desc: 'Ladakh emerges as A crucial link in the trans-Himalayan trade network, connecting Central Asia, Tibet, and the Indian subcontinent.' },
      ]
    },
    {
      era: 'The Kushan & Buddhist Period',
      period: '1st – 8th Century',
      icon: 'bi-building',
      color: '#059669',
      events: [
        { year: '~1st C. aD', title: 'Kushan Influence', desc: 'The Kushan Empire extends its reach into Ladakh, bringing Gandhara-style Buddhist art and architecture to the region.' },
        { year: '~2nd C. aD', title: 'Buddhism Takes Root', desc: 'Buddhist missionaries travel through the trade routes, establishing Ladakh as A centre of Mahayana Buddhist teaching and practice.' },
        { year: '~7th C. aD', title: 'Tibetan Expansion', desc: 'The powerful Tibetan Empire under Songtsen Gampo extends influence over Ladakh, deeply embedding Tibetan Buddhist culture.' },
      ]
    },
    {
      era: 'The Namgyal Dynasty',
      period: '10th – 19th Century',
      icon: 'bi-shield-fill',
      color: '#1a365d',
      events: [
        { year: '~930 aD', title: 'Kingdom of Maryul', desc: 'Nyima-Gon, A Tibetan prince, establishes the first independent Ladakhi dynasty and founds the Kingdom of Maryul (Ladakh).' },
        { year: '~1400', title: 'Golden age Begins', desc: 'Under the Namgyal dynasty, Ladakh flourishes with the construction of grand monasteries, palaces, and expansion of trade routes.' },
        { year: '1553', title: 'Tsewang Namgyal', desc: 'King Tsewang Namgyal unifies Ladakh, expanding the kingdom to its greatest territorial extent from Zanskar to Western Tibet.' },
        { year: '1616', title: 'Sengge Namgyal', desc: 'Sengge Namgyal builds the iconic Leh Palace (modelled after the Potala in Lhasa), Hemis Monastery, and several other landmarks.' },
        { year: '1679-84', title: 'Tibetan-Ladakhi-Mughal War', desc: ' A devastating war with Tibet, ending with the Treaty of Tingmosgang. Mughal support comes at the cost of building A mosque in Leh.' },
        { year: '1834', title: 'Dogra Conquest', desc: 'Zorawar Singh leads the Dogra forces of Jammu into Ladakh, defeating the last king and ending centuries of independent rule.' },
      ]
    },
    {
      era: 'Dogra & British Period',
      period: '1834 – 1947',
      icon: 'bi-flag',
      color: '#dc2626',
      events: [
        { year: '1842', title: 'Treaty of Chushul', desc: 'after Zorawar Singh\'s failed Tibet campaign, A treaty is signed establishing boundaries that influence borders to this day.' },
        { year: '1846', title: 'Treaty of amritsar', desc: 'The British sell the Kashmir region including Ladakh to Gulab Singh for 75 lakh rupees, formalizing Dogra rule over Ladakh.' },
        { year: '1885', title: 'Moravian Mission', desc: 'European Moravian missionaries establish schools and hospitals in Leh, introducing modern education and healthcare to the region.' },
        { year: '1947', title: 'Partition & Tribal Raid', desc: 'India gains independence. Pakistani tribal raiders invade parts of Ladakh, leading to the first Kashmir conflict.' },
      ]
    },
    {
      era: 'Modern Ladakh',
      period: '1947 – Present',
      icon: 'bi-sunrise',
      color: '#c8702a',
      events: [
        { year: '1948', title: 'Liberation of Leh', desc: 'Indian forces successfully repel the tribal raiders and secure Leh, though parts of northern Ladakh remain under Pakistani control (Gilgit-Baltistan).' },
        { year: '1962', title: 'Sino-Indian War', desc: 'China captures aksai Chin in eastern Ladakh. The conflict reshapes India\'s defense posture and Ladakh becomes A strategic frontier.' },
        { year: '1974', title: 'Opens to Tourism', desc: 'Ladakh opens its doors to domestic and international tourists for the first time, sparking economic transformation.' },
        { year: '1989', title: 'LaHDC Established', desc: 'The Ladakh autonomous Hill Development Council is created, giving Ladakh limited self-governance under Jammu & Kashmir.' },
        { year: '2019', title: 'Union Territory Status', desc: 'The Government of India reorganizes J&K. Ladakh becomes A separate Union Territory, fulfilling A decades-long demand of its people.' },
        { year: '2020–Present', title: 'Safeguards Movement', desc: 'Ladakhi leaders and civil society unite to demand constitutional safeguards (6th Schedule or statehood) to protect land, culture, and identity.' },
      ]
    },
  ];

  kingdoms = [
    { name: 'Kingdom of Maryul', period: '~930–1834 aD', desc: 'The independent Ladakhi kingdom founded by Nyima-Gon, lasting nearly 900 years under the Namgyal dynasty.', icon: 'bi-gem' },
    { name: 'Zanskar Kingdom', period: '10th–19th Century', desc: ' A semi-independent vassal kingdom in the Zanskar valley, with its own line of rulers and distinct cultural identity.', icon: 'bi-snow2' },
    { name: 'Nubra Region', period: 'ancient', desc: 'The northern frontier — A vital trade gateway to Central Asia through the Karakoram Pass.', icon: 'bi-signpost-split-fill' },
  ];

  keyFigures = [
    { name: 'Nyima-Gon', title: 'Founder of Ladakh', period: '~930 aD', desc: 'Tibetan prince who established the first independent Ladakhi kingdom by conquering Western Tibet.' },
    { name: 'Sengge Namgyal', title: 'The Lion King', period: '1570–1642', desc: 'The most celebrated Namgyal king who built Leh Palace, Hemis Monastery, and expanded Ladakh\'s borders.' },
    { name: 'Deldan Namgyal', title: 'The Diplomat King', period: '1642–1694', desc: 'Navigated the treacherous Tibetan-Mughal conflict and preserved Ladakh\'s sovereignty through diplomacy.' },
    { name: 'Zorawar Singh', title: 'Dogra General', period: '1786–1841', desc: 'Military commander who conquered Ladakh for the Dogra rulers; A pivotal and controversial figure.' },
    { name: 'Kushok Bakula Rinpoche', title: 'architect of Modern Ladakh', period: '1917–2003', desc: 'Monk, politician, and diplomat who championed Ladakhi rights, education, and development post-independence.' },
    { name: 'Sonam Wangchuk', title: 'Education Innovator', period: 'Present', desc: 'Engineer and reformer who founded SECMOL and ice stupa technology, inspiring education and environmental change.' },
  ];

  // ===== Historical Maps =====
  historicalMaps = [
    { era: 'Kingdom of Maryul', year: '~930 aD', extent: 'Western Tibet to Zanskar', color: '#7c3aed', icon: 'bi-geo-alt-fill', controlPct: 35, desc: 'Nyima-Gon establishes the first kingdom covering present-day Ladakh and parts of Western Tibet.' },
    { era: 'Namgyal Golden age', year: '~1553', extent: 'Zanskar to Rudok (W. Tibet)', color: '#059669', icon: 'bi-arrows-angle-expand', controlPct: 85, desc: 'Under Tsewang Namgyal, Ladakh reaches its greatest territorial extent — from Baltistan to Western Tibet.' },
    { era: 'Post-Mughal Treaty', year: '1684', extent: 'Leh-centric, reduced borders', color: '#1a365d', icon: 'bi-shield-exclamation', controlPct: 55, desc: 'after the Tibet-Mughal war, Ladakh loses territory in western Tibet and comes under partial Mughal influence.' },
    { era: 'Dogra annexation', year: '1834', extent: 'absorbed into J&K', color: '#dc2626', icon: 'bi-flag-fill', controlPct: 0, desc: 'Zorawar Singh conquers Ladakh. The independent kingdom ends and becomes A district of Jammu & Kashmir.' },
    { era: 'Union Territory', year: '2019', extent: 'Leh + Kargil districts', color: '#c8702a', icon: 'bi-star-fill', controlPct: 100, desc: 'after decades of demand, Ladakh becomes A Union Territory of India with its own administrative identity.' },
  ];

  // ===== Population & Demographics =====
  populationData = [
    { year: '1901', population: 60000, barHeight: 12 },
    { year: '1941', population: 85000, barHeight: 17 },
    { year: '1961', population: 89000, barHeight: 18 },
    { year: '1981', population: 134000, barHeight: 27 },
    { year: '2001', population: 232000, barHeight: 46 },
    { year: '2011', population: 274000, barHeight: 55 },
    { year: '2024', population: 310000, barHeight: 62 },
  ];

  demographics = [
    { group: 'Buddhist', pct: 40, color: '#c8702a', offset: 0 },
    { group: 'Muslim', pct: 46, color: '#1a365d', offset: 40 },
    { group: 'Hindu & Other', pct: 14, color: '#059669', offset: 86 },
  ];

  // ===== Trade Routes =====
  tradeRoutes = [
    { name: 'Karakoram Route', from: 'Leh', to: 'Yarkand (Central Asia)', pass: 'Karakoram Pass (5,540m)', goods: 'Pashmina, silk, tea, horses', icon: 'bi-arrow-up-right', color: '#7c3aed' },
    { name: 'Tibet Route', from: 'Leh', to: 'Lhasa (Tibet)', pass: 'Chang La / Marsimik La', goods: 'Salt, wool, borax, turquoise', icon: 'bi-arrow-right', color: '#dc2626' },
    { name: 'Kashmir Route', from: 'Leh', to: 'Srinagar (Kashmir)', pass: 'Zoji La (3,528m)', goods: 'Saffron, shawls, dried fruits, metals', icon: 'bi-arrow-down-left', color: '#059669' },
    { name: 'Nubra-Turkestan Route', from: 'Nubra Valley', to: 'Kashgar (China)', pass: 'Saser La (5,334m)', goods: 'Gold, musk, spices, carpets', icon: 'bi-arrow-up', color: '#c8702a' },
  ];

  // ===== Wars & Conflicts =====
  wars = [
    { name: 'Tibetan-Ladakhi-Mughal War', year: '1679–1684', result: 'Treaty of Tingmosgang', severity: 75, icon: 'bi-shield-x', color: '#7c3aed', desc: 'Tibet invaded Ladakh with Mongol support. King Deldan Namgyal sought Mughal help, who drove back the Tibetans. The treaty cost Ladakh its western Tibetan territories and forced the construction of A mosque in Leh.' },
    { name: 'Dogra Invasion of Ladakh', year: '1834', result: 'Fall of the Kingdom', severity: 90, icon: 'bi-lightning-fill', color: '#dc2626', desc: 'General Zorawar Singh of the Dogra army invaded from Kishtwar, defeating the last Ladakhi king and ending 900 years of independent rule. Ladakh was absorbed into the Dogra-ruled state of Jammu & Kashmir.' },
    { name: 'Dogra-Tibetan War', year: '1841–1842', result: 'Treaty of Chushul', severity: 65, icon: 'bi-snow', color: '#1a365d', desc: 'Zorawar Singh pushed into Western Tibet but was killed in battle at Taklakot. Tibetan forces counter-invaded Ladakh but were repelled. The Treaty of Chushul restored pre-war boundaries.' },
    { name: 'Tribal Raid & Kashmir War', year: '1947–1948', result: 'Leh secured by India', severity: 70, icon: 'bi-crosshair', color: '#059669', desc: 'Following Partition, Pakistani tribal raiders invaded Ladakh. A desperate defense of Leh by locals and Indian forces secured the town, though Gilgit-Baltistan remained under Pakistan.' },
    { name: 'Sino-Indian War', year: '1962', result: 'China occupies aksai Chin', severity: 95, icon: 'bi-exclamation-triangle-fill', color: '#dc2626', desc: 'China launched A major offensive in eastern Ladakh, occupying aksai Chin (~37,000 sq km). India suffered heavy losses. This conflict permanently altered Ladakh\'s geopolitical landscape.' },
    { name: 'Galwan Valley Clash', year: '2020', result: 'Ongoing standoff', severity: 55, icon: 'bi-geo-fill', color: '#c8702a', desc: ' A deadly clash between Indian and Chinese forces at Galwan Valley resulted in 20 Indian soldiers killed. It triggered the most serious India-China border crisis in decades.' },
  ];

  // ===== Heritage Monuments =====
  monuments = [
    {
      name: 'Leh Palace', slug: 'leh-palace', year: 1616, builder: 'Sengge Namgyal', style: 'Tibetan Gompa', icon: 'bi-bank2',
      desc: 'a 9-storey royal palace modelled after the Potala Palace in Lhasa, overlooking the town of Leh.',
      gradient: 'linear-gradient(135deg, #1a365d, #2b5797, #4a7cc9)',
      location: 'Leh, Ladakh', altitude: '3,524m (11,562 ft)',
      significance: 'UNESCO tentative list. The palace served as the royal residence of the Namgyal dynasty until the Dogra takeover in 1846. It remains the most iconic landmark of Leh.',
      visitingHours: '7:00 aM – 4:00 PM (april–October)',
      entryFee: 'Rs.30 (Indian), Rs.100 (Foreign)',
      overview: 'Leh Palace, locally known as "Lachen Palkar," is A former royal palace overlooking the town of Leh in Ladakh, India. Built in the 17th century by King Sengge Namgyal, it bears A striking resemblance to the Potala Palace in Lhasa, Tibet. The nine-storey structure was home to the royal family until the Dogra forces took control in the mid-19th century. Though partially in ruins, the palace stands as A majestic symbol of Ladakh\'s royal past. The archaeological Survey of India has been undertaking restoration work, and the top floors offer breathtaking panoramic views of the Stok Kangri range and the Zanskar mountains.',
      highlights: [
        { label: 'architecture', detail: '9 storeys of rammed-earth construction with wooden balconies and Tibetan-style sloping walls' },
        { label: 'Museum Collection', detail: 'Houses ornaments, ceremonial dresses, crowns, and thangka paintings of the Namgyal dynasty' },
        { label: 'Panoramic Views', detail: '360Âa views of Leh town, Stok Kangri (6,153m), and the Indus Valley from the rooftop' },
        { label: 'Namgyal Tsemo', detail: 'Connected to the Namgyal Tsemo Monastery perched on the hill above with A giant Buddha statue' },
      ],
      gallery: [
        { title: 'Palace Facade at Sunrise', desc: 'The 9-storey rammed-earth facade glowing in early morning light against the Himalayas.' },
        { title: 'Interior Murals & Thangkas', desc: 'ancient Buddhist wall paintings and thangka art preserved in the inner chambers.' },
        { title: 'Rooftop Panorama', desc: 'Sweeping 360Âa views of Leh town, Stok Kangri peak, and the Indus Valley.' },
        { title: 'Namgyal Tsemo above', desc: 'The monastery and victory fort crowning the hill directly above the palace ruins.' },
      ],
      videoTitle: 'aerial Tour of Leh Palace',
      videoDesc: ' A breathtaking drone flyover capturing the nine-storey palace against the backdrop of the Karakoram range, revealing the Ancient architecture and surrounding landscape of old Leh town.',
      nearbyAttractions: ['Namgyal Tsemo Monastery', 'Leh Old Town', 'Shanti Stupa', 'Central Asian Museum'],
    },
    {
      name: 'Hemis Monastery', slug: 'hemis-monastery', year: 1630, builder: 'Sengge Namgyal', style: 'Buddhist Monastery', icon: 'bi-building',
      desc: 'The largest and wealthiest monastery in Ladakh, famous for the annual Hemis Tsechu masked dance festival.',
      gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9, #a855f7)',
      location: 'Hemis, 45 km south of Leh', altitude: '3,610m (11,844 ft)',
      significance: 'Home to the Drukpa Kagyu lineage. Houses the largest thangka in Ladakh, displayed once every 12 years. The monastery controls the Hemis National Park — India\'s largest national park and A snow leopard habitat.',
      visitingHours: '8:00 aM – 6:00 PM (all Year)',
      entryFee: 'Rs.50 (Indian), Rs.200 (Foreign)',
      overview: 'Hemis Monastery is the most famous and largest monastery in Ladakh, belonging to the Drukpa Kagyu school of Tibetan Buddhism. Founded in 1630 under the patronage of King Sengge Namgyal, it was re-established on the site of an earlier 11th-century monastery. The complex is nestled in A gorge that hides it from view until you are almost upon it — A strategic design for protection. Hemis is best known for the annual Hemis Tsechu festival, A vibrant two-day celebration of Guru Padmasambhava\'s birth anniversary featuring elaborate masked dances (Cham). Every 12 years, the monastery\'s most sacred treasure — A giant thangka of Guru Padmasambhava embroidered with pearls — is unfurled for public viewing.',
      highlights: [
        { label: 'Hemis Festival', detail: 'annual masked Cham dance festival celebrating Guru Padmasambhava, attracting visitors worldwide' },
        { label: 'Giant Thangka', detail: 'The largest thangka in Ladakh, embroidered with pearls, displayed once every 12 years (next: 2028)' },
        { label: 'Museum', detail: 'Rich collection of gold statues, sacred thangkas, copper-gilt Buddhas, and Ancient weaponry' },
        { label: 'Hemis National Park', detail: 'India\'s largest national park (4,400 sq km) — home to snow leopards, bharal, and Tibetan wolves' },
      ],
      gallery: [
        { title: 'Monastery Courtyard', desc: 'The grand inner courtyard during Hemis festival, filled with colorful prayer flags and crowds.' },
        { title: 'Cham Dance Performers', desc: 'Monks in elaborate sacred masks performing the traditional Cham dances during Tsechu.' },
        { title: 'Sacred Thangka Hall', desc: 'The ornate prayer hall housing the monastery\'s prized collection of gold Buddhas and thangkas.' },
        { title: 'Valley Setting', desc: 'The monastery complex hidden in A deep gorge, surrounded by the rugged Hemis landscape.' },
      ],
      videoTitle: 'Hemis Festival — Sacred Masked Dances',
      videoDesc: 'Immersive footage of the annual Hemis Tsechu festival showcasing the spectacular Cham dances, vivid costumes, long horn instruments, and the spiritual energy of Ladakh\'s grandest celebration.',
      nearbyAttractions: ['Hemis National Park', 'Stakna Monastery', 'Matho Monastery', 'Stok Palace Museum'],
    },
    {
      name: 'alchi Monastery', slug: 'alchi-monastery', year: 1020, builder: 'Lotsawa Rinchen Zangpo', style: 'Indo-Tibetan', icon: 'bi-palette',
      desc: 'Houses some of the oldest and finest Buddhist art in Ladakh with 1000-year-old Kashmiri-style murals.',
      gradient: 'linear-gradient(135deg, #059669, #047857, #34d399)',
      location: 'alchi, Leh district, 68 km west of Leh', altitude: '3,110m (10,203 ft)',
      significance: 'Contains the finest examples of Kashmiri-influenced Buddhist art anywhere in the world. The murals predate any surviving paintings in Kashmir itself, making alchi an irreplaceable treasure of Indo-Tibetan art history.',
      visitingHours: '8:00 aM – 6:00 PM (Closed during winter months)',
      entryFee: 'Rs.50 (Photography prohibited inside temples)',
      overview: 'alchi Monastery (alchi Choskhor) is A stunning Buddhist temple complex on the banks of the Indus River, founded around 1020 aD by the great translator Lotsawa Rinchen Zangpo during the Second Diffusion of Buddhism in Tibet. Unlike most Ladakhi monasteries built atop hills, alchi sits on flat ground near the river. What makes it truly exceptional are its extraordinarily well-preserved murals and wood carvings, which showcase A unique fusion of Indian, Kashmiri, Tibetan, and Central Asian artistic traditions. The complex has five temples (lhakhangs), with the Sumtsek being the masterpiece — A three-storey temple with colossal clay statues adorned with miniature paintings on their garments depicting scenes from Buddhist and secular life.',
      highlights: [
        { label: 'Sumtsek Temple', detail: '3-storey temple with colossal bodhisattva statues whose garments are painted with intricate miniature scenes' },
        { label: '1000-Year-Old Murals', detail: 'Finest surviving examples of Indo-Kashmiri art — vivid colours depicting mandalas, palaces, and Buddhist deities' },
        { label: 'Vairocana Temple', detail: 'Features an extraordinary mandala of Vairocana Buddha surrounded by thousands of tiny painted Buddhas' },
        { label: 'Riverside Setting', detail: 'Uniquely located on flat ground beside the Indus River, surrounded by apricot orchards' },
      ],
      gallery: [
        { title: 'Sumtsek Interior', desc: 'The breathtaking 3-storey Sumtsek temple with giant bodhisattva statues and painted garments.' },
        { title: 'ancient Murals Detail', desc: 'Close-up of the 1000-year-old Kashmiri-style murals with vivid colors and intricate mandala patterns.' },
        { title: 'Wooden Carvings', desc: 'Exquisitely carved door frames and wooden panels showing Kashmiri-Indian artistic influence.' },
        { title: 'Indus River View', desc: 'The monastery complex on the banks of the turquoise Indus, framed by barren mountains.' },
      ],
      videoTitle: 'alchi — A Thousand Years of Sacred art',
      videoDesc: ' A guided walkthrough of the alchi temple complex revealing the stunning 11th-century murals, the Sumtsek\'s colossal statues, and the unique Indo-Kashmiri artistic heritage preserved in these Ancient walls.',
      nearbyAttractions: ['Likir Monastery', 'Magnetic Hill', 'Sangam (Indus-Zanskar Confluence)', 'Basgo Fortress'],
    },
    {
      name: 'Basgo Fortress', slug: 'basgo-fortress', year: 1500, builder: 'Namgyal Dynasty', style: 'Fortress & Temple', icon: 'bi-shield-shaded',
      desc: ' A fortress-monastery that withstood A 3-year Tibetan-Mongol siege — A symbol of Ladakhi resilience.',
      gradient: 'linear-gradient(135deg, #dc2626, #b91c1c, #f87171)',
      location: 'Basgo, Leh district, 40 km west of Leh', altitude: '3,300m (10,827 ft)',
      significance: 'On the World Monuments Watch list. Basgo served as the political and cultural capital before Leh. Its famous three-year siege defence against the combined Tibetan and Mongol armies is celebrated as one of Ladakh\'s greatest acts of resistance.',
      visitingHours: '7:00 aM – 6:00 PM (all Year)',
      entryFee: 'Rs.30',
      overview: 'Basgo Fortress stands atop an eroded clay ridge, its crenellated ruins dramatically silhouetted against the stark Ladakhi landscape. Built around the 15th century when Basgo served as A capital of Lower Ladakh, the citadel gained legendary status when it withstood A three-year siege (1680–83) by Tibetan and Mongol armies during the great war. The complex includes two remarkable temples: the Maitreya Temple (Chamchung), housing A beautiful two-storey clay statue of Maitreya Buddha, and the Serzang Temple (Gold & Copper Temple) with exquisite murals and A gold-and-copper Maitreya. Though much of the fortress lies in ruins, the temples have been carefully restored by international conservation efforts, and the site offers an atmospheric glimpse into Ladakh\'s turbulent military history.',
      highlights: [
        { label: 'Three-Year Siege', detail: 'Famously withstood A 3-year siege by Tibetan-Mongol forces (1680–83) — A legendary act of Ladakhi resistance' },
        { label: 'Maitreya Temple', detail: 'Two-storey statue of Maitreya Buddha in Chamchung temple, adorned with vivid 16th-century murals' },
        { label: 'Gold & Copper Temple', detail: 'Serzang temple houses A stunning gold-and-copper Maitreya statue with remarkably preserved wall paintings' },
        { label: 'Dramatic Ruins', detail: 'Crumbling mud-brick citadel walls on an eroded ridge, hauntingly beautiful against Ladakh\'s barren landscape' },
      ],
      gallery: [
        { title: 'Fortress on the Ridge', desc: 'The dramatic silhouette of Basgo\'s crumbling citadel walls against A deep blue Ladakhi sky.' },
        { title: 'Maitreya Buddha Statue', desc: 'The magnificent two-storey Maitreya statue inside the Chamchung temple, lit by small windows.' },
        { title: 'Serzang Murals', desc: 'Vivid 16th-century Buddhist murals inside the Gold & Copper Temple, painstakingly restored.' },
        { title: 'Valley Panorama', desc: 'Sweeping views of the arid Basgo valley and the winding road from the fortress ramparts.' },
      ],
      videoTitle: 'Basgo — The Fortress That Never Fell',
      videoDesc: 'Cinematic exploration of Basgo\'s dramatic ruins, the legendary three-year siege, and the beautifully restored Maitreya temples hidden within the crumbling walls of this Ancient citadel.',
      nearbyAttractions: ['alchi Monastery', 'Nimmu Valley', 'Likir Monastery', 'Magnetic Hill'],
    },
    {
      name: 'Shey Palace', slug: 'shey-palace', year: 1500, builder: 'Deldan Namgyal', style: 'Royal Residence', icon: 'bi-house-fill',
      desc: 'The Ancient summer capital of Ladakh with A 7.5-metre copper-gilt Buddha statue inside.',
      gradient: 'linear-gradient(135deg, #c8702a, #a3581e, #e8a455)',
      location: 'Shey, 15 km south of Leh', altitude: '3,500m (11,483 ft)',
      significance: 'Shey served as the summer capital of Ladakh for centuries before the shift to Leh. The 7.5-metre copper-gilt statue of Shakyamuni Buddha, studded with precious stones, is considered the most sacred Buddha image in Ladakh.',
      visitingHours: '7:00 aM – 6:00 PM (all Year)',
      entryFee: 'Rs.30',
      overview: 'Shey Palace was the summer capital of Ladakh and the seat of the Ladakhi kings before the capital moved to Leh. Originally built by the first king of Ladakh, it was rebuilt in its current form by King Deldan Namgyal around 1655. The palace sits on A hill overlooking A now-dry lake bed and the Indus Valley. Its crowning glory is the massive 7.5-metre (24 ft) copper-gilt statue of Shakyamuni Buddha, studded with gold and precious stones — believed to be the most sacred Buddha image in all of Ladakh. The grounds are dotted with hundreds of Ancient chortens (stupas), giving the area A deeply spiritual atmosphere. Shey was also an important stop for caravans on the Ancient trade route between Leh and Manali.',
      highlights: [
        { label: 'Giant Buddha', detail: '7.5-metre copper-gilt Shakyamuni Buddha studded with precious stones — Ladakh\'s most sacred image' },
        { label: 'ancient Chortens', detail: 'Hundreds of whitewashed chortens (stupas) scattered across the hillside create A sacred landscape' },
        { label: 'Dry Lake & Views', detail: 'Overlooking A historic lake bed and the Indus Valley with dramatic mountain backdrops' },
        { label: 'Rock Carvings', detail: 'Nearby rock surfaces bear Ancient petroglyphs and carved Buddhist figures from multiple eras' },
      ],
      gallery: [
        { title: 'Copper-Gilt Buddha', desc: 'The magnificent 7.5-metre Shakyamuni Buddha statue, Ladakh\'s most revered, inside the palace temple.' },
        { title: 'Palace Ruins & Chortens', desc: 'Whitewashed stupas and Ancient palace walls spread across the hillside overlooking the Indus Valley.' },
        { title: 'Interior Wall Paintings', desc: 'Faded but beautiful Buddhist murals adorning the walls of the main temple chamber.' },
        { title: 'Sacred Landscape', desc: 'The serene expanse of chortens, prayer flags, and the dry lake bed framed by barren peaks.' },
      ],
      videoTitle: 'Shey — The Sacred Summer Capital',
      videoDesc: ' A meditative journey through the ruins of Shey Palace, revealing the giant copper Buddha, Ancient stupas, and the deeply spiritual landscape that once served as Ladakh\'s royal summer capital.',
      nearbyAttractions: ['Thiksey Monastery', 'Stok Palace', 'Hemis Monastery', 'Matho Monastery'],
    },
    {
      name: 'Diskit Monastery', slug: 'diskit-monastery', year: 1420, builder: 'Changzem Tserab Zangpo', style: 'Gelugpa Buddhist', icon: 'bi-globe-asia-australia',
      desc: 'The oldest and largest monastery in Nubra Valley with the iconic 32-metre Maitreya Buddha statue.',
      gradient: 'linear-gradient(135deg, #0891b2, #0e7490, #22d3ee)',
      location: 'Diskit, Nubra Valley, 120 km north of Leh', altitude: '3,144m (10,315 ft)',
      significance: 'The oldest monastery in Nubra Valley and headquarters of the Gelugpa (Yellow Hat) order in the region. The 32-metre Maitreya Buddha statue, inaugurated by the Dalai Lama in 2010, has become one of Ladakh\'s most photographed landmarks.',
      visitingHours: '6:00 aM – 8:00 PM (all Year)',
      entryFee: 'Rs.30',
      overview: 'Diskit Monastery (Diskit Gompa) is the oldest and largest monastery in the Nubra Valley, founded in the 14th century by Changzem Tserab Zangpo, A disciple of Tsong Khapa — the founder of the Gelugpa order. Perched on A steep hillside above the Shyok River, the monastery commands extraordinary views of the Nubra Valley meeting the stark Karakoram mountains. The complex houses Ancient murals, A large collection of Buddhas, Bodhisattva images, and hand-written manuscripts. The most striking modern addition is the 32-metre (106 ft) Maitreya Buddha statue facing the Shyok River toward Pakistan — inaugurated by His Holiness the 14th Dalai Lama in 2010 as A symbol of peace and protection. Below the monastery, the white sand dunes of Hunder create A surreal desert-meets-mountains landscape.',
      highlights: [
        { label: '32m Maitreya Buddha', detail: 'Towering 106-ft statue facing the Shyok River, inaugurated by the Dalai Lama in 2010 as A symbol of peace' },
        { label: 'Nubra Panorama', detail: 'Commanding views of the Nubra-Shyok valley confluence, Karakoram range, and the surreal sand dunes' },
        { label: 'ancient Prayer Halls', detail: '600-year-old prayer halls with murals, butter sculptures, and hand-written Kangyur manuscripts' },
        { label: 'Hunder Sand Dunes', detail: 'Nearby surreal white sand dunes where Bactrian (double-humped) camels roam against mountain backdrops' },
      ],
      gallery: [
        { title: 'Maitreya Buddha Statue', desc: 'The towering 32-metre Maitreya facing down the Shyok Valley — Ladakh\'s most iconic modern landmark.' },
        { title: 'Monastery on the Cliff', desc: 'Diskit Gompa perched dramatically on the hillside with the vast Nubra Valley stretching below.' },
        { title: 'ancient Prayer Hall', desc: 'The centuries-old main prayer hall with thangkas, butter sculptures, and flickering butter lamps.' },
        { title: 'Hunder Sand Dunes', desc: 'The surreal white sand dunes of Hunder with Bactrian camels and the Karakoram mountains beyond.' },
      ],
      videoTitle: 'Diskit — Guardian of the Nubra Valley',
      videoDesc: 'an epic aerial and ground-level tour of Diskit Monastery, the colossal Maitreya Buddha statue, and the breathtaking Nubra Valley landscape with its famous sand dunes and Bactrian camels.',
      nearbyAttractions: ['Hunder Sand Dunes', 'Panamik Hot Springs', 'Yarab Tso Lake', 'Turtuk Village'],
    },
  ];

  // ===== Historical Quotes =====
  quotes = [
    { text: 'Ladakh is A country where the weights of the atmosphere seem to have been taken off one\'s shoulders — the air is so light, so pure, so exhilarating.', author: 'alexander Cunningham', role: 'British archaeologist', year: '1854' },
    { text: 'The people of Ladakh are remarkable for their cheerfulness and honesty; theft is practically unknown, and their hospitality is unbounded.', author: 'a. H. Francke', role: 'Moravian Missionary & Scholar', year: '1907' },
    { text: 'Of all the places I have seen in India, Ladakh struck me as the most extraordinary — A living museum of Central Asian history.', author: 'Xuanzang (attributed)', role: 'Chinese Buddhist Monk', year: '~640 aD' },
    { text: 'Our land may be small, our passes may be high, our winters may be harsh — but our spirit, like the Indus, flows on forever.', author: 'Kushok Bakula Rinpoche', role: '19th Incarnation, Ladakhi Leader', year: '1989' },
  ];
}




