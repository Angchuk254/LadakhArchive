import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-culture',
  imports: [RouterLink],
  templateUrl: './culture.html',
  styleUrl: './culture.scss',
  host: { '(document:keydown.escape)': 'onEscape()' },
})
export class Culture {
  private sanitizer = inject(DomSanitizer);
  private meta = inject(Meta);
  private titleSvc = inject(Title);

  constructor() {
    const title = 'Culture & People of Ladakh — Festivals, Traditions, Languages & Ethnic Groups';
    const description = 'Discover the rich culture of Ladakh: 6 diverse ethnic groups, 8 festivals including Hemis Tsechu and Losar, Tibetan Buddhist and Islamic traditions, traditional crafts like Pashmina and Thangka painting, languages, cuisine, and daily life.';
    this.titleSvc.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: 'Ladakh culture, Ladakh festivals, Hemis Tsechu, Losar Ladakh, Ladakhi people, Changpa nomads, Balti culture, Brokpa Dardic, Ladakhi language, Pashmina weaving, Thangka painting, Ladakh food, Ladakh traditions' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: 'https://theladakh.org/culture' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }

  activeVideo = signal<SafeResourceUrl | null>(null);
  activeVideoTitle = signal<string>('');

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
    }
  }

  // ===== Cultural Gallery =====
  gallery = [
    { title: 'Cham Dance at Hemis', caption: 'Monks in ceremonial masks performing the sacred dance of good over evil', gradient: 'linear-gradient(135deg, #4a1942, #6c3483, #a569bd)', icon: 'bi-mask', area: 'a' },
    { title: 'Changpa Nomad Camp', caption: 'Rebo tents on the Changthang plateau at 4,500m with Pashmina goats', gradient: 'linear-gradient(135deg, #0b3d2e, #1e8449, #27ae60)', icon: 'bi-compass', area: 'b' },
    { title: 'Brokpa Woman', caption: ' A Dard-aryan woman of Dha-Hanu adorned with the iconic floral headdress', gradient: 'linear-gradient(135deg, #7b2d26, #c0392b, #e74c3c)', icon: 'bi-flower3', area: 'c' },
    { title: 'Butter Tea Ceremony', caption: 'Traditional Gur Gur Cha preparation in A Ladakhi kitchen', gradient: 'linear-gradient(135deg, #7d5a29, #c8702a, #e59866)', icon: 'bi-cup-hot', area: 'd' },
    { title: 'Thangka Painting', caption: 'Master artist creating an intricate Buddhist scroll painting with mineral pigments', gradient: 'linear-gradient(135deg, #1a365d, #2b5797, #5499c7)', icon: 'bi-palette2', area: 'e' },
    { title: 'Prayer Flag Ridge', caption: 'Colorful lungta prayer flags carrying mantras across A mountain pass', gradient: 'linear-gradient(135deg, #0f2b46, #1a5276, #2e86c1)', icon: 'bi-flag', area: 'f' },
    { title: 'Losar Celebration', caption: 'Family gathering with khambir bread and offerings during the Ladakhi New Year', gradient: 'linear-gradient(135deg, #6b2737, #9b3a4d, #d4606e)', icon: 'bi-sun-fill', area: 'g' },
    { title: 'Perak Headdress', caption: ' A Ladakhi woman wearing the stunning turquoise-studded cobra headpiece', gradient: 'linear-gradient(135deg, #1b4332, #2d6a4f, #52b788)', icon: 'bi-gem', area: 'h' },
  ];

  // ===== Video Documentaries =====
  videos = [
    { title: 'Last Nomads of Changthang', desc: 'Follow the Changpa herders across the frozen plateau as they tend Pashmina goats in one of Earth\'s harshest environments.', duration: '24 min', type: 'Documentary', gradient: 'linear-gradient(135deg, #0b3d2e, #1e8449)', icon: 'bi-camera-reels', youtubeId: 'ixRTgJVDspw' },
    { title: 'Sacred Dances of Hemis', desc: 'Witness the spectacular Cham dances at Hemis Monastery — centuries-old masked rituals celebrating the triumph of good over evil.', duration: '18 min', type: 'Cultural', gradient: 'linear-gradient(135deg, #4a1942, #7c3aed)', icon: 'bi-film', youtubeId: 'Yqx2s0nJmHQ' },
    { title: 'Voices of the Silk Road', desc: 'Discover how Buddhist monks, Muslim traders, and aryan tribes created Ladakh\'s extraordinary multicultural tapestry.', duration: '32 min', type: 'History', gradient: 'linear-gradient(135deg, #7d5a29, #c8702a)', icon: 'bi-play-btn', youtubeId: 'R1E60m1KJgE' },
    { title: 'Weaving Pashmina: art of the Changpa', desc: 'From goat to shawl — the painstaking journey of Ladakhi Pashmina wool, the world\'s finest and softest fiber.', duration: '15 min', type: 'Craft', gradient: 'linear-gradient(135deg, #1a365d, #2b5797)', icon: 'bi-camera-video', youtubeId: 'QJuvqMfXLqs' },
    { title: 'Matho Oracle: Trance & Prophecy', desc: 'The blindfolded oracle monks of Matho Monastery perform superhuman feats in one of Buddhism\'s most mysterious rituals.', duration: '20 min', type: 'Spiritual', gradient: 'linear-gradient(135deg, #7b2d26, #c0392b)', icon: 'bi-camera-reels', youtubeId: 'Lv7xKSF1Y4Y' },
    { title: ' A Year in Ladakh: Four Seasons', desc: 'From frozen winters to blooming apricot summers — experience the rhythms of life at 3,500 metres through A full year.', duration: '45 min', type: 'Lifestyle', gradient: 'linear-gradient(135deg, #0f2b46, #1a5276)', icon: 'bi-film', youtubeId: 'HjBo--1n8lI' },
  ];

  // ===== Ethnic Groups =====
  ethnicGroups = [
    {
      name: 'Ladakhi (Bhotpa)',
      population: '~65%',
      region: 'Leh & Central Ladakh',
      icon: 'bi-people-fill',
      color: '#1a365d',
      religion: 'Predominantly Buddhist',
      language: 'Ladakhi (Bhoti)',
      desc: 'The dominant ethnic group of Ladakh, the Ladakhis are of Tibetan descent and have preserved centuries of Buddhist cultural traditions, monastic life, and A deep connection to the Himalayan landscape.',
      traits: ['Monastic traditions', 'Polyandry customs', 'agricultural lifestyle', 'Losar celebrations'],
    },
    {
      name: 'Balti',
      population: '~20%',
      region: 'Kargil & Suru Valley',
      icon: 'bi-moon-stars-fill',
      color: '#7c3aed',
      religion: 'Shia Muslim',
      language: 'Balti (archaic Tibetan)',
      desc: 'The Baltis of Kargil are of Tibetan descent who converted to Shia Islam centuries ago. They preserve A unique blend of Tibetan and Islamic cultures, speaking Balti — one of the most archaic forms of Tibetan.',
      traits: ['Islamic-Tibetan fusion', 'Balti folk music', 'Polo tradition', 'Muharram observance'],
    },
    {
      name: 'Changpa',
      population: '~5%',
      region: 'Changthang Plateau',
      icon: 'bi-compass-fill',
      color: '#059669',
      religion: 'Buddhist',
      language: 'Changskhat (Tibetan dialect)',
      desc: 'The Changpa are nomadic herders of the Changthang plateau at 4,500m+, rearing the prized Changthangi goats that produce the world\'s finest Pashmina wool. They embody the last true nomadic culture of Ladakh.',
      traits: ['Nomadic herders', 'Pashmina production', 'Rebo tents', 'Extreme altitude living'],
    },
    {
      name: 'Brokpa (Drokpa)',
      population: '~2,500 people',
      region: 'Dha-Hanu, Indus Valley',
      icon: 'bi-flower3',
      color: '#dc2626',
      religion: 'Buddhism with Bon elements',
      language: 'Shina (Dardic)',
      desc: 'The Brokpa, or Dard-aryans, of Dha-Hanu are believed to be descendants of alexander\'s soldiers. They have striking features, wear floral headdresses, and maintain pre-Buddhist Bon-influenced practices unique in all of Ladakh.',
      traits: ['Flower headdresses', 'Dard-aryan heritage', 'Bonono festival', 'Strict endogamy'],
    },
    {
      name: 'arghon',
      population: 'Small community',
      region: 'Leh Town',
      icon: 'bi-intersect',
      color: '#c8702a',
      religion: 'Sunni Muslim',
      language: 'Ladakhi & Urdu',
      desc: 'The arghons are descendants of Central Asian and Kashmiri traders who married local Ladakhi women during the Silk Road era. as Muslim merchants in A Buddhist land, they played A vital role as cultural intermediaries.',
      traits: ['Silk Road heritage', 'Trade merchants', 'Syncretic culture', 'Leh bazaar history'],
    },
    {
      name: 'Mon',
      population: 'Small community',
      region: 'Various villages',
      icon: 'bi-music-note-beamed',
      color: '#0891b2',
      religion: 'Buddhist',
      language: 'Ladakhi',
      desc: 'The Mon community are traditional musicians and blacksmiths of Ladakh. Though historically marginalized, they are the keepers of Ladakh\'s performing arts — playing drums, shawm, and other instruments at every monastery festival.',
      traits: ['Traditional musicians', 'Metalworkers', 'Festival performers', 'Surna & daman players'],
    },
  ];

  // ===== Languages =====
  languages = [
    { name: 'Ladakhi (Bhoti)', speakers: '~100,000', script: 'Tibetan (Bodyig)', family: 'Tibeto-Burman', icon: 'bi-translate', color: '#1a365d', desc: 'The primary language of Central Ladakh, closely related to classical Tibetan. Written in the Tibetan script with unique Ladakhi vocabulary.' },
    { name: 'Balti', speakers: '~300,000', script: 'Modified Arabic (Yige)', family: 'Tibeto-Burman', icon: 'bi-book-half', color: '#7c3aed', desc: 'Spoken in Kargil and Baltistan, Balti retains archaic Tibetan features lost in modern Tibetan. Originally in Tibetan script, now mainly uses Arabic script.' },
    { name: 'Changskhat', speakers: '~5,000', script: 'Tibetan', family: 'Tibeto-Burman', icon: 'bi-wind', color: '#059669', desc: 'The Changpa nomadic dialect, A variant of Tibetan spoken on the Changthang plateau. Primarily an oral language with limited written tradition.' },
    { name: 'Shina', speakers: '~2,500', script: 'None (oral)', family: 'Indo-aryan (Dardic)', icon: 'bi-chat-dots', color: '#dc2626', desc: 'Spoken by the Brokpa/Dard-aryan people of Dha-Hanu. A Dardic language unrelated to the Tibetan languages of the rest of Ladakh.' },
    { name: 'Purgi', speakers: '~50,000', script: 'Modified Arabic', family: 'Tibeto-Burman', icon: 'bi-journal-text', color: '#c8702a', desc: ' A Tibetan dialect spoken in the Purig valley (Kargil area). Shares features with both Ladakhi and Balti.' },
    { name: 'Urdu & Hindi', speakers: 'Widespread (second language)', script: 'Nastaliq / Devanagari', family: 'Indo-aryan', icon: 'bi-globe2', color: '#0891b2', desc: 'Used as lingua franca for inter-community communication, education, and government. Urdu is the official language under the J&K legacy, while Hindi serves as the national link.' },
  ];

  // ===== Religion Stats =====
  religions = [
    { name: 'Buddhism', pct: 40, color: '#c8702a', offset: 0, icon: 'bi-yin-yang', desc: 'Tibetan Buddhism (Vajrayana) is the dominant faith in Leh district, with over 30 active monasteries (gompas). The Drukpa Kagyu and Gelugpa orders are the main schools.' },
    { name: 'Islam', pct: 46, color: '#1a365d', offset: 40, icon: 'bi-moon-stars', desc: 'Islam is predominant in Kargil district, with Shia Muslims forming the majority. Sunni communities exist in Leh town (arghons). Mosques and imambaras are key landmarks.' },
    { name: 'Hinduism & Others', pct: 14, color: '#059669', offset: 86, icon: 'bi-peace', desc: 'Includes Hindus (mainly from outside Ladakh), Christians, Sikhs, and practitioners of the Ancient Bon religion which predates Buddhism in the region.' },
  ];

  // ===== Festivals =====
  festivals = [
    {
      name: 'Losar (Ladakhi New Year)',
      slug: 'losar',
      month: 'December / January',
      duration: '15 days',
      icon: 'bi-sun-fill',
      color: '#c8702a',
      type: 'Buddhist',
      desc: 'The most important festival of Ladakh, Losar marks the Ladakhi New Year. Families clean their homes, prepare special foods like khambir and butter tea, perform rituals, and gather for community celebrations.',
      overview: 'Losar is the grandest and most anticipated celebration in Ladakhi culture, marking the beginning of A new year according to the Tibetan calendar. Preparations begin weeks in advance — homes are whitewashed, floors scrubbed, and special offerings are prepared. On Losar eve, families gather to eat "guthuk" — A special noodle soup with hidden symbolic items (coal for bad luck, wool for kindness, chili for talkative nature). The 15-day celebration features archery competitions, folk dances, chang (barley beer) drinking, visits to monasteries, and elaborate feasts. Each household prepares A "chemo" — A decorated offering tower — and the community performs masked Cham dances to drive away evil spirits and welcome prosperity.',
      highlights: ['Guthuk soup ritual', 'Cham masked dances', 'archery competitions', 'Chemo offering towers', 'Family reunions', 'Community feasts'],
    },
    {
      name: 'Hemis Tsechu',
      slug: 'hemis-tsechu',
      month: 'June / July',
      duration: '2 days',
      icon: 'bi-mask',
      color: '#7c3aed',
      type: 'Buddhist',
      desc: 'The most spectacular monastic festival, celebrating Guru Padmasambhava\'s birth anniversary with elaborate Cham dances, giant thangka display, and vibrant celebrations at Hemis Monastery.',
      overview: 'Hemis Tsechu is Ladakh\'s most famous and visually spectacular festival, held at Hemis Monastery — the largest in Ladakh. It celebrates the birth anniversary of Guru Padmasambhava, who brought Buddhism to the Himalayan region. Monks perform sacred Cham dances wearing elaborate brocade costumes and fearsome masks representing wrathful deities, dharmapalas (protectors), and animals. The dances dramatize the victory of good over evil and the triumph of Buddhism. The highlight is the unfurling of A giant thangka (sacred embroidered painting) — the largest is displayed only once every 12 years. The courtyard fills with locals in their finest traditional dress, tourists, and the haunting sounds of long horns, cymbals, and drums.',
      highlights: ['Sacred Cham dances', 'Giant thangka display', 'Masked deity performances', 'Long horn music', 'Traditional dress', 'Monastic rituals'],
    },
    {
      name: 'Saga Dawa',
      slug: 'saga-dawa',
      month: 'May / June (Full Moon)',
      duration: '1 month (peak day)',
      icon: 'bi-brightness-high-fill',
      color: '#059669',
      type: 'Buddhist',
      desc: 'The holiest month in Tibetan Buddhism, commemorating Buddha\'s birth, enlightenment, and passing. Ladakhis perform special prayers, circumambulate sacred sites, and practice merit-making.',
      overview: 'Saga Dawa is considered the most sacred month in the Tibetan Buddhist calendar as it commemorates three momentous events in the life of Shakyamuni Buddha — his birth, enlightenment, and parinirvana (passing). The 15th day of the fourth Tibetan month is the most auspicious. During this period, Ladakhis intensify their religious practices: visiting monasteries for prayers, making offerings, circumambulating sacred sites like Shanti Stupa, releasing animals, and performing acts of generosity. Many observe vegetarianism and avoid killing any living beings. Monasteries hold special prayer sessions, butter lamp offerings, and scripture readings. It is believed that the karmic effects of all actions — positive or negative — are multiplied during this period.',
      highlights: ['Monastery pilgrimages', 'Butter lamp offerings', 'Circumambulation rituals', 'Scripture readings', 'Vegetarian observance', 'Merit-making acts'],
    },
    {
      name: 'Ladakh Festival',
      slug: 'ladakh-festival',
      month: 'September',
      duration: '15 days',
      icon: 'bi-stars',
      color: '#dc2626',
      type: 'Cultural',
      desc: ' A government-organized cultural showcase celebrating Ladakh\'s diverse heritage with folk dances, traditional sports, music, polo, archery, and showcases from all communities.',
      overview: 'The Ladakh Festival is A grand cultural extravaganza organized to showcase the rich and diverse heritage of Ladakh to the world. Originally started to extend the tourist season, it has evolved into A genuine celebration of Ladakhi identity. The festival opens with A colorful procession through Leh\'s main bazaar featuring representatives from all ethnic groups in traditional attire. Events include traditional archery tournaments, polo matches (Ladakh has one of the world\'s highest polo grounds), folk dance performances from Buddhist and Muslim communities, traditional music, thangka exhibitions, and masked dances at various monasteries. The festival serves as A platform for cultural exchange between Ladakh\'s diverse communities.',
      highlights: ['Grand Leh procession', 'Traditional polo matches', 'archery tournaments', 'Multi-community folk dances', 'artisan exhibitions', 'Monastic performances'],
    },
    {
      name: 'Muharram (Kargil)',
      slug: 'muharram',
      month: 'Variable (Islamic calendar)',
      duration: '10 days',
      icon: 'bi-moon-stars-fill',
      color: '#1a365d',
      type: 'Islamic',
      desc: 'Observed with great solemnity by the Shia Muslim community of Kargil, commemorating the martyrdom of Imam Hussain with processions, poetry recitals, and community gatherings.',
      overview: 'Muharram in Kargil is one of the most intense and deeply emotional religious observances in all of Ladakh. The Shia Muslim community of Kargil commemorates the martyrdom of Imam Hussain (grandson of Prophet Muhammad) at the Battle of Karbala in 680 CE. For the first ten days of the Islamic month of Muharram, the town transforms — black banners adorn buildings, community halls (imambaras) host nightly majlis (gatherings) where scholars recount the tragedy of Karbala through powerful oratory and marsiya (elegiac poetry). The observance reaches its climax on ashura (10th Muharram) with A massive procession through Kargil\'s streets featuring tazia (symbolic tombs), alam (standards), and communal expressions of grief. Despite the solemn nature, the event underscores deep community bonds.',
      highlights: ['Tazia processions', 'Marsiya poetry recitals', 'Nightly majlis gatherings', 'ashura observance', 'Community solidarity', 'Imambara gatherings'],
    },
    {
      name: 'Dosmoche',
      slug: 'dosmoche',
      month: 'February',
      duration: '2 days',
      icon: 'bi-wind',
      color: '#0891b2',
      type: 'Buddhist',
      desc: 'a "scapegoat" festival held in Leh and Likir, where elaborate thread-cross structures and ritual dough offerings are used to trap evil spirits and protect the community for the coming year.',
      overview: 'Dosmoche is A unique and Ancient festival performed in Leh and Likir Monastery to ward off evil forces for the coming year. The name means "offering of the scapegoat." Monks construct elaborate thread-cross structures (namgang) and large dough effigies that are ritualistically used to trap and expel negative forces, diseases, and obstacles. The two-day celebration features spectacular Cham dances in the courtyard of Leh Palace, with monks representing wrathful protector deities who symbolically battle and overcome evil. On the final day, the thread-cross structures and effigies are carried in procession and burned at A crossroads outside town, symbolically disposing of all the community\'s accumulated negativity. It is one of Ladakh\'s most visually dramatic rituals.',
      highlights: ['Thread-cross structures', 'Dough scapegoat effigies', 'Cham dances at Leh Palace', 'Ritual burning ceremony', 'Wrathful deity masks', 'Community protection rituals'],
    },
    {
      name: 'Matho Nagrang',
      slug: 'matho-nagrang',
      month: 'February / March',
      duration: '2 days',
      icon: 'bi-fire',
      color: '#dc2626',
      type: 'Buddhist',
      desc: 'Ladakh\'s most mystifying festival at Matho Monastery, where two monks become oracles — performing superhuman feats blindfolded, including slashing themselves and walking on walls.',
      overview: 'Matho Nagrang is perhaps the most extraordinary and unsettling festival in Ladakh, held at Matho Monastery — the only monastery of the Sakya order in the region. Two monks are chosen as oracles (rongtsans) and enter intense meditation for weeks before the festival. During the event, they are believed to become possessed by the monastery\'s protective deities. Blindfolded and in A trance state, they perform seemingly impossible feats — running along the narrow monastery walls high above the ground, slashing their bodies with swords (with wounds reportedly healing quickly), and making prophecies for the coming year. The oracles provide individual predictions and guidance when Approached by devotees. The festival attracts large crowds and remains one of the most authentic and unaltered spiritual traditions in the Himalayas.',
      highlights: ['Blindfolded oracle monks', 'Wall-walking trance feats', 'Prophecy & divination', 'Sword self-cutting', 'Sakya order rituals', 'Crowds of devotees'],
    },
    {
      name: 'Stok Guru Tsechu',
      slug: 'stok-guru-tsechu',
      month: 'February',
      duration: '2 days',
      icon: 'bi-trophy-fill',
      color: '#c8702a',
      type: 'Buddhist',
      desc: ' A vibrant oracle festival at Stok Monastery where an oracle monk performs trance feats and Cham dances celebrate the Stok royal legacy.',
      overview: 'Stok Guru Tsechu is A colorful festival held at Stok Palace and Monastery, the current residence of Ladakh\'s former royal family. The festival combines sacred Buddhist rituals with the celebration of the Stok royal heritage. Like Matho Nagrang, it features an oracle monk who enters A trance and makes predictions. The Cham dances here are particularly vivid, with monks in elaborate costumes and masks performing in the small but atmospheric courtyard of Stok Monastery against the backdrop of the Stok mountain range. The festival has gained special significance because the royal family of Ladakh still resides in Stok Palace, and the Stok Museum\'s collection of royal ornaments, thangkas, and Namgyal dynasty artifacts is A major attraction. Visitors can experience the rare combination of living royalty, active monastic life, and Ancient ritual.',
      highlights: ['Oracle trance performances', 'Cham dances at Stok', 'Royal palace backdrop', 'Stok Museum visit', 'Mountain panorama setting', 'Royal family presence'],
    },
  ];

  // ===== Traditional Dress =====
  dress = [
    { name: 'Goncha / Kos', gender: 'Unisex', icon: 'bi-person-standing', desc: 'The traditional Ladakhi robe — A heavy woolen garment tied at the waist with A sash (skerag). Creates A pouch above the waist for carrying essentials. Maroon or brown for men, bright colors for women.', material: 'Wool & Yak hair' },
    { name: 'Perak', gender: 'Women', icon: 'bi-gem', desc: 'The iconic Ladakhi cobra-shaped headpiece studded with turquoise stones, symbolizing wealth and status. Can weigh 2–5 kg and contain over 100 turquoise pieces. Passed down through generations.', material: 'Turquoise, leather, cloth' },
    { name: 'Tibi (Hat)', gender: 'Men', icon: 'bi-cap-front', desc: ' A cylindrical felt or velvet hat, sometimes fur-lined, worn by Ladakhi men. Styles vary by region — the Balti wear A distinctive rolled-wool cap called "balti topi."', material: 'Felt, velvet, fur' },
    { name: 'Skerag (Sash)', gender: 'Unisex', icon: 'bi-bandaid', desc: ' A long woven sash tied around the waist to secure the goncha and create the traditional chest pouch. Often colorfully woven with geometric patterns.', material: 'Woven wool & silk' },
    { name: 'Pabu (Boots)', gender: 'Unisex', icon: 'bi-boot', desc: 'Traditional Ladakhi boots made from yak hide with upturned toes. Lined with wool for insulation. The distinctive upturned design prevents snow from entering.', material: 'Yak leather & wool' },
    { name: 'Sulthan (Cape)', gender: 'Women', icon: 'bi-patch-check-fill', desc: ' A sheepskin cape worn draped over the back, fur-side in, for warmth during harsh Ladakhi winters. Often decorated with colorful silk borders on festive occasions.', material: 'Sheepskin & silk' },
  ];

  // ===== Cuisine =====
  cuisine = [
    { name: 'Thukpa', icon: 'bi-cup-hot', category: 'Soup/Noodle', desc: 'Ladakh\'s staple comfort food — A hearty noodle soup with vegetables and meat, flavored with garlic, ginger, and local spices. Every household has its own recipe.' },
    { name: 'Skyu', icon: 'bi-egg-fried', category: 'Pasta Stew', desc: ' A thick, warming stew of hand-rolled pasta shells (thumb-pressed dough) cooked with turnips, potatoes, and sometimes meat. The quintessential winter dish.' },
    { name: 'Momos', icon: 'bi-diamond-half', category: 'Dumplings', desc: 'Tibetan-style steamed or fried dumplings filled with minced meat or vegetables. Served with fiery chili sauce. A beloved snack across all communities.' },
    { name: 'Butter Tea (Gur Gur Cha)', icon: 'bi-cup-straw', category: 'Beverage', desc: 'Salted tea churned with yak butter — the essential Ladakhi drink. Providing warmth, energy, and hydration at high altitude. an acquired taste for visitors.' },
    { name: 'Khambir', icon: 'bi-bread-slice', category: 'Bread', desc: 'Traditional Ladakhi whole wheat bread baked in A mud oven. Dense, filling, and slightly tangy from natural fermentation. Often eaten with butter and apricot jam.' },
    { name: 'Chhurpi (Cheese)', icon: 'bi-box', category: 'Dairy', desc: 'Hard dried yak cheese that Changpa nomads carry as A protein-rich snack. Extremely hard — meant to be chewed slowly over hours. also used in curries when softened.' },
    { name: 'Chhang', icon: 'bi-cup-fill', category: 'Beverage', desc: 'Traditional barley beer, mildly alcoholic and slightly sour. Served warm from A brass pot at festivals and social gatherings. Central to Ladakhi hospitality.' },
    { name: 'apricot Products', icon: 'bi-tree', category: 'Fruit', desc: 'Ladakh\'s famous apricots are sun-dried, made into jam, pressed for oil (used in cooking & cosmetics), and the kernels eaten as snacks. A key economic product.' },
  ];

  // ===== Music & Dance =====
  performingArts = [
    { name: 'Cham Dance', icon: 'bi-mask', type: 'Sacred Dance', desc: 'Ritual masked dances performed by monks at monastery festivals. Elaborate costumes represent deities, demons, and protectors in A cosmic drama of good vs. evil.', where: 'Hemis, Thiksey, Phyang, Lamayuru' },
    { name: 'Jabro', icon: 'bi-music-note-list', type: 'Folk Dance', desc: ' A group dance performed at celebrations — men and women form A circle and dance with graceful hand and body movements, singing traditional songs in unison.', where: 'Throughout Ladakh' },
    { name: 'Shon', icon: 'bi-play-circle', type: 'Traditional Opera', desc: 'Ladakhi opera combining song, dance, and drama — often depicting Buddhist tales, historical events, or moral stories. Performed in open courtyards with elaborate costumes.', where: 'Leh, village festivals' },
    { name: 'Surna & Daman', icon: 'bi-speaker-fill', type: 'Instruments', desc: 'The surna (oboe-like shawm) and daman (large drum) duo — played by the Mon community at every monastery festival, wedding, and procession. The essential soundtrack of Ladakh.', where: 'all monastery festivals' },
    { name: 'Dha-Hanu Dances', icon: 'bi-flower2', type: 'Folk Dance', desc: 'Unique dances of the Brokpa/Dard-aryan people featuring flower-crowned dancers moving in rhythmic patterns accompanied by Dardic songs and drums.', where: 'Dha-Hanu Valley' },
    { name: 'Balti Folk Songs', icon: 'bi-mic-fill', type: 'Music', desc: 'Soulful Balti songs blending Tibetan melodies with Islamic poetic traditions. Themes include love, nature, separation, and devotion, often accompanied by the rabab.', where: 'Kargil, Suru Valley' },
  ];

  // ===== Crafts =====
  crafts = [
    { name: 'Thangka Painting', icon: 'bi-palette2', color: '#7c3aed', desc: 'Intricate Buddhist scroll paintings on cotton or silk, depicting deities, mandalas, and religious scenes. artists train for years under master painters, following strict iconographic rules.' },
    { name: 'Pashmina Weaving', icon: 'bi-patch-check', color: '#c8702a', desc: 'The world\'s finest wool from Changpa-reared Changthangi goats is hand-spun and woven into shawls of extraordinary softness. Ladakhi Pashmina is A GI-tagged luxury product.' },
    { name: 'Wood Carving', icon: 'bi-hammer', color: '#059669', desc: 'Elaborate carving of window frames, door lintels, and monastery interiors with Buddhist motifs — lotus flowers, dragons, snow lions, and cloud patterns.' },
    { name: 'Metal Work', icon: 'bi-wrench', color: '#1a365d', desc: 'Copper and silver craftsmanship producing prayer wheels, butter lamps, ceremonial vessels, and jewelry. The Mon community are the traditional metalworkers of Ladakh.' },
    { name: 'Pottery & Clay', icon: 'bi-urn', color: '#dc2626', desc: 'Traditional clay pottery for daily use — cups, storage jars, and incense burners. also includes the remarkable clay sculptures found in Ancient monasteries like alchi.' },
    { name: 'Carpet & Rug Weaving', icon: 'bi-grid-3x3-gap', color: '#0891b2', desc: 'Hand-knotted Tibetan-style rugs with bold geometric and Buddhist motifs, made from sheep and yak wool. Traditionally used as floor coverings and wall hangings in Ladakhi homes.' },
  ];

  // ===== Daily Life =====
  dailyLife = [
    { title: 'agricultural Cycle', icon: 'bi-flower1', desc: 'Life revolves around the short growing season (May–September). Barley, wheat, and peas are staple crops. The harvest festival is A major celebration, and winter is spent in community gatherings and religious observances.' },
    { title: 'Polyandry & Family', icon: 'bi-house-heart', desc: 'Traditional fraternal polyandry (one wife, multiple brothers) was practiced to prevent land division. Though declining, it shaped Ladakhi social structure. Extended families live together in large stone-and-mud houses.' },
    { title: 'Water & Irrigation', icon: 'bi-droplet-fill', desc: 'Glacial melt is channeled through Ancient irrigation canals (yura) managed by A community-elected water master (churpon). Water distribution follows strict traditional rules that predate any modern governance.' },
    { title: 'Community Service (Bes)', icon: 'bi-people', desc: 'Bes is the Ladakhi tradition of communal labor — villagers come together to help with house building, road repair, harvest, and monastery maintenance. It reflects the deep collective spirit of Ladakhi society.' },
    { title: 'Spirituality in Daily Life', icon: 'bi-yin-yang', desc: 'Prayer flags flutter from every rooftop, mani walls line village paths, prayer wheels spin by streams. Morning prayers, butter lamp offerings, and monastery visits are woven into the fabric of everyday life.' },
    { title: 'Modern Challenges', icon: 'bi-exclamation-diamond', desc: 'Urbanization, tourism, military presence, and climate change are rapidly transforming traditional life. Youth migration to cities, cultural dilution, and glacial retreat pose existential questions for Ladakhi identity.' },
  ];
}




