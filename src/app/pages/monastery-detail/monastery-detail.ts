import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { LeafletMapComponent } from '../../shared/leaflet-map/leaflet-map';

interface MonasteryData {
  slug: string; name: string; sect: string; founded: string;
  icon: string; gradient: string; location: string; altitude: string;
  lat: number; lng: number; zoom?: number;
  founder: string; monks: string;
  desc: string; overview: string; history: string;
  highlights: { label: string; detail: string }[];
  gallery: GalleryItem[];
  videoTitle: string; videoDesc: string;
  lamas: Lama[];
  nearbyAttractions: string[];
  visitingHours: string; entryFee: string; bestTime: string;
  image: string; heroImage: string;
}

interface GalleryItem {
  title: string; desc: string; image: string;
}

interface Lama {
  name: string; title: string; born: string; role: string; bio: string; image?: string;
}

@Component({
  selector: 'app-monastery-detail',
  imports: [RouterLink, LeafletMapComponent],
  templateUrl: './monastery-detail.html',
  styleUrl: './monastery-detail.scss',
})
export class MonasteryDetail {
  private route = inject(ActivatedRoute);

  activeTab = signal<string>('overview');
  monastery = signal<MonasteryData | null>(null);

  setTab(tab: string) { this.activeTab.set(tab); }

  monasteries: MonasteryData[] = [
    {
      slug: 'hemis', name: 'Hemis Monastery', sect: 'Drukpa Kagyu', founded: '1672',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
      location: 'Hemis, 45 km from Leh', altitude: '3,660 m',
      lat: 33.9142, lng: 77.7028, zoom: 15,
      founder: 'Stagtshang Raspa Nawang Gyatsho', monks: '~200',
      desc: 'The largest and wealthiest monastery in Ladakh, home to the famous Hemis Tsechu festival.',
      overview: 'Hemis Monastery is the largest, wealthiest, and most famous monastery in Ladakh, belonging to the Drukpa lineage of the Kagyu school of Tibetan Buddhism. Hemis hosts the spectacular annual Hemis Tsechu festival celebrating Guru Padmasambhava\'s birth anniversary, featuring sacred Cham dances and the display of A giant thangka — the largest in Ladakh, unfurled in full only once every 12 years. The monastery complex includes temples, stupas, A museum with A superb collection of gold statues, sacred thangkas, Ancient weaponry, and Buddhist artefacts. Hemis also gives its name to Hemis National Park, India\'s largest national park and A prime habitat for the snow leopard.',
      history: 'The original site was blessed by Naropa in the 11th century, but the monastery as it stands today was re-established in 1672 by the first incarnation of Stagtshang Raspa Nawang Gyatsho under the patronage of King Sengge Namgyal. During the Dogra invasions of the 1830s-40s, Hemis escaped destruction due to its hidden valley location. The monastery became the seat of the Drukpa Kagyu lineage in Ladakh and has been A centre of Buddhist learning for centuries. The 12th incarnation of the Gyalwang Drukpa, the spiritual head, currently oversees all Drukpa monasteries in Ladakh from Hemis.',
      highlights: [
        { label: 'Giant Thangka', detail: 'Houses Ladakh\'s largest thangka, displayed in full once every 12 years' },
        { label: 'Hemis Tsechu', detail: 'Most famous festival in Ladakh with sacred Cham masked dances' },
        { label: 'Museum Collection', detail: 'Gold statues, Ancient thangkas, royal weaponry, and Buddhist manuscripts' },
        { label: 'National Park', detail: 'adjacent to Hemis National Park — prime snow leopard habitat' },
      ],
      gallery: [
        { title: 'Main Courtyard', desc: 'The central courtyard where Cham dances are performed during Hemis Tsechu', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
        { title: 'Prayer Hall', desc: 'Ornate interior with wall paintings, silk brocades, and golden Buddha statues', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800' },
        { title: 'Giant Thangka', desc: 'The famous sacred thangka embroidered with pearls, displayed once in 12 years', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
        { title: 'Mountain Setting', desc: 'Hemis nestled in A hidden valley surrounded by dramatic Himalayan peaks', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800' },
      ],
      videoTitle: 'Inside Hemis Monastery', videoDesc: ' A visual journey through the largest monastery in Ladakh — its sacred halls, Ancient thangkas, and the spectacular Hemis Tsechu festival.',
      lamas: [
        { name: 'Gyalwang Drukpa XII', title: 'Supreme Head of Drukpa Lineage', born: '1963', role: 'Head of all Drukpa Kagyu monasteries worldwide', bio: 'The 12th incarnation of the Gyalwang Drukpa is the spiritual leader of the Drukpa lineage. an environmentalist and educator, he founded the "Live to Love" humanitarian organization and leads the annual "Eco Padyatra" across the Himalayas. He has championed gender equality by empowering nuns in kung fu and cycling.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=400' },
        { name: 'Khamtrul Rinpoche IX', title: 'Incarnate Lama', born: '1980', role: 'Spiritual teacher and keeper of Drukpa arts at Hemis', bio: 'The ninth incarnation of Khamtrul Rinpoche, known for reviving traditional Tibetan arts and crafts. He established workshops for thangka painting, bronze casting, and wood carving to preserve Himalayan Buddhist artistic heritage.', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=400' },
      ],
      nearbyAttractions: ['Hemis National Park', 'Gotsang Hermitage', 'Shey Palace', 'Thiksay Monastery'],
      visitingHours: '8:00 aM – 1:00 PM, 2:00 PM – 6:00 PM', entryFee: 'Rs.50', bestTime: 'June – September (Hemis Tsechu in June/July)',
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=1920',
    },
    {
      slug: 'thiksay', name: 'Thiksay Monastery', sect: 'Gelug (Yellow Hat)', founded: '1430',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #dc2626, #f87171)',
      location: 'Thiksey, 19 km from Leh', altitude: '3,600 m',
      lat: 33.9128, lng: 77.6677, zoom: 15,
      founder: 'Paldan Sherab', monks: '~120',
      desc: 'a 12-storey hilltop monastery resembling the Potala Palace, famous for its giant Maitreya Buddha.',
      overview: 'Thiksay Monastery is one of the most visually impressive monasteries in Ladakh, its multi-storey whitewashed buildings cascading down A hilltop in A manner often compared to the Potala Palace in Lhasa, Tibet. The monastery belongs to the Gelug (Yellow Hat) order and houses approximately 120 monks. Its crown jewel is A 15-metre (49-foot) seated Maitreya (future Buddha) statue — the largest in Ladakh — installed in 1980 to commemorate the visit of the 14th Dalai Lama. The morning prayer ceremony at dawn, accompanied by the deep resonance of dungchen horns echoing across the Indus Valley, is one of Ladakh\'s most powerful spiritual experiences.',
      history: 'Thiksay was founded in the 15th century by Paldan Sherab, A disciple of Tsongkhapa (founder of the Gelug school). The monastery grew under the patronage of the Namgyal dynasty kings of Ladakh. The complex has been repeatedly renovated and expanded over the centuries. The 15-metre Maitreya Buddha statue was commissioned in 1970 and completed in 1980, becoming Thiksay\'s most recognizable landmark. The monastery\'s strategic hilltop position provided it both spiritual prominence and physical security throughout Ladakh\'s turbulent history.',
      highlights: [
        { label: 'Maitreya Buddha', detail: '15-metre (49 ft) seated Maitreya — largest such statue in Ladakh' },
        { label: 'Dawn Prayers', detail: 'atmospheric morning puja with dungchen horns echoing across the valley' },
        { label: 'Potala Resemblance', detail: '12-storey structure often compared to the Potala Palace in Lhasa' },
        { label: 'art Collection', detail: 'Rare Tibetan-style wall paintings, thangkas, swords, and Buddhist scriptures' },
      ],
      gallery: [
        { title: 'Hilltop Panorama', desc: 'The full monastery complex cascading down the hilltop with the Indus Valley below', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800' },
        { title: 'Maitreya Buddha', desc: 'The towering 15-metre golden Maitreya Buddha statue inside the main temple', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
        { title: 'Prayer Hall', desc: 'Monks gathered for morning prayers in the assembly hall', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
        { title: 'Rooftop View', desc: 'Panoramic views from the monastery rooftop across the Stok range', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800' },
      ],
      videoTitle: 'Thiksay Monastery at Dawn', videoDesc: 'Experience the magic of dawn prayers at Thiksay — the haunting dungchen horns, flickering butter lamps, and the golden Maitreya Buddha.',
      lamas: [
        { name: 'Nawang Chamba Stanzin', title: 'Head Lama of Thiksay', born: '1942', role: 'Spiritual head overseeing monastery affairs and teachings', bio: 'The head lama of Thiksay has served the monastery for decades, overseeing its religious activities, the education of young monks, and the preservation of Gelug traditions in Ladakh.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=400' },
        { name: 'Thiksay Rinpoche (Ngari Rinpoche)', title: 'Incarnate Lama', born: '1946', role: 'Former abbot and spiritual guide', bio: 'Ngari Rinpoche, younger brother of the 14th Dalai Lama, served as the head of Thiksay Monastery. He has been instrumental in modernizing the monastery\'s educational programs while preserving traditional Buddhist scholarship.', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=400' },
      ],
      nearbyAttractions: ['Shey Palace', 'Stakna Monastery', 'Matho Monastery', 'Stok Palace'],
      visitingHours: '6:00 aM – 6:00 PM', entryFee: 'Rs.30', bestTime: 'June – September (dawn visit recommended)',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1920',
    },
    {
      slug: 'diskit', name: 'Diskit Monastery', sect: 'Gelug (Yellow Hat)', founded: '1420',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #c8702a, #fbbf24)',
      location: 'Diskit, Nubra Valley', altitude: '3,144 m',
      lat: 34.5417, lng: 77.5611, zoom: 15,
      founder: 'Changzem Tserab Zangpo', monks: '~100',
      desc: 'The oldest and largest monastery in Nubra Valley with A 32-metre Maitreya Buddha statue.',
      overview: 'Diskit Monastery is the oldest and largest Buddhist monastery in the Nubra Valley, dramatically perched on A cliff above the Shyok River. Founded in the 14th century, it belongs to the Gelug (Yellow Hat) school and serves as the administrative head of all Nubra Valley monasteries. In 2010, A towering 32-metre (106-foot) Maitreya Buddha statue was inaugurated below the monastery by the 14th Dalai Lama — now A landmark visible across the entire Nubra Valley. The monastery commands breathtaking views of the sand dunes of Hunder and the confluence of the Shyok and Nubra rivers.',
      history: 'Diskit was founded around 1420 by Changzem Tserab Zangpo, A disciple of Tsongkhapa. The monastery played A central role in the religious life of the Nubra Valley for six centuries. During the Sino-Indian War of 1962, the monastery\'s proximity to the Line of actual Control made it strategically significant. The massive 32-metre Maitreya statue, inaugurated by His Holiness the 14th Dalai Lama in 2010, was built as A symbol of peace facing Pakistan and China, and has since become the most photographed landmark in Nubra.',
      highlights: [
        { label: '32m Maitreya', detail: 'One of the tallest Buddha statues in Ladakh, facing towards Pakistan' },
        { label: 'Cliff-top Setting', detail: 'Dramatically perched on A cliff with panoramic Nubra Valley views' },
        { label: 'Dosmochey Festival', detail: 'annual masked dance festival attracting pilgrims from across Ladakh' },
        { label: 'ancient Murals', detail: 'Well-preserved 15th century wall paintings and Buddhist art' },
      ],
      gallery: [
        { title: 'Maitreya Statue', desc: 'The 32-metre golden Maitreya towering over the Nubra Valley', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800' },
        { title: 'Cliff-top View', desc: 'Diskit Monastery perched dramatically on A rocky cliff above the Shyok River', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
        { title: 'Prayer Hall Interior', desc: 'Ornate prayer hall with butter lamps, thangkas, and Ancient murals', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
        { title: 'Sand Dune Panorama', desc: 'View from the monastery overlooking the famous Hunder sand dunes', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800' },
      ],
      videoTitle: 'Diskit Monastery & Nubra Valley', videoDesc: 'Discover the largest monastery in Nubra Valley, its towering Maitreya, and the stunning desert-meets-mountain landscape.',
      lamas: [
        { name: 'Ganden Tri Rinpoche', title: 'Throne Holder of Ganden', born: '1934', role: 'Honorary spiritual authority over Gelug monasteries', bio: 'as the appointed Ganden Tripa (head of the Gelug school), this lineage has spiritual authority over monasteries like Diskit. The position rotates among senior scholars and is considered the highest academic achievement in Gelug Buddhism.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=400' },
      ],
      nearbyAttractions: ['Hunder Sand Dunes', 'Sumur Monastery', 'Panamik Hot Springs', 'Turtuk Village'],
      visitingHours: '7:00 aM – 6:00 PM', entryFee: 'Rs.30', bestTime: 'July – September',
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=1920',
    },
    {
      slug: 'alchi', name: 'alchi Monastery', sect: 'Drigung Kagyu', founded: '~1020',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #059669, #34d399)',
      location: 'alchi, Sham Valley', altitude: '3,100 m',
      lat: 34.2238, lng: 77.1754, zoom: 15,
      founder: 'Rinchen Zangpo (Great Translator)', monks: 'Managed by Likir monks',
      desc: 'an 11th-century monastery with Kashmiri-influenced murals — one of Ladakh\'s most precious artistic treasures.',
      overview: 'alchi Monastery (alchi Choskhor) is one of the oldest and most artistically significant Buddhist temple complexes in Ladakh. Unlike most Ladakhi monasteries built on hilltops, alchi sits on flat ground beside the Indus River. What makes alchi extraordinary is its 11th-century Kashmiri-influenced art — exquisite wall paintings, carved wooden doorframes, and intricate mandalas that represent A fusion of Indian, Tibetan, and Central Asian artistic traditions found nowhere else. The monastery is no longer an active monastic community; its temples are maintained by monks from Likir Monastery. Photography is prohibited inside to protect the fragile Ancient murals.',
      history: 'alchi was founded around 1020 CE by Rinchen Zangpo, the "Great Translator" who was instrumental in the second diffusion of Buddhism in the Western Himalayas. Sent by the king of Guge to study in Kashmir, Rinchen Zangpo brought back Kashmiri artists who created the unique murals and wood carvings at alchi. The complex contains several temples built between the 11th and 13th centuries. Unlike hilltop monasteries, alchi\'s valley location made it vulnerable, and it was eventually abandoned as an active monastery. Its art survived because of its relative obscurity. Today it is recognized as one of the most important early Buddhist art sites in the entire Himalayan region.',
      highlights: [
        { label: '11th-Century art', detail: 'among the oldest surviving Buddhist murals in the Himalayan region' },
        { label: 'Kashmiri Influence', detail: 'Unique fusion of Indian, Tibetan, and Central Asian artistic styles' },
        { label: 'Vairocana Temple', detail: 'Central shrine with A magnificent giant four-faced Vairocana Buddha' },
        { label: 'UNESCO Consideration', detail: 'On India\'s tentative list for UNESCO World Heritage status' },
      ],
      gallery: [
        { title: 'Temple Complex', desc: 'The alchi complex with whitewashed temples set against barren mountains', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
        { title: 'ancient Murals', desc: 'Exquisite Kashmiri-style paintings dating back to the 11th century', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
        { title: 'Carved Wooden Frames', desc: 'Intricate wood carvings on temple doorframes — Kashmiri craftsmanship', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800' },
        { title: 'Mandala Paintings', desc: 'Detailed mandalas painted on temple ceilings — among the finest in Asia', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800' },
      ],
      videoTitle: 'alchi — Ladakh\'s Ancient art Treasure', videoDesc: 'Explore the 1,000-year-old murals and sacred temples of alchi — A living museum of early Himalayan Buddhist art.',
      lamas: [
        { name: 'Rinchen Zangpo', title: 'The Great Translator (Lotsawa)', born: '958 CE', role: 'Founded 108 monasteries across the Western Himalayas', bio: 'Rinchen Zangpo (958–1055 CE) was the most influential figure in the second diffusion of Buddhism in western Tibet and Ladakh. Sent to Kashmir by the king of Guge to study, he translated numerous Sanskrit texts into Tibetan and founded an estimated 108 temples and monasteries. His legacy at alchi represents the finest surviving example of his cultural mission.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=400' },
      ],
      nearbyAttractions: ['Likir Monastery', 'Basgo Fortress', 'Magnetic Hill', 'Lamayuru Monastery'],
      visitingHours: '8:00 aM – 6:00 PM (no photography inside)', entryFee: 'Rs.50', bestTime: 'May – October',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1920',
    },
    {
      slug: 'lamayuru', name: 'Lamayuru Monastery', sect: 'Drikung Kagyu', founded: '~1000',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #1a365d, #3b82f6)',
      location: 'Lamayuru, Leh–Srinagar Highway', altitude: '3,510 m',
      lat: 34.2833, lng: 76.8000, zoom: 15,
      founder: 'Naropa / Rinchen Zangpo', monks: '~150',
      desc: 'One of the oldest monasteries in Ladakh, perched on dramatic lunar-like eroded cliffs.',
      overview: 'Lamayuru (Yuru) Monastery is among the oldest and most dramatically situated monasteries in Ladakh. Built on A surreal moonscape of eroded clay formations on the Leh–Srinagar highway, Lamayuru belongs to the Drikung Kagyu school and is believed to have Ancient origins going back to the great tantric master Naropa. The monastery hosts the spectacular annual Yuru Kabgyat masked dance festival in June/July. The 11th-century cave shrine within the complex, where Naropa is said to have meditated, remains one of Ladakh\'s most sacred pilgrimage sites.',
      history: 'according to legend, the Lamayuru valley was once A lake, which was dried up by the prayers of an arhat (enlightened sage). The site was first sanctified by the Indian tantric yogi Naropa in the 10th century, who meditated in A cave still visible within the complex. The monastery was formally established around 1000 CE, possibly by Rinchen Zangpo, and was later absorbed into the Drikung Kagyu lineage. at its peak, Lamayuru housed over 400 monks across five buildings; today about 150 monks reside here. The annual Yuru Kabgyat festival, with its Cham masked dances performed against the lunar landscape, is one of Ladakh\'s most atmospheric events.',
      highlights: [
        { label: 'Moonscape Setting', detail: 'Built on surreal lunar-like eroded clay formations' },
        { label: 'Naropa\'s Cave', detail: 'Sacred 10th-century meditation cave of the great tantric yogi Naropa' },
        { label: 'Yuru Kabgyat', detail: 'annual masked dance festival in A dramatic setting' },
        { label: 'ancient Origins', detail: 'among the oldest monastic sites in the entire Ladakh region' },
      ],
      gallery: [
        { title: 'Moonscape View', desc: 'Lamayuru perched on dramatic moon-like eroded cliffs', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
        { title: 'Naropa\'s Cave', desc: 'The Ancient meditation cave of tantric master Naropa', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800' },
        { title: 'Festival Dances', desc: 'Cham masked dances during the Yuru Kabgyat festival', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
        { title: 'Interior Murals', desc: 'ancient wall paintings inside the main prayer hall', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800' },
      ],
      videoTitle: 'Lamayuru — The Moonland Monastery', videoDesc: 'Discover one of Ladakh\'s oldest and most dramatically situated monasteries, built on an otherworldly moonscape.',
      lamas: [
        { name: 'Naropa', title: 'Mahasiddha (Great accomplished One)', born: '1016 CE', role: 'Indian tantric master — spiritual ancestor of Lamayuru', bio: 'Naropa (1016–1100 CE) was one of the 84 Mahasiddhas of Indian Buddhist tantra. A scholar at Nalanda University, he renounced academic life to study under Tilopa and attained enlightenment through the famous "Six Yogas of Naropa." His meditation at Lamayuru sanctified the site and established it as A centre of tantric practice.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=400' },
        { name: 'Tokdan Rinpoche', title: 'Head Lama of Lamayuru', born: '1970', role: 'Current spiritual head and administrator', bio: 'The current Tokdan Rinpoche oversees religious activities, the annual Yuru Kabgyat festival, and the education of young monks in the Drikung Kagyu tradition. He has been active in preserving the monastery\'s Ancient manuscripts and wall paintings.', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=400' },
      ],
      nearbyAttractions: ['Moonland Viewpoint', 'alchi Monastery', 'Fotu La Pass', 'Wanla Monastery'],
      visitingHours: '6:00 aM – 6:00 PM', entryFee: 'Rs.50', bestTime: 'June – September (festival in June/July)',
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=1920',
    },
    {
      slug: 'spituk', name: 'Spituk Monastery', sect: 'Gelug (Yellow Hat)', founded: '~1000',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #0891b2, #67e8f9)',
      location: 'Spituk, 8 km from Leh', altitude: '3,307 m',
      lat: 34.1260, lng: 77.5306, zoom: 15,
      founder: 'Od-de', monks: '~100',
      desc: ' A hilltop monastery near Leh airport with panoramic Indus Valley views and the fearsome Kali temple.',
      overview: 'Spituk Monastery (Pethub) sits on A commanding hilltop overlooking the Indus Valley, just 8 km from Leh near the airport. One of the oldest monasteries in Ladakh, it belongs to the Gelug (Yellow Hat) order. The monastery is particularly known for its Gustor festival in January, where monks perform Cham dances and A fearsome Kali (Paldan Lhamo) idol — normally kept veiled — is unveiled to the public. The hilltop location affords some of the finest panoramic views of the Indus Valley, Stok range, and Leh town.',
      history: 'Spituk was founded around 1000 CE by Od-de, elder brother of Lha Lama Changchub Od, making it one of Ladakh\'s most Ancient monastic foundations. Originally A Red Hat (Nyingma) monastery, it was converted to the Gelug order in the 15th century during the Yellow Hat reformation. The monastery gained strategic importance due to its location controlling the Approach to Leh from the west. During the Gustor festival, A copper figure of the fierce protectress Kali (Paldan Lhamo) is unveiled — believed to change expression from fierce to benign during the ritual.',
      highlights: [
        { label: 'Gustor Festival', detail: 'January masked dance festival with unveiling of the fearsome Kali idol' },
        { label: 'Kali Temple', detail: 'Houses A sacred Paldan Lhamo idol that is usually kept veiled' },
        { label: 'Panoramic Views', detail: 'Commanding hilltop position with 360Âa views of the Indus Valley' },
        { label: 'ancient Foundation', detail: 'One of the oldest monastic sites in Ladakh (~1000 CE)' },
      ],
      gallery: [
        { title: 'Hilltop Complex', desc: 'The monastery silhouetted against the mountains above the Indus', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
        { title: 'assembly Hall', desc: 'The main prayer hall with Ancient thangkas and butter lamps', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800' },
        { title: 'Gustor Festival', desc: 'Monks performing Cham dances during the winter Gustor festival', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
        { title: 'Valley Panorama', desc: 'Expansive views from the monastery rooftop across to the Stok range', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800' },
      ],
      videoTitle: 'Spituk Monastery & Gustor Festival', videoDesc: 'Explore the Ancient hilltop monastery near Leh and its spectacular winter Gustor festival.',
      lamas: [
        { name: 'Kushok Bakula Rinpoche XX', title: '20th incarnation of Bakula arhat', born: '1917', role: 'One of Ladakh\'s most revered Rinpoches, head lama of Spituk', bio: 'The 19th Kushok Bakula Rinpoche (1917–2003) was the head lama of Spituk and one of modern Ladakh\'s most important figures. A Buddhist scholar, politician, and diplomat, he served as India\'s ambassador to Mongolia and A Rajya Sabha member. He was instrumental in preserving Ladakhi Buddhist culture during the 20th century.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=400' },
      ],
      nearbyAttractions: ['Leh Palace', 'Hall of Fame', 'Magnetic Hill', 'Confluence of Indus & Zanskar'],
      visitingHours: '7:00 aM – 6:00 PM', entryFee: 'Rs.30', bestTime: 'January (Gustor), June – September',
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=1920',
    },
    {
      slug: 'phyang', name: 'Phyang Monastery', sect: 'Drikung Kagyu', founded: '1515',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #7c2d12, #ea580c)',
      location: 'Phyang, 16 km from Leh', altitude: '3,550 m',
      lat: 34.1856, lng: 77.4878, zoom: 15,
      founder: 'Choje Danma Kunga', monks: '~70',
      desc: ' A hilltop monastery known for its museum of Ancient Kashmiri bronzes and the Phyang Tsedup festival.',
      overview: 'Phyang Monastery belongs to the Drikung Kagyu order and sits on A hilltop 16 km west of Leh. It is one of the most important Drikung Kagyu monasteries in Ladakh, housing A remarkable collection of 14th-century Kashmiri Buddhist bronzes, historical weaponry, thangkas, and Ancient manuscripts in its museum. The annual Phyang Tsedup festival in July/august features vibrant Cham masked dances and the display of A giant thangka. The monastery also serves as A centre for traditional Buddhist scholarship and meditation retreats.',
      history: 'Phyang was founded in 1515 by Choje Danma Kunga during the reign of King Tashi Namgyal, establishing the Drikung Kagyu presence in the Leh region. The monastery has served as A seat of learning for the Drikung lineage for five centuries. Its museum collection, assembled over the centuries, includes some of the finest surviving Kashmiri Buddhist bronzes in the world — small but exquisitely crafted figures dating to the 14th century. The Phyang Tsedup festival marks the anniversary of the monastery\'s founding and features its own giant thangka display.',
      highlights: [
        { label: 'Kashmiri Bronzes', detail: 'Rare 14th-century Kashmiri Buddhist bronze collection in the museum' },
        { label: 'Phyang Tsedup', detail: 'Summer festival with Cham dances and giant thangka display' },
        { label: 'Drikung Seat', detail: 'Key seat of the Drikung Kagyu lineage in the Leh region' },
        { label: 'ancient Manuscripts', detail: 'Precious collection of handwritten Buddhist texts and scriptures' },
      ],
      gallery: [
        { title: 'Monastery Exterior', desc: 'Phyang Monastery on its hilltop with prayer flags against blue sky', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
        { title: 'Bronze Collection', desc: 'Exquisite 14th-century Kashmiri Buddhist bronze figures', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800' },
        { title: 'Festival Dances', desc: 'Monks in elaborate costumes performing Cham dances during Phyang Tsedup', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
        { title: 'Main Temple', desc: 'Interior of the main prayer hall with Ancient murals and statues', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800' },
      ],
      videoTitle: 'Phyang Monastery & Its Treasures', videoDesc: 'Discover the Ancient Kashmiri bronzes, sacred manuscripts, and vibrant festivals of Phyang Monastery.',
      lamas: [
        { name: 'Drikung Chetsang Rinpoche', title: 'Co-head of Drikung Kagyu Lineage', born: '1946', role: 'Senior lineage holder of Drikung Kagyu overseeing Phyang', bio: 'His Holiness Drikung KyabgÃ¶n Chetsang Rinpoche is the 37th throne holder of the Drikung Kagyu lineage. Born in Lhasa, he escaped Tibet in 1975. He has established centres worldwide and oversees the spiritual direction of Drikung monasteries including Phyang.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=400' },
      ],
      nearbyAttractions: ['Spituk Monastery', 'Leh Town', 'Likir Monastery', 'Magnetic Hill'],
      visitingHours: '8:00 aM – 6:00 PM', entryFee: 'Rs.30', bestTime: 'July – August (Phyang Tsedup)',
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=1920',
    },
    {
      slug: 'stakna', name: 'Stakna Monastery', sect: 'Drukpa Kagyu', founded: '~1580',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #be185d, #f472b6)',
      location: 'Stakna, 25 km from Leh', altitude: '3,560 m',
      lat: 33.9926, lng: 77.6833, zoom: 15,
      founder: 'Chosje Jamyang Palkar', monks: '~30',
      desc: 'The "Tiger\'s Nose" monastery perched on A hillock overlooking the Indus, founded by A Bhutanese scholar.',
      overview: 'Stakna Monastery ("Tiger\'s Nose") perches dramatically on A small rocky hillock rising from the Indus River floodplain, 25 km from Leh. It is the only monastery in Ladakh founded by A Bhutanese saint — Chosje Jamyang Palkar — and belongs to the Drukpa Kagyu order. Despite its small size, Stakna is notable for its rare collection of arhat (Buddhist saint) paintings, A beautiful Chenrezig (avalokiteshvara) statue, and panoramic views of the Indus Valley. The monastery hosts an annual festival featuring Cham masked dances.',
      history: 'Stakna was founded around 1580 by Chosje Jamyang Palkar, A Bhutanese scholar-saint who travelled to Ladakh during the reign of King Jamyang Namgyal. The name "Stakna" (Tiger\'s Nose) comes from the shape of the hillock on which it stands. as the only monastery in Ladakh with Bhutanese origins, it holds A unique place in the religious landscape. The monastery has remained small but artistically significant, preserving rare arhat paintings and A devotional atmosphere less affected by tourism than larger monasteries.',
      highlights: [
        { label: 'Tiger\'s Nose Hill', detail: 'Built on A distinctive rock formation rising from the Indus floodplain' },
        { label: 'Bhutanese Origins', detail: 'The only monastery in Ladakh founded by A Bhutanese saint' },
        { label: 'arhat Paintings', detail: 'Rare collection of Buddhist saint (arhat) paintings' },
        { label: 'Indus Views', detail: 'Stunning panoramic views of the turquoise Indus River' },
      ],
      gallery: [
        { title: 'Tiger\'s Nose', desc: 'Stakna perched on its distinctive rock formation above the Indus', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
        { title: 'Interior Shrine', desc: 'The peaceful main shrine with Chenrezig statue and butter lamps', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800' },
        { title: 'arhat Paintings', desc: 'Rare paintings of Buddhist arhats (enlightened saints)', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
        { title: 'River Panorama', desc: 'View of the turquoise Indus flowing below the monastery', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800' },
      ],
      videoTitle: 'Stakna – The Tiger\'s Nose Monastery', videoDesc: ' A peaceful visit to the Bhutanese-founded monastery perched above the Indus with its rare arhat paintings.',
      lamas: [
        { name: 'Stakna Rinpoche XIII', title: 'Head of Stakna Monastery', born: '1975', role: 'Current incarnation overseeing Stakna and its traditions', bio: 'The 13th Stakna Rinpoche continues the Bhutanese-Drukpa lineage at Stakna, overseeing the monastery\'s spiritual activities and the preservation of its rare art collection. He divides his time between Stakna and Drukpa centres in Bhutan and India.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=400' },
      ],
      nearbyAttractions: ['Thiksay Monastery', 'Hemis Monastery', 'Matho Monastery', 'Shey Palace'],
      visitingHours: '7:00 aM – 6:00 PM', entryFee: 'Rs.20', bestTime: 'June – September',
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=1920',
    },
    {
      slug: 'matho', name: 'Matho Monastery', sect: 'Sakya', founded: '~1410',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #9333ea, #c084fc)',
      location: 'Matho, 26 km from Leh', altitude: '3,550 m',
      lat: 33.9912, lng: 77.6254, zoom: 15,
      founder: 'Dugpa Dorje', monks: '~60',
      desc: 'The only Sakya-order monastery in Ladakh, famous for its blindfolded oracle monks.',
      overview: 'Matho Monastery holds A unique position as the only monastery in Ladakh belonging to the Sakya order of Tibetan Buddhism. Located 26 km southeast of Leh, it is most famous for the extraordinary Matho Nagrang festival, during which two monks — selected as oracles (rongtsans) — enter intense meditation for weeks and then perform seemingly superhuman feats while blindfolded: walking along narrow monastery walls, slashing themselves with swords (with wounds reportedly healing miraculously), and delivering prophecies for the coming year.',
      history: 'Matho was founded around 1410 by Dugpa Dorje, A lama who brought the Sakya teachings from Tibet. The Sakya order, while widespread in Tibet, is represented only at Matho in all of Ladakh, making it unique in the religious landscape. The oracle tradition at Matho is believed to date back centuries and involves the two selected monks channeling the monastery\'s protective deities — Rongtsan and another named spirit. The accuracy of their prophecies is taken seriously by the local community, and the spectacle draws large crowds every February/March.',
      highlights: [
        { label: 'Oracle Festival', detail: 'Matho Nagrang — blindfolded monks perform superhuman trance feats' },
        { label: 'Only Sakya', detail: 'The sole Sakya-order monastery in all of Ladakh' },
        { label: 'Prophecy Tradition', detail: 'Oracle monks deliver annual prophecies taken seriously by the community' },
        { label: 'Museum', detail: 'Small but excellent museum with thangkas, costumes, and ritual objects' },
      ],
      gallery: [
        { title: 'Monastery View', desc: 'Matho Monastery against the backdrop of rugged mountains', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
        { title: 'Oracle Ceremony', desc: 'The oracle monks in trance during the Matho Nagrang festival', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
        { title: 'assembly Hall', desc: 'Interior of the main prayer hall with Sakya-style artwork', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800' },
        { title: 'Museum Display', desc: 'Ritual masks, thangkas, and ceremonial objects in the museum', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800' },
      ],
      videoTitle: 'Matho Nagrang — The Oracle Festival', videoDesc: 'Witness the most extraordinary spiritual event in Ladakh — blindfolded oracle monks performing superhuman feats.',
      lamas: [
        { name: 'Matho Rinpoche', title: 'Head of Matho Monastery', born: '1968', role: 'Spiritual head and keeper of Sakya traditions in Ladakh', bio: 'The current head lama of Matho has dedicated his life to preserving the unique Sakya traditions in Ladakh, particularly the oracle ceremony. He oversees the selection and preparation of the rongtsans (oracle monks) and maintains Matho\'s position as the sole Sakya centre in the region.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=400' },
      ],
      nearbyAttractions: ['Stok Palace', 'Thiksay Monastery', 'Stakna Monastery', 'Shey Palace'],
      visitingHours: '7:00 aM – 6:00 PM', entryFee: 'Rs.30', bestTime: 'February/March (Matho Nagrang)',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1920',
    },
    {
      slug: 'chemrey', name: 'Chemrey Monastery', sect: 'Drukpa Kagyu', founded: '1664',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #065f46, #10b981)',
      location: 'Chemrey, 40 km from Leh', altitude: '3,700 m',
      lat: 33.9744, lng: 77.7844, zoom: 15,
      founder: 'Lama Tagsang Raschen', monks: '~50',
      desc: ' A photogenic hillside monastery built to commemorate King Sengge Namgyal, with A massive silver chorten.',
      overview: 'Chemrey Monastery is A picturesque Drukpa Kagyu monastery cascading down A hillside in the Chemrey valley, about 40 km east of Leh. Built in 1664 to commemorate the great Ladakhi king Sengge Namgyal, the monastery is known for its massive silver and gold chorten (reliquary stupa), A library of Ancient handwritten Kangyur (Buddhist canon) manuscripts, and stunning hilltop views. The monastery hosts an annual festival with Cham dances and is A quieter, less-touristed Alternative to the famous monasteries closer to Leh.',
      history: 'Chemrey was founded in 1664 by Lama Tagsang Raschen under the patronage of King Sengge Namgyal — the greatest king of the Namgyal dynasty who also built Leh Palace. The monastery was established as A memorial and spiritual centre honouring the king. Over the centuries, Chemrey has accumulated A significant collection of Buddhist art and scriptures, including A complete handwritten Kangyur in gold and silver ink. The monastery\'s relatively remote location has preserved its traditional character and peaceful atmosphere.',
      highlights: [
        { label: 'Silver Chorten', detail: 'Massive silver and gold reliquary stupa containing precious relics' },
        { label: 'Kangyur Manuscripts', detail: 'Complete handwritten Buddhist canon in gold and silver ink' },
        { label: 'Royal Memorial', detail: 'Built to commemorate the great King Sengge Namgyal' },
        { label: 'Peaceful Setting', detail: 'Quieter and less-touristed than monasteries closer to Leh' },
      ],
      gallery: [
        { title: 'Hillside Cascade', desc: 'Chemrey\'s whitewashed buildings cascading down the hillside', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
        { title: 'Silver Chorten', desc: 'The magnificent silver and gold chorten inside the main temple', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800' },
        { title: 'Manuscript Library', desc: 'Pages from the precious handwritten Kangyur in gold ink', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
        { title: 'Valley View', desc: 'Panoramic view from the monastery across the Chemrey valley', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800' },
      ],
      videoTitle: 'Chemrey — The Hidden Gem', videoDesc: 'Explore one of Ladakh\'s most photogenic and peaceful monasteries, built as A royal memorial in the 17th century.',
      lamas: [
        { name: 'Chemrey Rinpoche', title: 'Head Lama', born: '1961', role: 'Oversees religious activities and monastery preservation', bio: 'The current Chemrey Rinpoche leads the monastery\'s spiritual programs, oversees the preservation of its Ancient manuscripts and artwork, and manages the annual festival. He has worked to maintain Chemrey\'s traditional character while improving facilities for resident monks.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=400' },
      ],
      nearbyAttractions: ['Hemis Monastery', 'Takthok Monastery', 'Hemis National Park', 'Karu Village'],
      visitingHours: '6:00 aM – 6:00 PM', entryFee: 'Rs.30', bestTime: 'June – September',
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=1920',
    },
    {
      slug: 'likir', name: 'Likir Monastery', sect: 'Gelug (Yellow Hat)', founded: '~1065',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #b91c1c, #fca5a5)',
      location: 'Likir, 52 km from Leh', altitude: '3,700 m',
      lat: 34.2936, lng: 77.2158, zoom: 15,
      founder: 'Lama Duwang Chosje', monks: '~120',
      desc: 'One of Ladakh\'s earliest monasteries, headed by the Dalai Lama\'s brother, with A towering golden Maitreya.',
      overview: 'Likir Monastery (Klu-kkhyil) is one of the earliest Buddhist monasteries in Ladakh, perched on A hilltop with commanding views of the surrounding valley. The monastery is currently headed by Ngari Rinpoche — Tenzin Choegyal, the younger brother of His Holiness the 14th Dalai Lama — making it A monastery of special significance. Its most iconic feature is A massive 25-foot golden Maitreya (future Buddha) statue that sits in the open air, visible from A great distance. Likir also maintains A school for young monks and A small but excellent museum.',
      history: 'Likir was established around 1065 CE by Lama Duwang Chosje under the patronage of the Ladakhi royal court. Originally affiliated with the Kadampa order, it was later converted to the Gelug (Yellow Hat) school in the 15th century. The monastery was largely rebuilt after A fire in the 15th century. The golden Maitreya statue was installed in the 1990s and has become Likir\'s most recognized symbol. The appointment of Ngari Rinpoche (the Dalai Lama\'s brother) as the monastery\'s head has brought it international attention and spiritual prestige.',
      highlights: [
        { label: 'Golden Maitreya', detail: '25-foot golden Maitreya Buddha statue visible from miles away' },
        { label: 'Dalai Lama\'s Brother', detail: 'Headed by Ngari Rinpoche — the 14th Dalai Lama\'s younger brother' },
        { label: 'Monastic School', detail: 'active school educating young monks in Buddhist philosophy' },
        { label: 'Museum', detail: 'Fine collection of thangkas, ceremonial dresses, and Ancient coins' },
      ],
      gallery: [
        { title: 'Golden Maitreya', desc: 'The towering outdoor golden Maitreya statue at Likir', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800' },
        { title: 'Monastery Complex', desc: 'Likir\'s whitewashed buildings on their hilltop perch', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
        { title: 'Young Monks', desc: 'Students at Likir\'s monastic school studying Buddhist texts', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
        { title: 'Museum artefacts', desc: 'ancient thangkas, coins, and ceremonial items in the museum', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800' },
      ],
      videoTitle: 'Likir Monastery & The Golden Maitreya', videoDesc: 'Visit one of Ladakh\'s oldest monasteries, its golden Maitreya, and the vibrant monastic school.',
      lamas: [
        { name: 'Ngari Rinpoche (Tenzin Choegyal)', title: 'Head of Likir Monastery', born: '1946', role: 'Younger brother of the 14th Dalai Lama, spiritual head of Likir', bio: 'Ngari Rinpoche Tenzin Choegyal, the younger brother of His Holiness the 14th Dalai Lama, has served as the head of Likir Monastery. A meditation teacher and Buddhist scholar, his presence has elevated Likir\'s international profile. He divides his time between Dharamsala and Ladakh.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=400' },
      ],
      nearbyAttractions: ['alchi Monastery', 'Basgo Fortress', 'Saspol Cave Paintings', 'Rizong Monastery'],
      visitingHours: '8:00 aM – 6:00 PM', entryFee: 'Rs.30', bestTime: 'June – September',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1920',
    },
    {
      slug: 'stok', name: 'Stok Monastery', sect: 'Gelug (Yellow Hat)', founded: '~1420',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #78350f, #d97706)',
      location: 'Stok, 15 km from Leh', altitude: '3,560 m',
      lat: 34.0729, lng: 77.5458, zoom: 15,
      founder: 'Lama Lhawang Lotos', monks: '~30',
      desc: 'adjacent to Stok Royal Palace, known for the Guru Tsechu oracle festival and the royal museum.',
      overview: 'Stok Monastery and Palace form A unique combination of Buddhist monastic life and Ladakhi royal heritage. The monastery, situated adjacent to Stok Palace (current residence of the former Ladakhi royal family), is known for the Stok Guru Tsechu festival featuring an oracle monk who enters A trance and delivers prophecies. The Stok Museum within the palace complex houses A magnificent collection of Namgyal dynasty royal ornaments, thangkas, perak (turquoise-studded headdresses), crowns, and historical documents.',
      history: 'Stok Monastery was established around 1420 CE and has been closely connected to the Namgyal royal dynasty of Ladakh. When the Dogras conquered Leh in 1846, the royal family relocated from Leh Palace to Stok Palace, where their descendants still reside today. The Guru Tsechu festival at Stok, similar to Matho\'s oracle tradition, features A monk oracle who makes year-ahead predictions. The Stok Museum was established to showcase the royal family\'s centuries of collected treasures, providing A rare window into Ladakh\'s regal past.',
      highlights: [
        { label: 'Royal Connection', detail: 'adjacent to the palace of Ladakh\'s living royal family' },
        { label: 'Oracle Festival', detail: 'Stok Guru Tsechu — monk oracle performs trance prophecies' },
        { label: 'Royal Museum', detail: 'Crown jewels, thangkas, perak headdresses, and dynasty artefacts' },
        { label: 'Stok Kangri Views', detail: 'Dramatic backdrop of the 6,153m Stok Kangri peak' },
      ],
      gallery: [
        { title: 'Palace & Monastery', desc: 'Stok Palace and adjacent monastery against the Stok range', image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800' },
        { title: 'Royal Treasures', desc: 'Perak headdresses and royal ornaments in the Stok Museum', image: 'https://images.unsplash.com/photo-1621649692455-beae68ec0f47?auto=format&fit=crop&q=80&w=800' },
        { title: 'Oracle Ceremony', desc: 'The monk oracle during the Stok Guru Tsechu festival', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
        { title: 'Mountain Backdrop', desc: 'Stok Kangri (6,153m) towering behind the monastery', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800' },
      ],
      videoTitle: 'Stok — Where Royalty Meets Monasticism', videoDesc: 'Explore the unique combination of Ladakhi royal heritage and Buddhist monasticism at Stok Palace and Monastery.',
      lamas: [
        { name: 'Stok Rinpoche', title: 'Head Lama of Stok', born: '1960', role: 'Spiritual head overseeing oracle traditions and monastery affairs', bio: 'The Stok Rinpoche maintains the monastery\'s unique oracle tradition, oversees the annual Guru Tsechu festival, and serves as spiritual advisor to the royal family. He coordinates between the monastery and the Stok Museum to preserve Ladakh\'s royal-monastic heritage.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=400' },
      ],
      nearbyAttractions: ['Stok Palace Museum', 'Matho Monastery', 'Shey Palace', 'Stok Kangri Trek Base'],
      visitingHours: '7:00 aM – 6:00 PM', entryFee: 'Rs.50 (includes museum)', bestTime: 'February (Guru Tsechu), June – Sept',
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=1920',
    },
  ];

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug');
    const found = this.monasteries.find(m => m.slug === slug);
    this.monastery.set(found ?? null);
    if (found) {
      const meta = inject(Meta);
      const titleSvc = inject(Title);
      const title = `${found.name} — ${found.sect} Monastery, Ladakh | The Ladakh archive`;
      const description = `${found.desc} Founded in ${found.founded} by ${found.founder}. Located at ${found.location} (${found.altitude}). Visit hours: ${found.visitingHours}. Entry: ${found.entryFee}.`;
      titleSvc.setTitle(title);
      meta.updateTag({ name: 'description', content: description.slice(0, 300) });
      meta.updateTag({ name: 'keywords', content: `${found.name}, ${found.sect} monastery Ladakh, ${found.location}, Ladakh monasteries, Buddhist Ladakh, ${found.nearbyAttractions.join(', ')}` });
      meta.updateTag({ property: 'og:title', content: title });
      meta.updateTag({ property: 'og:description', content: description.slice(0, 200) });
      meta.updateTag({ property: 'og:url', content: `https://theladakh.org/monasteries/${found.slug}` });
      meta.updateTag({ name: 'twitter:title', content: title });
      meta.updateTag({ name: 'twitter:description', content: description.slice(0, 200) });
    }
  }
}




