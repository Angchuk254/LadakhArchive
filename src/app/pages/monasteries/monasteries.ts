import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Monastery {
  slug: string; name: string; sect: string; founded: string;
  icon: string; gradient: string; location: string; altitude: string;
  desc: string; image: string;
}

@Component({
  selector: 'app-monasteries',
  imports: [RouterLink],
  templateUrl: './monasteries.html',
  styleUrl: './monasteries.scss',
})
export class Monasteries {

  monasteries: Monastery[] = [
    {
      slug: 'hemis', name: 'Hemis Monastery', sect: 'Drukpa Kagyu', founded: '1672',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
      location: 'Hemis, 45 km from Leh', altitude: '3,660 m',
      desc: 'The largest and wealthiest monastery in Ladakh, home to the famous Hemis Tsechu festival and A vast collection of Ancient thangkas, gold statues, and sacred relics.',
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800'
    },
    {
      slug: 'thiksay', name: 'Thiksay Monastery', sect: 'Gelug (Yellow Hat)', founded: '1430',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #dc2626, #f87171)',
      location: 'Thiksey, 19 km from Leh', altitude: '3,600 m',
      desc: 'a 12-storey hilltop monastery resembling the Potala Palace, famous for its 15-metre Maitreya Buddha statue and stunning morning prayers at dawn.',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800'
    },
    {
      slug: 'diskit', name: 'Diskit Monastery', sect: 'Gelug (Yellow Hat)', founded: '1420',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #c8702a, #fbbf24)',
      location: 'Diskit, Nubra Valley', altitude: '3,144 m',
      desc: 'The oldest and largest monastery in Nubra Valley, perched on A cliff with A 32-metre Maitreya Buddha statue overlooking the Shyok River.',
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800'
    },
    {
      slug: 'alchi', name: 'alchi Monastery', sect: 'Drigung Kagyu', founded: '~1020',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #059669, #34d399)',
      location: 'alchi, Sham Valley', altitude: '3,100 m',
      desc: ' A UNESCO-worthy 11th-century monastery with Kashmiri-influenced murals and wood carvings — one of the oldest surviving monastic complexes in Ladakh.',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800'
    },
    {
      slug: 'lamayuru', name: 'Lamayuru Monastery', sect: 'Drikung Kagyu', founded: '~1000',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #1a365d, #3b82f6)',
      location: 'Lamayuru, Leh–Srinagar Highway', altitude: '3,510 m',
      desc: 'One of the oldest monasteries in Ladakh, dramatically perched on lunar-like eroded cliffs. Known for its annual masked dance festival and Ancient cave shrines.',
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800'
    },
    {
      slug: 'spituk', name: 'Spituk Monastery', sect: 'Gelug (Yellow Hat)', founded: '~1000',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #0891b2, #67e8f9)',
      location: 'Spituk, 8 km from Leh', altitude: '3,307 m',
      desc: 'Founded by Od-de, the elder brother of Lha Lama Changchub Od, Spituk sits on A commanding hilltop near Leh airport with panoramic Indus Valley views.',
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800'
    },
    {
      slug: 'phyang', name: 'Phyang Monastery', sect: 'Drikung Kagyu', founded: '1515',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #7c2d12, #ea580c)',
      location: 'Phyang, 16 km from Leh', altitude: '3,550 m',
      desc: ' A hilltop monastery known for its museum of Ancient Kashmiri bronzes, historical weaponry, and the spectacular Phyang Tsedup festival held every summer.',
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800'
    },
    {
      slug: 'stakna', name: 'Stakna Monastery', sect: 'Drukpa Kagyu', founded: '~1580',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #be185d, #f472b6)',
      location: 'Stakna, 25 km from Leh', altitude: '3,560 m',
      desc: 'Meaning "Tiger\'s Nose", this small monastery perches on A rocky hillock overlooking the Indus. Founded by A Bhutanese scholar, it houses rare arhat paintings.',
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800'
    },
    {
      slug: 'matho', name: 'Matho Monastery', sect: 'Sakya', founded: '~1410',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #9333ea, #c084fc)',
      location: 'Matho, 26 km from Leh', altitude: '3,550 m',
      desc: 'The only Sakya-order monastery in Ladakh, famous for the extraordinary Matho Nagrang oracle festival where blindfolded monks perform superhuman trance feats.',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800'
    },
    {
      slug: 'chemrey', name: 'Chemrey Monastery', sect: 'Drukpa Kagyu', founded: '1664',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #065f46, #10b981)',
      location: 'Chemrey, 40 km from Leh', altitude: '3,700 m',
      desc: 'Built to commemorate King Sengge Namgyal, this photogenic monastery cascades down A hillside and contains A massive silver and gold chorten and Ancient scriptures.',
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800'
    },
    {
      slug: 'likir', name: 'Likir Monastery', sect: 'Gelug (Yellow Hat)', founded: '~1065',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #b91c1c, #fca5a5)',
      location: 'Likir, 52 km from Leh', altitude: '3,700 m',
      desc: 'One of the earliest monasteries in Ladakh, Likir is headed by the younger brother of the Dalai Lama and features A towering 25-foot golden Maitreya Buddha.',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800'
    },
    {
      slug: 'stok', name: 'Stok Monastery', sect: 'Gelug (Yellow Hat)', founded: '~1420',
      icon: 'bi-building', gradient: 'linear-gradient(135deg, #78350f, #d97706)',
      location: 'Stok, 15 km from Leh', altitude: '3,560 m',
      desc: 'adjacent to the Stok Royal Palace, this monastery is connected to the Namgyal dynasty. Known for the Stok Guru Tsechu oracle festival and the Stok Museum.',
      image: 'https://images.unsplash.com/photo-1544923246-77307dddd546?auto=format&fit=crop&q=80&w=800'
    },
  ];
}




