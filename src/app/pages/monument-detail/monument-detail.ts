import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LeafletMapComponent } from '../../shared/leaflet-map/leaflet-map';

interface Monument {
  slug: string; name: string; year: number; builder: string; style: string;
  icon: string; image: string; heroImage: string; location: string; altitude: string;
  significance: string; visitingHours: string; entryFee: string;
  desc: string; overview: string;
  highlights: { label: string; detail: string }[];
  gallery: { title: string; image: string; desc: string }[];
  videoTitle: string; videoDesc: string;
  lat: number; lng: number; zoom?: number;
  nearbyAttractions: string[];
}

@Component({
  selector: 'app-monument-detail',
  imports: [RouterLink, LeafletMapComponent],
  templateUrl: './monument-detail.html',
  styleUrl: './monument-detail.scss',
})
export class MonumentDetail {
  private route = inject(ActivatedRoute);

  activeTab = signal<string>('overview');
  monument = signal<Monument | null>(null);

  setTab(tab: string) {
    this.activeTab.set(tab);
  }

  monuments: Monument[] = [
    {
      slug: 'leh-palace', name: 'Leh Palace', year: 1616, builder: 'Sengge Namgyal', style: 'Tibetan Gompa',
      icon: 'bi-bank2', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      location: 'Leh, Ladakh', altitude: '3,524m (11,562 ft)',
      desc: 'a 9-storey royal palace modelled after the Potala Palace in Lhasa, overlooking the town of Leh.',
      significance: 'UNESCO tentative list. The palace served as the royal residence of the Namgyal dynasty until the Dogra takeover in 1846. It remains the most iconic landmark of Leh.',
      lat: 34.1662, lng: 77.5855, zoom: 15,
      visitingHours: '7:00 aM â€“ 4:00 PM (aprilâ€“October)', entryFee: 'â‚¹30 (Indian), â‚¹100 (Foreign)',
      overview: 'Leh Palace, locally known as "Lachen Palkar," is a former royal palace overlooking the town of Leh in Ladakh, India. Built in the 17th century by King Sengge Namgyal, it bears a striking resemblance to the Potala Palace in Lhasa, Tibet. The nine-storey structure was home to the royal family until the Dogra forces took control in the mid-19th century. Though partially in ruins, the palace stands as a majestic symbol of Ladakh\'s royal past. The archaeological Survey of India has been undertaking restoration work, and the top floors offer breathtaking panoramic views of the Stok Kangri range and the Zanskar mountains.',
      highlights: [
        { label: 'architecture', detail: '9 storeys of rammed-earth construction with wooden balconies and Tibetan-style sloping walls' },
        { label: 'Museum Collection', detail: 'Houses ornaments, ceremonial dresses, crowns, and thangka paintings of the Namgyal dynasty' },
        { label: 'Panoramic Views', detail: '360Âa views of Leh town, Stok Kangri (6,153m), and the Indus Valley from the rooftop' },
        { label: 'Namgyal Tsemo', detail: 'Connected to the Namgyal Tsemo Monastery perched on the hill above with a giant Buddha statue' },
      ],
      gallery: [
        { title: 'Palace Facade at Sunrise', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', desc: 'The 9-storey rammed-earth facade glowing in early morning light against the Himalayas.' },
        { title: 'Interior Murals & Thangkas', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', desc: 'ancient Buddhist wall paintings and thangka art preserved in the inner chambers.' },
        { title: 'Rooftop Panorama', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', desc: 'Sweeping 360Âa views of Leh town, Stok Kangri peak, and the Indus Valley.' },
        { title: 'Namgyal Tsemo above', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', desc: 'The monastery and victory fort crowning the hill directly above the palace ruins.' },
      ],
      videoTitle: 'aerial Tour of Leh Palace',
      videoDesc: 'a breathtaking drone flyover capturing the nine-storey palace against the backdrop of the Karakoram range, revealing the ancient architecture and surrounding landscape of old Leh town.',
      nearbyAttractions: ['Namgyal Tsemo Monastery', 'Leh Old Town', 'Shanti Stupa', 'Central asian Museum'],
    },
    {
      slug: 'hemis-monastery', name: 'Hemis Monastery', year: 1630, builder: 'Sengge Namgyal', style: 'Buddhist Monastery',
      icon: 'bi-building', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=1600',
      location: 'Hemis, 45 km south of Leh', altitude: '3,610m (11,844 ft)',
      desc: 'The largest and wealthiest monastery in Ladakh, famous for the annual Hemis Tsechu masked dance festival.',
      significance: 'Home to the Drukpa Kagyu lineage. Houses the largest thangka in Ladakh, displayed once every 12 years. The monastery controls the Hemis National Park â€” India\'s largest national park and a snow leopard habitat.',
      lat: 33.9142, lng: 77.7028, zoom: 14,
      visitingHours: '8:00 aM â€“ 6:00 PM (all Year)', entryFee: 'â‚¹50 (Indian), â‚¹200 (Foreign)',
      overview: 'Hemis Monastery is the most famous and largest monastery in Ladakh, belonging to the Drukpa Kagyu school of Tibetan Buddhism. Founded in 1630 under the patronage of King Sengge Namgyal, it was re-established on the site of an earlier 11th-century monastery. The complex is nestled in a gorge that hides it from view until you are almost upon it â€” a strategic design for protection. Hemis is best known for the annual Hemis Tsechu festival, a vibrant two-day celebration of Guru Padmasambhava\'s birth anniversary featuring elaborate masked dances (Cham). Every 12 years, the monastery\'s most sacred treasure â€” a giant thangka of Guru Padmasambhava embroidered with pearls â€” is unfurled for public viewing.',
      highlights: [
        { label: 'Hemis Festival', detail: 'annual masked Cham dance festival celebrating Guru Padmasambhava, attracting visitors worldwide' },
        { label: 'Giant Thangka', detail: 'The largest thangka in Ladakh, embroidered with pearls, displayed once every 12 years (next: 2028)' },
        { label: 'Museum', detail: 'Rich collection of gold statues, sacred thangkas, copper-gilt Buddhas, and ancient weaponry' },
        { label: 'Hemis National Park', detail: 'India\'s largest national park (4,400 sq km) â€” home to snow leopards, bharal, and Tibetan wolves' },
      ],
      gallery: [
        { title: 'Monastery Courtyard', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', desc: 'The grand inner courtyard during Hemis festival, filled with colorful prayer flags and crowds.' },
        { title: 'Cham Dance Performers', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', desc: 'Monks in elaborate sacred masks performing the traditional Cham dances during Tsechu.' },
        { title: 'Sacred Thangka Hall', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', desc: 'The ornate prayer hall housing the monastery\'s prized collection of gold Buddhas and thangkas.' },
        { title: 'Valley Setting', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', desc: 'The monastery complex hidden in a deep gorge, surrounded by the rugged Hemis landscape.' },
      ],
      videoTitle: 'Hemis Festival â€” Sacred Masked Dances',
      videoDesc: 'Immersive footage of the annual Hemis Tsechu festival showcasing the spectacular Cham dances, vivid costumes, long horn instruments, and the spiritual energy of Ladakh\'s grandest celebration.',
      nearbyAttractions: ['Hemis National Park', 'Stakna Monastery', 'Matho Monastery', 'Stok Palace Museum'],
    },
    {
      slug: 'alchi-monastery', name: 'alchi Monastery', year: 1020, builder: 'Lotsawa Rinchen Zangpo', style: 'Indo-Tibetan',
      icon: 'bi-palette', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600',
      location: 'alchi, Leh district, 68 km west of Leh', altitude: '3,110m (10,203 ft)',
      desc: 'Houses some of the oldest and finest Buddhist art in Ladakh with 1000-year-old Kashmiri-style murals.',
      significance: 'Contains the finest examples of Kashmiri-influenced Buddhist art anywhere in the world. The murals predate any surviving paintings in Kashmir itself, making alchi an irreplaceable treasure of Indo-Tibetan art history.',
      lat: 34.2238, lng: 77.1754, zoom: 15,
      visitingHours: '8:00 aM â€“ 6:00 PM (Closed during winter months)', entryFee: 'â‚¹50 (Photography prohibited inside temples)',
      overview: 'alchi Monastery (alchi Choskhor) is a stunning Buddhist temple complex on the banks of the Indus River, founded around 1020 aD by the great translator Lotsawa Rinchen Zangpo during the Second Diffusion of Buddhism in Tibet. Unlike most Ladakhi monasteries built atop hills, alchi sits on flat ground near the river. What makes it truly exceptional are its extraordinarily well-preserved murals and wood carvings, which showcase a unique fusion of Indian, Kashmiri, Tibetan, and Central asian artistic traditions. The complex has five temples (lhakhangs), with the Sumtsek being the masterpiece â€” a three-storey temple with colossal clay statues adorned with miniature paintings on their garments depicting scenes from Buddhist and secular life.',
      highlights: [
        { label: 'Sumtsek Temple', detail: '3-storey temple with colossal bodhisattva statues whose garments are painted with intricate miniature scenes' },
        { label: '1000-Year-Old Murals', detail: 'Finest surviving examples of Indo-Kashmiri art â€” vivid colours depicting mandalas, palaces, and Buddhist deities' },
        { label: 'Vairocana Temple', detail: 'Features an extraordinary mandala of Vairocana Buddha surrounded by thousands of tiny painted Buddhas' },
        { label: 'Riverside Setting', detail: 'Uniquely located on flat ground beside the Indus River, surrounded by apricot orchards' },
      ],
      gallery: [
        { title: 'Sumtsek Interior', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', desc: 'The breathtaking 3-storey Sumtsek temple with giant bodhisattva statues and painted garments.' },
        { title: 'ancient Murals Detail', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', desc: 'Close-up of the 1000-year-old Kashmiri-style murals with vivid colors and intricate mandala patterns.' },
        { title: 'Wooden Carvings', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', desc: 'Exquisitely carved door frames and wooden panels showing Kashmiri-indian artistic influence.' },
        { title: 'Indus River View', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', desc: 'The monastery complex on the banks of the turquoise Indus, framed by barren mountains.' },
      ],
      videoTitle: 'alchi â€” a Thousand Years of Sacred art',
      videoDesc: 'a guided walkthrough of the alchi temple complex revealing the stunning 11th-century murals, the Sumtsek\'s colossal statues, and the unique Indo-Kashmiri artistic heritage preserved in these ancient walls.',
      nearbyAttractions: ['Likir Monastery', 'Magnetic Hill', 'Sangam (Indus-Zanskar Confluence)', 'Basgo Fortress'],
    },
    {
      slug: 'basgo-fortress', name: 'Basgo Fortress', year: 1500, builder: 'Namgyal Dynasty', style: 'Fortress & Temple',
      icon: 'bi-shield-shaded', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1600',
      location: 'Basgo, Leh district, 40 km west of Leh', altitude: '3,300m (10,827 ft)',
      desc: 'a fortress-monastery that withstood a 3-year Tibetan-Mongol siege â€” a symbol of Ladakhi resilience.',
      significance: 'On the World Monuments Watch list. Basgo served as the political and cultural capital before Leh. Its famous three-year siege defence against the combined Tibetan and Mongol armies is celebrated as one of Ladakh\'s greatest acts of resistance.',
      lat: 34.2185, lng: 77.2882, zoom: 15,
      visitingHours: '7:00 aM â€“ 6:00 PM (all Year)', entryFee: 'â‚¹30',
      overview: 'Basgo Fortress stands atop an eroded clay ridge, its crenellated ruins dramatically silhouetted against the stark Ladakhi landscape. Built around the 15th century when Basgo served as a capital of Lower Ladakh, the citadel gained legendary status when it withstood a three-year siege (1680â€“83) by Tibetan and Mongol armies during the great war. The complex includes two remarkable temples: the Maitreya Temple (Chamchung), housing a beautiful two-storey clay statue of Maitreya Buddha, and the Serzang Temple (Gold & Copper Temple) with exquisite murals and a gold-and-copper Maitreya. Though much of the fortress lies in ruins, the temples have been carefully restored by international conservation efforts, and the site offers an atmospheric glimpse into Ladakh\'s turbulent military history.',
      highlights: [
        { label: 'Three-Year Siege', detail: 'Famously withstood a 3-year siege by Tibetan-Mongol forces (1680â€“83) â€” a legendary act of Ladakhi resistance' },
        { label: 'Maitreya Temple', detail: 'Two-storey statue of Maitreya Buddha in Chamchung temple, adorned with vivid 16th-century murals' },
        { label: 'Gold & Copper Temple', detail: 'Serzang temple houses a stunning gold-and-copper Maitreya statue with remarkably preserved wall paintings' },
        { label: 'Dramatic Ruins', detail: 'Crumbling mud-brick citadel walls on an eroded ridge, hauntingly beautiful against Ladakh\'s barren landscape' },
      ],
      gallery: [
        { title: 'Fortress on the Ridge', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', desc: 'The dramatic silhouette of Basgo\'s crumbling citadel walls against a deep blue Ladakhi sky.' },
        { title: 'Maitreya Buddha Statue', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', desc: 'The magnificent two-storey Maitreya statue inside the Chamchung temple, lit by small windows.' },
        { title: 'Serzang Murals', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', desc: 'Vivid 16th-century Buddhist murals inside the Gold & Copper Temple, painstakingly restored.' },
        { title: 'Valley Panorama', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', desc: 'Sweeping views of the arid Basgo valley and the winding road from the fortress ramparts.' },
      ],
      videoTitle: 'Basgo â€” The Fortress That Never Fell',
      videoDesc: 'Cinematic exploration of Basgo\'s dramatic ruins, the legendary three-year siege, and the beautifully restored Maitreya temples hidden within the crumbling walls of this ancient citadel.',
      nearbyAttractions: ['alchi Monastery', 'Nimmu Valley', 'Likir Monastery', 'Magnetic Hill'],
    },
    {
      slug: 'shey-palace', name: 'Shey Palace', year: 1500, builder: 'Deldan Namgyal', style: 'Royal Residence',
      icon: 'bi-house-fill', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600',
      location: 'Shey, 15 km south of Leh', altitude: '3,500m (11,483 ft)',
      desc: 'The ancient summer capital of Ladakh with a 7.5-metre copper-gilt Buddha statue inside.',
      significance: 'Shey served as the summer capital of Ladakh for centuries before the shift to Leh. The 7.5-metre copper-gilt statue of Shakyamuni Buddha, studded with precious stones, is considered the most sacred Buddha image in Ladakh.',
      lat: 34.0722, lng: 77.6322, zoom: 15,
      visitingHours: '7:00 aM â€“ 6:00 PM (all Year)', entryFee: 'â‚¹30',
      overview: 'Shey Palace was the summer capital of Ladakh and the seat of the Ladakhi kings before the capital moved to Leh. Originally built by the first king of Ladakh, it was rebuilt in its current form by King Deldan Namgyal around 1655. The palace sits on a hill overlooking a now-dry lake bed and the Indus Valley. Its crowning glory is the massive 7.5-metre (24 ft) copper-gilt statue of Shakyamuni Buddha, studded with gold and precious stones â€” believed to be the most sacred Buddha image in all of Ladakh. The grounds are dotted with hundreds of ancient chortens (stupas), giving the area a deeply spiritual atmosphere. Shey was also an important stop for caravans on the ancient trade route between Leh and Manali.',
      highlights: [
        { label: 'Giant Buddha', detail: '7.5-metre copper-gilt Shakyamuni Buddha studded with precious stones â€” Ladakh\'s most sacred image' },
        { label: 'ancient Chortens', detail: 'Hundreds of whitewashed chortens (stupas) scattered across the hillside create a sacred landscape' },
        { label: 'Dry Lake & Views', detail: 'Overlooking a historic lake bed and the Indus Valley with dramatic mountain backdrops' },
        { label: 'Rock Carvings', detail: 'Nearby rock surfaces bear ancient petroglyphs and carved Buddhist figures from multiple eras' },
      ],
      gallery: [
        { title: 'Copper-Gilt Buddha', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', desc: 'The magnificent 7.5-metre Shakyamuni Buddha statue, Ladakh\'s most revered, inside the palace temple.' },
        { title: 'Palace Ruins & Chortens', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', desc: 'Whitewashed stupas and ancient palace walls spread across the hillside overlooking the Indus Valley.' },
        { title: 'Interior Wall Paintings', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', desc: 'Faded but beautiful Buddhist murals adorning the walls of the main temple chamber.' },
        { title: 'Sacred Landscape', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', desc: 'The serene expanse of chortens, prayer flags, and the dry lake bed framed by barren peaks.' },
      ],
      videoTitle: 'Shey â€” The Sacred Summer Capital',
      videoDesc: 'a meditative journey through the ruins of Shey Palace, revealing the giant copper Buddha, ancient stupas, and the deeply spiritual landscape that once served as Ladakh\'s royal summer capital.',
      nearbyAttractions: ['Thiksey Monastery', 'Stok Palace', 'Hemis Monastery', 'Matho Monastery'],
    },
    {
      slug: 'diskit-monastery', name: 'Diskit Monastery', year: 1420, builder: 'Changzem Tserab Zangpo', style: 'Gelugpa Buddhist',
      icon: 'bi-globe-asia-australia', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1600',
      location: 'Diskit, Nubra Valley, 120 km north of Leh', altitude: '3,144m (10,315 ft)',
      desc: 'The oldest and largest monastery in Nubra Valley with the iconic 32-metre Maitreya Buddha statue.',
      significance: 'The oldest monastery in Nubra Valley and headquarters of the Gelugpa (Yellow Hat) order in the region. The 32-metre Maitreya Buddha statue, inaugurated by the Dalai Lama in 2010, has become one of Ladakh\'s most photographed landmarks.',
      lat: 34.5417, lng: 77.5611, zoom: 14,
      visitingHours: '6:00 aM â€“ 8:00 PM (all Year)', entryFee: 'â‚¹30',
      overview: 'Diskit Monastery (Diskit Gompa) is the oldest and largest monastery in the Nubra Valley, founded in the 14th century by Changzem Tserab Zangpo, a disciple of Tsong Khapa â€” the founder of the Gelugpa order. Perched on a steep hillside above the Shyok River, the monastery commands extraordinary views of the Nubra Valley meeting the stark Karakoram mountains. The complex houses ancient murals, a large collection of Buddhas, Bodhisattva images, and hand-written manuscripts. The most striking modern addition is the 32-metre (106 ft) Maitreya Buddha statue facing the Shyok River toward Pakistan â€” inaugurated by His Holiness the 14th Dalai Lama in 2010 as a symbol of peace and protection. Below the monastery, the white sand dunes of Hunder create a surreal desert-meets-mountains landscape.',
      highlights: [
        { label: '32m Maitreya Buddha', detail: 'Towering 106-ft statue facing the Shyok River, inaugurated by the Dalai Lama in 2010 as a symbol of peace' },
        { label: 'Nubra Panorama', detail: 'Commanding views of the Nubra-Shyok valley confluence, Karakoram range, and the surreal sand dunes' },
        { label: 'ancient Prayer Halls', detail: '600-year-old prayer halls with murals, butter sculptures, and hand-written Kangyur manuscripts' },
        { label: 'Hunder Sand Dunes', detail: 'Nearby surreal white sand dunes where Bactrian (double-humped) camels roam against mountain backdrops' },
      ],
      gallery: [
        { title: 'Maitreya Buddha Statue', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', desc: 'The towering 32-metre Maitreya facing down the Shyok Valley â€” Ladakh\'s most iconic modern landmark.' },
        { title: 'Monastery on the Cliff', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', desc: 'Diskit Gompa perched dramatically on the hillside with the vast Nubra Valley stretching below.' },
        { title: 'ancient Prayer Hall', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', desc: 'The centuries-old main prayer hall with thangkas, butter sculptures, and flickering butter lamps.' },
        { title: 'Hunder Sand Dunes', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', desc: 'The surreal white sand dunes of Hunder with Bactrian camels and the Karakoram mountains beyond.' },
      ],
      videoTitle: 'Diskit â€” Guardian of the Nubra Valley',
      videoDesc: 'an epic aerial and ground-level tour of Diskit Monastery, the colossal Maitreya Buddha statue, and the breathtaking Nubra Valley landscape with its famous sand dunes and Bactrian camels.',
      nearbyAttractions: ['Hunder Sand Dunes', 'Panamik Hot Springs', 'Yarab Tso Lake', 'Turtuk Village'],
    },
  ];

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug');
    const found = this.monuments.find(m => m.slug === slug);
    this.monument.set(found ?? null);
  }
}




