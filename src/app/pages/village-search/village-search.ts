import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

interface Village {
  name: string;
  slug: string;
  block: string;
  district: 'Leh' | 'Kargil';
  pincode: string;
  elevation: string;
  population: number;
  coordinates: string;
  history: string;
  nearbyPlaces: string[];
  facilities: string[];
  knownFor: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-village-search',
  standalone: true,
  imports: [RouterLink, FormsModule, DecimalPipe],
  templateUrl: './village-search.html',
  styleUrl: './village-search.scss',
})
export class VillageSearch {

  query = signal('');

  villages: Village[] = [
    {
      name: 'Leh', slug: 'leh', block: 'Leh', district: 'Leh', pincode: '194101',
      elevation: '3,524 m', population: 30870, coordinates: '34.1526Âa N, 77.5771Âa E',
      history: 'Leh was the capital of the Himalayan kingdom of Ladakh, an important stopover on ancient trade routes along the Indus Valley between Tibet and Central Asia. The town became part of India after independence in 1947.',
      nearbyPlaces: ['Shanti Stupa', 'Leh Palace', 'Namgyal Tsemo', 'Sankar Monastery', 'Hall of Fame'],
      facilities: ['District Hospital', 'KVK airport', 'army Cantonment', 'Universities', 'Banks'],
      knownFor: 'Capital of Ladakh, ancient trade hub, Leh Palace', icon: 'bi-building', color: '#1a365d',
    },
    {
      name: 'Diskit', slug: 'diskit', block: 'Nubra', district: 'Leh', pincode: '194401',
      elevation: '3,144 m', population: 2008, coordinates: '34.5321Âa N, 77.5600Âa E',
      history: 'Diskit is the headquarters of the Nubra tehsil. It is renowned for its 14th-century Diskit Monastery, the oldest and largest in the Nubra Valley. The 32-metre Maitreya Buddha statue was inaugurated in 2010.',
      nearbyPlaces: ['Diskit Monastery', 'Hunder Sand Dunes', 'Maitreya Buddha Statue', 'Sumur', 'Panamik Hot Springs'],
      facilities: ['PHC', 'Schools', 'Police Station', 'Petrol Pump'],
      knownFor: 'Diskit Gompa, Nubra gateway, Maitreya Buddha', icon: 'bi-flag', color: '#c8702a',
    },
    {
      name: 'Hunder', slug: 'hunder', block: 'Nubra', district: 'Leh', pincode: '194401',
      elevation: '3,050 m', population: 1520, coordinates: '34.5833Âa N, 77.4833Âa E',
      history: 'Hunder was once an important halt on the ancient Silk Road trade route to Kashgar. It is famous for its cold desert sand dunes and the rare double-humped Bactrian camels, remnants of the caravan era.',
      nearbyPlaces: ['Hunder Sand Dunes', 'Diskit Monastery', 'Hunder Monastery', 'Turtuk', 'Sumur'],
      facilities: ['Guest Houses', 'Camping Sites', 'Schools'],
      knownFor: 'Bactrian camels, sand dunes, Silk Road heritage', icon: 'bi-umbrella', color: '#059669',
    },
    {
      name: 'Hemis', slug: 'hemis', block: 'Leh', district: 'Leh', pincode: '194101',
      elevation: '3,660 m', population: 890, coordinates: '33.9174Âa N, 77.7081Âa E',
      history: 'Hemis village is home to Hemis Monastery, the largest and wealthiest Buddhist monastery in Ladakh. Founded in 1672 by Stagsang Raspa Nawang Gyatso, the monastery hosts the famous Hemis Tsechu festival.',
      nearbyPlaces: ['Hemis Monastery', 'Hemis National Park', 'Gotsang Gompa', 'Chemrey Monastery', 'Thag Thok Monastery'],
      facilities: ['Monastery School', 'Hemis National Park Office', 'Guest Houses'],
      knownFor: 'Hemis Gompa, Hemis Festival, Snow Leopard habitat', icon: 'bi-bank', color: '#7c3aed',
    },
    {
      name: 'Turtuk', slug: 'turtuk', block: 'Nubra', district: 'Leh', pincode: '194401',
      elevation: '2,900 m', population: 2850, coordinates: '34.8500Âa N, 76.8333Âa E',
      history: 'Turtuk was part of Baltistan under Pakistani control until the Indian army captured it in the 1971 Indo-Pak war. This Balti village, the last inhabited settlement before the LOC, was opened to tourists only in 2010.',
      nearbyPlaces: ['Tyakshi Village', 'Turtuk Museum', 'apricot Orchards', 'Shyok River', 'Thang'],
      facilities: ['Schools', 'PHC', 'army Posts', 'Homestays'],
      knownFor: 'Last village on LOC, Balti culture, apricots', icon: 'bi-geo-alt', color: '#dc2626',
    },
    {
      name: 'Pangong', slug: 'pangong', block: 'Durbuk', district: 'Leh', pincode: '194401',
      elevation: '4,350 m', population: 340, coordinates: '33.7595Âa N, 78.6643Âa E',
      history: 'The settlement near Pangong Tso (lake) is among the highest inhabited places in Ladakh. The 134 km long endorheic lake extends from India to China and changes colour from azure to turquoise to deep blue.',
      nearbyPlaces: ['Pangong Lake', 'Spangmik', 'Merak Village', 'Man Village', 'Chang La Pass'],
      facilities: ['Camping Sites', 'army Post', 'Basic Shops'],
      knownFor: 'Pangong Tso, colour-shifting lake, 3 Idiots location', icon: 'bi-water', color: '#0284c7',
    },
    {
      name: 'Kargil', slug: 'kargil', block: 'Kargil', district: 'Kargil', pincode: '194103',
      elevation: '2,676 m', population: 16338, coordinates: '34.5551Âa N, 76.1349Âa E',
      history: 'Kargil is the second largest town in Ladakh and headquarter of Kargil district. It was a strategic point during the 1999 Kargil War. Historically, it was a major stopover on the trade route from Srinagar to Leh.',
      nearbyPlaces: ['Kargil War Memorial', 'Suru Valley', 'Mulbekh Monastery', 'Dras', 'Hunderman'],
      facilities: ['District Hospital', 'airport', 'Banks', 'Colleges', 'army Cantonment'],
      knownFor: 'Kargil War Memorial, Suru Valley gateway, Purig culture', icon: 'bi-shield', color: '#0f2240',
    },
    {
      name: 'Dras', slug: 'dras', block: 'Dras', district: 'Kargil', pincode: '194102',
      elevation: '3,230 m', population: 1201, coordinates: '34.4318Âa N, 75.7552Âa E',
      history: 'Dras is the second coldest inhabited place in the world, with temperatures dropping to -60ÂaC. It was the main theatre of the 1999 Kargil conflict. The Dras War Memorial commemorates the fallen soldiers.',
      nearbyPlaces: ['Dras War Memorial', 'Tiger Hill', 'Tololing', 'Mushkoh Valley', 'Zoji La Pass'],
      facilities: ['army Hospital', 'Schools', 'War Memorial Complex'],
      knownFor: 'Second coldest inhabited place, Kargil War theatre', icon: 'bi-snow', color: '#475264',
    },
    {
      name: 'Zanskar (Padum)', slug: 'padum', block: 'Zanskar', district: 'Kargil', pincode: '194302',
      elevation: '3,657 m', population: 1862, coordinates: '33.4603Âa N, 76.8856Âa E',
      history: 'Padum is the capital of the Zanskar sub-division. The Zanskar Valley was an independent Buddhist kingdom until the 10th century. It remains one of the most isolated inhabited regions in India, cut off for 6 months in winter.',
      nearbyPlaces: ['Karsha Monastery', 'Phuktal Monastery', 'Zangla Fort', 'Stongdey Gompa', 'Chadar Trek Route'],
      facilities: ['PHC', 'Schools', 'Government Offices', 'Helicopter Pad'],
      knownFor: 'Chadar Trek, remote Buddhist kingdom, frozen river walks', icon: 'bi-snow2', color: '#6d28d9',
    },
    {
      name: 'Thiksey', slug: 'thiksey', block: 'Leh', district: 'Leh', pincode: '194101',
      elevation: '3,600 m', population: 560, coordinates: '33.9128Âa N, 77.6677Âa E',
      history: 'Thiksey village is dominated by the 12-storey Thiksey Monastery, one of the most impressive gompas in Ladakh. Founded in the 15th century, the monastery bears a resemblance to the Potala Palace in Lhasa.',
      nearbyPlaces: ['Thiksey Monastery', 'Stakna Monastery', 'Shey Palace', 'Hemis', 'Stok Palace'],
      facilities: ['Monastery School', 'Guest Houses', 'CafÃ©s'],
      knownFor: 'Thiksey Gompa, Mini Potala, morning prayer ceremony', icon: 'bi-building', color: '#b45309',
    },
    {
      name: 'Lamayuru', slug: 'lamayuru', block: 'Khalatse', district: 'Leh', pincode: '194106',
      elevation: '3,510 m', population: 410, coordinates: '34.2833Âa N, 76.8000Âa E',
      history: 'Lamayuru, or Yuru as it is locally known, hosts one of the oldest monasteries in Ladakh, dating back to the 10th century. The surrounding moonland landscape with its dramatic erosion patterns attracts visitors worldwide.',
      nearbyPlaces: ['Lamayuru Monastery', 'Moonland', 'alchi Monastery', 'Wanla Gompa', 'Fotu La Pass'],
      facilities: ['Guest Houses', 'Monastery', 'Basic Shops'],
      knownFor: 'Moonland landscape, ancient monastery, butter festivals', icon: 'bi-moon', color: '#854d0e',
    },
    {
      name: 'Hanle', slug: 'hanle', block: 'Nyoma', district: 'Leh', pincode: '194404',
      elevation: '4,500 m', population: 320, coordinates: '32.7833Âa N, 78.9833Âa E',
      history: 'Hanle is home to the Indian astronomical Observatory (IaO), one of the highest optical and infrared telescopes in the world. The 17th-century Hanle Monastery was built by the Ladakhi king Sengge Namgyal.',
      nearbyPlaces: ['Hanle Observatory', 'Hanle Monastery', 'Hanle Dark Sky Reserve', 'Umlingla Pass', 'Chumur'],
      facilities: ['Observatory', 'army Post', 'IBO Wildlife Station'],
      knownFor: 'Dark Sky Reserve, astronomical observatory, 17th century monastery', icon: 'bi-stars', color: '#1e3a5f',
    },
    {
      name: 'Chumathang', slug: 'chumathang', block: 'Nyoma', district: 'Leh', pincode: '194404',
      elevation: '4,100 m', population: 280, coordinates: '33.3500Âa N, 78.2667Âa E',
      history: 'Chumathang is known for its natural hot springs along the Indus River, with water temperatures reaching 80ÂaC. The village sits on a geothermal zone, and the springs have been used for centuries for bathing and healing.',
      nearbyPlaces: ['Chumathang Hot Springs', 'Kiari Village', 'Nyoma', 'Tso Moriri', 'Indus River'],
      facilities: ['Hot Spring Bathing area', 'army Camp', 'Basic Shops'],
      knownFor: 'Natural hot springs, geothermal energy, Indus Valley scenery', icon: 'bi-droplet-half', color: '#d97706',
    },
    {
      name: 'Chilling', slug: 'chilling', block: 'Leh', district: 'Leh', pincode: '194101',
      elevation: '3,100 m', population: 190, coordinates: '34.0833Âa N, 77.3167Âa E',
      history: 'Chilling village is famous for its traditional copper-smithing, a craft introduced by Nepali artisans centuries ago. The village produces copper and brass utensils which are highly valued across Ladakh and beyond.',
      nearbyPlaces: ['Markha Valley', 'Zanskar River', 'Nimmu', 'Confluence Point', 'Hemis NP'],
      facilities: ['Copperware Workshops', 'Homestays'],
      knownFor: 'Copper craftsmanship, Markha Valley trailhead, Zanskar confluence', icon: 'bi-hammer', color: '#92400e',
    },
    {
      name: 'Tso Kar', slug: 'tso-kar', block: 'Nyoma', district: 'Leh', pincode: '194404',
      elevation: '4,530 m', population: 110, coordinates: '33.3167Âa N, 77.9500Âa E',
      history: 'Tso Kar is a high-altitude salt lake surrounded by Changpa nomadic camps. The lake was historically mined for salt by the Changpa people and traded along the Silk Road. In 2022 it was added to the Ramsar Convention as a Wetland of International Importance.',
      nearbyPlaces: ['Tso Kar Lake', 'Thugje Gompa', 'Puga Hot Springs', 'Tso Moriri', 'Polokong La'],
      facilities: ['Nomadic Camps', 'Wildlife Station'],
      knownFor: 'Ramsar wetland, salt lake, Changpa nomads, Black-necked Cranes', icon: 'bi-droplet', color: '#1e40af',
    },
  ];

  filteredVillages = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.villages;
    return this.villages.filter(
      v => v.name.toLowerCase().includes(q)
        || v.pincode.includes(q)
        || v.block.toLowerCase().includes(q)
        || v.district.toLowerCase().includes(q)
    );
  });

  stats = [
    { icon: 'bi-houses', value: '130+', label: 'Villages' },
    { icon: 'bi-geo-alt', value: '2', label: 'Districts' },
    { icon: 'bi-rulers', value: '59,146', label: 'Sq Km area' },
    { icon: 'bi-people', value: '2.74L', label: 'Population' },
  ];
}




