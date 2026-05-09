import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LeafletMapComponent } from '../../shared/leaflet-map/leaflet-map';

interface GalleryItem {
  title: string;
  image: string;
  desc: string;
}

interface PassData {
  slug: string;
  name: string;
  altitude: string;
  altitudeMetres: string;
  road: string;
  status: string;
  gradient: string;
  image: string;
  heroImage: string;
  location: string;
  coordinates: string;
  lat: number; lng: number; zoom?: number;
  openSeason: string;
  distance: string;
  desc: string;
  overview: string;
  history: string;
  highlights: { label: string; detail: string }[];
  gallery: GalleryItem[];
  videoTitle: string;
  videoDesc: string;
  tips: string[];
  nearbyAttractions: string[];
}

@Component({
  selector: 'app-pass-detail',
  imports: [RouterLink, LeafletMapComponent],
  templateUrl: './pass-detail.html',
  styleUrl: './pass-detail.scss',
})
export class PassDetail {
  private route = inject(ActivatedRoute);

  activeTab = signal<string>('overview');
  pass = signal<PassData | null>(null);

  setTab(tab: string) {
    this.activeTab.set(tab);
  }

  passes: PassData[] = [
    {
      slug: 'khardung-la',
      name: 'Khardung La',
      altitude: '18,380 ft',
      altitudeMetres: '5,602 m',
      road: 'Leh â†’ Nubra Valley',
      status: 'Motorable (Jun–Oct)',
      gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
      location: 'Between Leh and Nubra Valley',
      coordinates: '34.2818Âa N, 77.6025Âa E',
      lat: 34.2818, lng: 77.6025, zoom: 14,
      openSeason: 'June – October',
      distance: '39 km from Leh',
      desc: 'Gateway to the Nubra Valley and Siachen, one of the highest motorable passes in the world.',
      overview:
        'Khardung La is one of the highest motorable passes in the world, serving as the gateway to the Nubra Valley, Siachen Glacier, and the Shyok River basin. Located 39 km from Leh on the old caravan route to Central Asia, the pass is maintained by the Border Roads Organisation (BRO). Every year thousands of motorcyclists and adventurers make the pilgrimage to this iconic pass, which rewards them with sweeping views of the Karakoram and Ladakh ranges. The road from Leh climbs through South Pullu checkpoint, ascending relentlessly through barren switchbacks before cresting at the famous signboard that proclaims it the "highest motorable road in the world." While the exact altitude is debated (actual GPS surveys suggest ~5,359 m), the experience remains unmatched.',
      history:
        'Khardung La has been a strategically vital pass for centuries, forming part of the ancient caravan trade route connecting Leh to Kashgar via the Karakoram Pass. During the Silk Road era, traders with laden yak and horse caravans crossed this pass to reach the markets of Central Asia. In modern times, the pass gained tremendous military significance during the Indo-Pakistani conflicts and the Siachen Glacier dispute. The Indian army built the motorable road in 1976 to supply the Siachen base camp, the world\'s highest battlefield. Since then it has been maintained year-round by the BRO and Indian army, and became a bucket-list destination for motorcyclists and travelers from the 1990s onward.',
      highlights: [
        { label: 'World\'s Highest Road', detail: 'Claimed as one of the highest motorable passes globally — iconic signboard at the top' },
        { label: 'Siachen Gateway', detail: 'The only road access to the Siachen Glacier — the world\'s highest battlefield' },
        { label: 'Biker\'s Mecca', detail: 'One of India\'s most iconic motorcycle rides, featured in countless travel stories' },
        { label: 'Panoramic Views', detail: '360Âa views of the Karakoram Range, Stok Range, and Zanskar mountains' },
      ],
      gallery: [
        { title: 'Summit Signboard', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', desc: 'The famous signboard declaring Khardung La the highest motorable pass' },
        { title: 'Switchback Climb', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', desc: 'The dramatic hairpin bends ascending from South Pullu to the summit' },
        { title: 'Snow-Capped Panorama', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', desc: 'Views of the Karakoram range from the top of Khardung La' },
        { title: 'Prayer Flags', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', desc: 'Colourful prayer flags fluttering at the pass summit against blue sky' },
      ],
      image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      videoTitle: 'Khardung La — The Highest Road',
      videoDesc: 'Experience the legendary ride up Khardung La — from Leh through barren switchbacks to the roof of the motoring world.',
      tips: [
        'Start early morning (6–7 aM) to avoid afternoon clouds and traffic',
        'Carry warm clothing — temperatures drop below 0ÂaC even in summer',
        'Don\'t spend more than 20–30 minutes at the top due to low oxygen',
        'Fuel up in Leh — no petrol stations between Leh and Nubra',
        'Inner Line Permit (ILP) required — carry printed/digital copies',
      ],
      nearbyAttractions: ['Nubra Valley', 'Diskit Monastery', 'Hunder Sand Dunes', 'Siachen Base Camp', 'Turtuk Village'],
    },
    {
      slug: 'chang-la',
      name: 'Chang La',
      altitude: '17,688 ft',
      altitudeMetres: '5,390 m',
      road: 'Leh â†’ Pangong Tso',
      status: 'Motorable (Jun–Sep)',
      gradient: 'linear-gradient(135deg, #0c4a6e, #06b6d4)',
      location: 'Between Leh and Pangong Lake',
      coordinates: '34.0467Âa N, 77.7800Âa E',
      lat: 34.0467, lng: 77.7800, zoom: 13,
      openSeason: 'June – September',
      distance: '60 km from Leh',
      desc: 'The route to Pangong Lake, maintained by the Indian army. Third highest motorable pass in India.',
      overview:
        'Chang La is the gateway to the world-famous Pangong Tso (lake), connecting Leh to the Changthang Plateau. Maintained by the Indian army, it is one of the most traversed high-altitude passes in Ladakh. The pass sits on the route to both Pangong Lake and the strategic areas near the Line of actual Control (LaC) with China. The Chang La Baba temple at the summit, dedicated to a legendary Indian army soldier, is a spiritual landmark where travelers stop to pay respects. The descent from Chang La towards Pangong reveals one of the most stunning landscapes on Earth — a gradual transition from barren mountains to the impossibly blue waters of Pangong Tso.',
      history:
        'Chang La has been a crucial strategic route since the 1962 Sino-Indian War, when the Indian army established permanent positions along the Pangong Lake frontier. The road was built and has been continuously maintained by the Indian army and BRO to support forward military posts near the LaC. The pass gained international fame after the Bollywood film "3 Idiots" (2009) showcased Pangong Lake, leading to an explosion in tourist traffic. The Chang La Baba temple was built in memory of an army personnel who is believed to have guided lost soldiers in snowstorms — his spirit is revered by both military and civilians.',
      highlights: [
        { label: 'Pangong Gateway', detail: 'The primary route to the world-famous Pangong Tso — the iconic blue lake' },
        { label: 'Chang La Baba Temple', detail: 'Spiritual temple at the summit dedicated to a legendary Indian army soldier' },
        { label: 'army Maintained', detail: 'One of the best-maintained high passes thanks to Indian army engineering' },
        { label: 'Changthang access', detail: 'Gateway to the vast Changthang Plateau and its nomadic Changpa communities' },
      ],
      gallery: [
        { title: 'Summit Gateway', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', desc: 'The Chang La summit with military installations and prayer flags' },
        { title: 'Baba Temple', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', desc: 'The Chang La baba temple where travelers stop to pay respects' },
        { title: 'Mountain Road', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', desc: 'The winding road ascending through barren landscapes to Chang La' },
        { title: 'Pangong approach', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', desc: 'The dramatic descent revealing the first glimpse of Pangong Tso' },
      ],
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=1600',
      videoTitle: 'Chang La — Gateway to Pangong',
      videoDesc: 'Journey over Chang La pass and witness the magical first view of Pangong Lake\'s impossible blue waters.',
      tips: [
        'Carry aMS medication — altitude sickness is common at 17,600+ ft',
        'Hot tea and Maggi available at the army canteen at the top',
        'Road conditions vary — expect snow patches even in July',
        'Inner Line Permit mandatory — checked at Karu checkpoint',
        'Start early to reach Pangong before sunset for the best colours',
      ],
      nearbyAttractions: ['Pangong Tso', 'Spangmik Village', 'Changthang Plateau', 'Tangtse Village', 'Durbuk Village'],
    },
    {
      slug: 'tanglang-la',
      name: 'Tanglang La',
      altitude: '17,582 ft',
      altitudeMetres: '5,328 m',
      road: 'Manali–Leh Highway',
      status: 'Motorable (Jun–Oct)',
      gradient: 'linear-gradient(135deg, #059669, #10b981)',
      location: 'Between Pang and Upshi, Manali–Leh Highway',
      coordinates: '33.5833Âa N, 77.5785Âa E',
      lat: 33.5833, lng: 77.5785, zoom: 13,
      openSeason: 'June – October',
      distance: '175 km from Leh',
      desc: 'Second highest pass on the Manali–Leh Highway, offers panoramic views of the Zanskar range.',
      overview:
        'Tanglang La is the highest point on the legendary Manali–Leh Highway and the second highest motorable pass in the world on a major highway. The final ascent climbs from the surreal high-altitude plateau of Pang (at 15,280 ft) through a series of switchbacks to the summit. at the top, travelers are greeted by a solitary signboard, fluttering prayer flags, and a vast panorama of the Zanskar Range stretching endlessly in every direction. The descent toward Upshi and eventually Leh takes you through the More Plains — a flat, otherworldly expanse at over 15,000 ft that feels like riding on the roof of the world.',
      history:
        'The Manali–Leh Highway was built by the Border Roads Organisation in the 1960s-70s as a strategic military route, and Tanglang La was one of the most challenging sections to construct due to extreme altitude and weather. For decades, it was officially considered the second highest motorable pass in the world. The highway is closed from October to June every year due to heavy snowfall, and BRO crews work tirelessly each spring to clear the road. With the construction of the atal Tunnel under Rohtang Pass (opened 2020), the Manali approach has become significantly easier, but Tanglang La remains as challenging and spectacular as ever.',
      highlights: [
        { label: 'Highway Summit', detail: 'Highest point on India\'s most legendary highway — the Manali–Leh route' },
        { label: 'More Plains', detail: 'Descent through the surreal More Plains — a flat expanse at 15,000 ft' },
        { label: 'Zanskar Panorama', detail: 'Sweeping 360Âa views of the Zanskar Range from the summit' },
        { label: 'atal Tunnel Link', detail: 'Now more accessible thanks to the atal Tunnel under Rohtang Pass' },
      ],
      gallery: [
        { title: 'Summit View', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', desc: 'The Tanglang La summit with the Zanskar Range stretching to the horizon' },
        { title: 'Highway Switchbacks', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', desc: 'The dramatic hairpin bends ascending from Pang to the summit' },
        { title: 'More Plains', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', desc: 'The surreal flat expanse of the More Plains at 15,000 ft' },
        { title: 'Prayer Flags', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', desc: 'Prayer flags at the pass summit with snow-capped peaks behind' },
      ],
      image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      videoTitle: 'Tanglang La — Roof of the Highway',
      videoDesc: 'The highest point on the Manali–Leh Highway — switchbacks, prayer flags, and endless Zanskar views.',
      tips: [
        'Carry extra fuel — Pang to Upshi has no fuel stations',
        'acclimatize at Sarchu or Pang before attempting the pass',
        'Weather changes rapidly — carry rain gear and warm layers',
        'The road from Pang is steep — low-gear driving recommended',
        'Best reached as part of a 2-day Manali–Leh journey with halt at Sarchu or Pang',
      ],
      nearbyAttractions: ['More Plains', 'Pang Camp', 'Upshi Village', 'Rumtse Village', 'Hemis National Park'],
    },
    {
      slug: 'lachalung-la',
      name: 'Lachalung La',
      altitude: '16,598 ft',
      altitudeMetres: '5,059 m',
      road: 'Manali–Leh Highway',
      status: 'Motorable (Jun–Oct)',
      gradient: 'linear-gradient(135deg, #dc2626, #f87171)',
      location: 'Between Sarchu and Pang, Manali–Leh Highway',
      coordinates: '32.9944Âa N, 77.1631Âa E',
      lat: 32.9944, lng: 77.1631, zoom: 13,
      openSeason: 'June – October',
      distance: '265 km from Leh',
      desc: 'Located near the famous Gata Loops with 21 hairpin bends, a thrilling driving experience.',
      overview:
        'Lachalung La is one of the most exhilarating passes on the Manali–Leh Highway, approached via the legendary Gata Loops — a series of 21 consecutive hairpin bends that zigzag up the mountainside in a breathtaking display of road engineering. The climb from Sarchu through the Gata Loops to Lachalung La is considered one of the most thrilling driving experiences in the Himalayas. at the top, the landscape opens into a stark, barren moonscape. a small memorial cairn at the pass honours a BRO worker who lost his life maintaining this road, reminding travelers of the human sacrifice behind these highways.',
      history:
        'The Gata Loops and Lachalung La section was one of the most technically challenging stretches for BRO engineers to build on the Manali–Leh Highway. The Gata Loops — 21 numbered hairpin bends climbing nearly 1,500 ft — were carved into the mountainside through years of blasting and manual labor in extreme conditions. a poignant memorial near the 17th loop marks the grave of a BRO worker who died during construction, becoming a revered landmark. The road is rebuilt each year after winter ravages, and BRO crews are among the unsung heroes of Ladakh\'s accessibility.',
      highlights: [
        { label: '21 Gata Loops', detail: 'Legendary 21 consecutive hairpin bends — one of India\'s most thrilling drives' },
        { label: 'BRO Memorial', detail: 'Poignant memorial to road workers who gave their lives building this highway' },
        { label: 'Moonscape Summit', detail: 'Stark, barren lunar landscape at the pass summit' },
        { label: 'Engineering Marvel', detail: 'One of the most impressive feats of mountain road engineering in India' },
      ],
      gallery: [
        { title: 'Gata Loops aerial', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', desc: 'The 21 numbered hairpin bends of the Gata Loops from above' },
        { title: 'Pass Summit', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', desc: 'Barren moonscape landscape at the top of Lachalung La' },
        { title: 'BRO Memorial', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', desc: 'The memorial cairn honouring road workers at the 17th loop' },
        { title: 'Mountain Drive', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', desc: 'Vehicles navigating the steep switchbacks through the Gata Loops' },
      ],
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=1600',
      videoTitle: 'Lachalung La & The Gata Loops',
      videoDesc: 'Navigate the legendary 21 hairpin bends of the Gata Loops and crest the moonscape summit of Lachalung La.',
      tips: [
        'Take the Gata Loops slowly — sharp turns with steep drops',
        'Best experienced driving uphill (Sarchu â†’ Pang direction) for the full thrill',
        'altitude sickness can hit suddenly — carry Diamox and stay hydrated',
        'Night camping at Sarchu (lower altitude) recommended before crossing',
        'BRO signboards along the route are famously witty — enjoy them!',
      ],
      nearbyAttractions: ['Sarchu', 'Pang Camp', 'Nakee La', 'Whiskey Nala', 'Brandy Nala'],
    },
    {
      slug: 'baralacha-la',
      name: 'Baralacha La',
      altitude: '16,017 ft',
      altitudeMetres: '4,883 m',
      road: 'Manali–Leh Highway',
      status: 'Motorable (Jun–Oct)',
      gradient: 'linear-gradient(135deg, #b45309, #f59e0b)',
      location: 'Between Keylong and Sarchu, Lahaul–Ladakh border',
      coordinates: '32.7500Âa N, 77.0167Âa E',
      lat: 32.7500, lng: 77.0167, zoom: 13,
      openSeason: 'June – October',
      distance: '325 km from Leh',
      desc: 'The boundary between Lahaul (Himachal) and Ladakh, source of the Bhaga and Yunam rivers.',
      overview:
        'Baralacha La marks the natural boundary between Lahaul (Himachal Pradesh) and Ladakh, and is the source of both the Bhaga and Yunam rivers. The pass sits at the junction of three mountain ranges — the Pir Panjal, the Great Himalayan Range, and the Zanskar Range — making it a geographical marvel. Near the summit lies the pristine Suraj Tal (Sun Lake), one of the highest lakes in India at 16,040 ft, with impossibly blue waters surrounded by snow-covered peaks. The pass is often the first major altitude challenge for travelers on the Manali–Leh route after crossing the atal Tunnel and Keylong.',
      history:
        'Baralacha La has been an important trade crossing for over a thousand years, connecting the Chandra valley of Lahaul with the markets of Ladakh and Central Asia. ancient trade caravans carrying wool, salt, spices, and precious stones crossed this pass regularly. The name "Baralacha" is believed to derive from the Tibetan word for a crossroads, reflecting its position at the meeting point of three valleys. During the British Raj, the pass was surveyed and documented as part of the Great Trigonometric Survey of India. Today it remains a critical point on the Manali–Leh Highway, and the Suraj Tal nearby has become a popular photography destination.',
      highlights: [
        { label: 'Three-Range Junction', detail: 'Sits at the meeting point of the Pir Panjal, Great Himalayan, and Zanskar ranges' },
        { label: 'Suraj Tal', detail: 'One of India\'s highest lakes (16,040 ft) with crystal-blue waters near the summit' },
        { label: 'River Source', detail: 'Source of both the Bhaga and Yunam rivers — a hydrological wonder' },
        { label: 'ancient Trade Route', detail: 'Thousand-year-old crossing connecting Lahaul, Ladakh, and Central Asia' },
      ],
      gallery: [
        { title: 'Suraj Tal', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', desc: 'The pristine blue waters of Suraj Tal near the Baralacha La summit' },
        { title: 'Pass Summit', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', desc: 'Snow-dusted summit of Baralacha La with prayer flags and signboard' },
        { title: 'Mountain Panorama', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', desc: 'The junction of three mountain ranges visible from the pass' },
        { title: 'Road approach', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', desc: 'The highway winding through barren valleys toward the pass' },
      ],
      image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1600',
      videoTitle: 'Baralacha La & Suraj Tal',
      videoDesc: 'Cross the ancient three-range junction and discover the pristine Suraj Tal — one of India\'s highest lakes.',
      tips: [
        'Stop at Suraj Tal for photos — it\'s right beside the road',
        'Keylong (last town with amenities) is the best place to refuel and rest before the pass',
        'Snow can block the road well into June — check BRO opening status',
        'Water crossings (nala crossings) common near the pass — high-clearance vehicle recommended',
        'Best combined with an overnight halt at Sarchu on the other side',
      ],
      nearbyAttractions: ['Suraj Tal', 'Deepak Tal', 'Keylong', 'Jispa', 'Sarchu'],
    },
    {
      slug: 'wari-la',
      name: 'Wari La',
      altitude: '17,352 ft',
      altitudeMetres: '5,290 m',
      road: 'Leh â†’ Nubra Valley (alt)',
      status: 'Motorable (Jul–Sep)',
      gradient: 'linear-gradient(135deg, #475264, #64748b)',
      location: 'alternative Leh–Nubra route via Sakti',
      coordinates: '34.2381Âa N, 77.7925Âa E',
      lat: 34.2381, lng: 77.7925, zoom: 13,
      openSeason: 'July – September',
      distance: '85 km from Leh via Sakti',
      desc: 'alternative route to Nubra Valley, less crowded than Khardung La but more adventurous.',
      overview:
        'Wari La is the road less traveled — an alternative route to Nubra Valley that bypasses the famous Khardung La. While Khardung La draws thousands of tourists, Wari La sees only a handful of adventurous travelers each day, offering a raw, unfiltered Ladakhi experience. The route goes via Sakti village and Pangong Lake road before branching off towards a rough, unpaved track that climbs steeply to the summit. The reward is complete solitude, untouched landscapes, and a genuine sense of adventure. The road conditions are rougher than Khardung La, with sections of loose gravel and seasonal water crossings, making it ideal for experienced drivers and motorcyclists seeking a challenge.',
      history:
        'Wari La was historically used by local Ladakhi traders and herders as an alternative crossing between the Indus Valley and the Shyok/Nubra regions when Khardung La was blocked by snow. Unlike Khardung La which received major military investment, Wari La remained a village-level track for centuries. Only in recent years has the road been partially improved by BRO, though it remains significantly rougher than the Khardung La route. The pass has gained a cult following among off-road enthusiasts and motorcycle adventurers seeking the authentic Ladakh experience away from tourist crowds.',
      highlights: [
        { label: 'Road Less Traveled', detail: 'Only a handful of vehicles per day — total solitude guaranteed' },
        { label: 'Off-Road adventure', detail: 'Rough, unpaved sections ideal for motorcyclists and 4Ã—4 enthusiasts' },
        { label: 'Untouched Landscape', detail: 'Raw, unfiltered mountain scenery without tourist infrastructure' },
        { label: 'Khardung La Bypass', detail: 'alternative route to Nubra avoiding the crowded Khardung La' },
      ],
      gallery: [
        { title: 'Remote Summit', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', desc: 'The solitary Wari La summit — no cafes, no crowds, just mountains' },
        { title: 'Rough Track', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', desc: 'The unpaved route winding through untouched high-altitude terrain' },
        { title: 'Sakti Valley', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', desc: 'The approach through Sakti village with green fields and mountains' },
        { title: 'Panoramic Solitude', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', desc: 'The vast empty landscape visible from the pass summit' },
      ],
      image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      videoTitle: 'Wari La — The Road Less Traveled',
      videoDesc: 'an off-road adventure over Ladakh\'s most solitary high pass — the alternative route to Nubra Valley.',
      tips: [
        'Suitable only for experienced drivers — 4WD or high-clearance bikes recommended',
        'No amenities or fuel for the entire stretch — carry everything you need',
        'Road may be closed earlier than Khardung La — check locally before attempting',
        'Best done Leh â†’ Nubra (uphill is safer than downhill on loose gravel)',
        'Inform someone of your travel plans — mobile coverage is non-existent',
      ],
      nearbyAttractions: ['Nubra Valley', 'Sakti Village', 'Chemrey Monastery', 'Takthok Monastery', 'Pangong Road Junction'],
    },
    {
      slug: 'fotu-la',
      name: 'Fotu La',
      altitude: '13,479 ft',
      altitudeMetres: '4,108 m',
      road: 'Srinagar–Leh Highway',
      status: 'Motorable (May–Nov)',
      gradient: 'linear-gradient(135deg, #1e40af, #3b82f6)',
      location: 'Between Lamayuru and Khalsi, Srinagar–Leh Highway',
      coordinates: '34.2528Âa N, 76.5850Âa E',
      lat: 34.2528, lng: 76.5850, zoom: 13,
      openSeason: 'May – November',
      distance: '145 km from Leh',
      desc: 'Highest point on the Srinagar–Leh Highway, near the famous Lamayuru Monastery.',
      overview:
        'Fotu La is the highest point on the Srinagar–Leh Highway (NH 1), the historic National Highway connecting Kashmir to Ladakh. Unlike the extreme-altitude passes on the Manali–Leh route, Fotu La is a more gentle crossing that is accessible to ordinary vehicles. The pass sits between the Wakha Valley and the Lamayuru moonscape region, offering views of rocky, arid mountains on both sides. Just a short detour from the pass leads to the extraordinary Lamayuru Monastery, one of the oldest and most dramatically situated monasteries in Ladakh, perched on surreal eroded clay formations.',
      history:
        'The Srinagar–Leh Highway, passing through Fotu La, is the older and historically more important of the two highway approaches to Ladakh. This route has been used for over a thousand years as part of the ancient trade network connecting Kashmir to Central Asia via Ladakh. The modern highway was built in the mid-20th century and became India\'s primary supply route to Ladakh. During the 1999 Kargil War, this highway was the lifeline for the Indian military, with convoys passing over Fotu La daily. The road is now being significantly upgraded with tunnels planned at Zoji La and other points to make it an all-weather route.',
      highlights: [
        { label: 'Historic Highway', detail: 'Highest point on NH-1, the ancient route connecting Kashmir to Ladakh' },
        { label: 'Lamayuru Gateway', detail: 'Just minutes from the spectacular Lamayuru Moonland Monastery' },
        { label: 'Gentle Crossing', detail: 'accessible to ordinary vehicles — no extreme altitude challenges' },
        { label: 'Kargil War Route', detail: 'Critical military supply route during the 1999 Kargil conflict' },
      ],
      gallery: [
        { title: 'Highway Summit', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', desc: 'The Fotu La summit on the Srinagar–Leh Highway with signboard' },
        { title: 'Moonland View', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', desc: 'The surreal Lamayuru moonscape visible from near the pass' },
        { title: 'Mountain Road', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', desc: 'The well-maintained highway winding through rocky Ladakhi terrain' },
        { title: 'Valley Panorama', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', desc: 'Views of the Wakha Valley from the Fotu La summit' },
      ],
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=1600',
      videoTitle: 'Fotu La — The Historic Crossing',
      videoDesc: 'Cross the highest point on the Srinagar–Leh Highway and descend into the Lamayuru moonscape.',
      tips: [
        'Much more accessible than Manali–Leh passes — suitable for all vehicles',
        'Combine with a stop at Lamayuru Monastery (10 minutes detour)',
        'Tea stalls available at the summit in peak season',
        'The Srinagar–Leh route is a 2-day journey — halt at Kargil or Mulbekh',
        'Open much longer (May–Nov) than the Manali–Leh passes',
      ],
      nearbyAttractions: ['Lamayuru Monastery', 'Moonland Viewpoint', 'alchi Monastery', 'Khalsi Village', 'Wanla Monastery'],
    },
    {
      slug: 'zoji-la',
      name: 'Zoji La',
      altitude: '11,578 ft',
      altitudeMetres: '3,528 m',
      road: 'Srinagar–Leh Highway',
      status: 'Motorable (May–Nov)',
      gradient: 'linear-gradient(135deg, #0f766e, #2dd4bf)',
      location: 'Between Sonamarg (Kashmir) and Drass (Ladakh)',
      coordinates: '34.2833Âa N, 75.4833Âa E',
      lat: 34.2833, lng: 75.4833, zoom: 13,
      openSeason: 'May – November',
      distance: '234 km from Leh',
      desc: 'The gateway to Ladakh from Kashmir. The Zoji La tunnel (under construction) will make it all-weather.',
      overview:
        'Zoji La is the first — and most dramatic — pass that travelers encounter on the Srinagar–Leh Highway. Though comparatively low in altitude at 11,578 ft, Zoji La is considered one of the most dangerous mountain passes in India due to its extreme weather, narrow road, steep drops, and avalanche-prone terrain. The pass marks the geographical boundary between the lush green Kashmir Valley and the arid, stark landscape of Ladakh. On one side lies the flower-filled meadows of Sonamarg ("Meadow of Gold"), and on the other, the bleak terrain of Drass — the second coldest inhabited place on Earth. The under-construction Zoji La tunnel (14.15 km), when completed, will provide all-weather connectivity to Ladakh for the first time in history.',
      history:
        'Zoji La has been the primary gateway to Ladakh from Kashmir for over a millennium, crossed by armies, traders, missionaries, and pilgrims throughout history. During the First Kashmir War (1947–48), the Battle of Zoji La was one of the most critical engagements — Indian forces used tanks at this altitude for the first time in military history to recapture the pass from Pakistani forces, securing Ladakh for India. The Zoji La tunnel project, approved in 2018 and expected to be asia\'s longest bi-directional tunnel, will transform Ladakh\'s connectivity by eliminating the annual 6-month road closure. The tunnel is being built at an estimated cost of Rs.6,800 crore.',
      highlights: [
        { label: 'Gateway to Ladakh', detail: 'The first pass on the Srinagar route — the threshold between Kashmir and Ladakh' },
        { label: '1947 Battle Site', detail: 'Historic site of the Battle of Zoji La — tanks used at altitude for the first time' },
        { label: 'Zoji La Tunnel', detail: 'asia\'s longest bi-directional tunnel (14.15 km) under construction — all-weather access' },
        { label: 'Climate Boundary', detail: 'The dividing line between green Kashmir and arid Ladakh — visible in real time' },
      ],
      gallery: [
        { title: 'Pass Summit', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', desc: 'The narrow, winding road at the Zoji La summit with dramatic drops' },
        { title: 'Sonamarg approach', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', desc: 'The lush green meadows of Sonamarg before the climb to Zoji La' },
        { title: 'Tunnel Construction', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', desc: 'The massive Zoji La tunnel project that will transform Ladakh\' connectivity' },
        { title: 'Drass Valley', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', desc: 'The stark landscape of Drass — second coldest inhabited place on Earth — beyond the pass' },
      ],
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1600',
      videoTitle: 'Zoji La — The Gateway Pass',
      videoDesc: 'Cross the legendary gateway from green Kashmir to arid Ladakh — and see the tunnel that will change everything.',
      tips: [
        'The road is narrow with sheer drops — experienced drivers only during bad weather',
        'Check BRO road status before starting — the pass closes frequently for maintenance',
        'Sonamarg is the best base camp on the Kashmir side — beautiful meadows and hotels',
        'Traffic runs one-way during peak hours — know the schedule before starting',
        'Winter closure typically November–May, but varies — check with BRO',
      ],
      nearbyAttractions: ['Sonamarg', 'Drass War Memorial', 'Thajiwas Glacier', 'Baltal Valley', 'Kargil'],
    },
  ];

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug');
    const found = this.passes.find(p => p.slug === slug);
    this.pass.set(found ?? null);
  }
}




