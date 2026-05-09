import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, Meta, Title } from '@angular/platform-browser';
import { DecimalPipe } from '@angular/common';
import { LeafletMapComponent } from '../../shared/leaflet-map/leaflet-map';

/* â”€â”€ Interfaces â”€â”€ */
interface TripPhoto {
  title: string;
  image: string;
  icon: string;
  location: string;
  desc: string;
}
interface TripVideo {
  title: string;
  youtubeId: string;
  duration: string;
  desc: string;
  gradient: string;
  icon: string;
}
interface ItineraryDay {
  day: string;
  title: string;
  desc: string;
  stops: string[];
  distance: string;
  altitude: string;
}
interface ElevationPoint {
  name: string;
  altitude: number;
  km: number;
}
interface RoadTripData {
  slug: string;
  name: string;
  tag: string;
  color: string;
  distance: string;
  duration: string;
  lat: number; lng: number; zoom?: number;
  bestTime: string;
  difficulty: string;
  permits: string;
  description: string;
  longDescription: string;
  keyStops: string[];
  photos: TripPhoto[];
  videos: TripVideo[];
  itinerary: ItineraryDay[];
  elevation: ElevationPoint[];
  tips: string[];
  packing: string[];
  accommodation: { name: string; type: string; location: string }[];
  image: string;
  heroImage: string;
  relatedSlugs: string[];
}

@Component({
  selector: 'app-road-trip-detail',
  imports: [RouterLink, DecimalPipe, LeafletMapComponent],
  templateUrl: './road-trip-detail.html',
  styleUrl: './road-trip-detail.scss',
  host: { '(document:keydown.escape)': 'onEscape()' },
})
export class RoadTripDetail {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  activeVideo = signal<SafeResourceUrl | null>(null);
  activeVideoTitle = signal('');
  lightboxItem = signal<TripPhoto | null>(null);

  trip = signal<RoadTripData | null>(null);
  relatedTrips = computed(() => {
    const t = this.trip();
    if (!t) return [];
    return t.relatedSlugs.map(s => this.trips.find(tr => tr.slug === s)).filter(Boolean) as RoadTripData[];
  });

  /* SVG helpers */
  svgWidth = 800;
  svgHeight = 280;
  svgPadLeft = 60;
  svgPadRight = 30;
  svgPadTop = 30;
  svgPadBot = 60;

  getChartX(km: number, maxKm: number): number {
    return this.svgPadLeft + (km / maxKm) * (this.svgWidth - this.svgPadLeft - this.svgPadRight);
  }
  getChartY(alt: number, minalt: number, maxAlt: number): number {
    const range = maxAlt - minalt || 1;
    return this.svgPadTop + (1 - (alt - minalt) / range) * (this.svgHeight - this.svgPadTop - this.svgPadBot);
  }
  getPolyline(pts: ElevationPoint[]): string {
    if (!pts.length) return '';
    const maxKm = Math.max(...pts.map(p => p.km));
    const alts = pts.map(p => p.altitude);
    const minalt = Math.min(...alts) - 500;
    const maxAlt = Math.max(...alts) + 500;
    return pts.map(p => `${this.getChartX(p.km, maxKm)},${this.getChartY(p.altitude, minalt, maxAlt)}`).join(' ');
  }
  getAreaPath(pts: ElevationPoint[]): string {
    if (!pts.length) return '';
    const maxKm = Math.max(...pts.map(p => p.km));
    const alts = pts.map(p => p.altitude);
    const minalt = Math.min(...alts) - 500;
    const maxAlt = Math.max(...alts) + 500;
    const baseY = this.svgHeight - this.svgPadBot;
    let d = `M ${this.getChartX(pts[0].km, maxKm)},${baseY}`;
    pts.forEach(p => { d += ` L ${this.getChartX(p.km, maxKm)},${this.getChartY(p.altitude, minalt, maxAlt)}`; });
    d += ` L ${this.getChartX(pts[pts.length - 1].km, maxKm)},${baseY} Z`;
    return d;
  }
  getMinAlt(pts: ElevationPoint[]): number {
    return Math.min(...pts.map(p => p.altitude)) - 500;
  }
  getMaxAlt(pts: ElevationPoint[]): number {
    return Math.max(...pts.map(p => p.altitude)) + 500;
  }

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    const found = this.trips.find(t => t.slug === slug);
    this.trip.set(found ?? null);
    if (found) {
      const meta = inject(Meta);
      const titleSvc = inject(Title);
      const title = `${found.name} Road Trip â€” ${found.distance}, ${found.duration} | The Ladakh archive`;
      const description = `${found.description} Distance: ${found.distance}. Duration: ${found.duration}. Difficulty: ${found.difficulty}. Best time: ${found.bestTime}. Permits: ${found.permits}. Key stops: ${found.keyStops.slice(0, 4).join(', ')}.`;
      titleSvc.setTitle(title);
      meta.updateTag({ name: 'description', content: description.slice(0, 320) });
      meta.updateTag({ name: 'keywords', content: `${found.name}, Ladakh road trip, ${found.keyStops.join(', ')}, Ladakh travel, ${found.slug} route, Ladakh driving guide` });
      meta.updateTag({ property: 'og:title', content: title });
      meta.updateTag({ property: 'og:description', content: description.slice(0, 200) });
      meta.updateTag({ property: 'og:url', content: `https://theladakh.org/routes/trip/${found.slug}` });
      meta.updateTag({ name: 'twitter:title', content: title });
      meta.updateTag({ name: 'twitter:description', content: description.slice(0, 200) });
    }
  }

  playVideo(vid: TripVideo) {
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
  openLightbox(photo: TripPhoto) { this.lightboxItem.set(photo); document.body.style.overflow = 'hidden'; }
  closeLightbox() { this.lightboxItem.set(null); document.body.style.overflow = ''; }
  onEscape() {
    if (this.activeVideo()) this.closeVideo();
    else if (this.lightboxItem()) this.closeLightbox();
  }

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• ROaD TRIP DaTa â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
  trips: RoadTripData[] = [
    /* â”€â”€ 1. Leh â†’ Nubra Valley â”€â”€ */
    {
      slug: 'leh-nubra-valley',
      name: 'Leh â†’ Nubra Valley',
      tag: 'Must-Do',
      color: '#10b981',
      distance: '120 km',
      duration: '4â€“5 hours',
      lat: 34.6500, lng: 77.5000, zoom: 9,
      bestTime: 'June â€“ September',
      difficulty: 'Moderate',
      permits: 'Inner Line Permit required',
      description: 'Cross the legendary Khardung La to reach the enchanting Nubra Valley â€” a land of double-humped camels, sand dunes, and the last village before Pakistan.',
      longDescription: 'The Leh to Nubra Valley road trip is every traveler\'s first Ladakh adventure beyond Leh. The journey takes you over Khardung La â€” one of the highest motorable passes in the world at 18,380 ft. as you descend into the Nubra Valley, the landscape transforms from barren high-altitude desert into a surprisingly green oasis. The Shyok and Nubra rivers carve through deep gorges, and at Hunder, you\'ll find surreal white sand dunes where Bactrian (double-humped) camels roam. The drive continues to Diskit, home to a stunning 32-metre Maitreya Buddha statue, and further to Turtuk â€” the last Indian village before Pakistan, a Balti settlement opened to tourists only in 2010.',
      keyStops: ['Khardung La', 'South Pullu', 'North Pullu', 'Khalsar', 'Diskit Monastery', 'Hunder Sand Dunes', 'Turtuk Village'],
      photos: [
        { title: 'Khardung La Pass', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-flag', location: 'Khardung La, 18,380 ft', desc: 'The gateway to Nubra Valley â€” prayer flags flutter against an impossibly blue sky at the summit.' },
        { title: 'Hunder Sand Dunes', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-sun', location: 'Hunder, Nubra Valley', desc: 'White sand dunes flanked by snow-capped mountains â€” a surreal desert at 10,000 ft altitude.' },
        { title: 'Bactrian Camels', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-heart', location: 'Hunder, Nubra Valley', desc: 'The rare double-humped Bactrian camels, descendants of ancient Silk Road trading caravans.' },
        { title: 'Diskit Monastery', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-building', location: 'Diskit, Nubra Valley', desc: 'The 500-year-old Gelugpa monastery perched on a hillside with the giant 32m Maitreya Buddha statue.' },
        { title: 'Turtuk Village', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-house', location: 'Turtuk, Nubra Valley', desc: 'India\'s last village before Pakistan â€” a Balti settlement with apricot orchards and traditional homes.' },
      ],
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      videos: [
        { title: 'Leh to Nubra Valley â€” Complete Road Trip', youtubeId: 'KRF7jWqSdPw', duration: '18 min', desc: 'Experience the complete journey from Leh over Khardung La to Nubra Valley with stunning aerial footage.', gradient: 'linear-gradient(135deg, #064e3b, #10b981)', icon: 'bi-camera-reels' },
        { title: 'Turtuk â€” India\'s Last Village', youtubeId: 'zNFmzjxQGHk', duration: '12 min', desc: 'Explore the hidden Balti village of Turtuk near the Line of Control.', gradient: 'linear-gradient(135deg, #1a365d, #3b82f6)', icon: 'bi-film' },
      ],
      itinerary: [
        { day: 'Day 1', title: 'Leh â†’ Diskit via Khardung La', desc: 'Start early from Leh. Climb to Khardung La (18,380 ft) â€” stop for photos at the summit. Descend through South & North Pullu checkpoints. Reach Khalsar junction, turn towards Diskit. Visit Diskit Monastery and the giant Maitreya Buddha statue. Overnight at Diskit.', stops: ['Khardung La', 'South Pullu', 'North Pullu', 'Khalsar', 'Diskit'], distance: '120 km', altitude: '18,380 ft max' },
        { day: 'Day 2', title: 'Diskit â†’ Hunder â†’ Turtuk', desc: 'Morning visit to Hunder Sand Dunes and Bactrian camel rides. Drive further to Turtuk (80 km from Diskit) â€” India\'s last village. Explore Balti heritage, the 500-year-old Turtuk royal house, and apricot orchards. Return to Hunder for the night.', stops: ['Hunder Sand Dunes', 'Turtuk Village', 'Turtuk Royal House'], distance: '160 km round trip', altitude: '10,000 ft' },
        { day: 'Day 3', title: 'Hunder â†’ Panamik â†’ Leh', desc: 'Optional detour to Panamik hot springs and Ensa Gompa. Drive back to Leh via Khardung La. afternoon at leisure in Leh for acclimatization.', stops: ['Panamik Hot Springs', 'Ensa Gompa', 'Khardung La', 'Leh'], distance: '150 km', altitude: '18,380 ft max' },
      ],
      elevation: [
        { name: 'Leh', altitude: 11500, km: 0 },
        { name: 'South Pullu', altitude: 15800, km: 20 },
        { name: 'Khardung La', altitude: 18380, km: 39 },
        { name: 'North Pullu', altitude: 15500, km: 55 },
        { name: 'Khalsar', altitude: 10200, km: 85 },
        { name: 'Diskit', altitude: 10300, km: 110 },
        { name: 'Hunder', altitude: 10100, km: 120 },
      ],
      tips: [
        'Start before 7 aM to avoid traffic jams at Khardung La',
        'Carry warm clothes â€” temperature drops drastically at the pass even in summer',
        'Fill fuel in Leh â€” Diskit has the only fuel station in Nubra',
        'Carry aMS medication (Diamox) and acclimatize in Leh for 2 days before this trip',
        'Photography at North Pullu and beyond needs caution â€” military zones',
        'Book Turtuk homestays in advance during peak season (Julâ€“aug)',
      ],
      packing: ['Warm jacket & thermals', 'Sunscreen SPF 50+', 'Sunglasses (UV protection)', 'Water bottles (4L minimum)', 'Snacks & dry fruits', 'Diamox / aMS medication', 'Identity documents & ILP printout', 'Cash (no aTMs beyond Leh)'],
      accommodation: [
        { name: 'Snow Leopard Guest House', type: 'Guest House', location: 'Diskit' },
        { name: 'Hunder Sarai', type: 'Camp / Resort', location: 'Hunder' },
        { name: 'Turtuk Homestays', type: 'Homestay', location: 'Turtuk Village' },
        { name: 'Olthang Camp', type: 'Luxury Camp', location: 'Hunder' },
      ],
      relatedSlugs: ['leh-pangong-tso', 'leh-hanle'],
    },

    /* â”€â”€ 2. Leh â†’ Pangong Tso â”€â”€ */
    {
      slug: 'leh-pangong-tso',
      name: 'Leh â†’ Pangong Tso',
      tag: 'Iconic',
      color: '#3b82f6',
      distance: '160 km',
      duration: '5â€“6 hours',
      lat: 33.7607, lng: 78.6425, zoom: 9,
      bestTime: 'May â€“ September',
      difficulty: 'Moderate',
      permits: 'Inner Line Permit required',
      description: 'Journey to the mesmerizing Pangong Lake â€” a 134 km long endorheic lake stretching into Tibet, famous for its ever-changing blue hues.',
      longDescription: 'The road to Pangong Tso is one of the most celebrated journeys in Ladakh. The route crosses Chang La (17,688 ft) â€” the third highest motorable pass in India â€” before descending through the stark Changthang Plateau to arrive at the incomparable Pangong Lake. The lake stretches 134 km, with two-thirds lying in Tibet. Its unique feature is the constantly shifting palette of blues â€” from azure to turquoise to deep indigo â€” caused by the varying light, depth, and mineral content. The lake gained worldwide fame after the Bollywood film "3 Idiots" shot its climactic scene here. The sheer vastness, silence, and impossibly vivid colors make this one of the most photographed locations in the Himalayas.',
      keyStops: ['Karu', 'Chang La', 'Tangste', 'Lukung', 'Spangmik', 'Pangong Lake', 'Manâ€“Merak'],
      photos: [
        { title: 'Chang La Pass', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-flag', location: 'Chang La, 17,688 ft', desc: 'The gateway to Pangong â€” army-maintained pass with a small temple and tea stall at the summit.' },
        { title: 'Pangong Lake â€” Blue Hour', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-water', location: 'Spangmik, Pangong Tso', desc: 'The legendary blue waters of Pangong stretching endlessly toward Tibet under a cloudless sky.' },
        { title: 'Pangong â€” Turquoise Waters', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-droplet', location: 'Pangong Tso', desc: 'The lake shifts from deep blue to turquoise to emerald depending on light and depth.' },
        { title: 'Mountains Reflected', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-image', location: 'Pangong Tso', desc: 'Perfect mirror reflections of the barren Changthang mountains in the still waters of Pangong.' },
        { title: '3 Idiots Point', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-film', location: 'Pangong Tso', desc: 'The famous yellow scooter and bench from the Bollywood blockbuster â€” now a tourist photo spot.' },
      ],
      image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      videos: [
        { title: 'Pangong Lake â€” a Visual Journey', youtubeId: '5PEbw7r3mYE', duration: '15 min', desc: 'Stunning 4K aerial and ground footage of Pangong Tso through all seasons and times of day.', gradient: 'linear-gradient(135deg, #0c4a6e, #0ea5e9)', icon: 'bi-camera-reels' },
      ],
      itinerary: [
        { day: 'Day 1', title: 'Leh â†’ Pangong Tso via Chang La', desc: 'Depart Leh early. Pass through Karu and begin the ascent to Chang La (17,688 ft). Stop at the army-run cafeteria for tea. Descend through Tangste â€” last settlement with phone signal. arrive at Pangong Lake by afternoon. Watch the magical color changes of the water. Overnight in lakeside camps at Spangmik.', stops: ['Karu', 'Chang La', 'Tangste', 'Lukung', 'Spangmik'], distance: '160 km', altitude: '17,688 ft max' },
        { day: 'Day 2', title: 'Pangong â†’ Manâ€“Merak â†’ Leh', desc: 'Sunrise at Pangong is unmissable. Explore towards Man and Merak villages (Changpa nomad settlements). Return via the same route over Chang La to Leh.', stops: ['Pangong Sunrise Point', 'Man Village', 'Merak', 'Chang La', 'Leh'], distance: '170 km', altitude: '17,688 ft max' },
      ],
      elevation: [
        { name: 'Leh', altitude: 11500, km: 0 },
        { name: 'Karu', altitude: 11200, km: 35 },
        { name: 'Chang La', altitude: 17688, km: 75 },
        { name: 'Tangste', altitude: 13200, km: 110 },
        { name: 'Lukung', altitude: 14000, km: 140 },
        { name: 'Pangong', altitude: 14272, km: 160 },
      ],
      tips: [
        'There is absolutely ZERO mobile network at Pangong â€” inform family before leaving Tangste',
        'Temperatures drop to -5ÂaC at night even in July â€” carry heavy sleeping bag',
        'Fill fuel in Karu â€” no fuel station until Pangong and back',
        'Lakeside camps can be basic â€” carry your own toiletries and toilet paper',
        'Do NOT swim in the lake â€” the water is extremely cold and the lake is militarily sensitive',
        'Dawn light (5:30â€“6:30 aM) produces the best photographs',
      ],
      packing: ['Heavy sleeping bag', 'Down jacket', 'Sunscreen SPF 50+', 'UV sunglasses', 'Camera with extra batteries (cold drains them)', 'Cash â€” no aTMs or card machines', 'Printed ILP copies', 'Personal water filter/bottles'],
      accommodation: [
        { name: 'Pangong Retreat Camp', type: 'Luxury Camp', location: 'Spangmik' },
        { name: 'The Pangong Camp', type: 'Deluxe Camp', location: 'Spangmik' },
        { name: 'Lakeside Camps', type: 'Basic Tent', location: 'Spangmik â€“ Lukung' },
      ],
      relatedSlugs: ['leh-nubra-valley', 'changthang-circuit'],
    },

    /* â”€â”€ 3. Leh â†’ Tso Moriri â”€â”€ */
    {
      slug: 'leh-tso-moriri',
      name: 'Leh â†’ Tso Moriri',
      tag: 'Off-Beat',
      color: '#8b5cf6',
      distance: '240 km',
      duration: '7â€“8 hours',
      lat: 32.8500, lng: 78.3200, zoom: 9,
      bestTime: 'June â€“ September',
      difficulty: 'Difficult',
      permits: 'Inner Line Permit required',
      description: 'a remote and pristine high-altitude lake at 14,836 ft. Tso Moriri is a Ramsar wetland surrounded by the Changthang plateau, home to nomadic Changpa herders.',
      longDescription: 'Tso Moriri is Ladakh\'s hidden gem â€” far less visited than Pangong but equally magnificent. This is one of the highest lakes in India and a designated Ramsar Wetland of international importance. The lake sits in the Changthang Cold Desert Wildlife Sanctuary, surrounded by 6,000-metre peaks. Unlike commercialized Pangong, Tso Moriri offers solitude and raw wilderness. The only settlement is Korzok village, home to Changpa nomads who herd pashmina goats at altitudes above 14,000 ft. En route, you pass Puga Valley\'s geothermal hot springs â€” steam vents and sulphur deposits that hint at the volcanic activity beneath the plateau. The route is rough and remote â€” a true adventure for those seeking undiscovered Ladakh.',
      keyStops: ['Upshi', 'Chumur', 'Puga Hot Springs', 'Sumdo', 'Korzok Village', 'Tso Moriri Lake'],
      photos: [
        { title: 'Tso Moriri at Sunrise', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-sunrise', location: 'Korzok, 14,836 ft', desc: 'The placid waters of Tso Moriri mirror 6,000-metre peaks in the golden light of dawn.' },
        { title: 'Puga Hot Springs', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-thermometer-half', location: 'Puga Valley', desc: 'Bubbling geothermal vents and sulphur deposits â€” evidence of volcanic activity beneath the plateau.' },
        { title: 'Changpa Nomads', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-people', location: 'Changthang Plateau', desc: 'The semi-nomadic Changpa herders who raise pashmina goats at 14,000+ ft altitude.' },
        { title: 'Korzok Monastery', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-building', location: 'Korzok Village', desc: 'The Drukpa Kagyu monastery overlooking the lake â€” one of the highest permanently inhabited settlements in India.' },
        { title: 'Kiang (Wild ass)', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-heart', location: 'Changthang Wildlife Sanctuary', desc: 'Herds of Tibetan wild asses roam the high-altitude grasslands around Tso Moriri.' },
      ],
      image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1600',
      videos: [
        { title: 'Tso Moriri â€” Ladakh\'s Hidden Paradise', youtubeId: 'QJuvqMfXLqs', duration: '20 min', desc: 'a cinematic journey to the pristine Tso Moriri lake and the nomadic Changpa way of life.', gradient: 'linear-gradient(135deg, #2e1065, #a78bfa)', icon: 'bi-camera-reels' },
      ],
      itinerary: [
        { day: 'Day 1', title: 'Leh â†’ Puga â†’ Korzok', desc: 'Depart Leh via Upshi on the Manaliâ€“Leh Highway. Turn south at Upshi towards Chumur. Pass through the stark Changthang plateau. Stop at Puga Hot Springs to see geothermal vents. Continue to Sumdo checkpoint and then to Korzok village on the shores of Tso Moriri. arrive by evening.', stops: ['Upshi', 'Chumur', 'Puga Hot Springs', 'Sumdo', 'Korzok'], distance: '240 km', altitude: '14,836 ft' },
        { day: 'Day 2', title: 'Korzok â€” Exploration Day', desc: 'Sunrise at the lake is transcendent. Walk along the lakeside trail (5 km). Visit Korzok Monastery. Interact with Changpa nomads and see pashmina goat herds. Look for kiang (wild ass) and marmots. afternoon photography session as light changes.', stops: ['Tso Moriri Lakeside Walk', 'Korzok Monastery', 'Changpa Camp'], distance: '10 km walk', altitude: '14,836 ft' },
        { day: 'Day 3', title: 'Korzok â†’ Tso Kar â†’ Leh', desc: 'Return via alternative route through Tso Kar (White Lake) â€” a smaller salt lake with flamingo sightings. Pass Tanglang La (17,582 ft) and rejoin the Manaliâ€“Leh Highway. arrive in Leh by evening.', stops: ['Tso Kar Lake', 'Pang', 'Tanglang La', 'Upshi', 'Leh'], distance: '280 km', altitude: '17,582 ft max' },
      ],
      elevation: [
        { name: 'Leh', altitude: 11500, km: 0 },
        { name: 'Upshi', altitude: 12000, km: 50 },
        { name: 'Chumur', altitude: 14200, km: 120 },
        { name: 'Puga', altitude: 14500, km: 170 },
        { name: 'Sumdo', altitude: 14000, km: 210 },
        { name: 'Korzok', altitude: 14836, km: 240 },
      ],
      tips: [
        'This is one of the remotest routes â€” NO fuel, mobile signal, or medical facilities after Upshi',
        'Carry at least 20L extra fuel in jerry cans',
        'Road conditions are poor â€” a sturdy SUV (ideally 4Ã—4) is recommended',
        'acclimatize in Leh for 3 days minimum before this trip',
        'Korzok has very basic homestays â€” carry your own sleeping bag and food',
        'Wildlife is best spotted early morning â€” kiang herds are often near the lake',
      ],
      packing: ['Extra fuel (20L jerry can)', 'Food supplies for 3 days', 'Sleeping bag rated to -10ÂaC', 'First-aid & aMS medicine', 'Warm layers â€” it can snow any month', 'Binoculars for wildlife', 'Cash â€” zero connectivity beyond Upshi', 'Spare tyre & basic tools'],
      accommodation: [
        { name: 'Korzok Homestays', type: 'Homestay', location: 'Korzok Village' },
        { name: 'Nomadic Life Camp', type: 'Basic Camp', location: 'Korzok' },
      ],
      relatedSlugs: ['leh-hanle', 'changthang-circuit'],
    },

    /* â”€â”€ 4. Leh â†’ Hanle â”€â”€ */
    {
      slug: 'leh-hanle',
      name: 'Leh â†’ Hanle',
      tag: 'adventure',
      color: '#ef4444',
      distance: '260 km',
      duration: '8â€“9 hours',
      lat: 32.7830, lng: 78.9610, zoom: 9,
      bestTime: 'June â€“ September',
      difficulty: 'Difficult',
      permits: 'Inner Line Permit required',
      description: 'Journey to one of the world\'s highest astronomical observatories at 14,764 ft. Hanle offers the clearest skies in India â€” a stargazer\'s paradise.',
      longDescription: 'Hanle is the frontier of astronomy in India. The Indian astronomical Observatory (IaO), operated by the Indian Institute of astrophysics, sits at 14,764 ft â€” one of the highest optical telescopes on the planet. The region boasts over 270 clear nights per year with near-zero light pollution, making it one of the best spots on Earth for stargazing. But Hanle is far more than an observatory â€” the ancient Hanle Monastery (17th century) sits dramatically atop a hill overlooking the vast Hanle plain. The landscape is Mars-like: utterly barren, rust-colored, and silent. The drive itself passes through some of Ladakh\'s most desolate and beautiful terrain, crossing high passes and sweeping valleys that feel like another planet.',
      keyStops: ['Upshi', 'Loma', 'Nyoma', 'Hanle Monastery', 'Indian astronomical Observatory'],
      photos: [
        { title: 'Night Sky at Hanle', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', icon: 'bi-stars', location: 'Hanle, 14,764 ft', desc: 'The Milky Way in all its glory â€” visible to the naked eye from one of Earth\'s best stargazing sites.' },
        { title: 'Indian astronomical Observatory', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-telescope', location: 'Hanle Observatory', desc: 'One of the world\'s highest optical telescopes â€” cutting-edge science at the roof of the world.' },
        { title: 'Hanle Monastery', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-building', location: 'Hanle', desc: 'The 17th-century Drukpa Kagyu monastery perched dramatically above the endless Hanle plain.' },
        { title: 'Mars-like Landscape', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-globe', location: 'Hanle Plain', desc: 'The rust-red barren terrain around Hanle looks like the surface of Mars â€” utterly otherworldly.' },
        { title: 'Nyoma Bridge & Valley', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-water', location: 'Nyoma', desc: 'The Indus River at Nyoma â€” the last real settlement before the vast emptiness leading to Hanle.' },
      ],
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1600',
      videos: [
        { title: 'Hanle â€” India\'s Dark Sky Sanctuary', youtubeId: 'KRF7jWqSdPw', duration: '22 min', desc: 'Explore Hanle\'s observatory, ancient monastery, and the darkest skies in India.', gradient: 'linear-gradient(135deg, #0f172a, #6366f1)', icon: 'bi-camera-reels' },
      ],
      itinerary: [
        { day: 'Day 1', title: 'Leh â†’ Nyoma â†’ Hanle', desc: 'Depart Leh early via Upshi. Follow the Indus Valley through Loma and Nyoma. Turn south towards Hanle after Nyoma. The road becomes increasingly remote. arrive at Hanle by late afternoon. Visit Hanle Monastery before sunset. Night: stargazing â€” the Milky Way is visible to the naked eye.', stops: ['Upshi', 'Loma', 'Nyoma', 'Hanle Monastery'], distance: '260 km', altitude: '14,764 ft' },
        { day: 'Day 2', title: 'Hanle â†’ Observatory â†’ Leh', desc: 'Morning visit to the Indian astronomical Observatory (exterior only â€” prior permission needed for interior). Explore the Hanle plain. Return to Leh via Nyoma. Optional detour to Merak village near Pangong.', stops: ['IaO Observatory', 'Hanle Plain', 'Nyoma', 'Leh'], distance: '260 km', altitude: '14,764 ft' },
      ],
      elevation: [
        { name: 'Leh', altitude: 11500, km: 0 },
        { name: 'Upshi', altitude: 12000, km: 50 },
        { name: 'Loma', altitude: 13100, km: 120 },
        { name: 'Nyoma', altitude: 13200, km: 170 },
        { name: 'Hanle', altitude: 14764, km: 260 },
      ],
      tips: [
        'Hanle is a RESTRICTED area near the LaC â€” permit approval can take 1â€“2 days',
        'apply for permit at DC Office Leh well in advance',
        'NO fuel station between Karu and Hanle â€” carry enough fuel for 550 km round trip',
        'Best stargazing: new moon nights in Julyâ€“august â€” plan accordingly',
        'The observatory interior requires prior written permission from IIa Bangalore',
        'Temperature drops to -15ÂaC at night even in summer â€” carry extreme cold gear',
      ],
      packing: ['Extra fuel (25L+)', 'Star chart or stargazing app (download offline)', 'Tripod for night photography', 'Extreme cold sleeping bag (-15ÂaC)', 'all food and water for 2 days', 'Torch with red filter (preserves night vision)', 'Special permit printouts', 'Portable oxygen can'],
      accommodation: [
        { name: 'Hanle Homestays', type: 'Homestay', location: 'Hanle Village' },
        { name: 'Padma Guest House', type: 'Guest House', location: 'Hanle' },
      ],
      relatedSlugs: ['leh-tso-moriri', 'changthang-circuit'],
    },

    /* â”€â”€ 5. Leh â†’ Zanskar Valley â”€â”€ */
    {
      slug: 'leh-zanskar-valley',
      name: 'Leh â†’ Zanskar Valley',
      tag: 'Expedition',
      color: '#f97316',
      distance: '460 km (via Kargil)',
      duration: '2 days',
      lat: 33.4671, lng: 76.9270, zoom: 8,
      bestTime: 'July â€“ September',
      difficulty: 'Very Difficult',
      permits: 'No special permit needed',
      description: 'The road to Zanskar is one of the most adventurous drives in India. The valley remains cut off by snow for 8 months.',
      longDescription: 'Zanskar is Ladakh\'s most inaccessible sub-region â€” a vast, remote valley ringed by the Great Himalayan Range and reachable by road only 3-4 months per year. The journey from Leh takes you first to Kargil (the halfway city on the Srinagarâ€“Leh Highway), then south over the Pensi La (14,001 ft) into the Suru Valley and finally into Zanskar. The valley\'s isolation has preserved a way of life unchanged for centuries â€” ancient Buddhist monasteries cling to clifftops, and villagers still practice barter trade. Padum, the tiny capital, feels like stepping into medieval Tibet. From Padum, you can reach Zangla Fort, Karsha Monastery (Zanskar\'s largest), and the confluence of Zanskar and Doda rivers. The return journey over Pensi La, with its views of the Drang Drung Glacier, is equally spectacular.',
      keyStops: ['Kargil', 'Rangdum Monastery', 'Pensi La (14,001 ft)', 'Padum', 'Karsha Monastery', 'Zangla Fort'],
      photos: [
        { title: 'Pensi La & Drang Drung Glacier', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow2', location: 'Pensi La, 14,001 ft', desc: 'The Drang Drung Glacier spills dramatically across the landscape at the crest of Pensi La.' },
        { title: 'Rangdum Monastery', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-building', location: 'Rangdum', desc: 'The isolated Gelugpa monastery sitting on a hillock in the vast Suru Valley â€” a sentinel of solitude.' },
        { title: 'Padum â€” Zanskar\'s Capital', image: 'https://images.unsplash.com/photo-1516233758813-a38d024919c5?auto=format&fit=crop&q=80&w=800', icon: 'bi-geo-alt', location: 'Padum', desc: 'The tiny capital of Zanskar â€” a cluster of whitewashed houses ringed by towering mountains.' },
        { title: 'Karsha Gompa', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-building', location: 'Karsha, Zanskar', desc: 'Zanskar\'s largest monastery housing 100+ monks, with frescoes dating back centuries.' },
        { title: 'Zanskar River Gorge', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-water', location: 'Zanskar Valley', desc: 'The turquoise Zanskar River cutting through impossibly deep gorges â€” the same river that freezes into the Chadar.' },
      ],
      image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1600',
      videos: [
        { title: 'Zanskar â€” The Forgotten Valley', youtubeId: 'zNFmzjxQGHk', duration: '28 min', desc: 'a documentary journey through Zanskar\'s ancient monasteries, remote villages, and vanishing way of life.', gradient: 'linear-gradient(135deg, #78350f, #f97316)', icon: 'bi-camera-reels' },
        { title: 'Driving to Zanskar â€” The adventure Road', youtubeId: '5PEbw7r3mYE', duration: '16 min', desc: 'Experience the thrilling drive over Pensi La and through the Suru Valley to Padum.', gradient: 'linear-gradient(135deg, #1e3a5f, #38bdf8)', icon: 'bi-film' },
      ],
      itinerary: [
        { day: 'Day 1', title: 'Leh â†’ Kargil', desc: 'Drive from Leh to Kargil on the Srinagarâ€“Leh Highway (220 km, 6â€“7 hours). Stop at Lamayuru Monastery\'s moonland, alchi temple complex, and Mulbekh\'s giant Maitreya rock carving. Overnight in Kargil.', stops: ['Lamayuru', 'alchi', 'Mulbekh', 'Kargil'], distance: '220 km', altitude: '8,900 ft' },
        { day: 'Day 2', title: 'Kargil â†’ Rangdum â†’ Padum', desc: 'Early start from Kargil through the Suru Valley. Pass Rangdum Monastery in its dramatic setting. Cross Pensi La (14,001 ft) with views of Drang Drung Glacier. Descend into Zanskar and reach Padum by evening.', stops: ['Suru Valley', 'Rangdum', 'Pensi La', 'Padum'], distance: '240 km', altitude: '14,001 ft max' },
        { day: 'Day 3', title: 'Padum â€” Exploration Day', desc: 'Visit Karsha Monastery (Zanskar\'s largest), Stongde Gompa, and Zangla Fort. Explore Padum market. Optional half-day trek to Phuktal Monastery (requires additional day).', stops: ['Karsha Monastery', 'Stongde Gompa', 'Zangla Fort', 'Padum Market'], distance: '40 km', altitude: '12,500 ft' },
        { day: 'Day 4', title: 'Padum â†’ Kargil â†’ Leh', desc: 'Return journey via Pensi La to Kargil. Continue to Leh or overnight in Kargil again.', stops: ['Pensi La', 'Rangdum', 'Kargil'], distance: '240 km', altitude: '14,001 ft max' },
      ],
      elevation: [
        { name: 'Leh', altitude: 11500, km: 0 },
        { name: 'Lamayuru', altitude: 11520, km: 110 },
        { name: 'Kargil', altitude: 8900, km: 220 },
        { name: 'Rangdum', altitude: 12500, km: 340 },
        { name: 'Pensi La', altitude: 14001, km: 380 },
        { name: 'Padum', altitude: 12500, km: 460 },
      ],
      tips: [
        'Road to Padum is only open Julyâ€“September â€” check condition with J&K Tourism before going',
        'Carry fuel for the entire round trip from Kargil â€” NO fuel in Zanskar',
        'Road conditions beyond Rangdum can be extremely poor â€” budget extra time for delays',
        'Kargilâ€“Padum stretch has zero mobile signal â€” carry a satellite communicator',
        'If attempting Phuktal Monastery trek, add 2 extra days',
        'Carry all food supplies â€” Padum has very limited shops',
      ],
      packing: ['Extra fuel (30L+)', 'Food & water for 4 days', 'Tow rope & spare parts', 'Heavy sleeping bag', 'Rain gear (monsoon affects Pensi La)', 'Cash â€” no aTMs in Zanskar', 'First-aid kit with altitude medication', 'Sturdy walking shoes for monastery visits'],
      accommodation: [
        { name: 'Hotel Kargil', type: 'Hotel', location: 'Kargil' },
        { name: 'Rangdum Campsite', type: 'Camp', location: 'Rangdum' },
        { name: 'Hotel Ibex', type: 'Guest House', location: 'Padum' },
        { name: 'Zanskar Homestays', type: 'Homestay', location: 'Padum / Karsha' },
      ],
      relatedSlugs: ['leh-nubra-valley', 'changthang-circuit'],
    },

    /* â”€â”€ 6. Changthang Circuit â”€â”€ */
    {
      slug: 'changthang-circuit',
      name: 'Pangong â†’ Tso Moriri (Changthang Circuit)',
      tag: 'Ultimate',
      color: '#dc2626',
      distance: '350 km',
      duration: '2 days',
      lat: 33.5000, lng: 78.8000, zoom: 8,
      bestTime: 'July â€“ august',
      difficulty: 'Very Difficult',
      permits: 'Special permit + backup vehicle recommended',
      description: 'The ultimate Changthang plateau circuit connecting both legendary lakes. Extremely remote with no fuel stations â€” requires full self-sufficiency.',
      longDescription: 'The Changthang Circuit is the ultimate Ladakh road trip â€” a grueling, magnificent, and utterly remote journey connecting Pangong Tso and Tso Moriri across the Changthang Cold Desert Plateau. This is not a tourist route but an expedition. The road (often just a track) passes through military zones near the Line of actual Control, through settlements of Changpa nomads herding pashmina goats, past the haunting Rezang La War Memorial (site of a legendary 1962 battle), and across terrain that looks more like Tibet or the Moon than India. There are zero fuel stations, zero shops, and zero phone signal for 350 km. You need a fully self-sufficient vehicle (ideally two vehicles for safety), extra fuel, food, water, and a genuine sense of adventure. Those who complete it are rewarded with seeing a Ladakh that very few outsiders ever experience.',
      keyStops: ['Spangmik (Pangong)', 'Manâ€“Merak', 'Chushul', 'Rezang La War Memorial', 'Nyoma', 'Korzok (Tso Moriri)'],
      photos: [
        { title: 'Changthang Plateau', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-globe', location: 'Changthang, 14,500 ft', desc: 'The vast, treeless Changthang plateau â€” an ocean of land at the edge of Tibet.' },
        { title: 'Rezang La War Memorial', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-flag', location: 'Rezang La, 16,000 ft', desc: 'Memorial to the 1962 battle where 114 soldiers of the ahir Regiment made their last stand.' },
        { title: 'Changpa Nomad Tents', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-house', location: 'Changthang', desc: 'The distinctive black yak-hair tents (rebo) of the Changpa nomads who inhabit this desolate plateau.' },
        { title: 'Pashmina Goats', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-heart', location: 'Changthang Plateau', desc: 'The Changra goats whose ultra-fine undercoat produces the world\'s most coveted pashmina wool.' },
        { title: 'Chushul Valley', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-geo-alt', location: 'Chushul', desc: 'The strategic valley near the LaC â€” vast, empty, and ringed by mountains touching China and India.' },
      ],
      image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1600',
      videos: [
        { title: 'The Changthang Circuit â€” Ladakh\'s Ultimate Drive', youtubeId: 'QJuvqMfXLqs', duration: '35 min', desc: 'a raw, unfiltered documentary of the 350 km journey between Pangong and Tso Moriri.', gradient: 'linear-gradient(135deg, #451a03, #dc2626)', icon: 'bi-camera-reels' },
      ],
      itinerary: [
        { day: 'Day 1', title: 'Pangong â†’ Chushul â†’ Nyoma', desc: 'Depart Spangmik along the southern shore of Pangong. Pass through Man and Merak villages (Changpa settlements). Cross to Chushul â€” a military zone near the LaC. Visit Rezang La War Memorial. Continue to Nyoma on the Lehâ€“Hanle road. Overnight in Nyoma.', stops: ['Spangmik', 'Man', 'Merak', 'Chushul', 'Rezang La Memorial', 'Nyoma'], distance: '180 km', altitude: '16,000 ft max' },
        { day: 'Day 2', title: 'Nyoma â†’ Tso Moriri', desc: 'Continue south from Nyoma through the heart of the Changthang plateau. Watch for kiang (wild ass) and marmots. arrive at Korzok village on the shores of Tso Moriri. The contrast between the barren plateau and the deep-blue lake is staggering.', stops: ['Nyoma', 'Mahe Bridge', 'Puga', 'Sumdo', 'Korzok'], distance: '170 km', altitude: '14,836 ft' },
      ],
      elevation: [
        { name: 'Pangong', altitude: 14272, km: 0 },
        { name: 'Manâ€“Merak', altitude: 14800, km: 40 },
        { name: 'Chushul', altitude: 14200, km: 80 },
        { name: 'Rezang La', altitude: 16000, km: 110 },
        { name: 'Nyoma', altitude: 13200, km: 180 },
        { name: 'Puga', altitude: 14500, km: 260 },
        { name: 'Korzok', altitude: 14836, km: 350 },
      ],
      tips: [
        'This route is ONLY for experienced overlanders â€” do NOT attempt alone',
        'Minimum two vehicles recommended â€” there is NO breakdown assistance available',
        'Carry fuel for 400+ km, food for 3 days, and 10L extra water',
        'Special permits required for Manâ€“Merak and Chushul areas',
        'Road conditions range from bad to non-existent â€” a 4Ã—4 is mandatory',
        'Zero phone signal for the entire route â€” carry a satellite communicator',
        'altitude stays above 13,000 ft throughout â€” take aMS seriously',
      ],
      packing: ['Extra fuel (40L+)', '4Ã—4 vehicle (mandatory)', 'Satellite communicator', 'Full food & water for 3 days', 'Tow rope, shovel, spare tyres', 'Extreme cold gear (-20ÂaC rated)', 'Portable oxygen', 'Comprehensive first-aid kit'],
      accommodation: [
        { name: 'Nyoma Guest House', type: 'Basic', location: 'Nyoma' },
        { name: 'Korzok Homestays', type: 'Homestay', location: 'Korzok Village' },
      ],
      relatedSlugs: ['leh-pangong-tso', 'leh-tso-moriri'],
    },
  ];
}




