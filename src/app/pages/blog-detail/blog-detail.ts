import { Component, signal, computed, inject, PLATFORM_ID, DestroyRef, afterNextRender, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookmarkBtn } from '../../shared/bookmark-btn/bookmark-btn';
import { ShareBtn } from '../../shared/share-btn/share-btn';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [RouterLink, BookmarkBtn, ShareBtn],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.scss',
})
export class BlogDetail {
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);

  allPosts = [
    {
      slug: 'forgotten-kingdom-before-dogra-rule',
      title: 'The Forgotten Kingdom: Ladakh Before the Dogra Rule',
      category: 'History',
      date: 'Jan 15, 2025',
      readTime: '8 min read',
      author: 'Tsewang Namgyal',
      authorRole: 'Lead archivist',
      icon: 'bi-clock-history',
      color: '#1a365d',
      relatedLink: '/history',
      relatedLabel: 'History of Ladakh',
      content: [
        { heading: 'The Namgyal Dynasty', text: 'For over four centuries, the Namgyal dynasty ruled Ladakh as an independent Buddhist kingdom. Founded by Lhachen Bhagan in the early 15th century, the dynasty transformed Ladakh from A collection of scattered principalities into A unified kingdom that stretched from the Zoji La pass in the west to the Tibetan plateau in the east. Under the Namgyals, Ladakh became A strategic crossroads of the Silk Route, with caravans carrying pashmina wool, tea, salt, and spices passing through its mountain passes.' },
        { heading: 'The Golden age of Trade', text: 'Ladakh\'s position between India, Tibet, Central Asia, and China made it one of the most important trans-Himalayan trading hubs. The kingdom controlled the crucial passes — Karakoram, Khardung La, and Chang La — through which flowed not just goods but also ideas, religions, and artistic traditions. Leh\'s Main Bazaar was A bustling marketplace where Yarkandi merchants from Central Asia traded alongside Tibetan nomads and Kashmiri traders. Pashmina, the finest wool in the world, was A key export, and its trade routes shaped the kingdom\'s diplomatic relationships for centuries.' },
        { heading: 'Monastic Patronage', text: 'The Namgyal kings were great patrons of Buddhism. Under their rule, some of Ladakh\'s most iconic monasteries were built or expanded — Hemis, Thiksay, Likir, Chemrey and countless others. The monasteries served not only as spiritual centres but also as repositories of knowledge, art, and culture. The tradition of thangka painting, bronze sculpture, and sacred Cham dances flourished during this period, creating A cultural legacy that endures to this day.' },
        { heading: 'The Dogra Conquest', text: 'The independent kingdom came to an end in 1834 when Zorawar Singh, the general of Dogra ruler Gulab Singh of Jammu, invaded Ladakh. Despite fierce resistance, the Ladakhi forces were defeated. The Treaty of Chushul (1842) between the Dogras and Tibet formally ended Ladakh\'s independence. For the next century, Ladakh was governed as A distant frontier province of the Dogra-ruled Jammu & Kashmir — beginning A new chapter that would shape its modern identity and its ongoing quest for political recognition.' },
      ],
    },
    {
      slug: 'living-with-snow-leopards',
      title: 'Living with Snow Leopards: Conservation in Hemis',
      category: 'Nature',
      date: 'Feb 3, 2025',
      readTime: '6 min read',
      author: 'Dorjay angchuk',
      authorRole: 'Photographer & Media Lead',
      icon: 'bi-tree',
      color: '#059669',
      relatedLink: '/nature',
      relatedLabel: 'Nature & Wildlife',
      content: [
        { heading: 'Ghost of the Mountains', text: 'The snow leopard — known as "shan" in Ladakhi — is one of the most elusive big cats on Earth. Hemis National Park, India\'s largest national park at 4,400 sq km, is home to an estimated 200 snow leopards, making it one of the highest densities of this endangered species anywhere in the world. Yet most Ladakhis have never seen one. The snow leopard\'s cryptic grey-white coat blends perfectly with the rocky terrain, and they hunt at elevations between 3,000 and 5,500 metres, far from human habitation.' },
        { heading: 'Community-Led Conservation', text: 'What makes Ladakh\'s snow leopard conservation unique is the central role of local communities. Organisations like the Snow Leopard Conservancy India have worked with herders in villages around Hemis to develop livestock insurance programs, predator-proof corrals, and community-based tourism initiatives. The "Shan" homestay program brings wildlife enthusiasts to stay in local homes during winter, generating income for families that once saw snow leopards only as A threat to their livestock.' },
        { heading: 'Winter Tracking Expeditions', text: 'Every winter, teams of researchers and volunteers trek into the frozen valleys of Hemis to track and photograph snow leopards using camera traps and direct sightings. The Hemis Snow Leopard Count, conducted annually, has become one of the most rigorous population surveys of the species. The best sighting season is January to March, when ibex — the snow leopard\'s primary prey — descend to lower elevations, bringing the cats closer to accessible valleys.' },
        { heading: 'Threats and Future', text: 'Despite conservation successes, challenges remain. Climate change is pushing the treeline higher, shrinking the snow leopard\'s habitat. Human-wildlife conflict persists as livestock losses continue. Mining and road construction in sensitive habitats threaten corridors between populations. The key to long-term survival lies in expanding community benefits from conservation, securing wildlife corridors, and ensuring that India\'s most iconic mountain predator has A future in the Land of High Passes.' },
      ],
    },
    {
      slug: 'demand-for-statehood',
      title: 'The Demand for Statehood: Ladakh\'s Political Journey',
      category: 'Politics',
      date: 'Mar 22, 2025',
      readTime: '10 min read',
      author: 'Tsewang Namgyal',
      authorRole: 'Lead archivist',
      icon: 'bi-bank',
      color: '#dc2626',
      relatedLink: '/politics',
      relatedLabel: 'Politics of Ladakh',
      content: [
        { heading: 'From Princely State to Union Territory', text: 'Ladakh\'s political trajectory over the past century has been one of persistent struggle for identity and self-governance. after the Dogra period, Ladakh became part of Jammu & Kashmir at India\'s independence in 1947. For decades, Ladakhis felt marginalised within the Muslim-majority state, with development funds and political representation disproportionately concentrated in the Kashmir Valley. The creation of the Ladakh autonomous Hill Development Councils in 1995 (Leh) and 2003 (Kargil) offered limited local governance but did not satisfy demands for full autonomy.' },
        { heading: 'The UT Milestone', text: 'On August 5, 2019, the Indian government abrogated article 370 and bifurcated Jammu & Kashmir into two Union Territories — Jammu & Kashmir (with legislature) and Ladakh (without legislature). While Ladakh celebrated its separation from J&K as A long-sought milestone, the absence of an elected legislature meant that real power remained with the centrally-appointed Lieutenant Governor. This administrative structure has become the focal point of renewed activism.' },
        { heading: 'The Sixth Schedule Demand', text: 'Since 2019, A unified movement led by Sonam Wangchuk, the Leh apex Body, and the Kargil Democratic alliance has demanded protections under the Sixth Schedule of the Indian Constitution. This would give Ladakh an autonomous council with legislative, judicial, and executive powers over land, forests, cultural identity, and local governance — similar to tribal areas in northeast India. The demand is rooted in the fear that without constitutional safeguards, Ladakh\'s fragile ecology, small population, and unique tribal culture could be overwhelmed by external commercial interests.' },
        { heading: 'Ongoing Struggle', text: 'as of 2025, the demand for statehood and Sixth Schedule protections remains unresolved. Multiple rounds of hunger strikes, border marches to Delhi, and mass rallies have maintained public pressure. The movement has uniquely united both Buddhist-majority Leh and Shia Muslim-majority Kargil districts under A common cause. The coming years will determine whether Ladakh achieves the constitutional protections its people seek — and what form Ladakh\'s governance will ultimately take in the Indian Union.' },
      ],
    },
    {
      slug: 'hemis-tsechu-sacred-dance',
      title: 'Hemis Tsechu: The Sacred Dance Festival of Ladakh',
      category: 'Culture',
      date: 'apr 10, 2025',
      readTime: '7 min read',
      author: 'Padma Chorol',
      authorRole: 'Cultural Editor',
      icon: 'bi-mask',
      color: '#7c3aed',
      relatedLink: '/culture',
      relatedLabel: 'Culture & People',
      content: [
        { heading: 'The Grandest Festival', text: 'Hemis Tsechu, held annually in June or July at Hemis Monastery, is the most spectacular monastic festival in Ladakh. It celebrates the birth anniversary of Guru Padmasambhava (Guru Rinpoche), the 8th-century Indian Buddhist master credited with bringing Buddhism to Tibet and the Himalayan regions. The festival draws thousands of visitors — both local devotees and international tourists — to witness sacred Cham mask dances performed by monks in the monastery\'s magnificent courtyard.' },
        { heading: 'The Cham Dances', text: 'The Cham dances are far more than performance art — they are considered A form of meditation, A spiritual offering, and A teaching tool. Monks wearing elaborate brocade costumes and fierce deity masks perform slow, deliberate choreographies that represent the triumph of good over evil, the destruction of inner demons, and the cycle of death and rebirth. Each dance tells A specific Buddhist story, and the sequence of dances follows A strict ritual order that has been unchanged for centuries. The deep, resonant sound of dungchen (long horns), cymbals, and drums creates A trance-like atmosphere.' },
        { heading: 'The Giant Thangka', text: 'The highlight of the festival is the ceremonial unfurling of massive silk thangka paintings on the monastery wall. The largest thangka — A 12-metre depiction of Guru Padmasambhava — is displayed only once every 12 years (the next showing is in 2028). On regular festival years, A smaller but equally magnificent thangka is displayed. The thangka is believed to have the power to liberate all beings who behold it, and pilgrims travel from across the Himalayas for A glimpse.' },
        { heading: 'Beyond the Monastery Walls', text: 'During Hemis Tsechu, the entire area transforms into A vibrant cultural fair. Stalls sell traditional Ladakhi handicrafts, pashmina shawls, turquoise jewellery, and local food. archery competitions, traditional music performances, and storytelling sessions bring the community together. For Ladakhis, the festival is A reaffirmation of Buddhist identity, A reunion of far-flung families, and A celebration of A cultural heritage that has endured for over A millennium in one of the harshest environments on Earth.' },
      ],
    },
    {
      slug: 'khardung-la-gateway-to-nubra',
      title: 'Khardung La: Gateway to the Nubra Valley',
      category: 'Travel',
      date: 'May 5, 2025',
      readTime: '5 min read',
      author: 'Dorjay angchuk',
      authorRole: 'Photographer & Media Lead',
      icon: 'bi-signpost-split',
      color: '#c8702a',
      relatedLink: '/routes',
      relatedLabel: 'Routes & Journeys',
      content: [
        { heading: 'The Legendary Pass', text: 'Khardung La at 5,359 metres (17,582 ft) is one of the highest motorable passes in the world and the gateway to the Nubra and Shyok valleys from Leh. Maintained by the Border Roads Organisation (BRO) and the Indian army, the 39-km road from Leh to the pass summit climbs through switchbacks offering progressively more dramatic views. at the top, A signboard (famously claiming 18,380 ft — A disputed altitude) marks one of the most photographed spots in Ladakh.' },
        { heading: 'The Ride Up', text: 'The ascent from Leh takes about 2-3 hours by car or motorcycle. The road condition varies from decent tarmac near Leh to rocky, sometimes snowy stretches near the summit. altitude sickness is A real concern — the rapid gain from Leh (3,500m) to the pass (5,359m) in under 40 km means you\'re climbing 1,800 metres in A very short distance. It\'s advisable to spend 2-3 days acclimatising in Leh before attempting the pass, stay hydrated, and drive slowly.' },
        { heading: 'Nubra: The Valley Beyond', text: 'Descending from Khardung La, the road drops dramatically into the Nubra Valley — often called "the valley of flowers." The contrast is stunning: from the barren, snow-dusted pass summit, you descend into A green, warm valley with sand dunes, apricot orchards, and the remarkable double-humped Bactrian camels at Hunder. The Diskit Monastery watches over it all from A dramatic cliff, and the village of Turtuk — the last Indian village before Pakistan — offers A unique Balti cultural experience.' },
        { heading: 'Practical Tips', text: 'an Inner Line Permit (ILP) is required for Khardung La and all areas beyond. The pass is generally open from late April to October, with closures during heavy snowfall. Fuel up in Leh — there are no petrol stations between Leh and Diskit (120 km). Carry warm clothing even in summer, as temperatures at the summit hover around -5ÂaC to 5ÂaC. If travelling by motorcycle, check your bike\'s condition at high altitude — engines lose power above 4,000m. and most importantly, don\'t rush — the scenery deserves every minute you can give it.' },
      ],
    },
    {
      slug: 'secmol-alternative-education',
      title: 'SECMOL: Reimagining Education in Ladakh',
      category: 'Education',
      date: 'Jun 18, 2025',
      readTime: '9 min read',
      author: 'Fatima Bano',
      authorRole: 'Community Coordinator',
      icon: 'bi-mortarboard',
      color: '#0284c7',
      relatedLink: '/education',
      relatedLabel: 'Education in Ladakh',
      content: [
        { heading: 'The Problem That Sparked A Revolution', text: 'In the 1980s, Ladakh\'s education system was in crisis. The failure rate for Class 10 board exams exceeded 95% — not because students were incapable, but because the curriculum was designed for the plains, taught in Urdu or English by undertrained teachers with no understanding of Ladakhi context. Students who had grown up speaking Ladakhi, living in A high-altitude desert, and understanding the world through Buddhist and Islamic traditions were being tested on content completely alien to their reality.' },
        { heading: 'Sonam Wangchuk\'s Vision', text: 'In 1988, Sonam Wangchuk — then A young engineering student — co-founded SECMOL (Students\' Educational and Cultural Movement of Ladakh) to reform Ladakh\'s broken education system. The organisation began by coaching failing students and training government schoolteachers. It lobbied successfully for changing the medium of instruction in primary schools to Ladakhi and Bodhi, and introduced locally relevant curricula. Wangchuk\'s Approach was radical: education must be rooted in local culture, language, and environment to be meaningful.' },
        { heading: 'The SECMOL Campus', text: 'In 1994, SECMOL established its Alternative School on A barren patch of land near Phey, 15 km from Leh. Built almost entirely by students and staff using rammed earth and passive solar design, the campus runs entirely on solar energy — even through harsh Ladakhi winters when temperatures drop to -30ÂaC. Students learn through hands-on projects: building solar heaters, managing the campus farm, organising cultural events, and running the school democratically. The "academic failures" who arrive at SECMOL often leave as confident, skilled young leaders.' },
        { heading: 'Legacy and Impact', text: 'SECMOL\'s impact extends far beyond its campus. The school\'s Approach inspired the Bollywood film "3 Idiots" and drew global attention to Alternative education. Wangchuk\'s later innovations — the Ice Stupa artificial glaciers — grew from the same philosophy of local, sustainable solutions. SECMOL alumni have gone on to become teachers, entrepreneurs, bureaucrats, and community leaders across Ladakh. The model has shown that education can be transformative when it respects and builds on local knowledge rather than trying to replace it.' },
      ],
    },
    {
      slug: 'changpa-nomads-of-changthang',
      title: 'The Changpa: Nomads of the Changthang Plateau',
      category: 'People',
      date: 'Jul 2, 2025',
      readTime: '8 min read',
      author: 'Padma Chorol',
      authorRole: 'Cultural Editor',
      icon: 'bi-people',
      color: '#475264',
      relatedLink: '/culture',
      relatedLabel: 'Culture & People',
      content: [
        { heading: 'Life at 4,500 Metres', text: 'The Changpa are the last nomadic pastoral community in Ladakh, living on the vast Changthang Plateau that stretches from eastern Ladakh into Tibet at elevations of 4,200–5,000 metres. They herd yaks, sheep, goats, and horses, moving between summer and winter pastures in A centuries-old seasonal migration pattern called "resa." Their homes are black yak-wool tents (rebo) that can withstand winds of over 100 km/h and temperatures of -40ÂaC — arguably the most extreme living conditions of any pastoral community on Earth.' },
        { heading: 'Pashmina: The Fabric of Survival', text: 'The Changpa\'s most valuable asset is the Changthangi goat, which produces the finest pashmina (cashmere) wool in the world. Each goat yields only about 80-100 grams of the ultra-fine undercoat per year — harvested by gentle hand-combing in spring when the goats naturally shed their winter down. This humble fibre, finer than any machine-made yarn, has been the economic backbone of the Changpa for centuries and A major driver of trans-Himalayan trade. A single pashmina shawl can take weeks to weave and represents generations of nomadic knowledge.' },
        { heading: 'Changing Traditions', text: 'The Changpa\'s way of life is under increasing pressure. Climate change is making the Changthang drier and warmer, reducing the quality of pastures and causing unpredictable snowfall that kills livestock. The younger generation is drawn to education and employment in Leh and beyond, leading to A gradual decline in the nomadic workforce. Government settlement schemes and predation by wolves, snow leopards, and wild dogs add further stress. The population of nomadic Changpa has declined from over 5,000 families in the 1990s to fewer than 2,000 today.' },
        { heading: 'Preserving the Heritage', text: 'Efforts to document and support Changpa culture are growing. Organisations like the Changthang Cooperative (a pashmina cooperative) help herders get fair prices. Eco-tourism homestays in settlements like Korzok and Hanle bring outside income. Cultural festivals celebrating nomadic skills — horse racing, archery, weaving — help the younger generation appreciate their heritage. The Changpa represent not just A cultural tradition but A profound ecological knowledge of high-altitude survival that the world cannot afford to lose.' },
      ],
    },
    {
      slug: 'pangong-tso-beyond-bollywood',
      title: 'Pangong Tso: Beyond the Bollywood Frame',
      category: 'Nature',
      date: 'aug 14, 2025',
      readTime: '6 min read',
      author: 'Dorjay angchuk',
      authorRole: 'Photographer & Media Lead',
      icon: 'bi-water',
      color: '#059669',
      relatedLink: '/nature',
      relatedLabel: 'Nature & Wildlife',
      content: [
        { heading: 'The Endless Lake', text: 'Pangong Tso stretches 134 km from India into Tibet at an altitude of 4,350 metres — making it one of the longest and highest saltwater lakes in the world. Only about 40 km of the lake falls within Indian territory; the rest lies in China\'s Tibet autonomous Region. The lake is famous for its dramatic colour shifts — from deep azure to turquoise to emerald green — caused by the interplay of sunlight, depth, mineral content, and the surrounding terrain. Despite its fame after the Bollywood film "3 Idiots," Pangong remains A fragile high-altitude ecosystem worthy of far more than A selfie.' },
        { heading: 'Ecological Significance', text: 'Pangong Tso is A critical breeding habitat for several high-altitude bird species, including the bar-headed goose, brahminy duck, brown-headed gull, and the endangered black-necked crane (which breeds at the less-disturbed eastern end). Despite being A saline lake, its shallow margins support unique microbial mats and aquatic invertebrates that form the base of A delicate food chain. The lake has no outflow — it gains water from snowmelt and small streams and loses it only to evaporation, making its water level A sensitive indicator of climate change.' },
        { heading: 'Tourism and Impact', text: 'Since the 2009 Bollywood connection, visitor numbers have exploded. On peak summer days, hundreds of vehicles line the lakeshore at Spangmik and Lukung. The environmental impact has been significant: garbage accumulation, vehicle pollution, unauthorised camping, and disturbance to wildlife. The lake\'s fragile shoreline, which has taken millennia to form, is being compacted and degraded by vehicular traffic. Local initiatives and the Ladakh UT administration have begun imposing limits, but enforcement remains A challenge.' },
        { heading: 'Beyond the Frame', text: 'The real Pangong experience lies beyond the crowded first viewpoint. Drive further along the southern shore to Man-Merak and Chushul — where the lake reveals its most dramatic colours in near-complete solitude. Visit in October or November when the tourists have gone and the lake freezes at the edges, creating surreal ice formations. Camp at Hanle instead and see the lake\'s reflection at dawn without another soul in sight. Pangong deserves to be experienced as what it truly is — A geological wonder, an ecological treasure, and A testament to Earth\'s beauty at impossible altitudes.' },
      ],
    },
    {
      slug: 'silk-route-ladakh-trade-history',
      title: 'The Silk Route Through Ladakh: A Trade History',
      category: 'History',
      date: 'Sep 20, 2025',
      readTime: '11 min read',
      author: 'Tsewang Namgyal',
      authorRole: 'Lead archivist',
      icon: 'bi-globe-americas',
      color: '#1a365d',
      relatedLink: '/history',
      relatedLabel: 'History of Ladakh',
      content: [
        { heading: 'Crossroads of Civilisations', text: 'For over two thousand years, Ladakh sat astride one of the most important branches of the Silk Route — the trans-Himalayan trade network that connected India, Tibet, Central Asia, and China. The routes through Ladakh were not merely commercial arteries but conduits for the exchange of religions, languages, art forms, and ideas. Buddhism arrived in Ladakh via these routes from Kashmir and Gandhara. Islam came through Central Asian traders. Tibetan culture flowed in from the east. This extraordinary cultural convergence is what makes Ladakh unique in the Indian subcontinent.' },
        { heading: 'The Great Trade Goods', text: 'The primary goods that passed through Ladakh tell the story of an entire economic world. From Tibet came salt, borax, wool, and musk. From Yarkand and Central Asia came silk, dried fruits, horses, and carpets. From Kashmir and India came sugar, rice, spices, cotton textiles, and metal utensils. and Ladakh\'s own contribution — pashmina wool from the Changthang plateau — was perhaps the most valuable of all, worth more than gold by weight in the markets of Srinagar and Delhi. The caravans were massive operations: sometimes hundreds of pack animals — yaks, horses, mules, and donkeys — carrying tonnes of goods over passes exceeding 5,000 metres.' },
        { heading: 'Leh: The Desert Marketplace', text: 'Leh was the nexus where these trade routes converged. The Main Bazaar — still the heart of Leh today — was A cosmopolitan marketplace where Yarkandi Muslims in tall fur hats traded alongside Tibetan pilgrims, Kashmiri merchants, Balti traders from Skardu, and Ladakhi aristocrats. Caravanserais (travellers\' inns) lined the outskirts of town. The Leh Palace, perched above the bazaar, served as both royal residence and customs house, levying taxes on the goods that passed through. Trade was so central to Ladakh\'s economy that the kingdom\'s diplomatic relations were essentially trade agreements.' },
        { heading: 'The End of an Era', text: 'The trans-Himalayan trade began declining in the 19th century as British colonial policies redirected trade routes, and the Dogra conquest of Ladakh disrupted established networks. The final blow came in 1949-50 when China closed the Tibetan border following the Communist revolution. Overnight, trade routes that had operated for millennia were severed. The Karakoram Pass, which had seen thousands of caravans annually, fell silent. Ladakh\'s economy collapsed, and the region became one of the most isolated places in India — A condition that persisted until road connections improved in the 1960s-70s. The Ancient trade routes now survive only as trekking paths and military roads, but their legacy lives on in Ladakh\'s extraordinary cultural diversity.' },
      ],
    },
    {
      slug: 'chadar-trek-frozen-river',
      title: 'Walking on Ice: The Chadar Trek Experience',
      category: 'Travel',
      date: 'Oct 8, 2025',
      readTime: '7 min read',
      author: 'Dorjay angchuk',
      authorRole: 'Photographer & Media Lead',
      icon: 'bi-snow2',
      color: '#c8702a',
      relatedLink: '/routes',
      relatedLabel: 'Routes & Journeys',
      content: [
        { heading: 'The Frozen Highway', text: 'The Chadar Trek is not just A trek — it\'s A walk on the surface of A frozen river through A canyon so deep and remote that there is no other way to traverse it. Every winter, the Zanskar River freezes into A sheet of ice (chadar means "sheet" in Hindi) that becomes the only land route connecting the isolated Zanskar Valley to the outside world. For centuries, Zanskaris used this ice highway to trade, seek medical help, and send their children to school in Leh. Today, it has become one of the most extreme and sought-after Adventure treks in the world.' },
        { heading: 'The Experience', text: 'The standard Chadar Trek covers approximately 62 km over 7-9 days, starting from Chilling and ending at Nerak (or further to Lingshed in the extended version). You walk on ice that ranges from solid and thick to paper-thin and cracking. The river\'s condition changes daily — sometimes hourly — depending on temperature, sunlight, and water flow. Sections of the chadar may break overnight, forcing detours along narrow cliff ledges. Temperatures drop to -25ÂaC to -35ÂaC at night. You sleep in cAves along the river bank, with A campfire, sleeping bags, and incredible starlight overhead.' },
        { heading: 'Preparation and Safety', text: 'The Chadar Trek demands serious preparation. Physical fitness is essential — not for technical climbing, but for the endurance of walking 8-10 hours daily on uneven ice in extreme cold. Essential gear includes insulated sleeping bags rated to -40ÂaC, gumboots with good grip, multiple layers of thermal clothing, hand and foot warmers, and A positive mental attitude. altitude sickness is less of A concern here (the trek stays around 3,300-3,500m) but hypothermia and frostbite are real risks. always trek with A reputable, licensed operator that carries proper safety equipment and satellite communication.' },
        { heading: ' A Vanishing Trek', text: 'Climate change is rapidly shortening the Chadar season. In the 1980s, the river froze reliably from December to March. Now, the window is often just 3-4 weeks in January-February, and some years the chadar doesn\'t form at all. The Indian government is constructing A road through the Zanskar gorge that will eventually eliminate the need for the ice route — and with it, this extraordinary experience. If walking on A frozen river in one of the most dramatic gorges on Earth is on your list, the time to do it is running out.' },
      ],
    },
    {
      slug: 'balti-culture-kargil',
      title: 'Balti Heritage: The Cultural Tapestry of Kargil',
      category: 'Culture',
      date: 'Nov 15, 2025',
      readTime: '8 min read',
      author: 'Mohd. Iqbal',
      authorRole: 'Kargil District Editor',
      icon: 'bi-music-note-beamed',
      color: '#7c3aed',
      relatedLink: '/culture',
      relatedLabel: 'Culture & People',
      content: [
        { heading: ' A Unique Cultural Identity', text: 'Kargil district, home to roughly half of Ladakh\'s population, possesses A cultural identity distinct from Buddhist-majority Leh. The majority of Kargil\'s residents are Shia Muslim, with significant Purig, Balti, and Dard communities. The Balti language — A Tibetic language written in adapted Persian script — is spoken across the district, carrying within it the traces of both Tibetan Buddhist and Persian Islamic cultural traditions. This unique blend, shaped by centuries of trade and cultural exchange, makes Kargil one of the most culturally fascinating districts in India.' },
        { heading: 'Music and Poetry', text: 'Balti music is A haunting blend of Tibetan melodic structures and Persian-influenced lyrics. The Balti ghazal tradition combines the romantic poetry of Persia with the modal scales of Himalayan folk music. Traditional instruments include the surna (oboe), daman (drum), and rubab. The great Balti poets — like Habibullah Balti and ali Hamadani — composed in A language that bridges two of asia\'s greatest literary traditions. Festival evenings in Kargil are marked by gatherings where poets recite and musicians perform classical compositions that have been passed down for generations.' },
        { heading: 'architecture and Cuisine', text: 'Kargil\'s architecture reflects its dual heritage. Traditional houses feature Tibetan-style flat roofs and rammed earth walls, but with Persian-Islamic decorative elements — carved wooden window frames, geometric patterns, and calligraphy. The cuisine is equally distinctive: balti gosht (meat curry cooked in A wok), skyu (hand-pulled pasta with vegetables), and tangtur (fermented milk drink) reflect both Central Asian and Tibetan culinary traditions. apricots, the "gold of Kargil," are dried, turned into jam, and their oil is pressed for cooking and cosmetics.' },
        { heading: 'Preserving the Heritage', text: 'as modernisation and connectivity increase, Kargil faces the challenge of preserving its unique heritage. Younger generations increasingly speak Urdu and Hindi rather than Balti. Traditional music and crafts are losing practitioners. The cultural archive of Kargil — its oral histories, songs, architectural techniques, and culinary traditions — is as endangered as any rare species. Projects by local organisations to document Balti literature, train young musicians, and restore traditional buildings are vital efforts to ensure that this remarkable cultural tapestry survives for future generations.' },
      ],
    },
    {
      slug: 'ladakh-ut-what-changed',
      title: 'Ladakh as A Union Territory: What Really Changed?',
      category: 'Politics',
      date: 'Dec 1, 2025',
      readTime: '12 min read',
      author: 'Tsewang Namgyal',
      authorRole: 'Lead archivist',
      icon: 'bi-building',
      color: '#dc2626',
      relatedLink: '/politics',
      relatedLabel: 'Politics of Ladakh',
      content: [
        { heading: ' A Historic Moment', text: 'On October 31, 2019, Ladakh officially became India\'s newest Union Territory — separated from Jammu & Kashmir for the first time in its modern history. The moment was celebrated across Leh with flag-hoisting ceremonies, parades, and A sense of triumph after decades of demand. Yet within months, celebrations gave way to concern. Unlike Jammu & Kashmir, Ladakh was created as A UT without A legislature — meaning it would be governed directly from New Delhi through A Lieutenant Governor, with no elected local assembly to represent the people\'s interests.' },
        { heading: 'What Changed on the Ground', text: 'In practical terms, the UT status brought some tangible benefits. Direct central funding increased, bypassing the erstwhile J&K government that had often neglected Ladakh. New development schemes were launched, and infrastructure projects — including roads, solar installations, airports, and the planned Zoji La tunnel — accelerated. Government recruitment opened up, and A sense of administrative independence was palpable. However, the existing Ladakh autonomous Hill Development Councils (LaHDCs) found their powers further diminished by the UT administration, creating confusion over who actually governed local affairs.' },
        { heading: 'What Didn\'t Change', text: 'The core issues that drove Ladakh\'s original demand remain unresolved. Without A legislature, Ladakhis have no elected representatives with lawmaking power. Land protection laws that existed under J&K\'s special status were repealed alongside article 370, raising fears of outside land purchases. Tribal status protections remain unclear. Employment policies favour central recruitment over local hiring. and perhaps most critically, the unique cultural and ecological protections that Ladakhis sought have not been formalised. The result is A community that gained symbolic independence but lost substantive safeguards.' },
        { heading: 'The Road ahead', text: 'The apex Body of Leh and the Kargil Democratic alliance have presented A unified charter to the central government demanding: (1) Full statehood with an elected legislature, or (2) Inclusion under the Sixth Schedule of the Constitution, or (3) at minimum, A legislature for the UT. The movement has gained national attention, with Sonam Wangchuk\'s climate fasts drawing international media coverage. as of 2025, talks continue, but no concrete commitments have been made. The future of Ladakh\'s governance hinges on whether the central government recognises that distance — both geographical and cultural — makes centralised administration inadequate for A region unlike any other in India.' },
      ],
    },
  ];

  slug = signal('');
  post = computed(() => this.allPosts.find(p => p.slug === this.slug()) || this.allPosts[0]);

  // Related posts (same category, excluding current)
  relatedPosts = computed(() => {
    const current = this.post();
    return this.allPosts.filter(p => p.category === current.category && p.slug !== current.slug).slice(0, 2);
  });

  // Recommended posts from OTHER categories
  otherPosts = computed(() => {
    const current = this.post();
    return this.allPosts.filter(p => p.category !== current.category).slice(0, 4);
  });

  // Explore sections — cross-promote other areas of the site
  exploreSections = [
    { title: 'History & Timeline', desc: 'Trace the full arc of Ladakh\'s story from Ancient kingdoms to modern statehood.', icon: 'bi-hourglass-split', link: '/history', color: '#1a365d' },
    { title: 'Nature & Wildlife', desc: 'Snow leopards, lakes, and ecosystems of the high-altitude desert.', icon: 'bi-tree', link: '/nature', color: '#059669' },
    { title: 'Monasteries', desc: 'Explore every gompa — their history, architecture, and living traditions.', icon: 'bi-building', link: '/monasteries', color: '#7c3aed' },
    { title: 'Routes & Journeys', desc: 'Plan your journey — road trips, passes, and epic treks.', icon: 'bi-signpost-split', link: '/routes', color: '#c8702a' },
    { title: 'Culture & People', desc: 'Festivals, music, cuisine, and the communities that call Ladakh home.', icon: 'bi-people', link: '/culture', color: '#dc2626' },
    { title: 'Photo Gallery', desc: 'Stunning photography from across the Land of High Passes.', icon: 'bi-camera', link: '/gallery', color: '#0284c7' },
  ];

  shareOnTwitter(): void {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(this.post().title + ' — Ladakharchive');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'noopener');
  }

  shareOnFacebook(): void {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener');
  }

  shareOnLinkedIn(): void {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener');
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href);
    this.linkCopied.set(true);
    setTimeout(() => this.linkCopied.set(false), 2000);
  }

  linkCopied = signal(false);
  readingProgress = signal(0);

  wordCount = computed(() => {
    return this.post().content.reduce((sum, s) => sum + s.text.split(/\s+/).length, 0);
  });

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const article = document.querySelector('.ba-article');
    if (!article) return;
    const rect = article.getBoundingClientRect();
    const total = article.scrollHeight;
    const scrolled = Math.max(0, -rect.top);
    this.readingProgress.set(Math.min(100, (scrolled / (total - window.innerHeight)) * 100));
  }

  constructor() {
    // Subscribe to route params so the page updates when navigating between blog posts
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.slug.set(params['slug']);
      // Scroll to top on route change
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0 });
      }
    });
  }

  scrollToSection(idx: number, event: Event): void {
    event.preventDefault();
    if (!isPlatformBrowser(this.platformId)) return;
    const el = document.getElementById('section-' + idx);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}




