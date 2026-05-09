import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-routes-page',
  imports: [RouterLink],
  templateUrl: './routes-page.html',
  styleUrl: './routes-page.scss',
  host: { '(document:keydown.escape)': 'onEscape()' },
})
export class RoutesPage {
  selectedRoute = signal<any>(null);
  activeTab = signal<string>('overview');

  /* â”€â”€ Stats â”€â”€ */
  stats = [
    { icon: 'bi-signpost-split', value: '20+', label: 'Iconic Routes' },
    { icon: 'bi-mountains', value: '18,380 ft', label: 'Highest Pass (Khardung La)' },
    { icon: 'bi-rulers', value: '1,500+ km', label: 'Road Network' },
    { icon: 'bi-calendar-heart', value: 'Jun–Sep', label: 'Best Season' },
    { icon: 'bi-ev-front', value: '2', label: 'Highway Approaches' },
    { icon: 'bi-snow2', value: '5+', label: 'Passes above 17,000 ft' },
  ];

  /* â”€â”€ Highway Approaches â”€â”€ */
  highways = [
    {
      name: 'Manali–Leh Highway',
      distance: '474 km',
      duration: '12–14 hours',
      season: 'June – October',
      maxAltitude: '16,050 ft (Tanglang La)',
      icon: 'bi-bus-front',
      color: '#f59e0b',
      highlights: [
        'Rohtang Pass (13,051 ft)',
        'Keylong — Lahaul HQ',
        'Baralacha La (16,017 ft)',
        'Sarchu — Overnight stop',
        'Lachalung La (16,598 ft)',
        'Gata Loops — 21 hairpin bends',
        'Pang — High-altitude camp',
        'Tanglang La (16,050 ft)',
        'More Plains — Moonlike landscape',
        'Upshi — Indus Valley entry',
      ],
      description:
        'The classic backpacker route from Himachal Pradesh, crossing five major passes through some of the most dramatic mountain landscapes in the world. The road traverses the Pir Panjal and Zanskar ranges.',
    },
    {
      name: 'Srinagar–Leh Highway (NH1)',
      distance: '434 km',
      duration: '10–12 hours',
      season: 'May – November',
      maxAltitude: '11,578 ft (Zoji La)',
      icon: 'bi-car-front',
      color: '#3b82f6',
      highlights: [
        'Sonamarg — Golden meadow',
        'Zoji La (11,578 ft) — Gateway to Ladakh',
        'Drass — 2nd coldest inhabited place',
        'Kargil — Halfway stop',
        'Mulbekh — Giant Maitreya Buddha',
        'Namika La (12,139 ft)',
        'Fotu La (13,479 ft) — Highest on this route',
        'Lamayuru — Moonland monastery',
        'alchi — Ancient temple complex',
        'Magnetic Hill & Gurudwara Pathar Sahib',
      ],
      description:
        'The historically significant route through the Kashmir Valley, crossing the Zoji La into Ladakh. This is the gentler Approach with lower passes, and the traditional trade route along the Ancient Silk Road.',
    },
  ];

  /* â”€â”€ Mountain Passes â”€â”€ */
  passes = [
    { slug: 'khardung-la', name: 'Khardung La', altitude: '18,380 ft', road: 'Leh â†’ Nubra', status: 'Motorable', icon: 'bi-flag', description: 'Gateway to the Nubra Valley and Siachen, one of the highest motorable passes in the world.' },
    { slug: 'chang-la', name: 'Chang La', altitude: '17,688 ft', road: 'Leh â†’ Pangong', status: 'Motorable', icon: 'bi-flag', description: 'The route to Pangong Lake, maintained by the Indian army. Third highest motorable pass in India.' },
    { slug: 'tanglang-la', name: 'Tanglang La', altitude: '17,582 ft', road: 'Manali–Leh Hwy', status: 'Motorable', icon: 'bi-flag', description: 'Second highest pass on the Manali–Leh Highway, offers panoramic views of the Zanskar range.' },
    { slug: 'lachalung-la', name: 'Lachalung La', altitude: '16,598 ft', road: 'Manali–Leh Hwy', status: 'Motorable', icon: 'bi-flag', description: 'Located near the famous Gata Loops with 21 hairpin bends, A thrilling driving experience.' },
    { slug: 'baralacha-la', name: 'Baralacha La', altitude: '16,017 ft', road: 'Manali–Leh Hwy', status: 'Motorable', icon: 'bi-flag', description: 'The boundary between Lahaul (Himachal) and Ladakh, source of the Bhaga and Yunam rivers.' },
    { slug: 'wari-la', name: 'Wari La', altitude: '17,352 ft', road: 'Leh â†’ Nubra (alt)', status: 'Motorable', icon: 'bi-flag', description: 'alternative route to Nubra Valley, less crowded than Khardung La but more adventurous.' },
    { slug: 'fotu-la', name: 'Fotu La', altitude: '13,479 ft', road: 'Srinagar–Leh Hwy', status: 'Motorable', icon: 'bi-flag', description: 'Highest point on the Srinagar–Leh Highway, near the famous Lamayuru Monastery.' },
    { slug: 'zoji-la', name: 'Zoji La', altitude: '11,578 ft', road: 'Srinagar–Leh Hwy', status: 'Motorable', icon: 'bi-flag', description: 'The gateway to Ladakh from Kashmir. The Zoji La tunnel (under construction) will make it all-weather.' },
  ];

  /* â”€â”€ Iconic Road Trips â”€â”€ */
  roadTrips = [
    {
      slug: 'leh-nubra-valley',
      name: 'Leh â†’ Nubra Valley',
      tag: 'Must-Do',
      distance: '120 km',
      duration: '4–5 hours',
      bestTime: 'June – September',
      difficulty: 'Moderate',
      color: '#10b981',
      keyStops: ['Khardung La', 'Khalsar', 'Diskit Monastery', 'Hunder Sand Dunes', 'Turtuk Village'],
      description: 'Cross the legendary Khardung La to reach the enchanting Nubra Valley — A land of double-humped camels, sand dunes, and the last village before Pakistan.',
      permits: 'Inner Line Permit required',
    },
    {
      slug: 'leh-pangong-tso',
      name: 'Leh â†’ Pangong Tso',
      tag: 'Iconic',
      distance: '160 km',
      duration: '5–6 hours',
      bestTime: 'May – September',
      difficulty: 'Moderate',
      color: '#3b82f6',
      keyStops: ['Karu', 'Chang La', 'Tangste', 'Spangmik', 'Pangong Lake'],
      description: 'Journey to the mesmerizing Pangong Lake — A 134 km long endorheic lake stretching into Tibet, famous for its ever-changing blue hues.',
      permits: 'Inner Line Permit required',
    },
    {
      slug: 'leh-tso-moriri',
      name: 'Leh â†’ Tso Moriri',
      tag: 'Off-Beat',
      distance: '240 km',
      duration: '7–8 hours',
      bestTime: 'June – September',
      difficulty: 'Difficult',
      color: '#8b5cf6',
      keyStops: ['Upshi', 'Chumur', 'Puga Hot Springs', 'Sumdo', 'Korzok Village'],
      description: ' A remote and pristine high-altitude lake at 14,836 ft. Tso Moriri is A Ramsar wetland surrounded by the Changthang plateau, home to nomadic Changpa herders.',
      permits: 'Inner Line Permit required',
    },
    {
      slug: 'leh-hanle',
      name: 'Leh â†’ Hanle',
      tag: 'adventure',
      distance: '260 km',
      duration: '8–9 hours',
      bestTime: 'June – September',
      difficulty: 'Difficult',
      color: '#ef4444',
      keyStops: ['Upshi', 'Loma', 'Nyoma', 'Hanle Monastery', 'Indian astronomical Observatory'],
      description: 'Journey to one of the world\'s highest astronomical observatories at 14,764 ft. Hanle offers the clearest skies in India — A stargazer\'s paradise.',
      permits: 'Inner Line Permit required',
    },
    {
      slug: 'leh-zanskar-valley',
      name: 'Leh â†’ Zanskar Valley',
      tag: 'Expedition',
      distance: '460 km (via Kargil)',
      duration: '2 days',
      bestTime: 'July – September',
      difficulty: 'Very Difficult',
      color: '#f97316',
      keyStops: ['Kargil', 'Rangdum Monastery', 'Pensi La (14,001 ft)', 'Padum', 'Zangla Fort'],
      description: 'The road to Zanskar is one of the most adventurous drives in India. The valley remains cut off by snow for 8 months. Padum is the administrative capital of this remote sub-district.',
      permits: 'No special permit needed',
    },
    {
      slug: 'changthang-circuit',
      name: 'Pangong â†’ Tso Moriri (Changthang Circuit)',
      tag: 'Ultimate',
      distance: '350 km',
      duration: '2 days',
      bestTime: 'July – August',
      difficulty: 'Very Difficult',
      color: '#dc2626',
      keyStops: ['Spangmik', 'Man–Merak', 'Chushul', 'Rezang La War Memorial', 'Nyoma', 'Korzok'],
      description: 'The ultimate Changthang plateau circuit connecting both legendary lakes. Extremely remote with no fuel stations — requires full self-sufficiency. Passes through military areas.',
      permits: 'Special permit + backup vehicle recommended',
    },
  ];

  /* â”€â”€ Trekking Routes â”€â”€ */
  treks = [
    {
      slug: 'markha-valley',
      name: 'Markha Valley Trek',
      difficulty: 'Moderate–Hard',
      duration: '6–8 days',
      maxAltitude: '16,700 ft (Kongmaru La)',
      distance: '65 km',
      season: 'June – September',
      color: '#10b981',
      startEnd: 'Spituk â†’ Hemis',
      highlights: ['Zingchen', 'Yurutse', 'Skiu', 'Markha Village', 'Hankar', 'Nimaling Plateau', 'Kongmaru La', 'Shang Sumdo'],
      description: 'The most popular trek in Ladakh traversing the Hemis National Park. Camp at the stunning Nimaling Plateau beneath Kang Yatse peak (21,250 ft).',
    },
    {
      slug: 'chadar-frozen-river',
      name: 'Chadar Trek (Frozen River)',
      difficulty: 'Extreme',
      duration: '8–10 days',
      maxAltitude: '11,123 ft',
      distance: '62 km',
      season: 'January – February',
      color: '#3b82f6',
      startEnd: 'Chilling â†’ Nerak â†’ Chilling',
      highlights: ['Tilat Sumdo', 'Gyalpo (Ice Waterfall)', 'Tibb Cave', 'Nerak Village', 'Deep Gorges', 'Frozen Zanskar River'],
      description: 'Walk on the frozen Zanskar River in sub-zero temperatures. This legendary winter trek is the traditional route used by Zanskaris when the road is snowed in.',
    },
    {
      slug: 'stok-kangri',
      name: 'Stok Kangri Climb',
      difficulty: 'Extreme',
      duration: '4–6 days',
      maxAltitude: '20,187 ft',
      distance: '36 km',
      season: 'July – September',
      color: '#ef4444',
      startEnd: 'Stok Village â†’ Summit â†’ Stok Village',
      highlights: ['Stok Village', 'Mankorma Base Camp', 'Stok Base Camp', 'advance Camp', 'Summit Push', 'Glacier Crossing'],
      description: 'The highest trekking peak in Ladakh, visible from Leh. A non-technical climb but demanding due to altitude. Panoramic views of the Karakoram and Zanskar ranges from the summit.',
    },
    {
      slug: 'rumtse-tso-moriri',
      name: 'Rumtse to Tso Moriri',
      difficulty: 'Hard',
      duration: '7–10 days',
      maxAltitude: '16,700 ft (Kyamari La)',
      distance: '80 km',
      season: 'July – September',
      color: '#8b5cf6',
      startEnd: 'Rumtse â†’ Korzok',
      highlights: ['Rumtse', 'Kyamari La', 'Tisaling', 'Pongunagu', 'Tso Kar Lake', 'Nuruchan', 'Gyama Valley', 'Korzok'],
      description: ' A stunning high-altitude trek linking the Manali–Leh Highway to the pristine Tso Moriri lake, crossing the Changthang wildlife sanctuary.',
    },
    {
      slug: 'lamayuru-alchi',
      name: 'Lamayuru to alchi',
      difficulty: 'Moderate',
      duration: '3–5 days',
      maxAltitude: '12,500 ft (Staki La)',
      distance: '40 km',
      season: 'June – October',
      color: '#f59e0b',
      startEnd: 'Lamayuru â†’ alchi',
      highlights: ['Lamayuru Moonland', 'Prinkiti La', 'Hinju Village', 'Sumdah Chun', 'Sumda Chenmo', 'alchi Monastery'],
      description: ' A cultural trek through Ancient villages and remote monasteries. Connect two of Ladakh\'s most important Buddhist heritage sites.',
    },
    {
      slug: 'sham-valley',
      name: 'Sham Valley Trek',
      difficulty: 'Easy',
      duration: '3–4 days',
      maxAltitude: '12,795 ft',
      distance: '35 km',
      season: 'May – October',
      color: '#06b6d4',
      startEnd: 'Likir â†’ Hemis Shukpachan â†’ Temisgam',
      highlights: ['Likir Monastery', 'Yangthang', 'Hemis Shukpachan', 'ang Village', 'Temisgam', 'apricot Orchards'],
      description: 'Known as the "Baby Trek" of Ladakh — perfect for beginners and families. Walk through charming villages with homestays, apricot orchards, and monastery visits.',
    },
  ];

  /* â”€â”€ Cycling Routes â”€â”€ */
  cyclingRoutes = [
    { name: 'Manali to Leh', distance: '474 km', duration: '8–12 days', difficulty: 'Extreme', maxAltitude: '16,050 ft', description: 'The ultimate cycling challenge in India. Five major passes, extreme altitude, and stunning isolation.' },
    { name: 'Leh to Khardung La', distance: '40 km', duration: '1 day', difficulty: 'Very Hard', maxAltitude: '18,380 ft', description: ' A brutal uphill ride to one of the world\'s highest motorable passes. Rewards with incredible views.' },
    { name: 'Leh to Pangong (via Chang La)', distance: '160 km', duration: '2–3 days', difficulty: 'Hard', maxAltitude: '17,688 ft', description: 'Cross Chang La and descend to the magical Pangong Lake. Remote stretches require self-sufficiency.' },
    { name: 'Srinagar to Leh', distance: '434 km', duration: '5–7 days', difficulty: 'Hard', maxAltitude: '13,479 ft', description: 'Slightly gentler than Manali route with lower passes but longer stretches. Rich cultural stops along the way.' },
  ];

  /* â”€â”€ Practical Information â”€â”€ */
  permits = [
    { area: 'Nubra Valley', type: 'Inner Line Permit (ILP)', cost: 'Rs.0 for Indians online', duration: '7 days', apply: 'DC Office Leh / Online portal', note: 'Foreign nationals need separate PAP through registered travel agent.' },
    { area: 'Pangong Tso', type: 'Inner Line Permit (ILP)', cost: 'Rs.0 for Indians online', duration: '7 days', apply: 'DC Office Leh / Online portal', note: 'Foreigners allowed only up to Spangmik (7 km from the lake).' },
    { area: 'Tso Moriri', type: 'Inner Line Permit (ILP)', cost: 'Rs.0 for Indians online', duration: '7 days', apply: 'DC Office Leh / Online portal', note: 'Route via Chumur requires additional permit clearance.' },
    { area: 'Hanle', type: 'Inner Line Permit + Special', cost: 'Rs.0 for Indians online', duration: '7 days', apply: 'DC Office Leh', note: 'Restricted area near LaC. Permit approval can take 1–2 days.' },
    { area: 'Zanskar', type: 'No special permit', cost: 'N/a', duration: 'N/a', apply: 'N/a', note: 'Open for all Indian and foreign nationals. Road access only Jul–Oct.' },
    { area: 'Turtuk / Tyakshi', type: 'Inner Line Permit (ILP)', cost: 'Rs.0 for Indians online', duration: '7 days', apply: 'DC Office Leh / Online portal', note: 'Last Indian village before the LoC. Was part of Pakistan until 1971.' },
  ];

  /* â”€â”€ Fuel & Service Stations â”€â”€ */
  fuelStations = [
    { location: 'Leh (Main City)', type: 'Petrol + Diesel + EV Charging', note: 'Multiple stations — last reliable fuel before most routes.' },
    { location: 'Karu', type: 'Petrol + Diesel', note: 'Junction point for Pangong and Tso Moriri routes.' },
    { location: 'Kargil', type: 'Petrol + Diesel', note: 'Halfway on Srinagar–Leh Highway. Last fuel before Zanskar.' },
    { location: 'Diskit (Nubra)', type: 'Petrol + Diesel', note: 'The only fuel station in Nubra Valley.' },
    { location: 'Tangtse', type: 'Petrol + Diesel', note: 'Last fuel before Pangong Lake. Often runs out in peak season.' },
    { location: 'Upshi', type: 'Limited', note: 'Small station on Manali–Leh route. Not always operational.' },
  ];

  /* â”€â”€ Seasonal Calendar â”€â”€ */
  seasons = [
    { months: 'January – March', status: 'Winter Closed', color: '#60a5fa', roads: 'Most roads closed. Only Leh airport operational.', activity: 'Chadar Trek (Frozen River), Monastery visits in Leh.', temp: '-15ÂaC to -5ÂaC' },
    { months: 'april – May', status: 'Opening Season', color: '#34d399', roads: 'Srinagar–Leh opens mid-May. Manali–Leh opens late May/June.', activity: 'Limited travel. Snow clearance ongoing. Flights available.', temp: '-2ÂaC to 12ÂaC' },
    { months: 'June – July', status: 'Peak Season', color: '#fbbf24', roads: 'all roads open. Inner routes accessible.', activity: 'all road trips, treks, and cycling routes fully operational.', temp: '8ÂaC to 28ÂaC' },
    { months: 'august – September', status: 'Monsoon Edge', color: '#fb923c', roads: 'Landslides possible on Manali route. Inner routes mostly fine.', activity: 'Trekking at its best. Changthang wildflowers. Festivals.', temp: '7ÂaC to 25ÂaC' },
    { months: 'October – November', status: 'Closing Season', color: '#f87171', roads: 'Manali–Leh closes Oct. Inner routes close by late Oct.', activity: 'Last window for road trips. Crystal-clear skies for photography.', temp: '-5ÂaC to 15ÂaC' },
    { months: 'December', status: 'Deep Winter', color: '#a78bfa', roads: 'all roads closed. air only. Zoji La tunnel (future) may change this.', activity: 'Snow sports, monastery visits, Losar preparations.', temp: '-20ÂaC to -5ÂaC' },
  ];

  /* â”€â”€ Safety Tips â”€â”€ */
  safetyTips = [
    { icon: 'bi-lungs', title: 'acclimatize First', description: 'Spend at least 2 days in Leh before heading to higher passes. aMS can be life-threatening above 12,000 ft.' },
    { icon: 'bi-droplet', title: 'Stay Hydrated', description: 'Drink 4-5 liters of water daily. Dehydration accelerates altitude sickness. avoid alcohol for the first 48 hours.' },
    { icon: 'bi-fuel-pump', title: 'Carry Extra Fuel', description: 'Fuel stations are scarce beyond Leh. Carry jerry cans on trips to Pangong, Tso Moriri, and Hanle.' },
    { icon: 'bi-phone', title: 'Network Coverage', description: 'Only BSNL/Jio postpaid works beyond Leh. No signal at Pangong, Hanle, or on most treks. Carry A satellite phone for emergencies.' },
    { icon: 'bi-snow', title: 'Weather Readiness', description: 'Weather changes rapidly. Carry warm layers even in summer. Snowfall can occur at passes any time of year.' },
    { icon: 'bi-file-earmark-text', title: 'Documents Ready', description: 'Carry printed ILPs, vehicle RC, insurance, and ID at all checkpoints. Digital copies may not be accepted.' },
  ];

  /* â”€â”€ Route Detail Modal â”€â”€ */
  openRoute(route: any) {
    this.selectedRoute.set(route);
    this.activeTab.set('overview');
    document.body.style.overflow = 'hidden';
  }

  closeRouteModal() {
    this.selectedRoute.set(null);
    document.body.style.overflow = '';
  }

  setTab(tab: string) {
    this.activeTab.set(tab);
  }

  onEscape() {
    if (this.selectedRoute()) this.closeRouteModal();
  }

  getDifficultyColor(d: string): string {
    if (d.includes('Easy')) return '#10b981';
    if (d.includes('Moderate')) return '#f59e0b';
    if (d.includes('Hard') && !d.includes('Very')) return '#f97316';
    if (d.includes('Very')) return '#ef4444';
    if (d.includes('Extreme')) return '#dc2626';
    return '#6b7280';
  }
}




