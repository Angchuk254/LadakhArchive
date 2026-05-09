import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LeafletMapComponent } from '../../shared/leaflet-map/leaflet-map';

interface Institution {
  slug: string; name: string; type: string; est: string; location: string;
  lat: number; lng: number; zoom?: number;
  desc: string; icon: string; color: string;
  image: string;
  heroImage: string;
  students: string; programs: string; highlights: string[];
  achievements: string[];
  programsList: { name: string; level: string }[];
}

@Component({
  selector: 'app-institution-detail',
  imports: [RouterLink, LeafletMapComponent],
  templateUrl: './institution-detail.html',
  styleUrl: './institution-detail.scss',
})
export class InstitutionDetail {
  private route = inject(ActivatedRoute);

  activeTab = signal<string>('overview');
  institution = signal<Institution | null>(null);

  setTab(tab: string) {
    this.activeTab.set(tab);
  }

  institutions: Institution[] = [
    {
      slug: 'university-of-ladakh', name: 'University of Ladakh', type: 'University', est: '2022', location: 'Leh',
      lat: 34.1526, lng: 77.5771, zoom: 15,
      desc: 'The first and only university in Ladakh UT, established to provide higher education locally. Offers undergraduate and postgraduate programs in arts, sciences, and professional courses. aims to reduce student migration.',
      icon: 'bi-bank2', color: '#1a365d',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&q=80&w=1600',
      students: '3,500+', programs: 'Ba, BSc, Ma, MSc, BCa, B.Ed',
      highlights: ['First university in Ladakh UT', 'Multiple affiliated colleges', 'Research focus on Himalayan studies', 'NEP 2020 compliant curriculum'],
      achievements: ['Established as Ladakh\'s first standalone university post-UT status', 'affiliated over 10 colleges across Leh and Kargil districts', 'Launched Himalayan Studies research centre', 'Secured UGC recognition within first year'],
      programsList: [{ name: 'Bachelor of arts', level: 'UG' }, { name: 'Bachelor of Science', level: 'UG' }, { name: 'Master of arts', level: 'PG' }, { name: 'Master of Science', level: 'PG' }, { name: 'BCa (Computer applications)', level: 'UG' }, { name: 'B.Ed (Education)', level: 'Professional' }],
    },
    {
      slug: 'secmol', name: 'SECMOL', type: 'alternative School', est: '1988', location: 'Phey, Leh',
      lat: 34.0950, lng: 77.4670, zoom: 14,
      desc: 'Founded by Sonam Wangchuk (inspiration for 3 Idiots), SECMOL uses innovative solar-powered campus, hands-on learning, and Ladakhi-medium instruction. Students learn by building, farming, and creating — not just textbooks.',
      icon: 'bi-lightbulb', color: '#dc2626',
      image: 'https://images.unsplash.com/photo-1509062522246-373b1e974501?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1509062522246-373b1e974501?auto=format&fit=crop&q=80&w=1600',
      students: '200+', programs: 'alternative Secondary Education',
      highlights: ['100% solar-powered campus', 'Learning by doing', 'Ladakhi-medium instruction', 'Ice Stupa innovation originated here'],
      achievements: ['Ice Stupa artificial glacier concept developed on campus', 'Featured in international documentaries and TED talks', 'Inspired the "3 Idiots" Bollywood film\'s school scenes', 'Graduated hundreds of students who were failed by the formal system'],
      programsList: [{ name: 'alternative Secondary Education', level: 'Secondary' }, { name: 'Practical Skills Training', level: 'Vocational' }, { name: 'Solar Engineering Workshop', level: 'Vocational' }],
    },
    {
      slug: 'lamdon-model-school', name: 'Lamdon Model School', type: 'Private School', est: '1974', location: 'Leh',
      lat: 34.1620, lng: 77.5850, zoom: 15,
      desc: 'One of the premier private schools of Ladakh under the Lamdon Social Welfare Society. Provides CBSE education with emphasis on holistic development, cultural preservation, and values. Multiple branches across Leh district.',
      icon: 'bi-award', color: '#c8702a',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1600',
      students: '2,800+', programs: 'K–12 CBSE',
      highlights: ['Multiple branches in Leh district', 'CBSE affiliated', 'Holistic cultural education', 'Strong academic track record'],
      achievements: ['Consistent 90%+ CBSE board pass rates', 'Expanded to 5 branches across Leh district', 'State-level toppers in multiple years', 'Pioneered cultural curriculum integration in Ladakh'],
      programsList: [{ name: 'Kindergarten', level: 'Pre-Primary' }, { name: 'Primary School (I-V)', level: 'Primary' }, { name: 'Middle School (VI-VIII)', level: 'Middle' }, { name: 'Secondary (IX-X)', level: 'Secondary' }, { name: 'Senior Secondary (XI-XII)', level: 'Sr. Secondary' }],
    },
    {
      slug: 'mahabodhi-residential-school', name: 'Mahabodhi Residential School', type: 'Residential School', est: '1986', location: 'Devachan, Leh',
      lat: 34.1200, lng: 77.5500, zoom: 15,
      desc: 'Run by the Mahabodhi International Meditation Centre, this school provides free education and boarding to underprivileged Buddhist children from remote villages. Integrates meditation and Buddhist values into modern education.',
      icon: 'bi-heart', color: '#7c3aed',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?auto=format&fit=crop&q=80&w=1600',
      students: '900+', programs: 'K–12 CBSE + Buddhist Studies',
      highlights: ['Free education for underprivileged', 'Meditation integrated curriculum', 'Students from remote villages', 'International volunteer teachers'],
      achievements: ['Provides free boarding and education to 900+ students', 'International meditation centre recognized globally', 'Volunteer teacher exchange program with multiple countries', 'Students consistently perform well in CBSE exams'],
      programsList: [{ name: 'Primary School (I-V)', level: 'Primary' }, { name: 'Middle School (VI-VIII)', level: 'Middle' }, { name: 'Secondary (IX-X)', level: 'Secondary' }, { name: 'Senior Secondary (XI-XII)', level: 'Sr. Secondary' }, { name: 'Buddhist Studies', level: 'Supplementary' }],
    },
    {
      slug: 'ejm-college', name: 'EJM College, Leh', type: 'Government College', est: '1976', location: 'Leh',
      lat: 34.1650, lng: 77.5800, zoom: 15,
      desc: 'Eliezer Joldan Memorial College is the oldest degree college in Ladakh, now affiliated to the University of Ladakh. Offers arts, science, and commerce programs. Central to higher education in the region for nearly 50 years.',
      icon: 'bi-building', color: '#2563eb',
      image: 'https://images.unsplash.com/photo-1523050335102-c32509535383?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1523050335102-c32509535383?auto=format&fit=crop&q=80&w=1600',
      students: '1,500+', programs: 'Ba, BSc, BCom, BCa',
      highlights: ['Oldest college in Ladakh', 'University of Ladakh affiliated', 'Wide range of UG programs', 'Campus expansion post-UT status'],
      achievements: ['Served as the only degree college in Ladakh for decades', 'Produced many of Ladakh\'s current leaders and professionals', 'Successfully transitioned from J&K affiliation to University of Ladakh', 'New campus construction underway with modern facilities'],
      programsList: [{ name: 'Bachelor of arts', level: 'UG' }, { name: 'Bachelor of Science', level: 'UG' }, { name: 'Bachelor of Commerce', level: 'UG' }, { name: 'BCa (Computer applications)', level: 'UG' }],
    },
    {
      slug: 'imamia-model-school', name: 'Imamia Model School, Kargil', type: 'Private School', est: '1993', location: 'Kargil',
      lat: 34.5551, lng: 76.1349, zoom: 15,
      desc: 'Premier private school of Kargil district catering to students from the Shia Muslim community and beyond. Known for strong academic results and community development initiatives across rural Kargil.',
      icon: 'bi-book', color: '#059669',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1600',
      students: '1,200+', programs: 'K–12 CBSE',
      highlights: ['Top school in Kargil district', 'Community-driven education', 'Strong CBSE results', 'Rural outreach programs'],
      achievements: ['Highest pass percentage among Kargil schools consistently', 'Community scholarship fund supporting underprivileged students', 'Rural outreach centers in remote villages of Kargil', 'State-level science exhibition winners'],
      programsList: [{ name: 'Kindergarten', level: 'Pre-Primary' }, { name: 'Primary School (I-V)', level: 'Primary' }, { name: 'Middle School (VI-VIII)', level: 'Middle' }, { name: 'Secondary (IX-X)', level: 'Secondary' }, { name: 'Senior Secondary (XI-XII)', level: 'Sr. Secondary' }],
    },
  ];

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug');
    const found = this.institutions.find(i => i.slug === slug);
    this.institution.set(found ?? null);
  }
}




