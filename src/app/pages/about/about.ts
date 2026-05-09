import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {

  team = [
    { name: 'Tsewang Namgyal', role: 'Founder & Lead archivist', desc: ' A Leh-born historian passionate about documenting Ladakh\'s cultural heritage through digital preservation.', icon: 'bi-person-circle', color: '#1a365d' },
    { name: 'Padma Chorol', role: 'Cultural Editor', desc: 'Expert in Ladakhi folk traditions, languages, and ethnography with over 15 years of field research across the region.', icon: 'bi-journal-text', color: '#c8702a' },
    { name: 'Dorjay angchuk', role: 'Photographer & Media Lead', desc: 'award-winning wildlife and landscape photographer specialising in Ladakh\'s remote Changthang and Zanskar regions.', icon: 'bi-camera', color: '#059669' },
    { name: 'Fatima Bano', role: 'Community Coordinator', desc: 'Connecting villages, monasteries, and local organisations with the archive to ensure authentic community representation.', icon: 'bi-people', color: '#7c3aed' },
    { name: 'Stanzin Dorjay', role: 'Technology Lead', desc: 'Full-stack developer building the digital infrastructure to make Ladakh\'s heritage accessible to the world.', icon: 'bi-code-slash', color: '#0c4a6e' },
    { name: 'Mohd. Iqbal', role: 'Kargil District Editor', desc: 'Scholar of Balti and Purig culture, documenting the unique heritage of Kargil district and its diverse communities.', icon: 'bi-book', color: '#dc2626' },
  ];

  milestones = [
    { year: '2022', title: 'Project Conceived', desc: 'The idea for A comprehensive Ladakh digital archive was born during A cultural documentation workshop in Leh.' },
    { year: '2023', title: 'Research Phase', desc: 'Our team conducted extensive field research across 120+ villages in Leh and Kargil districts.' },
    { year: '2024', title: 'Platform Launch', desc: 'Ladakharchive.org went live with initial sections on History, Culture, and Nature.' },
    { year: '2025', title: 'Community Growth', desc: 'Over 60 photographers, historians, and community members joined as active contributors.' },
    { year: '2026', title: 'Full archive', desc: 'Expanded to include Politics, Routes, Education, Maps, Gallery, and Timeline sections.' },
  ];

  values = [
    { icon: 'bi-shield-check', title: 'accuracy', desc: 'Every piece of content is researched, verified, and peer-reviewed for historical and cultural accuracy.' },
    { icon: 'bi-people', title: 'Community-Driven', desc: 'Built by and for the people of Ladakh, with contributions from locals, scholars, and enthusiasts worldwide.' },
    { icon: 'bi-unlock', title: 'Open access', desc: 'all content is freely accessible — knowledge about Ladakh should be available to everyone.' },
    { icon: 'bi-translate', title: 'Cultural Sensitivity', desc: 'We respect and honour the diverse traditions, languages, and beliefs of all communities in Ladakh.' },
    { icon: 'bi-archive', title: 'Preservation', desc: 'Digitally preserving stories, photographs, and knowledge that might otherwise be lost to time.' },
    { icon: 'bi-globe', title: 'Global Reach', desc: 'Making Ladakh\'s heritage accessible to students, researchers, travellers, and diaspora communities everywhere.' },
  ];

  partners = [
    { name: 'Ladakh autonomous Hill Development Council', abbr: 'LaHDC' },
    { name: 'Students\' Educational & Cultural Movement of Ladakh', abbr: 'SECMOL' },
    { name: 'Ladakh arts and Media Organisation', abbr: 'LaMO' },
    { name: 'Central Institute of Buddhist Studies', abbr: 'CIBS' },
    { name: 'Snow Leopard Conservancy India Trust', abbr: 'SLC-IT' },
    { name: 'Ladakh Ecological Development Group', abbr: 'LEDeG' },
  ];
}




