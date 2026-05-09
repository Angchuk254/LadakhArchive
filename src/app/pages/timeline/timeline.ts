import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class Timeline {

  activeEra = signal<string>('all');

  eras = [
    { value: 'all', label: 'all Eras' },
    { value: 'ancient', label: 'ancient' },
    { value: 'kingdom', label: 'Kingdom' },
    { value: 'colonial', label: 'Colonial' },
    { value: 'modern', label: 'Modern India' },
    { value: 'contemporary', label: 'Contemporary' },
  ];

  events: TimelineEvent[] = [
    // ancient
    { year: 'c. 3000 BCE', title: 'Earliest Rock Carvings', era: 'ancient', desc: 'Petroglyphs depicting hunting scenes, ibex, and early spiritual symbols are carved along trade routes at Dras, Tangtse, and other sites â€” among the oldest evidence of human presence in Ladakh.', icon: 'bi-pencil', color: '#eab308', image: 'https://images.unsplash.com/photo-1596728045145-817de8b70503?auto=format&fit=crop&q=80&w=800' },
    { year: 'c. 500 BCE', title: 'Mon & Dard Settlements', era: 'ancient', desc: 'The Mon (believed to be Tibeto-Burman) and Dard (Indo-aryan) peoples establish the earliest known settled communities in the Indus Valley and Dras-Kargil area.', icon: 'bi-house', color: '#b45309' },
    { year: 'c. 200 BCE', title: 'Kushan Influence', era: 'ancient', desc: 'The Kushan Empire extends its cultural and trade influence into Ladakh. Buddhist missionaries begin arriving along Silk Road routes connecting Central asia to the subcontinent.', icon: 'bi-globe', color: '#ef4444' },
    { year: 'c. 100 CE', title: 'Buddhism arrives', era: 'ancient', desc: 'Buddhism establishes its first foothold in Ladakh through Kashmiri and Central asian missionaries. Early monasteries and stupas are constructed.', icon: 'bi-brightness-high', color: '#f97316', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800' },
    { year: 'c. 600 CE', title: 'Tibetan Expansion', era: 'ancient', desc: 'The Tibetan Empire under Songtsen Gampo extends influence into western Tibet and Ladakh, bringing Tibetan Buddhism and cultural practices.', icon: 'bi-flag', color: '#b91c1c' },

    // Kingdom Era
    { year: '842 CE', title: 'Founding of Namgyal Dynasty', era: 'kingdom', desc: 'Nyima-Gon, a Tibetan prince fleeing political upheaval, establishes the first independent Ladakhi dynasty. He divides the western Himalayan region among his three sons â€” Ladakh becomes a distinct political entity.', icon: 'bi-crown', color: '#3b82f6', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
    { year: 'c. 950 CE', title: 'alchi Monastery Founded', era: 'kingdom', desc: 'Rinchen Zangpo, the Great Translator, founds alchi Monastery with some of the finest surviving examples of Kashmiri-Buddhist art, including 11th-century murals still visible today.', icon: 'bi-building', color: '#8b5cf6', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800' },
    { year: 'c. 1000 CE', title: 'Great Translation Period', era: 'kingdom', desc: 'Rinchen Zangpo translates major Buddhist texts from Sanskrit to Tibetan. He establishes 108 monasteries and temples across Ladakh, marking a golden age of Buddhist scholarship.', icon: 'bi-book', color: '#8b5cf6' },
    { year: '1400s', title: 'Islam arrives in Ladakh', era: 'kingdom', desc: 'Sufi saints and Muslim traders from Central asia and Kashmir introduce Islam to the Kargil region and parts of Leh. The Nurbakhshi and later Twelver Shia traditions take root.', icon: 'bi-moon-stars', color: '#10b981' },
    { year: '1470', title: 'Lhachen Bhagan Unifies Ladakh', era: 'kingdom', desc: 'King Lhachen Bhagan reunifies Ladakh after a period of fragmentation, establishing Leh as the capital and consolidating the Namgyal dynasty\'s control over the entire region.', icon: 'bi-shield', color: '#2563eb' },
    { year: '1555', title: 'Tsewang Namgyal\'s Reign', era: 'kingdom', desc: 'King Tsewang Namgyal expands Ladakh to its greatest territorial extent, stretching from the Mayum Pass in western Tibet to Zanskar and Baltistan.', icon: 'bi-arrows-angle-expand', color: '#1d4ed8' },
    { year: '1600s', title: 'Hemis Monastery Expanded', era: 'kingdom', desc: 'King Sengge Namgyal (1570â€“1642) patronises the Drukpa Kagyu school and massively expands Hemis Monastery, making it Ladakh\'s largest and wealthiest gompa.', icon: 'bi-building', color: '#ea580c', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
    { year: '1616', title: 'Leh Palace Completed', era: 'kingdom', desc: 'The nine-storey Leh Palace â€” modelled after the Potala in Lhasa â€” is completed by King Sengge Namgyal, becoming the iconic symbol of Ladakhi royal power.', icon: 'bi-house-door', color: '#ef4444', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800' },
    { year: '1679', title: 'Tibetan-Mughal-Ladakh War', era: 'kingdom', desc: 'a devastating five-year war. Tibet invades Ladakh; Ladakh seeks and receives Mughal military aid from Kashmir. The Treaty of Tingmosgang (1684) establishes borders that largely persist today.', icon: 'bi-lightning', color: '#dc2626' },

    // Colonial Era
    { year: '1834', title: 'Dogra Conquest of Ladakh', era: 'colonial', desc: 'General Zorawar Singh of the Dogra dynasty (under Maharaja Gulab Singh of Jammu) invades and conquers Ladakh, ending nearly 1,000 years of independent Namgyal rule.', icon: 'bi-flag-fill', color: '#b91c1c', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800' },
    { year: '1842', title: 'Treaty of Chushul', era: 'colonial', desc: 'after Zorawar Singh\'s failed invasion of Tibet and his death at the Battle of Taklakot, the Treaty of Chushul between Ladakh-Dogra and Tibet restores previous boundaries.', icon: 'bi-journal-text', color: '#4338ca' },
    { year: '1846', title: 'Treaty of amritsar', era: 'colonial', desc: 'The British sell the entire Jammu & Kashmir region (including Ladakh) to Gulab Singh for 75 lakh rupees. Ladakh becomes part of the princely state of Jammu & Kashmir under British paramountcy.', icon: 'bi-cash-stack', color: '#047857' },
    { year: '1885', title: 'British Survey & Exploration', era: 'colonial', desc: 'British surveyors and explorers (including the Great Trigonometric Survey) extensively map Ladakh. Missionaries establish schools and healthcare in Leh.', icon: 'bi-map', color: '#0369a1', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
    { year: '1947', title: 'Partition & Tribal Invasion', era: 'colonial', desc: 'India gains independence. Pakistani-backed tribal raiders invade Kashmir; Ladakh faces threat. The Maharaja accedes to India. Indian forces secure Leh, but Pakistan occupies parts of Baltistan and Gilgit.', icon: 'bi-shield-exclamation', color: '#dc2626' },

    // Modern India
    { year: '1949', title: 'Ladakh Becomes Part of India', era: 'modern', desc: 'Ladakh is formally integrated into India as part of Jammu & Kashmir state. The region is divided into Leh and Kargil districts.', icon: 'bi-geo-alt', color: '#2563eb' },
    { year: '1962', title: 'Sino-Indian War', era: 'modern', desc: 'China invades and occupies aksai Chin (the eastern plateau of Ladakh). India loses 37,000 kmÂ² of Ladakhi territory. The Line of actual Control (LaC) is established.', icon: 'bi-exclamation-triangle', color: '#ef4444', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800' },
    { year: '1974', title: 'Ladakh Opens to Tourism', era: 'modern', desc: 'after decades as a restricted border area, Ladakh is opened to tourists for the first time. The region begins its transformation into one of India\'s most popular adventure destinations.', icon: 'bi-airplane', color: '#10b981', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800' },
    { year: '1979', title: 'Hill Council Proposed', era: 'modern', desc: 'The demand for autonomy and protection of Ladakhi culture leads to the proposal for a Hill Development Council, though it takes over a decade to be established.', icon: 'bi-megaphone', color: '#8b5cf6' },
    { year: '1989', title: 'Hemis National Park', era: 'modern', desc: 'India\'s largest national park (4,400 kmÂ²) is established in the Hemis area to protect the snow leopard and other wildlife. It later becomes a global biodiversity hotspot.', icon: 'bi-tree', color: '#059669', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800' },
    { year: '1993', title: 'Ice Man of India', era: 'modern', desc: 'Engineer Chewang Norphel creates the first artificial glacier (ice stupa precursor) in Ladakh, pioneering innovative solutions to water scarcity caused by retreating glaciers.', icon: 'bi-snow', color: '#0284c7' },
    { year: '1995', title: 'LaHDC Leh Established', era: 'modern', desc: 'The Ladakh autonomous Hill Development Council (LaHDC) for Leh district is created under the J&K Panchayati Raj act, granting limited self-governance.', icon: 'bi-bank', color: '#1d4ed8' },
    { year: '1999', title: 'Kargil War', era: 'modern', desc: 'Pakistani soldiers and militants infiltrate positions along the LoC in the Kargil sector. India launches Operation Vijay, recapturing all positions in a fierce two-month war.', icon: 'bi-shield-fill', color: '#b91c1c', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800' },
    { year: '2003', title: 'LaHDC Kargil Established', era: 'modern', desc: 'a separate Ladakh autonomous Hill Development Council is created for Kargil district, giving both districts autonomous governance structures.', icon: 'bi-bank', color: '#ea580c' },

    // Contemporary
    { year: '2014', title: 'Ice Stupa Project Launched', era: 'contemporary', desc: 'Sonam Wangchuk\'s SECMOL campus launches the Ice Stupa project â€” artificial glaciers that store winter meltwater as ice towers, releasing it during the dry spring planting season.', icon: 'bi-snow3', color: '#0ea5e9', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800' },
    { year: '2019', title: 'Union Territory Created', era: 'contemporary', desc: 'On 5 august 2019, India revokes article 370 and reorganises J&K. Ladakh becomes a separate Union Territory (without legislature) comprising Leh and Kargil districts.', icon: 'bi-star', color: '#3b82f6', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800' },
    { year: '2020', title: 'Galwan Valley Clash', era: 'contemporary', desc: 'Indian soldiers clash with Chinese PLa forces at Galwan Valley along the LaC â€” the deadliest India-China border incident in 45 years.', icon: 'bi-exclamation-octagon', color: '#ef4444' },
    { year: '2024', title: '6th Schedule Demands', era: 'contemporary', desc: 'Massive rallies across Ladakh and Sonam Wangchuk\'s 21-day hunger fast demand inclusion under the 6th Schedule of the Constitution to protect tribal lands and ecology.', icon: 'bi-people-fill', color: '#8b5cf6', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800' },
    { year: '2026', title: 'Digital archive Movement', era: 'contemporary', desc: 'Community-driven digital projects like Ladakharchive emerge to document and preserve the region\'s heritage as rapid development and climate change threaten traditional ways of life.', icon: 'bi-archive', color: '#10b981' },
  ];

  filteredEvents = computed(() => {
    const era = this.activeEra();
    return era === 'all' ? this.events : this.events.filter(e => e.era === era);
  });

  groupedEvents = computed(() => {
    const filtered = this.filteredEvents();
    const groups: { era: string; color: string; icon: string; events: TimelineEvent[] }[] = [];
    
    for (const event of filtered) {
      if (groups.length === 0 || groups[groups.length - 1].era !== event.era) {
        groups.push({
          era: event.era,
          color: event.color,
          icon: event.icon,
          events: [event]
        });
      } else {
        groups[groups.length - 1].events.push(event);
      }
    }
    return groups;
  });


  setEra(era: string) {
    this.activeEra.set(era);
  }

  getEraCount(era: string): number {
    return era === 'all' ? this.events.length : this.events.filter(e => e.era === era).length;
  }
}

interface TimelineEvent {
  year: string;
  title: string;
  era: string;
  desc: string;
  icon: string;
  color: string;
  image?: string;
}




