import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DecimalPipe } from '@angular/common';
import { LeafletMapComponent } from '../../shared/leaflet-map/leaflet-map';

interface TrekPhoto {
  title: string;
  image: string;
  icon: string;
  location: string;
  desc: string;
}
interface TrekVideo {
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
  camps: string[];
  distance: string;
  altitude: string;
}
interface ElevationPoint {
  name: string;
  altitude: number;
  km: number;
}
interface TrekDetailData {
  slug: string;
  name: string;
  difficulty: string;
  color: string;
  duration: string;
  distance: string;
  maxAltitude: string;
  lat: number; lng: number; zoom?: number;
  season: string;
  startEnd: string;
  description: string;
  longDescription: string;
  highlights: string[];
  photos: TrekPhoto[];
  videos: TrekVideo[];
  itinerary: ItineraryDay[];
  elevation: ElevationPoint[];
  tips: string[];
  gear: string[];
  fitness: string;
  image: string;
  heroImage: string;
  relatedSlugs: string[];
}

@Component({
  selector: 'app-trek-detail',
  imports: [RouterLink, DecimalPipe, LeafletMapComponent],
  templateUrl: './trek-detail.html',
  styleUrl: './trek-detail.scss',
  host: { '(document:keydown.escape)': 'onEscape()' },
})
export class TrekDetail {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  activeVideo = signal<SafeResourceUrl | null>(null);
  activeVideoTitle = signal('');
  lightboxItem = signal<TrekPhoto | null>(null);
  trek = signal<TrekDetailData | null>(null);
  relatedTreks = computed(() => {
    const t = this.trek();
    if (!t) return [];
    return t.relatedSlugs.map(s => this.treks.find(tr => tr.slug === s)).filter(Boolean) as TrekDetailData[];
  });

  /* SVG helpers */
  svgW = 800; svgH = 280;
  pL = 60; pR = 30; pT = 30; pB = 60;

  getX(km: number, max: number): number { return this.pL + (km / max) * (this.svgW - this.pL - this.pR); }
  getY(alt: number, min: number, max: number): number {
    return this.pT + (1 - (alt - min) / (max - min || 1)) * (this.svgH - this.pT - this.pB);
  }
  polyline(pts: ElevationPoint[]): string {
    if (!pts.length) return '';
    const mx = Math.max(...pts.map(p => p.km));
    const alts = pts.map(p => p.altitude);
    const mn = Math.min(...alts) - 500, mxa = Math.max(...alts) + 500;
    return pts.map(p => `${this.getX(p.km, mx)},${this.getY(p.altitude, mn, mxa)}`).join(' ');
  }
  areaPath(pts: ElevationPoint[]): string {
    if (!pts.length) return '';
    const mx = Math.max(...pts.map(p => p.km));
    const alts = pts.map(p => p.altitude);
    const mn = Math.min(...alts) - 500, mxa = Math.max(...alts) + 500;
    const baseY = this.svgH - this.pB;
    let d = `M ${this.getX(pts[0].km, mx)},${baseY}`;
    pts.forEach(p => { d += ` L ${this.getX(p.km, mx)},${this.getY(p.altitude, mn, mxa)}`; });
    d += ` L ${this.getX(pts[pts.length - 1].km, mx)},${baseY} Z`;
    return d;
  }

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    const found = this.treks.find(t => t.slug === slug);
    this.trek.set(found ?? null);
  }

  playVideo(vid: TrekVideo) {
    const url = `https://www.youtube.com/embed/${vid.youtubeId}?autoplay=1&rel=0`;
    this.activeVideo.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
    this.activeVideoTitle.set(vid.title);
    document.body.style.overflow = 'hidden';
  }
  closeVideo() { this.activeVideo.set(null); this.activeVideoTitle.set(''); document.body.style.overflow = ''; }
  openLightbox(p: TrekPhoto) { this.lightboxItem.set(p); document.body.style.overflow = 'hidden'; }
  closeLightbox() { this.lightboxItem.set(null); document.body.style.overflow = ''; }
  onEscape() {
    if (this.activeVideo()) this.closeVideo();
    else if (this.lightboxItem()) this.closeLightbox();
  }
  getDiffColor(d: string): string {
    if (d.includes('Easy')) return '#10b981';
    if (d.includes('Moderate')) return '#f59e0b';
    if (d.includes('Hard') && !d.includes('Very')) return '#f97316';
    if (d.includes('Very')) return '#ef4444';
    if (d.includes('Extreme')) return '#dc2626';
    return '#6b7280';
  }

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• TREK DaTa â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
  treks: TrekDetailData[] = [
    /* â”€â”€ 1. Markha Valley â”€â”€ */
    {
      slug: 'markha-valley',
      name: 'Markha Valley Trek',
      difficulty: 'Moderateâ€“Hard',
      color: '#10b981',
      duration: '6â€“8 days',
      distance: '65 km',
      maxAltitude: '16,700 ft (Kongmaru La)',
      lat: 33.7850, lng: 77.4900, zoom: 11,
      season: 'June â€“ September',
      startEnd: 'Spituk â†’ Hemis',
      description: 'The most popular trek in Ladakh traversing the Hemis National Park. Camp at the stunning Nimaling Plateau beneath Kang Yatse peak.',
      longDescription: 'The Markha Valley Trek is Ladakh\'s classic multi-day trek â€” a grand traverse through the heart of the Hemis National Park. The trail winds through deep gorges, crosses river fords, passes through tiny Buddhist villages untouched by modern roads, and climbs to the magnificent Nimaling Plateau at 15,000 ft where the twin peaks of Kang Yatse (21,250 ft) dominate the skyline. The trek crosses two major passes â€” Ganda La (15,400 ft) on the way in and Kongmaru La (16,700 ft) on the way out. along the route, you\'ll encounter ancient monasteries, prayer walls, and the remarkable warmth of Ladakhi villagers who live at altitudes most people can barely breathe at. The final descent from Kongmaru La to Hemis Monastery is one of the most dramatic trail sections in the Himalayas.',
      highlights: ['Zingchen', 'Yurutse', 'Ganda La Pass', 'Skiu', 'Markha Village', 'Hankar', 'Nimaling Plateau', 'Kongmaru La', 'Shang Sumdo'],
      photos: [
        { title: 'Nimaling Plateau', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-flower1', location: 'Nimaling, 15,000 ft', desc: 'The vast green meadow of Nimaling â€” a high-altitude campsite with Kang Yatse peak as the backdrop.' },
        { title: 'Kang Yatse Peak', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-triangle', location: '21,250 ft', desc: 'The twin peaks of Kang Yatse â€” Ladakh\'s most recognizable mountain, visible throughout the Markha Valley.' },
        { title: 'Markha Village', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-house', location: 'Markha, 12,500 ft', desc: 'The biggest village on the trek route â€” whitewashed houses, barley fields, and a ruined fort.' },
        { title: 'Kongmaru La Pass', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-flag', location: '16,700 ft', desc: 'The highest point of the trek â€” prayer flags and 360Âa views of the Zanskar and Stok ranges.' },
        { title: 'River Crossings', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-water', location: 'Markha Valley', desc: 'Multiple river fords along the Markha River â€” cold, knee-deep, and exhilarating.' },
      ],
      image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      videos: [
        { title: 'Markha Valley Trek â€” Complete Guide', youtubeId: '5PEbw7r3mYE', duration: '25 min', desc: 'a comprehensive video guide covering all 7 days of the Markha Valley Trek with practical tips.', gradient: 'linear-gradient(135deg, #064e3b, #10b981)', icon: 'bi-camera-reels' },
      ],
      itinerary: [
        { day: 'Day 1', title: 'Spituk â†’ Zingchen', desc: 'Start at Spituk village (8 km from Leh). Walk through the Zingchen Gorge along the Indus tributary. Gradual ascent through a narrow canyon. Camp at Zingchen.', camps: ['Zingchen Camp'], distance: '8 km', altitude: '11,500 ft' },
        { day: 'Day 2', title: 'Zingchen â†’ Yurutse', desc: 'ascend steeply to Rumbak village. Continue climbing through juniper forests. Cross a small stream and reach Yurutse â€” the last settlement before Ganda La.', camps: ['Yurutse Camp'], distance: '10 km', altitude: '13,500 ft' },
        { day: 'Day 3', title: 'Yurutse â†’ Skiu (via Ganda La)', desc: 'Early start for the first pass crossing â€” Ganda La (15,400 ft). Steep ascent, prayer flags at the top. Long descent to Shingo and then to Skiu village at the Markha River confluence.', camps: ['Skiu Camp'], distance: '12 km', altitude: '15,400 ft max' },
        { day: 'Day 4', title: 'Skiu â†’ Markha Village', desc: 'Follow the Markha River upstream through a stunning gorge. Multiple river crossings. Pass old chortens and mani walls. arrive at Markha â€” the biggest settlement on the route.', camps: ['Markha Village Homestay'], distance: '12 km', altitude: '12,500 ft' },
        { day: 'Day 5', title: 'Markha â†’ Hankar', desc: 'Continue upstream. Pass the ancient Techa monastery ruins. Cross more streams. Reach Hankar â€” a tiny cluster of houses with a dramatic castle ruin.', camps: ['Hankar Camp'], distance: '8 km', altitude: '13,500 ft' },
        { day: 'Day 6', title: 'Hankar â†’ Nimaling', desc: 'The most beautiful day â€” ascend to Nimaling Plateau (15,000 ft). Open meadows, wildflowers in Julyâ€“august. Camp directly beneath the Kang Yatse massif. Watch for blue sheep and marmots.', camps: ['Nimaling Plateau Camp'], distance: '7 km', altitude: '15,000 ft' },
        { day: 'Day 7', title: 'Nimaling â†’ Shang Sumdo (via Kongmaru La)', desc: 'Pre-dawn start. Climb to Kongmaru La (16,700 ft) â€” the trek\'s climax. Spectacular views. Long, steep descent through a colourful gorge to Shang Sumdo. Vehicle pickup to Hemis/Leh.', camps: ['End â€” vehicle to Leh'], distance: '15 km', altitude: '16,700 ft max' },
      ],
      elevation: [
        { name: 'Spituk', altitude: 11000, km: 0 },
        { name: 'Zingchen', altitude: 11500, km: 8 },
        { name: 'Yurutse', altitude: 13500, km: 18 },
        { name: 'Ganda La', altitude: 15400, km: 24 },
        { name: 'Skiu', altitude: 11800, km: 30 },
        { name: 'Markha', altitude: 12500, km: 42 },
        { name: 'Hankar', altitude: 13500, km: 50 },
        { name: 'Nimaling', altitude: 15000, km: 57 },
        { name: 'Kongmaru La', altitude: 16700, km: 62 },
        { name: 'Shang Sumdo', altitude: 12000, km: 72 },
      ],
      tips: [
        'acclimatize in Leh for 2â€“3 days before starting the trek',
        'River crossings can be thigh-deep in Julyâ€“august â€” carry trekking sandals',
        'Homestays are available in Skiu, Markha, and Hankar â€” book through local agents',
        'Nimaling can be bitterly cold at night even in summer â€” carry a -10ÂaC sleeping bag',
        'Blue sheep sightings are almost guaranteed at Nimaling',
        'Carry water purification tablets â€” stream water may not be safe',
        'Start the Kongmaru La climb before 5 aM to avoid afternoon weather',
      ],
      gear: ['Trekking boots (ankle-high, broken in)', 'Sleeping bag rated to -10ÂaC', 'Trekking poles (essential for river crossings)', 'Rain jacket & poncho', 'Warm layers â€” down jacket, thermals, fleece', 'Sun protection â€” hat, SPF 50+, UV glasses', 'Head torch', 'Water bottles + purification', 'First-aid kit with Diamox', 'Trekking sandals for river crossings'],
      fitness: 'You should be able to walk 6â€“8 hours per day carrying a daypack at altitudes up to 16,700 ft. Prior trekking experience at 12,000+ ft is recommended. Cardiovascular fitness is more important than leg strength.',
      relatedSlugs: ['rumtse-tso-moriri', 'lamayuru-alchi'],
    },

    /* â”€â”€ 2. Chadar Trek â”€â”€ */
    {
      slug: 'chadar-frozen-river',
      name: 'Chadar Trek (Frozen River)',
      difficulty: 'Extreme',
      color: '#3b82f6',
      duration: '8â€“10 days',
      distance: '62 km',
      maxAltitude: '11,123 ft',
      lat: 33.9110, lng: 76.9530, zoom: 10,
      season: 'January â€“ February',
      startEnd: 'Chilling â†’ Nerak â†’ Chilling',
      description: 'Walk on the frozen Zanskar River in sub-zero temperatures. This legendary winter trek is the traditional route used by Zanskaris.',
      longDescription: 'The Chadar Trek is one of the world\'s most extraordinary trekking experiences â€” a winter journey on the frozen surface of the Zanskar River. "Chadar" means "blanket" in Ladakhi, referring to the sheet of ice that forms over the river when temperatures plummet to -25ÂaC. For centuries, this frozen highway was the only winter connection between Zanskar and the outside world. Today, it has become a bucket-list trek for adventure seekers worldwide. The trek follows the river through impossibly deep gorges where the walls tower hundreds of feet above. The ice is sometimes thick and blue, sometimes thin and cracking â€” you walk, slip, crawl, and occasionally wade through ankle-deep water when sections break. Camps are in caves along the riverbank. The destination is Nerak, a tiny village with a frozen waterfall. The experience is primal â€” walking on a frozen river at -25ÂaC in one of the world\'s most dramatic landscapes, sleeping in caves, with zero phone signal and zero escape routes.',
      highlights: ['Tilat Sumdo', 'Gyalpo (Ice Waterfall)', 'Tibb Cave', 'Nerak Village', 'Deep Gorges', 'Frozen Zanskar River'],
      photos: [
        { title: 'Frozen Zanskar River', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow2', location: 'Zanskar River', desc: 'The thick blue ice of the frozen Zanskar River stretching through towering gorge walls.' },
        { title: 'Nerak Frozen Waterfall', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-water', location: 'Nerak', desc: 'The stunning frozen waterfall at Nerak â€” a cascade frozen mid-flow into a wall of blue ice.' },
        { title: 'Cave Camping', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-house', location: 'Zanskar Gorge', desc: 'Sleeping in riverside caves around bonfires â€” the ancient tradition of Chadar travelers.' },
        { title: 'Walking on Ice', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-person-walking', location: 'Chadar', desc: 'Trekkers walking single file on the frozen river â€” the ice changes colour, thickness, and sound.' },
        { title: 'Zanskar Gorge Walls', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-mountains', location: 'Zanskar', desc: 'The vertical gorge walls tower hundreds of feet above the frozen river â€” a cathedral of rock and ice.' },
      ],
      image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1600',
      videos: [
        { title: 'Chadar â€” Walking on Frozen Rivers', youtubeId: '5PEbw7r3mYE', duration: '35 min', desc: 'The legendary frozen Zanskar River trek â€” one of the world\'s most extreme winter journeys.', gradient: 'linear-gradient(135deg, #1a365d, #2b5797)', icon: 'bi-camera-reels' },
        { title: 'Surviving -25ÂaC on the Chadar', youtubeId: 'KRF7jWqSdPw', duration: '18 min', desc: 'Practical survival tips and raw footage from a 9-day Chadar trek experience.', gradient: 'linear-gradient(135deg, #0f172a, #60a5fa)', icon: 'bi-film' },
      ],
      itinerary: [
        { day: 'Day 1â€“2', title: 'Leh â€” acclimatization', desc: 'acclimatize in Leh. Visit monasteries, explore the Old Town. attend trek briefing. Sleep in heated rooms â€” you won\'t see them again for a while.', camps: ['Leh Hotel'], distance: '0 km', altitude: '11,500 ft' },
        { day: 'Day 3', title: 'Leh â†’ Chilling â†’ Tilat Sumdo', desc: 'Drive from Leh to Chilling (60 km, 3 hours). First steps onto the frozen river. Walk 7 km on ice to Tilat Sumdo. First cave camp. The reality of sub-zero camping sets in.', camps: ['Tilat Sumdo Cave'], distance: '7 km on ice', altitude: '10,500 ft' },
        { day: 'Day 4', title: 'Tilat Sumdo â†’ Gyalpo', desc: 'Continue on the frozen river. The gorge deepens. Pass sections where ice has broken â€” wade through inches of water. Reach Gyalpo with its magnificent ice waterfall.', camps: ['Gyalpo Cave'], distance: '10 km', altitude: '10,800 ft' },
        { day: 'Day 5', title: 'Gyalpo â†’ Tibb Cave', desc: 'Deeper into the gorge. The walls are now 200+ feet high. Navigate around ice boulders and through narrow sections. Reach the famous Tibb Cave â€” the most dramatic campsite.', camps: ['Tibb Cave'], distance: '9 km', altitude: '10,900 ft' },
        { day: 'Day 6', title: 'Tibb â†’ Nerak', desc: 'The final push to Nerak village. Walk along narrowing gorges. arrive at the fabled Nerak Frozen Waterfall â€” a 40-foot cascade frozen into a wall of blue-white ice. The emotional climax of the trek.', camps: ['Nerak Cave'], distance: '8 km', altitude: '11,123 ft' },
        { day: 'Day 7â€“8', title: 'Nerak â†’ Chilling (Return)', desc: 'Retrace steps back to Chilling over 2 days. The return often feels faster â€” familiar landmarks, growing confidence on ice. But conditions change daily â€” sections that were frozen going in may now be open water.', camps: ['Gyalpo Cave', 'Chilling'], distance: '34 km (2 days)', altitude: '10,500 ft' },
        { day: 'Day 9', title: 'Chilling â†’ Leh', desc: 'Drive back to Leh. Hot shower. Hot food. a lifetime of stories.', camps: ['Leh Hotel'], distance: '60 km drive', altitude: '11,500 ft' },
      ],
      elevation: [
        { name: 'Chilling', altitude: 10200, km: 0 },
        { name: 'Tilat Sumdo', altitude: 10500, km: 7 },
        { name: 'Gyalpo', altitude: 10800, km: 17 },
        { name: 'Tibb Cave', altitude: 10900, km: 26 },
        { name: 'Nerak', altitude: 11123, km: 34 },
      ],
      tips: [
        'This is a LIFE-THREaTENING trek if poorly prepared â€” only go with experienced operators',
        'Temperature reaches -25ÂaC to -35ÂaC at night â€” your sleeping bag is your life',
        'Carry chemical hand/toe warmers â€” they\'re essential at these temperatures',
        'The Chadar can break without warning â€” always follow your guide\'s instructions',
        'Your phone battery will die in minutes â€” carry a power bank inside your jacket',
        'You WILL get wet feet â€” carry 3+ pairs of thick socks and change them immediately',
        'Mental preparation is as important as physical â€” isolation and cold are mentally taxing',
        'Register with DC Office Leh â€” Chadar permits are now regulated',
      ],
      gear: ['Expedition sleeping bag (-30ÂaC rated)', 'Down jacket (800+ fill)', 'Waterproof trekking boots (insulated)', 'Gumboots for water crossings', '3+ pairs heavy wool socks', 'Balaclava & insulated gloves', 'Chemical warmers (hand & toe)', 'Thermals (top & bottom â€” merino)', 'Insulated water bottle (regular bottles freeze)', 'Trek mat (sleeping on cave floor)'],
      fitness: 'Extreme cold tolerance is more important than altitude fitness (max altitude is 11,123 ft). You should be comfortable walking 8â€“10 hours in sub-zero conditions on slippery surfaces. Prior cold-weather trekking experience is strongly recommended.',
      relatedSlugs: ['stok-kangri', 'markha-valley'],
    },

    /* â”€â”€ 3. Stok Kangri â”€â”€ */
    {
      slug: 'stok-kangri',
      name: 'Stok Kangri Climb',
      difficulty: 'Extreme',
      color: '#ef4444',
      duration: '4â€“6 days',
      distance: '36 km',
      maxAltitude: '20,187 ft',
      lat: 33.9990, lng: 77.4520, zoom: 12,
      season: 'July â€“ September',
      startEnd: 'Stok Village â†’ Summit â†’ Stok Village',
      description: 'The highest trekking peak in Ladakh, visible from Leh. a non-technical climb but demanding due to altitude.',
      longDescription: 'Stok Kangri at 20,187 ft is the most accessible 6,000-metre peak in the world â€” and one of the most satisfying mountaineering experiences available to non-professional climbers. The mountain dominates the skyline south of Leh, and on a clear day, you can see the summit from the Main Bazaar. The climb is technically non-demanding (no ropes or technical gear required in normal conditions), but the extreme altitude makes it a serious undertaking. Most climbers experience headaches, nausea, and breathlessness above base camp. The summit push begins at 1 aM â€” you climb through the night by headtorch, crossing a glacier, and reach the summit by sunrise for panoramic views stretching from the Karakoram to the Zanskar Range. The descent is equally intense â€” 3,000 ft of knee-punishing downhill. Note: as of some years, IMF clearance may be required.',
      highlights: ['Stok Village', 'Mankorma Base Camp', 'Stok Base Camp', 'advance Camp', 'Summit Push', 'Glacier Crossing'],
      photos: [
        { title: 'Stok Kangri Summit Ridge', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-triangle', location: '20,187 ft', desc: 'The final summit ridge of Stok Kangri â€” a narrow snow and rock arÃªte with exposure on both sides.' },
        { title: 'Sunrise from Summit', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', icon: 'bi-sunrise', location: 'Stok Kangri Summit', desc: 'Golden sunrise illuminating the Karakoram Range as seen from the summit â€” the reward for a midnight climb.' },
        { title: 'Stok Glacier', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow2', location: '18,500 ft', desc: 'Crossing the Stok Glacier in pre-dawn darkness â€” headtorches creating pools of light on blue ice.' },
        { title: 'Stok Base Camp', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-tent', location: '16,400 ft', desc: 'Base camp in a glacial valley â€” tents dwarfed by the towering massif of Stok Kangri above.' },
        { title: 'View from Leh', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-binoculars', location: 'Leh', desc: 'Stok Kangri as seen from Leh\'s Main Bazaar â€” the white summit looks deceptively close.' },
      ],
      image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      videos: [
        { title: 'Stok Kangri â€” Summit Night', youtubeId: 'KRF7jWqSdPw', duration: '30 min', desc: 'The complete summit day experience â€” from 1 aM departure to sunrise at 20,187 ft.', gradient: 'linear-gradient(135deg, #0f172a, #ef4444)', icon: 'bi-camera-reels' },
      ],
      itinerary: [
        { day: 'Day 1', title: 'Leh â†’ Stok Village â†’ Mankorma', desc: 'Drive from Leh to Stok Village (15 km). Begin trekking to Mankorma Base Camp through a scenic valley.', camps: ['Mankorma Camp'], distance: '6 km trek', altitude: '14,100 ft' },
        { day: 'Day 2', title: 'Mankorma â†’ Stok Base Camp', desc: 'Gradual ascent to Stok Base Camp. acclimatization walks in the afternoon. The summit becomes visible.', camps: ['Stok Base Camp'], distance: '6 km', altitude: '16,400 ft' },
        { day: 'Day 3', title: 'acclimatization Day', desc: 'Rest and acclimatize. Short hike to advance Camp at 17,800 ft and back. Hydrate aggressively. Early dinner and sleep.', camps: ['Stok Base Camp'], distance: '4 km (up & back)', altitude: '17,800 ft max' },
        { day: 'Day 4', title: 'Summit Day', desc: 'Depart at 1 aM. Climb through the night by headtorch. Cross the Stok Glacier. Final steep scramble to the summit ridge. Reach the summit by sunrise (5:30 aM). Panoramic views of the Karakoram, Zanskar, and Himalaya ranges. Descend to base camp by noon. Continue to Mankorma.', camps: ['Mankorma Camp'], distance: '20 km (summit round + descent)', altitude: '20,187 ft summit' },
        { day: 'Day 5', title: 'Mankorma â†’ Stok â†’ Leh', desc: 'Easy descent to Stok Village. Vehicle back to Leh. Celebrate.', camps: ['Leh Hotel'], distance: '6 km trek + drive', altitude: '11,500 ft' },
      ],
      elevation: [
        { name: 'Stok Village', altitude: 11800, km: 0 },
        { name: 'Mankorma', altitude: 14100, km: 6 },
        { name: 'Base Camp', altitude: 16400, km: 12 },
        { name: 'adv. Camp', altitude: 17800, km: 16 },
        { name: 'Glacier', altitude: 18500, km: 20 },
        { name: 'Summit', altitude: 20187, km: 24 },
      ],
      tips: [
        'acclimatize in Leh for minimum 4 days before attempting',
        'This is a SERIOUS altitude undertaking â€” headaches and nausea above base camp are normal',
        'Summit success rate is about 60% â€” altitude sickness forces many to turn back',
        'Carry Diamox and start taking it 2 days before the trek',
        'The summit push is 8â€“10 hours â€” carry high-energy snacks and warm liquids in a thermos',
        'Gaiters are essential for the glacier crossing',
        'Check if IMF (Indian Mountaineering Foundation) clearance is required in the current season',
        'Do NOT attempt solo â€” go with a registered expedition operator',
      ],
      gear: ['Mountaineering boots (rigid sole, crampon-compatible)', 'Crampons (basic strap-on)', 'Gaiters', 'Down jacket (-20ÂaC rated)', 'Expedition sleeping bag (-20ÂaC)', 'Head torch with spare batteries', 'Trekking poles', 'UV sunglasses (glacier glare)', 'Thermos flask', 'High-energy snacks (nuts, chocolate, energy gels)'],
      fitness: 'You need strong cardiovascular fitness and prior high-altitude trek experience (14,000+ ft). Train with elevation gains: stair climbing, running, and loaded hikes. The summit push is 8â€“10 hours of continuous uphill at extreme altitude.',
      relatedSlugs: ['markha-valley', 'chadar-frozen-river'],
    },

    /* â”€â”€ 4. Rumtse to Tso Moriri â”€â”€ */
    {
      slug: 'rumtse-tso-moriri',
      name: 'Rumtse to Tso Moriri',
      difficulty: 'Hard',
      color: '#8b5cf6',
      duration: '7â€“10 days',
      distance: '80 km',
      maxAltitude: '16,700 ft (Kyamari La)',
      lat: 33.3900, lng: 78.0000, zoom: 10,
      season: 'July â€“ September',
      startEnd: 'Rumtse â†’ Korzok',
      description: 'a stunning high-altitude trek linking the Manaliâ€“Leh Highway to the pristine Tso Moriri lake, crossing the Changthang wildlife sanctuary.',
      longDescription: 'The Rumtse to Tso Moriri trek is one of the great Himalayan traverses â€” a 10-day journey through some of the most remote and beautiful landscapes in Ladakh. Starting from Rumtse on the Manaliâ€“Leh Highway, the trail crosses multiple passes above 16,000 ft, traverses the Changthang Wildlife Sanctuary, and ends at the pristine shores of Tso Moriri â€” one of India\'s highest and most beautiful lakes. The terrain is stark, treeless, and magnificent â€” vast open valleys, turquoise streams, and herds of kiang (Tibetan wild ass) and bharal (blue sheep). You\'ll pass Tso Kar â€” a smaller salt lake where bar-headed geese breed â€” before the final approach to Tso Moriri. This is a trek for experienced hikers who can handle sustained altitude and isolation: there are no villages, no phone signal, and no escape routes for most of the trail.',
      highlights: ['Rumtse', 'Kyamari La', 'Tisaling', 'Pongunagu', 'Tso Kar Lake', 'Nuruchan', 'Gyama Valley', 'Korzok'],
      photos: [
        { title: 'Tso Kar Lake', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-water', location: 'Tso Kar, 14,800 ft', desc: 'The "White Lake" â€” salt deposits create a ghostly white shoreline in the middle of the Changthang.' },
        { title: 'Kyamari La Pass', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-flag', location: '16,700 ft', desc: 'Prayer flags at the highest point of the trek â€” views of the vast Changthang plateau in every direction.' },
        { title: 'Kiang Herds', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-heart', location: 'Changthang Plateau', desc: 'Herds of Tibetan wild asses running across the high plateau â€” a wildlife spectacle.' },
        { title: 'Tso Moriri arrival', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-water', location: 'Korzok, 14,836 ft', desc: 'First glimpse of Tso Moriri after 8 days of trekking â€” an overwhelming moment.' },
        { title: 'High Plateau Camping', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-tent', location: 'Changthang, 15,000+ ft', desc: 'Wild camping on the Changthang plateau â€” just you, the tent, and the immense empty landscape.' },
      ],
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      videos: [
        { title: 'Rumtse to Tso Moriri â€” The Great Traverse', youtubeId: 'QJuvqMfXLqs', duration: '28 min', desc: 'a cinematic documentary following a trekking group across 10 days from Rumtse to Tso Moriri.', gradient: 'linear-gradient(135deg, #2e1065, #8b5cf6)', icon: 'bi-camera-reels' },
      ],
      itinerary: [
        { day: 'Day 1', title: 'Leh â†’ Rumtse â†’ Chorten Sumdo', desc: 'Drive from Leh to Rumtse (145 km on Manaliâ€“Leh Highway). Begin trekking into a rocky valley.', camps: ['Chorten Sumdo Camp'], distance: '8 km trek', altitude: '14,200 ft' },
        { day: 'Day 2', title: 'Chorten Sumdo â†’ Kyamari La â†’ Tisaling', desc: 'Cross the first and highest pass â€” Kyamari La (16,700 ft). Descend to the beautiful campsite at Tisaling.', camps: ['Tisaling Camp'], distance: '10 km', altitude: '16,700 ft max' },
        { day: 'Day 3', title: 'Tisaling â†’ Shibuk La â†’ Pongunagu', desc: 'Cross Shibuk La (16,200 ft). Descend into the Pongunagu Valley â€” vast and empty.', camps: ['Pongunagu Camp'], distance: '12 km', altitude: '16,200 ft max' },
        { day: 'Day 4â€“5', title: 'Pongunagu â†’ Tso Kar', desc: 'Trek across high-altitude plains to Tso Kar (the "White Lake"). Rest day for wildlife watching â€” bar-headed geese, kiang, and marmots.', camps: ['Tso Kar Camp'], distance: '18 km (2 days)', altitude: '14,800 ft' },
        { day: 'Day 6â€“7', title: 'Tso Kar â†’ Nuruchan â†’ Gyama', desc: 'Continue south through the Nuruchan Valley. Enter the Gyama Valley â€” increasingly dramatic canyon scenery.', camps: ['Nuruchan Camp', 'Gyama Camp'], distance: '22 km (2 days)', altitude: '15,200 ft max' },
        { day: 'Day 8', title: 'Gyama â†’ Korzok (Tso Moriri)', desc: 'The final day. Climb a small pass and descend to the shores of Tso Moriri at Korzok village. The lake appears suddenly â€” deep blue against brown mountains.', camps: ['Korzok Homestay'], distance: '10 km', altitude: '14,836 ft' },
      ],
      elevation: [
        { name: 'Rumtse', altitude: 13700, km: 0 },
        { name: 'Chorten Sumdo', altitude: 14200, km: 8 },
        { name: 'Kyamari La', altitude: 16700, km: 14 },
        { name: 'Tisaling', altitude: 15000, km: 18 },
        { name: 'Pongunagu', altitude: 14800, km: 30 },
        { name: 'Tso Kar', altitude: 14800, km: 48 },
        { name: 'Nuruchan', altitude: 15200, km: 58 },
        { name: 'Gyama', altitude: 15000, km: 70 },
        { name: 'Korzok', altitude: 14836, km: 80 },
      ],
      tips: [
        'This trek stays above 14,000 ft for nearly the entire duration â€” take aMS very seriously',
        'There are NO settlements between Rumtse and Korzok â€” carry all supplies',
        'Wind is constant and fierce on the plateau â€” a wind-proof shelter is essential',
        'Water sources can be unreliable â€” carry purification and 4L capacity minimum',
        'Wildlife sightings are best early morning â€” carry binoculars',
        'This trek is NOT suitable for beginners â€” prior high-altitude experience strongly recommended',
        'arrange vehicle pickup from Korzok in advance â€” there are no taxis there',
      ],
      gear: ['4-season tent (wind-resistant)', 'Sleeping bag rated to -15ÂaC', 'Trekking poles', 'Wind-proof outer layer', 'Warm layers for 10 days', 'Water purification (tablets + filter)', 'all food for 8 trekking days', 'Portable stove & fuel', 'Binoculars', 'Sun protection (hat, SPF 50+, UV glasses)'],
      fitness: 'Strong endurance fitness required. You need to walk 8â€“12 km per day at 14,000â€“16,700 ft altitude for 8 consecutive days. Prior multi-day high-altitude trekking experience is essential.',
      relatedSlugs: ['markha-valley', 'lamayuru-alchi'],
    },

    /* â”€â”€ 5. Lamayuru to alchi â”€â”€ */
    {
      slug: 'lamayuru-alchi',
      name: 'Lamayuru to alchi',
      difficulty: 'Moderate',
      color: '#f59e0b',
      duration: '3â€“5 days',
      distance: '40 km',
      maxAltitude: '12,500 ft (Staki La)',
      lat: 34.2500, lng: 76.8500, zoom: 11,
      season: 'June â€“ October',
      startEnd: 'Lamayuru â†’ alchi',
      description: 'a cultural trek through ancient villages and remote monasteries. Connect two of Ladakh\'s most important Buddhist heritage sites.',
      longDescription: 'The Lamayuru to alchi trek is Ladakh\'s finest cultural trekking experience â€” connecting two of the region\'s most important and ancient Buddhist heritage sites through a landscape of surreal beauty. The trek begins at Lamayuru, with its famous "Moonland" erosion formations and one of Ladakh\'s oldest monasteries (founded 10thâ€“11th century). The trail crosses Prinkiti La and Staki La â€” gentle passes compared to other Ladakh treks â€” and descends through hidden valleys containing tiny villages where time seems to have stopped. Sumdah Chenmo is particularly atmospheric â€” a small settlement accessible only on foot with a beautiful temple containing ancient murals. The trek ends at alchi, home to one of the greatest treasures of Buddhist art in the Western Himalayas â€” the 11th-century temple complex with original Kashmiri-style paintings that are among the finest surviving examples of early Indo-Tibetan art.',
      highlights: ['Lamayuru Moonland', 'Prinkiti La', 'Hinju Village', 'Sumdah Chun', 'Sumda Chenmo', 'alchi Monastery'],
      photos: [
        { title: 'Lamayuru Moonland', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-globe', location: 'Lamayuru', desc: 'The surreal eroded moonscape formations surrounding Lamayuru Monastery â€” like nothing else on Earth.' },
        { title: 'alchi Monastery Murals', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-brush', location: 'alchi', desc: 'The 11th-century Kashmiri-style paintings inside alchi â€” among the finest surviving Buddhist murals.' },
        { title: 'Sumda Chenmo Temple', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-building', location: 'Sumda Chenmo', desc: 'a hidden temple in a roadless village â€” ancient murals that few outsiders ever see.' },
        { title: 'Village Trail', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-flower1', location: 'Between villages', desc: 'Narrow trails through green barley fields with whitewashed chortens and mani walls.' },
        { title: 'Prinkiti La Views', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-binoculars', location: 'Prinkiti La, 12,000 ft', desc: 'Panoramic views from Prinkiti La â€” the first pass on the trek with views of the Zanskar Range.' },
      ],
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1600',
      videos: [
        { title: 'Lamayuru to alchi â€” Cultural Trek', youtubeId: 'zNFmzjxQGHk', duration: '20 min', desc: 'Experience the cultural richness of this gentle trek connecting two of Ladakh\'s greatest monasteries.', gradient: 'linear-gradient(135deg, #713f12, #f59e0b)', icon: 'bi-camera-reels' },
      ],
      itinerary: [
        { day: 'Day 1', title: 'Lamayuru â†’ Prinkiti La â†’ Hinju', desc: 'Visit Lamayuru Monastery in the morning. Begin trekking over Prinkiti La (12,000 ft). Descend through a scenic gorge to Hinju village. Homestay in Hinju.', camps: ['Hinju Homestay'], distance: '12 km', altitude: '12,000 ft max' },
        { day: 'Day 2', title: 'Hinju â†’ Sumdah Chun â†’ Sumda Chenmo', desc: 'Gentle walking through valleys. Pass Sumdah Chun village. arrive at Sumda Chenmo â€” visit the ancient temple with remarkable murals. Homestay.', camps: ['Sumda Chenmo Homestay'], distance: '14 km', altitude: '11,500 ft' },
        { day: 'Day 3', title: 'Sumda Chenmo â†’ Staki La â†’ alchi', desc: 'Cross the final pass â€” Staki La (12,500 ft). Long descent to the Indus Valley. arrive at alchi. Visit the extraordinary alchi Chos Khor temple complex with 11th-century murals.', camps: ['alchi Guest House'], distance: '14 km', altitude: '12,500 ft max' },
      ],
      elevation: [
        { name: 'Lamayuru', altitude: 11520, km: 0 },
        { name: 'Prinkiti La', altitude: 12000, km: 6 },
        { name: 'Hinju', altitude: 11000, km: 12 },
        { name: 'Sumda Chenmo', altitude: 11500, km: 26 },
        { name: 'Staki La', altitude: 12500, km: 32 },
        { name: 'alchi', altitude: 10800, km: 40 },
      ],
      tips: [
        'This is the most culturally rewarding trek in Ladakh â€” take time at each village',
        'Homestays are the norm â€” carry a small gift for hosts (tea, dried fruit)',
        'Photography inside alchi\'s Chos Khor temples is STRICTLY prohibited',
        'Best time is June and September â€” fewer crowds, pleasant temperatures',
        'This trek is suitable for fit beginners with basic trekking experience',
        'Carry cash â€” no aTMs or card machines on the trail',
        'The moonland formations at Lamayuru are best photographed in early morning light',
      ],
      gear: ['Comfortable trekking shoes (trail runners OK)', 'Light sleeping bag (homestays have bedding but it can be thin)', 'Daypack (20â€“30L)', 'Warm fleece + light down jacket', 'Sun protection', 'Water bottle + purification', 'Torch (village electricity is unreliable)', 'Small gifts for homestay hosts'],
      fitness: 'Suitable for moderately fit trekkers. 12â€“14 km walking days at 10,800â€“12,500 ft altitude. No prior high-altitude experience required, but general trekking fitness is recommended.',
      relatedSlugs: ['sham-valley', 'markha-valley'],
    },

    /* â”€â”€ 6. Sham Valley â”€â”€ */
    {
      slug: 'sham-valley',
      name: 'Sham Valley Trek',
      difficulty: 'Easy',
      color: '#06b6d4',
      duration: '3â€“4 days',
      distance: '35 km',
      maxAltitude: '12,795 ft',
      lat: 34.3160, lng: 77.0600, zoom: 12,
      season: 'May â€“ October',
      startEnd: 'Likir â†’ Hemis Shukpachan â†’ Temisgam',
      description: 'Known as the "Baby Trek" of Ladakh â€” perfect for beginners and families. Walk through charming villages with homestays.',
      longDescription: 'The Sham Valley Trek is Ladakh\'s gentlest introduction to Himalayan trekking â€” affectionately called the "Baby Trek" because of its moderate distances, manageable altitudes, and charming village homestays. But don\'t let the nickname fool you: this trek offers stunning scenery, deep cultural immersion, and an authentic experience of Ladakhi village life. The trail connects Likir (with its hilltop monastery and giant Maitreya Buddha), Yangthang, Hemis Shukpachan (a hidden apricot paradise), ang, and Temisgam â€” all connected by gentle trails through barley fields, apricot and walnut orchards, and dramatic desert landscapes. Every night is spent in a village homestay, eating home-cooked Ladakhi food (thukpa, skyu, butter tea) and chatting with generous hosts. This is the perfect trek for families, first-time trekkers, or anyone who values cultural experience over extreme altitude.',
      highlights: ['Likir Monastery', 'Yangthang', 'Hemis Shukpachan', 'ang Village', 'Temisgam', 'apricot Orchards'],
      photos: [
        { title: 'Likir Monastery', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-building', location: 'Likir', desc: 'The picturesque Likir Monastery with its giant golden Maitreya Buddha overlooking the Sham Valley.' },
        { title: 'apricot Orchards', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-flower1', location: 'Hemis Shukpachan', desc: 'The famous apricot orchards of Hemis Shukpachan â€” a sea of pink blossoms in spring, golden fruit in summer.' },
        { title: 'Village Homestay', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-house', location: 'Sham Valley', desc: 'a traditional Ladakhi homestay â€” warm hospitality, butter tea, and home-cooked meals.' },
        { title: 'Barley Fields', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800', icon: 'bi-flower2', location: 'Yangthang', desc: 'Golden barley fields ready for harvest â€” the staple crop that sustains Ladakh\'s village economy.' },
        { title: 'Desert & Mountains', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-mountains', location: 'Sham Valley', desc: 'The dramatic contrast of green oasis villages against barren desert mountains.' },
      ],
      image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1600',
      videos: [
        { title: 'Sham Valley â€” Ladakh\'s Baby Trek', youtubeId: 'zNFmzjxQGHk', duration: '15 min', desc: 'a family-friendly guide to the Sham Valley Trek with homestay experiences and village life.', gradient: 'linear-gradient(135deg, #164e63, #06b6d4)', icon: 'bi-camera-reels' },
      ],
      itinerary: [
        { day: 'Day 1', title: 'Leh â†’ Likir â†’ Yangthang', desc: 'Drive from Leh to Likir (50 km). Visit Likir Monastery and the giant Maitreya Buddha. Begin trekking to Yangthang village through a scenic valley. Homestay in Yangthang.', camps: ['Yangthang Homestay'], distance: '8 km trek', altitude: '12,200 ft max' },
        { day: 'Day 2', title: 'Yangthang â†’ Hemis Shukpachan', desc: 'Cross a gentle pass. Descend into the hidden valley of Hemis Shukpachan â€” a magical village surrounded by apricot and walnut orchards. afternoon free to explore.', camps: ['Hemis Shukpachan Homestay'], distance: '10 km', altitude: '12,795 ft max' },
        { day: 'Day 3', title: 'Hemis Shukpachan â†’ ang â†’ Temisgam', desc: 'Walk through orchards and barley fields. Pass ang village. Descend to Temisgam â€” visit the ancient temple. Vehicle back to Leh.', camps: ['End â€” vehicle to Leh'], distance: '12 km', altitude: '10,500 ft' },
      ],
      elevation: [
        { name: 'Likir', altitude: 11800, km: 0 },
        { name: 'Yangthang', altitude: 12200, km: 8 },
        { name: 'Pass', altitude: 12795, km: 14 },
        { name: 'Hemis Shukpachan', altitude: 11400, km: 18 },
        { name: 'ang', altitude: 11000, km: 25 },
        { name: 'Temisgam', altitude: 10500, km: 35 },
      ],
      tips: [
        'Perfect for families with children aged 8+ and first-time trekkers',
        'Homestay meals are included â€” try the local thukpa (noodle soup) and butter tea',
        'apricot season (Julyâ€“august) makes Hemis Shukpachan extra special',
        'Carry sweets or small gifts for homestay hosts and village children',
        'This trek requires minimal gear â€” a daypack is sufficient',
        'Trail runners or comfortable walking shoes are fine â€” no heavy boots needed',
        'The trek can be extended to include Rizong Monastery (add 1 day)',
      ],
      gear: ['Comfortable walking shoes or trail runners', 'Daypack (15â€“20L)', 'Light warm layer (fleece)', 'Sunscreen & hat', 'Water bottle', 'Camera', 'Small gift for homestay hosts', 'Light sleeping bag liner (optional)'],
      fitness: 'Suitable for anyone with basic walking fitness. Children 8+ can complete this trek comfortably. No prior trekking experience required. You should be able to walk 3â€“4 hours at a gentle pace.',
      relatedSlugs: ['lamayuru-alchi', 'markha-valley'],
    },
  ];
}




