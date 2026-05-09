import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LeafletMapComponent } from '../../shared/leaflet-map/leaflet-map';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [RouterLink, LeafletMapComponent],
  templateUrl: './maps.html',
  styleUrl: './maps.scss',
  host: { '(document:keydown.escape)': 'onEscape()' },
})
export class Maps {
  private sanitizer = inject(DomSanitizer);

  /* â”€â”€ UI State â”€â”€ */
  activeCategory = signal<string>('all');
  activeMap = signal<MapItem | null>(null);
  activeEmbed = signal<SafeResourceUrl | null>(null);

  /* â”€â”€ Stats â”€â”€ */
  stats = [
    { icon: 'bi-map', value: '25+', label: 'Interactive Maps' },
    { icon: 'bi-pin-map', value: '120+', label: 'Marked Locations' },
    { icon: 'bi-signpost-split', value: '8', label: 'Major Routes' },
    { icon: 'bi-geo-alt', value: '35+', label: 'Points of Interest' },
  ];

  /* â”€â”€ Categories â”€â”€ */
  categories = [
    { value: 'all', label: 'all Maps', icon: 'bi-grid-3x3-gap' },
    { value: 'region', label: 'Regional', icon: 'bi-map' },
    { value: 'route', label: 'Routes & Passes', icon: 'bi-signpost-split' },
    { value: 'monastery', label: 'Monasteries', icon: 'bi-building' },
    { value: 'nature', label: 'Nature & Wildlife', icon: 'bi-tree' },
    { value: 'adventure', label: 'adventure', icon: 'bi-compass' },
    { value: 'historical', label: 'Historical', icon: 'bi-clock-history' },
  ];

  /* â”€â”€ Maps Data â”€â”€ */
  maps: MapItem[] = [
    // Regional
    {
      id: 1, title: 'Ladakh Union Territory â€” Overview', category: 'region',
      desc: 'Complete administrative map of Ladakh UT showing Leh and Kargil districts, tehsils, block boundaries, and major settlements.',
      gradient: 'linear-gradient(135deg, #1a365d, #2b5797)', icon: 'bi-map',
      embedId: '!1m14!1m12!1m3!1d435518.67!2d77.5!3d34.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['UT', 'administrative', 'Districts'],
      locations: ['Leh', 'Kargil', 'Diskit', 'Zanskar', 'Dras', 'Nyoma'],
      area: '59,146 kmÂ²', elevation: '2,500â€“7,672 m',
    },
    {
      id: 2, title: 'Leh District Map', category: 'region',
      desc: 'Detailed map of Leh district including all major towns, villages, lakes, and administrative blocks from Khaltse to Hanle.',
      gradient: 'linear-gradient(135deg, #0c4a6e, #0d9488)', icon: 'bi-pin-map',
      embedId: '!1m14!1m12!1m3!1d217759.3!2d77.58!3d34.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Leh', 'District', 'Towns'],
      locations: ['Leh Town', 'Hemis', 'Thiksey', 'Stok', 'Phyang', 'Spituk'],
      area: '45,110 kmÂ²', elevation: '3,000â€“7,672 m',
    },
    {
      id: 3, title: 'Kargil District Map', category: 'region',
      desc: 'Map of Kargil district showing the Suru Valley, Zanskar sub-division, Drass sector, and the Line of Control boundary.',
      gradient: 'linear-gradient(135deg, #7c2d12, #dc2626)', icon: 'bi-pin-map',
      embedId: '!1m14!1m12!1m3!1d217759.3!2d76.13!3d34.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Kargil', 'District', 'LoC'],
      locations: ['Kargil Town', 'Drass', 'Zanskar', 'Suru Valley', 'Padum'],
      area: '14,036 kmÂ²', elevation: '2,676â€“7,135 m',
    },

    // Routes & Passes
    {
      id: 4, title: 'Manaliâ€“Leh Highway', category: 'route',
      desc: 'The 479 km Manaliâ€“Leh Highway crossing Rohtang, Baralacha, Nakee La, Lachalung La, and Tanglang La passes. Includes fuel stops and campsites.',
      gradient: 'linear-gradient(135deg, #059669, #10b981)', icon: 'bi-signpost-split',
      embedId: '!1m14!1m12!1m3!1d435518.67!2d77.18!3d33.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Highway', 'Passes', 'Manali'],
      locations: ['Manali', 'Rohtang', 'Keylong', 'Sarchu', 'Pang', 'Upshi', 'Leh'],
      area: '479 km', elevation: '1,950â€“5,328 m',
    },
    {
      id: 5, title: 'Srinagarâ€“Leh Highway (NH1)', category: 'route',
      desc: 'The 434 km Srinagarâ€“Leh route via Sonamarg, Zoji La, Drass, Kargil, Mulbekh, Lamayuru, and the Indus Valley to Leh.',
      gradient: 'linear-gradient(135deg, #1e40af, #3b82f6)', icon: 'bi-signpost-split',
      embedId: '!1m14!1m12!1m3!1d435518.67!2d76.5!3d34.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Highway', 'Srinagar', 'NH1'],
      locations: ['Srinagar', 'Sonamarg', 'Zoji La', 'Drass', 'Kargil', 'Lamayuru', 'Leh'],
      area: '434 km', elevation: '1,585â€“3,528 m',
    },
    {
      id: 6, title: 'Khardung La & Nubra Valley Road', category: 'route',
      desc: 'The highest motorable road connecting Leh to Nubra Valley via Khardung La (17,982 ft). Includes routes to Hunder, Diskit, Turtuk, and Panamik.',
      gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)', icon: 'bi-signpost-2',
      embedId: '!1m14!1m12!1m3!1d217759.3!2d77.6!3d34.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Khardung La', 'Nubra', 'High Pass'],
      locations: ['South Pullu', 'Khardung La', 'North Pullu', 'Khalsar', 'Diskit', 'Hunder', 'Turtuk'],
      area: '120 km', elevation: '3,500â€“5,359 m',
    },
    {
      id: 7, title: 'Pangong Lake Route', category: 'route',
      desc: 'The scenic route from Leh to Pangong Tso via Chang La (17,590 ft), passing through Tangste and the Changthang plateau.',
      gradient: 'linear-gradient(135deg, #0c4a6e, #06b6d4)', icon: 'bi-signpost-split',
      embedId: '!1m14!1m12!1m3!1d217759.3!2d78.0!3d34.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Pangong', 'Chang La', 'Lake'],
      locations: ['Karu', 'Chang La', 'Tangste', 'Lukung', 'Spangmik', 'Man-Merak'],
      area: '160 km', elevation: '3,500â€“5,360 m',
    },
    {
      id: 8, title: 'Zanskar Valley Road', category: 'route',
      desc: 'The remote road from Kargil to Padum via Pensi La (14,000 ft) through the isolated Zanskar Valley â€” one of the most remote inhabited regions on Earth.',
      gradient: 'linear-gradient(135deg, #475264, #64748b)', icon: 'bi-signpost-split',
      embedId: '!1m14!1m12!1m3!1d217759.3!2d76.8!3d33.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Zanskar', 'Remote', 'Pensi La'],
      locations: ['Kargil', 'Rangdum', 'Pensi La', 'Padum', 'Karsha', 'Zangla'],
      area: '240 km', elevation: '2,676â€“4,400 m',
    },

    // Monasteries
    {
      id: 9, title: 'Leh Valley Monastery Circuit', category: 'monastery',
      desc: 'a map of all major monasteries along the Leh Valley â€” from Spituk to Chemrey â€” covering the most visited gompa circuit in Ladakh.',
      gradient: 'linear-gradient(135deg, #c8702a, #e89b4e)', icon: 'bi-building',
      embedId: '!1m14!1m12!1m3!1d108879.6!2d77.5!3d34.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Gompa', 'Buddhist', 'Circuit'],
      locations: ['Spituk', 'Phyang', 'Shey', 'Thiksey', 'Hemis', 'Stakna', 'Chemrey'],
      area: '50 km stretch', elevation: '3,200â€“3,600 m',
    },
    {
      id: 10, title: 'ancient Monastery Map', category: 'monastery',
      desc: 'Locations of Ladakh\'s oldest monasteries including 10th-century alchi, 11th-century Lamayuru, and the remote Phugtal cave monastery.',
      gradient: 'linear-gradient(135deg, #92400e, #b45309)', icon: 'bi-hourglass-split',
      embedId: '!1m14!1m12!1m3!1d435518.67!2d77.2!3d34.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['ancient', '10th Century', 'Heritage'],
      locations: ['alchi', 'Lamayuru', 'Mangyu', 'Phugtal', 'Sani', 'Karsha'],
      area: 'Region-wide', elevation: '3,100â€“4,200 m',
    },

    // Nature & Wildlife
    {
      id: 11, title: 'Hemis National Park', category: 'nature',
      desc: 'India\'s largest national park (4,400 kmÂ²) and snow leopard capital. Shows trekking trails, wildlife zones, and key spotting locations.',
      gradient: 'linear-gradient(135deg, #059669, #0d9488)', icon: 'bi-tree',
      embedId: '!1m14!1m12!1m3!1d108879.6!2d77.6!3d33.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['National Park', 'Snow Leopard', 'Trek'],
      locations: ['Rumbak', 'Markha Valley', 'Hemis Gompa', 'Shan Valley', 'Yurutse'],
      area: '4,400 kmÂ²', elevation: '3,300â€“6,000 m',
    },
    {
      id: 12, title: 'Lakes of Ladakh', category: 'nature',
      desc: 'all major high-altitude lakes including Pangong Tso, Tso Moriri, Tso Kar, Yarab Tso, and the sacred Gurudongmar Tso.',
      gradient: 'linear-gradient(135deg, #0c4a6e, #0ea5e9)', icon: 'bi-water',
      embedId: '!1m14!1m12!1m3!1d435518.67!2d78.0!3d33.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Lakes', 'High altitude', 'Wetlands'],
      locations: ['Pangong Tso', 'Tso Moriri', 'Tso Kar', 'Yarab Tso', 'Hanle Marshes'],
      area: 'Region-wide', elevation: '4,200â€“5,100 m',
    },
    {
      id: 13, title: 'Changthang Wildlife Sanctuary', category: 'nature',
      desc: 'The vast Changthang Cold Desert Wildlife Sanctuary â€” home to kiang, Tibetan wolf, black-necked cranes, and Changpa nomadic settlements.',
      gradient: 'linear-gradient(135deg, #713f12, #a16207)', icon: 'bi-binoculars',
      embedId: '!1m14!1m12!1m3!1d435518.67!2d78.5!3d33.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Sanctuary', 'Changthang', 'Kiang'],
      locations: ['Hanle', 'Nyoma', 'Chumur', 'Korzok', 'Puga Hot Springs'],
      area: '4,000 kmÂ²', elevation: '4,300â€“5,800 m',
    },

    // adventure
    {
      id: 14, title: 'Chadar Trek Route', category: 'adventure',
      desc: 'The legendary frozen river trek on the Zanskar River from Chilling to Nerak. Shows campsites, river sections, and alternate routes.',
      gradient: 'linear-gradient(135deg, #1e3a5f, #4f46e5)', icon: 'bi-snow2',
      embedId: '!1m14!1m12!1m3!1d108879.6!2d77.1!3d33.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Chadar', 'Winter Trek', 'Frozen River'],
      locations: ['Chilling', 'Tilat Sumdo', 'Tibb Cave', 'Deepyokma', 'Nerak', 'Lingshed'],
      area: '62 km', elevation: '3,300â€“3,700 m',
    },
    {
      id: 15, title: 'Markha Valley Trek', category: 'adventure',
      desc: 'One of Ladakh\'s classic multi-day treks through the Markha Valley inside Hemis National Park, crossing Kongmaru La (5,260 m).',
      gradient: 'linear-gradient(135deg, #059669, #10b981)', icon: 'bi-compass',
      embedId: '!1m14!1m12!1m3!1d108879.6!2d77.5!3d33.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Trek', 'Markha', 'Multi-day'],
      locations: ['Spituk', 'Zinchen', 'Yurutse', 'Skiu', 'Markha', 'Hankar', 'Nimaling', 'Kongmaru La'],
      area: '65 km', elevation: '3,400â€“5,260 m',
    },
    {
      id: 16, title: 'Cycling Routes Map', category: 'adventure',
      desc: 'all major cycling routes in Ladakh â€” Manaliâ€“Leh, Srinagarâ€“Leh, Lehâ€“Pangong, and the challenging Lehâ€“Hanle loop. Includes elevation profiles.',
      gradient: 'linear-gradient(135deg, #dc2626, #f97316)', icon: 'bi-bicycle',
      embedId: '!1m14!1m12!1m3!1d435518.67!2d77.5!3d34.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Cycling', 'Endurance', 'Multi-Route'],
      locations: ['Manali', 'Tanglang La', 'Leh', 'Khardung La', 'Chang La', 'Hanle'],
      area: '1,500+ km total', elevation: '1,950â€“5,600 m',
    },

    // Historical
    {
      id: 17, title: 'ancient Silk Route Through Ladakh', category: 'historical',
      desc: 'The historical Silk Road routes that passed through Ladakh connecting Central asia to the Indian subcontinent via the Karakoram Pass and Nubra Valley.',
      gradient: 'linear-gradient(135deg, #92400e, #c8702a)', icon: 'bi-clock-history',
      embedId: '!1m14!1m12!1m3!1d435518.67!2d77.8!3d35.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Silk Road', 'Trade', 'ancient'],
      locations: ['Karakoram Pass', 'Hunder', 'Leh', 'Kargil', 'Baltistan', 'Central asia'],
      area: 'Trans-regional', elevation: '3,500â€“5,578 m',
    },
    {
      id: 18, title: 'Dogra & British Era Forts', category: 'historical',
      desc: 'Locations of military forts and strategic outposts from the Dogra conquest (1834) and British colonial period across Ladakh.',
      gradient: 'linear-gradient(135deg, #7c2d12, #b45309)', icon: 'bi-shield',
      embedId: '!1m14!1m12!1m3!1d435518.67!2d77.0!3d34.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Forts', 'Dogra', 'Colonial'],
      locations: ['Leh Palace', 'Zorawar Fort', 'Basgo', 'Turtuk', 'Dras War Memorial'],
      area: 'Region-wide', elevation: '2,700â€“4,500 m',
    },
    {
      id: 19, title: '1999 Kargil War Locations', category: 'historical',
      desc: 'Key locations from the 1999 Kargil War including Tiger Hill, Tololing, Point 4875, Batalik, and the Kargil War Memorial at Drass.',
      gradient: 'linear-gradient(135deg, #1e3a5f, #dc2626)', icon: 'bi-flag',
      embedId: '!1m14!1m12!1m3!1d217759.3!2d76.1!3d34.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0',
      tags: ['Kargil War', '1999', 'Memorial'],
      locations: ['Tiger Hill', 'Tololing', 'Point 4875', 'Batalik', 'Drass War Memorial'],
      area: 'Kargil sector', elevation: '2,700â€“5,500 m',
    },
  ];

  /* â”€â”€ Key Passes Data â”€â”€ */
  passes = [
    { name: 'Khardung La', elevation: '5,359 m (17,582 ft)', route: 'Leh â†’ Nubra Valley', status: 'Open Junâ€“Oct', gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)' },
    { name: 'Chang La', elevation: '5,360 m (17,590 ft)', route: 'Leh â†’ Pangong Lake', status: 'Open Junâ€“Sep', gradient: 'linear-gradient(135deg, #0c4a6e, #06b6d4)' },
    { name: 'Tanglang La', elevation: '5,328 m (17,480 ft)', route: 'Manaliâ€“Leh Highway', status: 'Open Junâ€“Oct', gradient: 'linear-gradient(135deg, #059669, #10b981)' },
    { name: 'Zoji La', elevation: '3,528 m (11,575 ft)', route: 'Srinagarâ€“Leh Highway', status: 'Open Mayâ€“Nov', gradient: 'linear-gradient(135deg, #1e40af, #3b82f6)' },
    { name: 'Pensi La', elevation: '4,400 m (14,436 ft)', route: 'Kargil â†’ Zanskar', status: 'Open Junâ€“Oct', gradient: 'linear-gradient(135deg, #475264, #64748b)' },
    { name: 'Wari La', elevation: '5,312 m (17,428 ft)', route: 'Leh â†’ Pangong (alt)', status: 'Open Julâ€“Sep', gradient: 'linear-gradient(135deg, #b45309, #f59e0b)' },
  ];

  /* â”€â”€ Elevation Profile Data â”€â”€ */
  elevationProfiles = [
    { name: 'Manaliâ€“Leh', distance: '479 km', days: '2 days', maxAlt: '5,328 m', color: '#059669',
      points: [
        { km: 0, alt: 1950, label: 'Manali' },
        { km: 51, alt: 3978, label: 'Rohtang' },
        { km: 115, alt: 3080, label: 'Keylong' },
        { km: 222, alt: 4890, label: 'Baralacha' },
        { km: 260, alt: 4250, label: 'Sarchu' },
        { km: 335, alt: 4600, label: 'Pang' },
        { km: 395, alt: 5328, label: 'Tanglang La' },
        { km: 420, alt: 3800, label: 'Upshi' },
        { km: 479, alt: 3500, label: 'Leh' },
      ]
    },
    { name: 'Srinagarâ€“Leh', distance: '434 km', days: '2 days', maxAlt: '3,528 m', color: '#1e40af',
      points: [
        { km: 0, alt: 1585, label: 'Srinagar' },
        { km: 80, alt: 2740, label: 'Sonamarg' },
        { km: 108, alt: 3528, label: 'Zoji La' },
        { km: 148, alt: 3280, label: 'Drass' },
        { km: 204, alt: 2676, label: 'Kargil' },
        { km: 310, alt: 3506, label: 'Fotu La' },
        { km: 328, alt: 3390, label: 'Lamayuru' },
        { km: 390, alt: 3100, label: 'Khalsi' },
        { km: 434, alt: 3500, label: 'Leh' },
      ]
    },
  ];

  /* â”€â”€ Computed â”€â”€ */
  filteredMaps = computed(() => {
    const cat = this.activeCategory();
    return cat === 'all' ? this.maps : this.maps.filter(m => m.category === cat);
  });

  /* â”€â”€ Methods â”€â”€ */
  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }

  openMap(item: MapItem) {
    this.activeMap.set(item);
    const url = `https://www.google.com/maps/embed?pb=${item.embedId}`;
    this.activeEmbed.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }

  closeMap() {
    this.activeMap.set(null);
    this.activeEmbed.set(null);
  }

  onEscape() {
    if (this.activeMap()) this.closeMap();
  }

  getCategoryCount(cat: string): number {
    if (cat === 'all') return this.maps.length;
    return this.maps.filter(m => m.category === cat).length;
  }

  /* SVG elevation helpers */
  getElevationPath(profile: any): string {
    const pts = profile.points;
    const maxKm = pts[pts.length - 1].km;
    const maxAlt = 6000;
    const w = 700, h = 200;
    let d = `M 0 ${h}`;
    for (const p of pts) {
      const x = (p.km / maxKm) * w;
      const y = h - (p.alt / maxAlt) * h;
      d += ` L ${x} ${y}`;
    }
    d += ` L ${w} ${h} Z`;
    return d;
  }

  getElevationLine(profile: any): string {
    const pts = profile.points;
    const maxKm = pts[pts.length - 1].km;
    const maxAlt = 6000;
    const w = 700, h = 200;
    let d = '';
    for (let i = 0; i < pts.length; i++) {
      const x = (pts[i].km / maxKm) * w;
      const y = h - (pts[i].alt / maxAlt) * h;
      d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    }
    return d;
  }

  getPointX(profile: any, point: any): number {
    const pts = profile.points;
    const maxKm = pts[pts.length - 1].km;
    return (point.km / maxKm) * 700;
  }

  getPointY(point: any): number {
    return 200 - (point.alt / 6000) * 200;
  }
}

interface MapItem {
  id: number;
  title: string;
  category: string;
  desc: string;
  gradient: string;
  icon: string;
  embedId: string;
  tags: string[];
  locations: string[];
  area: string;
  elevation: string;
}




