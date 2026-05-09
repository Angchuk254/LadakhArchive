import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LeafletMapComponent } from '../../shared/leaflet-map/leaflet-map';

interface Festival {
  slug: string; name: string; month: string; duration: string;
  icon: string; color: string; type: string;
  lat: number; lng: number; zoom?: number;
  image: string;
  heroImage: string;
  desc: string; overview: string; highlights: string[];
  traditions: string[];
  locations: string[];
}

@Component({
  selector: 'app-festival-detail',
  imports: [RouterLink, LeafletMapComponent],
  templateUrl: './festival-detail.html',
  styleUrl: './festival-detail.scss',
})
export class FestivalDetail {
  private route = inject(ActivatedRoute);

  activeTab = signal<string>('overview');
  festival = signal<Festival | null>(null);

  setTab(tab: string) {
    this.activeTab.set(tab);
  }

  festivals: Festival[] = [
    {
      slug: 'losar', name: 'Losar (Ladakhi New Year)', month: 'December / January', duration: '15 days',
      icon: 'bi-sun-fill', color: '#c8702a', type: 'Buddhist',
      lat: 34.1526, lng: 77.5771, zoom: 9, /* Leh as center */
      image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      desc: 'The most important festival of Ladakh, Losar marks the Ladakhi New Year. Families clean their homes, prepare special foods like khambir and butter tea, perform rituals, and gather for community celebrations.',
      overview: 'Losar is the grandest and most anticipated celebration in Ladakhi culture, marking the beginning of A new year according to the Tibetan calendar. Preparations begin weeks in advance — homes are whitewashed, floors scrubbed, and special offerings are prepared. On Losar eve, families gather to eat "guthuk" — A special noodle soup with hidden symbolic items (coal for bad luck, wool for kindness, chili for talkative nature). The 15-day celebration features archery competitions, folk dances, chang (barley beer) drinking, visits to monasteries, and elaborate feasts. Each household prepares A "chemo" — A decorated offering tower — and the community performs masked Cham dances to drive away evil spirits and welcome prosperity.',
      highlights: ['Guthuk soup ritual', 'Cham masked dances', 'archery competitions', 'Chemo offering towers', 'Family reunions', 'Community feasts'],
      traditions: ['Preparing guthuk (special soup with hidden symbolic items)', 'Whitewashing homes and cleaning hearths', 'Building chemo (decorated offering towers)', 'Performing Cham masked dances to ward off evil', 'archery competitions between villages', 'Offering chang (barley beer) to guests'],
      locations: ['Every household in Ladakh', 'Leh Main Bazaar', 'Village monasteries across Leh & Kargil', 'Shanti Stupa gathering'],
    },
    {
      slug: 'hemis-tsechu', name: 'Hemis Tsechu', month: 'June / July', duration: '2 days',
      icon: 'bi-mask', color: '#7c3aed', type: 'Buddhist',
      lat: 33.9142, lng: 77.7028, zoom: 15,
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=1600',
      desc: 'The most spectacular monastic festival, celebrating Guru Padmasambhava\'s birth anniversary with elaborate Cham dances, giant thangka display, and vibrant celebrations at Hemis Monastery.',
      overview: 'Hemis Tsechu is Ladakh\'s most famous and visually spectacular festival, held at Hemis Monastery — the largest in Ladakh. It celebrates the birth anniversary of Guru Padmasambhava, who brought Buddhism to the Himalayan region. Monks perform sacred Cham dances wearing elaborate brocade costumes and fearsome masks representing wrathful deities, dharmapalas (protectors), and animals. The dances dramatize the victory of good over evil and the triumph of Buddhism. The highlight is the unfurling of A giant thangka (sacred embroidered painting) — the largest is displayed only once every 12 years. The courtyard fills with locals in their finest traditional dress, tourists, and the haunting sounds of long horns, cymbals, and drums.',
      highlights: ['Sacred Cham dances', 'Giant thangka display', 'Masked deity performances', 'Long horn music', 'Traditional dress', 'Monastic rituals'],
      traditions: ['Unfurling of the giant sacred thangka (every 12 years)', 'Monks performing sacred Cham dances in elaborate masks', 'Playing of dungchen (long horns) and rolmo (cymbals)', 'Blessing ceremonies by senior lamas', 'Display of Ancient monastic treasures', 'Community gathering in traditional Ladakhi dress'],
      locations: ['Hemis Monastery (main venue)', 'Hemis National Park area', 'Leh town (cultural overflow events)'],
    },
    {
      slug: 'saga-dawa', name: 'Saga Dawa', month: 'May / June (Full Moon)', duration: '1 month (peak day)',
      icon: 'bi-brightness-high-fill', color: '#059669', type: 'Buddhist',
      lat: 34.1751, lng: 77.5772, zoom: 14, /* Shanti Stupa */
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600',
      desc: 'The holiest month in Tibetan Buddhism, commemorating Buddha\'s birth, enlightenment, and passing. Ladakhis perform special prayers, circumambulate sacred sites, and practice merit-making.',
      overview: 'Saga Dawa is considered the most sacred month in the Tibetan Buddhist calendar as it commemorates three momentous events in the life of Shakyamuni Buddha — his birth, enlightenment, and parinirvana (passing). The 15th day of the fourth Tibetan month is the most auspicious. During this period, Ladakhis intensify their religious practices: visiting monasteries for prayers, making offerings, circumambulating sacred sites like Shanti Stupa, releasing animals, and performing acts of generosity. Many observe vegetarianism and avoid killing any living beings. Monasteries hold special prayer sessions, butter lamp offerings, and scripture readings. It is believed that the karmic effects of all actions — positive or negative — are multiplied during this period.',
      highlights: ['Monastery pilgrimages', 'Butter lamp offerings', 'Circumambulation rituals', 'Scripture readings', 'Vegetarian observance', 'Merit-making acts'],
      traditions: ['Circumambulating Shanti Stupa and other sacred sites', 'Offering thousands of butter lamps at monasteries', 'Observing strict vegetarianism for the entire month', 'Releasing captive animals as acts of merit', 'Marathon prayer sessions at Thiksay and Hemis', 'Distributing food to the poor and animals'],
      locations: ['Shanti Stupa, Leh', 'Thiksay Monastery', 'Hemis Monastery', 'Spituk Monastery', 'all monasteries across Ladakh'],
    },
    {
      slug: 'ladakh-festival', name: 'Ladakh Festival', month: 'September', duration: '15 days',
      icon: 'bi-stars', color: '#dc2626', type: 'Cultural',
      lat: 34.1600, lng: 77.5850, zoom: 14, /* Leh Polo Ground */
      image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1600',
      desc: ' A government-organized cultural showcase celebrating Ladakh\'s diverse heritage with folk dances, traditional sports, music, polo, archery, and showcases from all communities.',
      overview: 'The Ladakh Festival is A grand cultural extravaganza organized to showcase the rich and diverse heritage of Ladakh to the world. Originally started to extend the tourist season, it has evolved into A genuine celebration of Ladakhi identity. The festival opens with A colorful procession through Leh\'s main bazaar featuring representatives from all ethnic groups in traditional attire. Events include traditional archery tournaments, polo matches (Ladakh has one of the world\'s highest polo grounds), folk dance performances from Buddhist and Muslim communities, traditional music, thangka exhibitions, and masked dances at various monasteries. The festival serves as A platform for cultural exchange between Ladakh\'s diverse communities.',
      highlights: ['Grand Leh procession', 'Traditional polo matches', 'archery tournaments', 'Multi-community folk dances', 'artisan exhibitions', 'Monastic performances'],
      traditions: ['Grand opening procession through Leh Main Bazaar', 'Polo matches at the world\'s highest polo ground', 'Inter-village archery tournaments', 'Folk dance performances by Buddhist and Muslim communities', 'Thangka and handicraft exhibitions', 'Yak races and traditional sports'],
      locations: ['Leh Main Bazaar (opening procession)', 'Leh Polo Ground', 'Various monasteries (Cham dances)', 'Leh Exhibition Ground'],
    },
    {
      slug: 'muharram', name: 'Muharram (Kargil)', month: 'Variable (Islamic calendar)', duration: '10 days',
      icon: 'bi-moon-stars-fill', color: '#1a365d', type: 'Islamic',
      lat: 34.5551, lng: 76.1349, zoom: 14, /* Kargil Main Bazaar */
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1600',
      desc: 'Observed with great solemnity by the Shia Muslim community of Kargil, commemorating the martyrdom of Imam Hussain with processions, poetry recitals, and community gatherings.',
      overview: 'Muharram in Kargil is one of the most intense and deeply emotional religious observances in all of Ladakh. The Shia Muslim community of Kargil commemorates the martyrdom of Imam Hussain (grandson of Prophet Muhammad) at the Battle of Karbala in 680 CE. For the first ten days of the Islamic month of Muharram, the town transforms — black banners adorn buildings, community halls (imambaras) host nightly majlis (gatherings) where scholars recount the tragedy of Karbala through powerful oratory and marsiya (elegiac poetry). The observance reaches its climax on ashura (10th Muharram) with A massive procession through Kargil\'s streets featuring tazia (symbolic tombs), alam (standards), and communal expressions of grief. Despite the solemn nature, the event underscores deep community bonds.',
      highlights: ['Tazia processions', 'Marsiya poetry recitals', 'Nightly majlis gatherings', 'ashura observance', 'Community solidarity', 'Imambara gatherings'],
      traditions: ['Building and carrying tazia (symbolic tombs) in procession', 'Reciting marsiya (elegiac poetry) and noha (lamentation)', 'Nightly majlis gatherings in imambaras', 'alam (sacred standard) procession through streets', 'Communal distribution of food and tea', 'Ten days of mourning and reflection'],
      locations: ['Kargil Main Bazaar (ashura procession)', 'Imambaras across Kargil district', 'Hussainabad, Kargil', 'Dras town'],
    },
    {
      slug: 'dosmoche', name: 'Dosmoche', month: 'February', duration: '2 days',
      icon: 'bi-wind', color: '#0891b2', type: 'Buddhist',
      lat: 34.1656, lng: 77.5861, zoom: 15, /* Leh Palace */
      image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      desc: 'a "scapegoat" festival held in Leh and Likir, where elaborate thread-cross structures and ritual dough offerings are used to trap evil spirits and protect the community for the coming year.',
      overview: 'Dosmoche is A unique and Ancient festival performed in Leh and Likir Monastery to ward off evil forces for the coming year. The name means "offering of the scapegoat." Monks construct elaborate thread-cross structures (namgang) and large dough effigies that are ritualistically used to trap and expel negative forces, diseases, and obstacles. The two-day celebration features spectacular Cham dances in the courtyard of Leh Palace, with monks representing wrathful protector deities who symbolically battle and overcome evil. On the final day, the thread-cross structures and effigies are carried in procession and burned at A crossroads outside town, symbolically disposing of all the community\'s accumulated negativity. It is one of Ladakh\'s most visually dramatic rituals.',
      highlights: ['Thread-cross structures', 'Dough scapegoat effigies', 'Cham dances at Leh Palace', 'Ritual burning ceremony', 'Wrathful deity masks', 'Community protection rituals'],
      traditions: ['Constructing elaborate namgang (thread-cross structures)', 'Creating sacrificial dough effigies to trap evil spirits', 'Performing Cham dances in the Leh Palace courtyard', 'Procession to carry effigies to crossroads', 'Ritual burning to banish accumulated negativity', 'Community prayers for protection in the new year'],
      locations: ['Leh Palace courtyard (main Cham dances)', 'Likir Monastery', 'Crossroads outside Leh town (burning ceremony)'],
    },
    {
      slug: 'matho-nagrang', name: 'Matho Nagrang', month: 'February / March', duration: '2 days',
      icon: 'bi-fire', color: '#dc2626', type: 'Buddhist',
      lat: 33.9912, lng: 77.6254, zoom: 15, /* Matho Monastery */
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=1600',
      desc: 'Ladakh\'s most mystifying festival at Matho Monastery, where two monks become oracles — performing superhuman feats blindfolded, including slashing themselves and walking on walls.',
      overview: 'Matho Nagrang is perhaps the most extraordinary and unsettling festival in Ladakh, held at Matho Monastery — the only monastery of the Sakya order in the region. Two monks are chosen as oracles (rongtsans) and enter intense meditation for weeks before the festival. During the event, they are believed to become possessed by the monastery\'s protective deities. Blindfolded and in A trance state, they perform seemingly impossible feats — running along the narrow monastery walls high above the ground, slashing their bodies with swords (with wounds reportedly healing quickly), and making prophecies for the coming year. The oracles provide individual predictions and guidance when Approached by devotees. The festival attracts large crowds and remains one of the most authentic and unaltered spiritual traditions in the Himalayas.',
      highlights: ['Blindfolded oracle monks', 'Wall-walking trance feats', 'Prophecy & divination', 'Sword self-cutting', 'Sakya order rituals', 'Crowds of devotees'],
      traditions: ['Two monks selected as rongtsans (oracles) after weeks of meditation', 'Blindfolded trance walk on narrow monastery walls', 'Self-cutting with swords (wounds reportedly heal rapidly)', 'Individual prophecies given to Approaching devotees', 'Year-ahead predictions for the community', 'Sacred Sakya order rituals unique to Matho'],
      locations: ['Matho Monastery (sole venue)', 'Matho village, 26 km from Leh'],
    },
    {
      slug: 'stok-guru-tsechu', name: 'Stok Guru Tsechu', month: 'February', duration: '2 days',
      icon: 'bi-trophy-fill', color: '#c8702a', type: 'Buddhist',
      lat: 34.0729, lng: 77.5458, zoom: 15, /* Stok Palace */
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600',
      desc: ' A vibrant oracle festival at Stok Monastery where an oracle monk performs trance feats and Cham dances celebrate the Stok royal legacy.',
      overview: 'Stok Guru Tsechu is A colorful festival held at Stok Palace and Monastery, the current residence of Ladakh\'s former royal family. The festival combines sacred Buddhist rituals with the celebration of the Stok royal heritage. Like Matho Nagrang, it features an oracle monk who enters A trance and makes predictions. The Cham dances here are particularly vivid, with monks in elaborate costumes and masks performing in the small but atmospheric courtyard of Stok Monastery against the backdrop of the Stok mountain range. The festival has gained special significance because the royal family of Ladakh still resides in Stok Palace, and the Stok Museum\'s collection of royal ornaments, thangkas, and Namgyal dynasty artifacts is A major attraction. Visitors can experience the rare combination of living royalty, active monastic life, and Ancient ritual.',
      highlights: ['Oracle trance performances', 'Cham dances at Stok', 'Royal palace backdrop', 'Stok Museum visit', 'Mountain panorama setting', 'Royal family presence'],
      traditions: ['Oracle monk trance ceremony with predictions', 'Vivid Cham dances in Stok Monastery courtyard', 'Display of royal Namgyal dynasty artifacts', 'Blessing ceremony by senior Stok lamas', 'Community feast and celebration', 'Visit to Stok Museum\'s royal collection'],
      locations: ['Stok Palace & Monastery', 'Stok village, 15 km from Leh', 'Stok Museum'],
    },
  ];

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug');
    const found = this.festivals.find(f => f.slug === slug);
    this.festival.set(found ?? null);
  }
}




