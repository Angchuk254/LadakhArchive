import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education {
  /* â”€â”€ Stats â”€â”€ */
  stats = [
    { icon: 'bi-mortarboard', value: '82.3%', label: 'Literacy Rate (2021)' },
    { icon: 'bi-building', value: '1,200+', label: 'Schools' },
    { icon: 'bi-bank2', value: '12', label: 'Colleges & Universities' },
    { icon: 'bi-people', value: '95,000+', label: 'Students Enrolled' },
    { icon: 'bi-person-workspace', value: '8,500+', label: 'Teachers' },
    { icon: 'bi-book', value: '350+', label: 'Monastery Schools' },
  ];

  /* â”€â”€ Historical Timeline â”€â”€ */
  timeline = [
    {
      year: '7thâ€“11th Century',
      title: 'Monastic Education & Translation',
      desc: 'Monasteries become the primary centres of learning. The era of the Great Translator Lotsawa Rinchen Zangpo establishes foundational schools of philosophy, Tibetan script, astronomy, and medicine in places like alchi and Lamayuru.',
      icon: 'bi-building',
      color: '#7c3aed',
      image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800',
    },
    {
      year: '15th-17th Century',
      title: 'Islamic & Persian Scholarship',
      desc: 'With the spread of Islam in Kargil and Baltistan, maktabs and madrasas are established. Scholarship in arabic, Persian, Quranic studies, and mathematics begins to flourish alongside indigenous traditions.',
      icon: 'bi-journal-bookmark',
      color: '#0d9488',
    },
    {
      year: '1889',
      title: 'First Modern School â€” Moravian Mission',
      desc: 'The Moravian Mission establishes the first Western-style school in Leh, introducing English, modern science, and printing press technology. This lays the groundwork for secular education in Ladakh.',
      icon: 'bi-flag',
      color: '#c8702a',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
    },
    {
      year: '1947â€“1960s',
      title: 'Post-Independence Expansion',
      desc: 'Following independence, the Indian government opens the first state-run primary schools across Ladakh. Despite these efforts, harsh geography keeps overall literacy below 10%.',
      icon: 'bi-sunrise',
      color: '#2563eb',
    },
    {
      year: '1973',
      title: 'Lamdon Social Welfare Society',
      desc: 'Founded by a group of visionary young Ladakhis, the Lamdon Society is established to promote health, culture, and education, eventually leading to the creation of the prestigious Lamdon Model School.',
      icon: 'bi-house-heart',
      color: '#059669',
    },
    {
      year: '1988',
      title: 'SECMOL & The Students Movement',
      desc: 'Sonam Wangchuk and peers found SECMOL to tackle the staggering failure rate of Ladakhi students in state exams. They pioneer Ladakhi-medium instruction, practical learning, and solar-heated campuses.',
      icon: 'bi-lightbulb',
      color: '#dc2626',
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800',
    },
    {
      year: '1994',
      title: 'Operation New Hope',
      desc: 'a landmark collaboration between the local government, SECMOL, and village communities to overhaul the primary education system, localize textbooks, and train village teachers. Literacy and pass rates soar.',
      icon: 'bi-globe',
      color: '#f59e0b',
    },
    {
      year: '2000s',
      title: 'Higher Education arrives',
      desc: 'Eliezer Joldan Memorial College expands, and government degree colleges open in Kargil, Zanskar, and Nubra. ICT labs and computer education slowly reach rural outposts.',
      icon: 'bi-pc-display',
      color: '#7c3aed',
    },
    {
      year: '2019â€“Present',
      title: 'UT Status & University of Ladakh',
      desc: 'Following UT status, Ladakh gains direct central funding. The University of Ladakh is formally established in 2022. The implementation of NEP 2020 begins, emphasizing multilingual and vocational education.',
      icon: 'bi-rocket-takeoff',
      color: '#0d9488',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800',
    },
  ];

  /* â”€â”€ Literacy Graph Data (per Census / UDISE) â”€â”€ */
  literacyData = [
    { year: '1961', male: 7.0, female: 1.2, overall: 4.2 },
    { year: '1971', male: 15.8, female: 3.4, overall: 10.0 },
    { year: '1981', male: 26.3, female: 7.1, overall: 17.1 },
    { year: '1991', male: 41.2, female: 15.1, overall: 28.7 },
    { year: '2001', male: 56.3, female: 30.4, overall: 43.9 },
    { year: '2011', male: 77.2, female: 58.5, overall: 67.4 },
    { year: '2021', male: 90.1, female: 74.6, overall: 82.3 },
  ];

  /* â”€â”€ School Distribution Donut â”€â”€ */
  schoolDistribution = [
    { label: 'Government Schools', value: 48, color: '#2563eb' },
    { label: 'Private Schools', value: 22, color: '#c8702a' },
    { label: 'Monastery Schools', value: 18, color: '#7c3aed' },
    { label: 'Madrasa / Maktab', value: 7, color: '#059669' },
    { label: 'NGO-Run Schools', value: 5, color: '#dc2626' },
  ];

  /* â”€â”€ Enrollment by Level (bar chart data) â”€â”€ */
  enrollmentData = [
    { level: 'Primary (Iâ€“V)', boys: 28500, girls: 26200, color: '#2563eb' },
    { level: 'Upper Primary (VIâ€“VIII)', boys: 14200, girls: 13800, color: '#7c3aed' },
    { level: 'Secondary (IXâ€“X)', boys: 8400, girls: 7900, color: '#c8702a' },
    { level: 'Sr. Secondary (XIâ€“XII)', boys: 4200, girls: 3800, color: '#059669' },
    { level: 'Higher Education', boys: 3100, girls: 2800, color: '#dc2626' },
  ];

  /* â”€â”€ Key Institutions â”€â”€ */
  institutions = [
    {
      name: 'University of Ladakh',
      slug: 'university-of-ladakh',
      type: 'University',
      est: '2022',
      location: 'Leh',
      desc: 'The first and only university in Ladakh UT, established to provide higher education locally. Offers undergraduate and postgraduate programs in arts, sciences, and professional courses. aims to reduce student migration.',
      icon: 'bi-bank2',
      color: '#1a365d',
      students: '3,500+',
      programs: 'Ba, BSc, Ma, MSc, BCa, B.Ed',
      highlights: ['First university in Ladakh UT', 'Multiple affiliated colleges', 'Research focus on Himalayan studies', 'NEP 2020 compliant curriculum'],
    },
    {
      name: 'SECMOL',
      slug: 'secmol',
      type: 'alternative School',
      est: '1988',
      location: 'Phey, Leh',
      desc: 'Founded by Sonam Wangchuk (inspiration for 3 Idiots), SECMOL uses innovative solar-powered campus, hands-on learning, and Ladakhi-medium instruction. Students learn by building, farming, and creating â€” not just textbooks.',
      icon: 'bi-lightbulb',
      color: '#dc2626',
      students: '200+',
      programs: 'alternative Secondary Education',
      highlights: ['100% solar-powered campus', 'Learning by doing', 'Ladakhi-medium instruction', 'Ice Stupa innovation originated here'],
    },
    {
      name: 'Lamdon Model School',
      slug: 'lamdon-model-school',
      type: 'Private School',
      est: '1974',
      location: 'Leh',
      desc: 'One of the premier private schools of Ladakh under the Lamdon Social Welfare Society. Provides CBSE education with emphasis on holistic development, cultural preservation, and values. Multiple branches across Leh district.',
      icon: 'bi-award',
      color: '#c8702a',
      students: '2,800+',
      programs: 'Kâ€“12 CBSE',
      highlights: ['Multiple branches in Leh district', 'CBSE affiliated', 'Holistic cultural education', 'Strong academic track record'],
    },
    {
      name: 'Mahabodhi Residential School',
      slug: 'mahabodhi-residential-school',
      type: 'Residential School',
      est: '1986',
      location: 'Devachan, Leh',
      desc: 'Run by the Mahabodhi International Meditation Centre, this school provides free education and boarding to underprivileged Buddhist children from remote villages. Integrates meditation and Buddhist values into modern education.',
      icon: 'bi-heart',
      color: '#7c3aed',
      students: '900+',
      programs: 'Kâ€“12 CBSE + Buddhist Studies',
      highlights: ['Free education for underprivileged', 'Meditation integrated curriculum', 'Students from remote villages', 'International volunteer teachers'],
    },
    {
      name: 'EJM College, Leh',
      slug: 'ejm-college',
      type: 'Government College',
      est: '1976',
      location: 'Leh',
      desc: 'Eliezer Joldan Memorial College is the oldest degree college in Ladakh, now affiliated to the University of Ladakh. Offers arts, science, and commerce programs. Central to higher education in the region for nearly 50 years.',
      icon: 'bi-building',
      color: '#2563eb',
      students: '1,500+',
      programs: 'Ba, BSc, BCom, BCa',
      highlights: ['Oldest college in Ladakh', 'University of Ladakh affiliated', 'Wide range of UG programs', 'Campus expansion post-UT status'],
    },
    {
      name: 'Imamia Model School, Kargil',
      slug: 'imamia-model-school',
      type: 'Private School',
      est: '1993',
      location: 'Kargil',
      desc: 'Premier private school of Kargil district catering to students from the Shia Muslim community and beyond. Known for strong academic results and community development initiatives across rural Kargil.',
      icon: 'bi-book',
      color: '#059669',
      students: '1,200+',
      programs: 'Kâ€“12 CBSE',
      highlights: ['Top school in Kargil district', 'Community-driven education', 'Strong CBSE results', 'Rural outreach programs'],
    },
  ];

  /* â”€â”€ Challenges â”€â”€ */
  challenges = [
    { icon: 'bi-snow2', title: 'Harsh Winter Closures', desc: '6-month winters force school closures in remote areas. Many students cannot attend classes from Novâ€“april. Hostels and seasonal scheduling are partial solutions.' },
    { icon: 'bi-wifi-off', title: 'Digital Divide', desc: 'Internet connectivity is poor or absent in most villages. Online learning during COVID was nearly impossible in remote areas like Zanskar, Changthang, and Nubra.' },
    { icon: 'bi-person-x', title: 'Teacher Shortage', desc: 'Qualified teachers are reluctant to serve in high-altitude remote postings. Vacancies remain unfilled for years. Student-teacher ratios suffer, especially in government schools.' },
    { icon: 'bi-box-arrow-right', title: 'Student Migration', desc: 'Most students leave Ladakh after 10th or 12th for higher education in Jammu, Delhi, or Chandigarh. This brain drain weakens local communities and workforce development.' },
    { icon: 'bi-translate', title: 'Language Barriers', desc: 'Education is in Hindi/English while students speak Ladakhi, Balti, or Purgi at home. This creates comprehension gaps. Ladakhi-medium education exists only in some SECMOL-style schools.' },
    { icon: 'bi-currency-rupee', title: 'Infrastructure Gaps', desc: 'Many rural schools lack proper buildings, labs, libraries, and heating systems. Science and computer labs are rare outside Leh and Kargil towns.' },
  ];

  /* â”€â”€ Government Initiatives â”€â”€ */
  initiatives = [
    { icon: 'bi-laptop', title: 'Digital Ladakh Classrooms', desc: 'Central govt funded smart classroom project providing projectors, tablets, and e-learning content to 300+ schools across both districts.', year: '2023', color: '#2563eb' },
    { icon: 'bi-house-door', title: 'Residential School Expansion', desc: 'New residential schools built in Zanskar, Nubra, and Changthang to ensure children in remote areas get continuous education through winter.', year: '2021', color: '#059669' },
    { icon: 'bi-tools', title: 'Vocational Training Centres', desc: 'ITIs and skill development centres established in Leh and Kargil offering courses in solar technology, tourism, carpentry, and IT.', year: '2022', color: '#c8702a' },
    { icon: 'bi-globe2', title: 'NEP 2020 Implementation', desc: 'Multilingual education policy implementation began â€” Ladakhi and Balti introduced as medium of instruction in early grades alongside Hindi and English.', year: '2024', color: '#7c3aed' },
    { icon: 'bi-broadcast', title: 'Internet Connectivity Drive', desc: 'BharatNet and BSNL 4G expansion to connect remote schools. Starlink trials proposed for Changthang plateau schools.', year: '2025', color: '#dc2626' },
    { icon: 'bi-person-badge', title: 'Teacher Training Programs', desc: 'Special B.Ed and D.El.Ed programs launched at University of Ladakh to train local teachers and reduce dependence on outside recruits.', year: '2023', color: '#0d9488' },
  ];

  /* â”€â”€ Notable Contributors â”€â”€ */
  contributors = [
    {
      name: 'Sonam Wangchuk',
      title: 'Founder, SECMOL & HIaL',
      desc: 'Engineer, innovator, and education reformer. Founded SECMOL in 1988 to reform Ladakh\'s failing education system. Created the Ice Stupa project. His work inspired the Bollywood film "3 Idiots". Champion of sustainable education and Ladakhi-medium instruction.',
      icon: 'bi-lightbulb',
      color: '#dc2626',
      achievements: ['Founded SECMOL (1988)', 'Rolex award for Enterprise (2016)', 'Ice Stupa Innovation', 'Inspired "3 Idiots" film', 'Ramon Magsaysay award (2018)'],
    },
    {
      name: 'Geshe Ngawang Samten',
      title: 'Monastic Education Reformer',
      desc: 'Renowned Buddhist scholar who modernised monastic education in Ladakh by integrating secular subjects alongside traditional Buddhist philosophy. advocated for science education in monasteries.',
      icon: 'bi-book',
      color: '#7c3aed',
      achievements: ['Modernised monastery curriculum', 'Secular-monastic education bridge', 'Buddhist philosophy professor', 'Multiple publications'],
    },
    {
      name: 'Bhikkhu Sanghasena',
      title: 'Founder, Mahabodhi Centre',
      desc: 'Buddhist monk who established the Mahabodhi International Meditation Centre and its affiliated schools, providing free education to thousands of underprivileged children from remote Ladakhi villages since 1986.',
      icon: 'bi-heart',
      color: '#059669',
      achievements: ['Founded Mahabodhi Schools', 'Free education for 900+ children', 'International outreach', 'Peace education advocate'],
    },
    {
      name: 'Moravian Missionaries',
      title: 'Pioneers of Modern Education (1889)',
      desc: 'The Moravian Mission from Germany established the first modern school in Ladakh in 1889. They introduced English, science, and printing press technology. The Moravian Mission School in Leh operated for decades and produced many of Ladakh\'s early educated leaders.',
      icon: 'bi-flag',
      color: '#c8702a',
      achievements: ['First modern school (1889)', 'Introduced English & Science', 'Printing press in Leh', 'Trained early Ladakhi leaders'],
    },
    {
      name: 'Tsewang Norboo',
      title: 'First Ladakhi IaS Officer & Educator',
      desc: 'a pioneer of education advocacy in Ladakh. as the first Ladakhi IaS officer, he tirelessly pushed for school construction, teacher recruitment, and education policy reforms for the region throughout his career.',
      icon: 'bi-person-badge',
      color: '#2563eb',
      achievements: ['First Ladakhi IaS officer', 'School infrastructure expansion', 'Policy reform advocate', 'Ladakh education champion'],
    },
    {
      name: 'Dr. Padma Dolma',
      title: 'Women\'s Education Pioneer',
      desc: 'One of the first Ladakhi women to earn a doctorate. She championed girls\' education in remote villages, established women\'s literacy programs, and mentored hundreds of young Ladakhi women to pursue higher education.',
      icon: 'bi-gender-female',
      color: '#ec4899',
      achievements: ['First Ladakhi woman PhD', 'Girls education advocate', 'Women literacy programs', 'Mentored 500+ women students'],
    },
  ];

  /* â”€â”€ Traditional Education Systems â”€â”€ */
  traditionalSystems = [
    { icon: 'bi-building', name: 'Monastic Schools (Gompas)', desc: 'The oldest form of education in Ladakh. Young monks join at age 5â€“7 and study Buddhist texts, Tibetan script, philosophy, astrology, medicine, and ritual arts for 10â€“20 years. Major centres: Hemis, Thiksey, Spituk, Diskit.', color: '#7c3aed', subjects: ['Buddhist Philosophy', 'Tibetan Script', 'astronomy', 'Medicine', 'Thangka art'] },
    { icon: 'bi-journal-text', name: 'Maktab & Madrasa', desc: 'Islamic educational institutions primarily in Kargil district. Teach arabic, Persian/Urdu, Quran, Islamic jurisprudence, and basic literacy. Some now integrate modern subjects alongside religious education.', color: '#059669', subjects: ['arabic & Persian', 'Quran Studies', 'Islamic Jurisprudence', 'Urdu Literature', 'Mathematics'] },
    { icon: 'bi-house', name: 'amchi (Traditional Medicine)', desc: 'Ladakh\'s unique Sowa Rigpa medical tradition passed down through apprenticeship. amchi physicians study herbal medicine, pulse diagnosis, and Buddhist healing methods for years under a master amchi.', color: '#c8702a', subjects: ['Herbal Medicine', 'Pulse Diagnosis', 'Buddhist Healing', 'Mineral Therapy', 'anatomy'] },
    { icon: 'bi-palette', name: 'artisan apprenticeships', desc: 'Traditional crafts like thangka painting, wood carving, metalwork, and weaving are taught through family lineage and master-apprentice relationships. These skills are now at risk without formal recognition.', color: '#dc2626', subjects: ['Thangka Painting', 'Wood Carving', 'Metalwork', 'Pashmina Weaving', 'Pottery'] },
  ];

  /* â”€â”€ Future Vision â”€â”€ */
  futureVision = [
    { icon: 'bi-rocket-takeoff', title: 'University of Ladakh Expansion', desc: 'Plans to expand into a full-fledged multi-campus university with engineering, medical, and research programs by 2030.' },
    { icon: 'bi-snow3', title: 'Climate-Resilient Schools', desc: 'Solar-heated, zero-carbon school buildings designed for extreme winters â€” following SECMOL\'s model campus blueprint.' },
    { icon: 'bi-globe-americas', title: 'Himalayan Research Hub', desc: 'Establishing Ladakh as a global centre for climate science, glaciology, astronomy, and high-altitude medical research.' },
    { icon: 'bi-translate', title: 'Ladakhi Language Revival', desc: 'Digital archival of Ladakhi scripts, NEP-aligned Ladakhi-medium primary education, and university-level Ladakhi studies program.' },
    { icon: 'bi-robot', title: 'aI & Digital Literacy', desc: 'Satellite internet + aI tutoring tools to bridge the gap for remote village students who have no physical access to quality teachers.' },
    { icon: 'bi-people', title: 'Community Learning Centres', desc: 'Village-level evening learning centres for adult literacy, vocational skills, and digital literacy â€” especially targeting women and elderly populations.' },
  ];

  /* â”€â”€ Chart Helpers â”€â”€ */
  getBarHeight(value: number): number {
    return (value / 30000) * 100;
  }

  getDonutOffset(index: number): number {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += this.schoolDistribution[i].value;
    }
    return 100 - offset + 25; // +25 to start from top
  }
}




