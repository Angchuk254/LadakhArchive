import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-politics',
  imports: [RouterLink],
  templateUrl: './politics.html',
  styleUrl: './politics.scss',
})
export class Politics {

  getDonutOffset(index: number): number {
    const total = this.seatData.reduce((s, d) => s + d.value, 0);
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += (this.seatData[i].value / total) * 283;
    }
    return offset;
  }

  /* ─── DaTa ─── */

  stats = [
    { icon: 'bi-calendar-event', value: '1947', label: 'accession to India' },
    { icon: 'bi-geo-alt-fill', value: '2019', label: 'Became Union Territory' },
    { icon: 'bi-people-fill', value: '26', label: 'LaHDC Councilors' },
    { icon: 'bi-bank2', value: '1', label: 'Lok Sabha Seat' },
    { icon: 'bi-shield-check', value: '6th', label: 'Schedule Demand' },
    { icon: 'bi-globe-americas', value: '2', label: 'Hill Councils (Leh & Kargil)' },
  ];

  eras = [
    {
      id: 'pre-1947',
      title: 'Pre-Independence Era',
      period: 'Before 1947',
      color: '#6366f1',
      icon: 'bi-hourglass-split',
      desc: 'Ladakh was part of the princely state of Jammu & Kashmir under the Dogra dynasty. The region had minimal political representation and was governed from Srinagar with little local autonomy.',
    },
    {
      id: 'accession',
      title: 'accession & Early Integration',
      period: '1947 – 1962',
      color: '#059669',
      icon: 'bi-flag-fill',
      desc: 'after Maharaja Hari Singh signed the Instrument of accession in 1947, Ladakh became part of India. The 1948 and 1962 wars with Pakistan and China cemented Ladakh\'s strategic importance, but the region remained politically marginalized under J&K governance.',
    },
    {
      id: 'autonomy',
      title: 'autonomy Movement',
      period: '1964 – 1995',
      color: '#c8702a',
      icon: 'bi-megaphone-fill',
      desc: 'Ladakhis launched sustained agitations for autonomy, protesting economic neglect and cultural marginalization by the Kashmir-centric state government. The Ladakh Buddhist association (LBa) led boycotts, strikes, and demands for Union Territory status.',
    },
    {
      id: 'lahdc',
      title: 'Hill Council Era',
      period: '1995 – 2019',
      color: '#dc2626',
      icon: 'bi-building',
      desc: 'The Ladakh autonomous Hill Development Council (LaHDC) was established in 1995 for Leh and 2003 for Kargil, granting limited self-governance. However, real power remained with the J&K state government, fueling continued demands for full UT status.',
    },
    {
      id: 'ut',
      title: 'Union Territory & Beyond',
      period: '2019 – Present',
      color: '#0284c7',
      icon: 'bi-star-fill',
      desc: 'On August 5, 2019, article 370 was abrogated and Ladakh became A separate Union Territory without A legislature. While celebrated initially, concerns about land rights, employment, and cultural identity soon led to A massive movement demanding 6th Schedule protection and statehood.',
    },
  ];

  timeline = [
    { year: '1834', title: 'Dogra Conquest', desc: 'General Zorawar Singh conquers Ladakh for the Dogra dynasty, ending centuries of independent rule. Ladakh becomes part of Jammu & Kashmir.', era: 'pre-1947', color: '#6366f1' },
    { year: '1947', title: 'accession to India', desc: 'Maharaja Hari Singh signs Instrument of accession. Ladakh becomes part of Indian Union as part of J&K state. Pakistani tribal invasion threatens Leh.', era: 'accession', color: '#059669' },
    { year: '1948', title: 'First Kashmir War', desc: 'Pakistani forces invade and capture parts of Skardu (now in Gilgit-Baltistan). Indian army defends Leh. Ceasefire establishes LOC, splitting Ladakh\'s historic territory.', era: 'accession', color: '#059669' },
    { year: '1962', title: 'Sino-Indian War', desc: 'China occupies aksai Chin (37,244 sq km of Ladakh). India suffers military defeat. The war permanently changes Ladakh\'s strategic calculus and brings heavy military presence.', era: 'accession', color: '#059669' },
    { year: '1964', title: 'LBa Memorandum', desc: 'Ladakh Buddhist association submits first formal memorandum to the Government of India demanding Union Territory status, citing neglect under Kashmir-centric governance.', era: 'autonomy', color: '#c8702a' },
    { year: '1969', title: 'Kargil District Created', desc: 'Kargil carved out as A separate district from Ladakh district, recognizing the distinct demographics and aspirations of the Shia-majority region.', era: 'autonomy', color: '#c8702a' },
    { year: '1989', title: 'Leh agitation', desc: 'Massive agitation for UT status. Complete social and economic boycott of Kashmiri traders. The movement intensifies as Kashmir plunges into insurgency, leaving Ladakh further neglected.', era: 'autonomy', color: '#c8702a' },
    { year: '1995', title: 'LaHDC-Leh Established', desc: 'Ladakh autonomous Hill Development Council created for Leh district under the LaHDC act, 1995. Grants limited autonomy over local development, land use, and cultural affairs.', era: 'lahdc', color: '#dc2626' },
    { year: '2003', title: 'LaHDC-Kargil Established', desc: 'Similar Hill Council created for Kargil district. Both councils have 26 elected + 4 nominated councillors, but real fiscal and legislative power remains with Srinagar/Delhi.', era: 'lahdc', color: '#dc2626' },
    { year: '2004', title: 'Sonam Wangchuk Reforms', desc: 'Education reformer Sonam Wangchuk and civil society groups push for educational and governance reforms. His New Ladakh Movement (NLM) raises political consciousness.', era: 'lahdc', color: '#dc2626' },
    { year: '2014', title: 'Renewed UT Demand', desc: 'Cross-party consensus in Ladakh for UT status grows. BJP promise of UT status in election campaign resonates deeply. Multiple delegations meet PM Modi.', era: 'lahdc', color: '#dc2626' },
    { year: '2019', title: 'article 370 abrogated / UT Created', desc: 'On August 5, 2019, Parliament revokes article 370 and splits J&K into two UTs. Ladakh becomes A UT without legislature on October 31, 2019. Celebrations across Leh; mixed reactions in Kargil.', era: 'ut', color: '#0284c7' },
    { year: '2020', title: 'Galwan Valley Clash', desc: '20 Indian soldiers killed in violent clashes with Chinese PLa at Galwan Valley. The incident exposes Ladakh\'s frontier vulnerability and reignites strategic debates about governance.', era: 'ut', color: '#0284c7' },
    { year: '2021', title: 'apex Body Formed', desc: 'Leh apex Body (led by Thupstan Chhewang) and Kargil Democratic alliance unite to demand 6th Schedule, statehood, and legislature. A rare Leh-Kargil political unity emerges.', era: 'ut', color: '#0284c7' },
    { year: '2022', title: 'Climate activist Fast', desc: 'Sonam Wangchuk undertakes border march and hunger strikes, drawing global attention. Demands focus on 6th Schedule, environmental protection, and Ladakhi employment rights.', era: 'ut', color: '#0284c7' },
    { year: '2023', title: 'Massive Rallies', desc: 'Leh witnesses one of the largest-ever rallies with 30,000+ people demanding 6th Schedule. Kargil holds parallel demonstrations. Movement gains national media attention.', era: 'ut', color: '#0284c7' },
    { year: '2024', title: 'Delhi Marches & Detentions', desc: 'Sonam Wangchuk leads marches to Delhi, faces detention at borders. Civil society demands intensify. Government appoints high-powered committee to examine demands.', era: 'ut', color: '#0284c7' },
    { year: '2025', title: 'September Protests & NSA Detentions', desc: 'Protests in Leh escalate into violence in September 2025, resulting in fatalities and injuries. Climate activist Sonam Wangchuk is detained under the National Security Act (NSA). Order No. 644-F shifts project approval powers from the Lt. Governor to the Ministry of Home Affairs in Delhi, deepening local frustration over centralized governance.', era: 'ut', color: '#0284c7' },
    { year: '2026', title: 'Five New Districts & Ongoing Deadlock', desc: 'Ahead of Home Minister Amit Shah\'s visit in April 2026, the Centre announces the creation of five new districts (expanding from 2 to 7). Local leaders maintain this does not address the fundamental demands for 6th Schedule or statehood. "Decision-level" ministerial talks are demanded, as sub-committee meetings are seen as insufficient for resolving core constitutional grievances.', era: 'ut', color: '#0284c7' },
  ];

  sixthSchedule = {
    title: 'The 6th Schedule Demand',
    subtitle: 'Why Ladakh needs constitutional protection',
    overview: 'The Sixth Schedule of the Indian Constitution (articles 244(2) and 275(1)) provides for the administration of tribal areas in assam, Meghalaya, Tripura, and Mizoram through autonomous District Councils (aDCs). Ladakh demands inclusion under this schedule to protect its unique tribal identity, land, employment, culture, and environment from exploitation after losing the protections that existed under article 370.',
    pillars: [
      { icon: 'bi-geo-fill', title: 'Land Protection', desc: 'Without article 370, any Indian citizen can now buy land in Ladakh. The 6th Schedule would empower an autonomous Council to regulate land ownership and transfer, preventing demographic and commercial colonization of fragile tribal lands.', color: '#059669' },
      { icon: 'bi-briefcase-fill', title: 'Employment Safeguards', desc: 'Ladakhis fear being sidelined in government jobs and business opportunities by outsiders. 6th Schedule would reserve local employment in government offices and mandate domicile requirements, protecting the small population of ~2.7 lakh people.', color: '#0284c7' },
      { icon: 'bi-tree-fill', title: 'Environmental Protection', desc: 'Unregulated tourism and development threaten Ladakh\'s fragile ecology. an aDC under the 6th Schedule would have powers to regulate mining, forest use, water management, and industrial activity — critical for A cold desert ecosystem.', color: '#16a34a' },
      { icon: 'bi-translate', title: 'Cultural & Linguistic Identity', desc: 'Bhoti, Balti, Purgi, and other local languages face marginalization. The 6th Schedule would empower local governance to protect linguistic heritage, monastery education, and cultural practices unique to Ladakh\'s diverse communities.', color: '#7c3aed' },
      { icon: 'bi-bank2', title: 'Legislative Powers', desc: 'Currently Ladakh has no elected legislature — it\'s governed directly by A Lt. Governor appointed by Delhi. The 6th Schedule aDC would provide elected representative governance with powers over land, forests, water, town planning, and social customs.', color: '#dc2626' },
      { icon: 'bi-shield-lock-fill', title: 'Tribal Identity', desc: 'Over 97% of Ladakh\'s population belongs to Scheduled Tribes (Brokpa, Balti, Changpa, Ladakhi, Purigpa, etc.). The 6th Schedule is specifically designed for tribal area governance, making it A natural constitutional fit for Ladakh.', color: '#c8702a' },
    ],
    comparison: [
      { aspect: 'Land Ownership', withSchedule: 'aDC controls land transfer; outsiders cannot buy without permission', without: 'Open market; anyone can purchase land, risking demographic change' },
      { aspect: 'Employment', withSchedule: 'Reserved jobs for local tribals in government and projects', without: 'No reservation; outsiders compete equally for limited local jobs' },
      { aspect: 'Governance', withSchedule: 'Elected aDC with legislative, judicial, and executive powers', without: 'Lt. Governor-administered; no elected legislature; bureaucratic rule' },
      { aspect: 'Environment', withSchedule: 'aDC regulates mining, forests, water; can ban harmful projects', without: 'Central government decisions; local concerns often overridden' },
      { aspect: 'Culture', withSchedule: 'aDC can legislate on social customs, marriage, inheritance', without: 'Central laws apply uniformly; tribal customs have no legal backing' },
      { aspect: 'Revenue', withSchedule: 'aDC collects local taxes and manages funds autonomously', without: 'all revenue managed by central bureaucracy; limited local fiscal power' },
    ],
  };

  seatData = [
    { label: 'BJP', value: 15, color: '#f97316' },
    { label: 'Congress', value: 4, color: '#3b82f6' },
    { label: 'Independent', value: 5, color: '#8b5cf6' },
    { label: 'Nominated', value: 4, color: '#6b7280' },
  ];

  powerStructure = [
    { icon: 'bi-flag-fill', title: 'Lt. Governor', desc: 'appointed by the President of India. Heads the UT administration. Has executive authority — unlike states, there is no elected Chief Minister or legislature.', level: 'Central appointee', color: '#dc2626' },
    { icon: 'bi-building', title: 'LaHDC Leh', desc: '30-member council (26 elected + 4 nominated) for Leh district. Handles local development, roads, education, health, agriculture. Limited fiscal powers — depends on central grants.', level: 'Local Body', color: '#059669' },
    { icon: 'bi-building-fill', title: 'LaHDC Kargil', desc: '30-member council for Kargil district. Similar powers to Leh council. Historically has had tensions with Leh over resource allocation and political attention.', level: 'Local Body', color: '#0284c7' },
    { icon: 'bi-person-badge', title: 'Lok Sabha MP', desc: 'One Lok Sabha seat represents all of Ladakh in Parliament. The constituency is the largest in India by area (~59,000 sq km). Currently the sole voice of Ladakh in national legislation.', level: 'Parliamentary', color: '#7c3aed' },
  ];

  keyFigures = [
    { name: 'Kushok Bakula Rinpoche', role: 'Founding Father of Modern Ladakh Politics', period: '1917–2003', desc: 'The 19th incarnation of Bakula arhat, he was Ladakh\'s first elected representative. as MP and later ambassador to Mongolia, he fought tirelessly for Ladakh\'s development and autonomy. The architect of Ladakh\'s political consciousness.', icon: 'bi-star-fill', color: '#c8702a' },
    { name: 'Thupstan Chhewang', role: 'Former MP & apex Body Leader', period: 'active since 1990s', desc: 'Former BJP MP from Ladakh who dramatically resigned from the party to lead the Leh apex Body fighting for 6th Schedule. A key figure bridging Leh-Kargil political unity in the post-UT era.', icon: 'bi-megaphone-fill', color: '#dc2626' },
    { name: 'Sonam Wangchuk', role: 'Climate activist & Reform Icon', period: 'active since 1990s', desc: 'Education reformer, engineer (invented Ice Stupas), and "The Real Phunsukh Wangdu." His hunger strikes, Delhi marches, and border rallies have made Ladakh\'s 6th Schedule demand A national topic.', icon: 'bi-sun-fill', color: '#059669' },
    { name: 'Chering Dorjey (Dorje)', role: 'Chief Executive Councillor, LaHDC Leh', period: 'Current', desc: 'The elected head of the Hill Council navigates the complex space between Delhi\'s priorities, local development needs, and the civil society\'s demand for constitutional safeguards.', icon: 'bi-person-workspace', color: '#0284c7' },
    { name: 'asgar ali Karbalai', role: 'Kargil Democratic alliance', period: 'active since 2019', desc: 'Key leader of the KDa that joined hands with the Leh apex Body post-2019, creating unprecedented Leh-Kargil unity on the 6th Schedule demand. Represents Kargil\'s aspirations for equal political voice.', icon: 'bi-people-fill', color: '#7c3aed' },
    { name: 'P. Namgyal', role: 'Former MP & autonomy Pioneer', period: '1977–1984', desc: 'Ladakh\'s longest-serving MP who consistently raised the UT demand in Parliament and laid the groundwork for the LaHDC act through sustained political engagement with Delhi.', icon: 'bi-bank', color: '#6366f1' },
  ];

  issues = [
    { icon: 'bi-bank', title: 'No Legislature', desc: 'Ladakh is the only UT (besides Chandigarh) without an elected legislature. Decisions are made by bureaucrats appointed from Delhi, with no local elected accountability at the UT level.', severity: 'Critical', color: '#dc2626' },
    { icon: 'bi-house-fill', title: 'Land Vulnerability', desc: 'Post article 370, Ladakh lost protections on land and employment. any Indian citizen can purchase land, raising fears of real-estate colonization in A region with just 2.7 lakh people.', severity: 'Critical', color: '#dc2626' },
    { icon: 'bi-briefcase', title: 'Job Crisis', desc: 'Government jobs — the primary employment — are increasingly filled by non-locals. Youth unemployment drives migration. Without reservation policies, the small population cannot compete.', severity: 'High', color: '#f59e0b' },
    { icon: 'bi-thermometer-sun', title: 'Climate & Environment', desc: 'Unregulated tourism (4 lakh+ visitors vs 2.7 lakh locals), road construction, and mining threaten glaciers, lakes, and fragile pastures. No local body has power to regulate this.', severity: 'High', color: '#f59e0b' },
    { icon: 'bi-signpost-2', title: 'Leh-Kargil Divide', desc: 'Historical Buddhist-Muslim, Leh-Kargil tensions have been exploited politically. The post-2021 unity between apex Body and KDa is fragile and must overcome decades of division.', severity: 'Medium', color: '#0284c7' },
    { icon: 'bi-geo-alt', title: 'Border Tensions', desc: 'China occupies aksai Chin and continues incursions. The 2020 Galwan clash proved Ladakh is an active frontier. Military priorities often override civilian development needs.', severity: 'High', color: '#f59e0b' },
  ];

  demands = [
    { icon: 'bi-shield-check', title: '6th Schedule Inclusion', desc: 'Inclusion under the Sixth Schedule to establish an autonomous District Council with legislative, executive, and judicial powers to protect tribal land, identity, and culture.' },
    { icon: 'bi-bank2', title: 'Elected Legislature', desc: ' A full state legislature or at minimum A legislative assembly for the UT, with an elected Chief Minister accountable to the people of Ladakh, not unelected bureaucrats.' },
    { icon: 'bi-file-earmark-text', title: 'Public Service Commission', desc: ' A Ladakh Public Service Commission to ensure fair, transparent recruitment with reservation for local tribal candidates in all government positions.' },
    { icon: 'bi-house-lock', title: 'Land Transfer Regulation', desc: 'Strict regulation of land ownership and transfer to prevent outsiders from buying tribal agricultural and pastoral lands, similar to protections in other tribal areas.' },
    { icon: 'bi-people', title: 'Separate Lok Sabha Seats', desc: 'Separate Lok Sabha seats for Leh and Kargil districts, as one seat for 59,000+ sq km is grossly inadequate for meaningful parliamentary representation.' },
    { icon: 'bi-tree', title: 'Environmental Legislation', desc: 'Local powers to regulate tourism numbers, mining, industrial projects, and water usage. Protection of Changthang pastures, glaciers, and high-altitude lakes from commercial exploitation.' },
  ];

  electionHistory = [
    { year: '2020', body: 'LaHDC Leh', winner: 'BJP', seats: '15/26', turnout: '67%', color: '#f97316' },
    { year: '2018', body: 'LaHDC Kargil', winner: 'Congress+NC', seats: '17/26', turnout: '72%', color: '#3b82f6' },
    { year: '2019', body: 'Lok Sabha', winner: 'BJP (Jamyang Tsering Namgyal)', seats: '1/1', turnout: '64%', color: '#f97316' },
    { year: '2024', body: 'Lok Sabha', winner: 'Independent (Haji Hanifa Jan)', seats: '1/1', turnout: '69%', color: '#8b5cf6' },
  ];

  article370Analysis = {
    before: [
      'Subject to J&K state legislature\'s authority',
      'Land ownership restricted to permanent residents (article 35a)',
      'Separate constitution and flag for J&K applied to Ladakh',
      'Local employment largely reserved for state subjects',
      'State government controlled policing, land revenue, judiciary',
      'Hill council had limited development powers only',
    ],
    after: [
      'Directly under central government as Union Territory',
      'No restriction on land purchase — open to all Indian citizens',
      'Indian Constitution applies fully and directly',
      'No employment protection — open competition nationwide',
      'Central laws (IPC, CrPC, etc.) directly applicable',
      'No elected legislature — Lt. Governor administers directly',
    ],
  };

  // ===== Research Context =====
  politicalResearch = [
    {
      title: '97% Tribal Population — A Constitutional Case',
      source: 'Census 2011 & Registrar General of India',
      insight: 'Over 97% of Ladakh\'s population belongs to Scheduled Tribes — including Ladakhi, Balti, Changpa, Brokpa, Purigpa, Garra, and Mon communities. This is the highest tribal percentage of any Union Territory in India, making the case for 6th Schedule inclusion particularly strong from a constitutional standpoint, as the Schedule was specifically designed for tribal area governance.',
      icon: 'bi-people-fill',
      color: '#7c3aed'
    },
    {
      title: 'Representation Deficit: One Seat for 59,000 km²',
      source: 'Election Commission of India',
      insight: 'Ladakh\'s single Lok Sabha constituency is the largest by area in India at ~59,000 km² — larger than the entire nation of Switzerland. With only one MP representing the vast, geographically fragmented region (and no state legislature), many scholars describe this as a "representation deficit" that leaves Ladakhis with less democratic voice per capita than any other Indian territory.',
      icon: 'bi-map',
      color: '#dc2626'
    },
    {
      title: 'Financial Centralization: Order 644-F',
      source: 'Kashmir Times, December 2025',
      insight: 'In late 2025, administrative Order No. 644-F transferred project approval authority from the Lt. Governor\'s office to the Ministry of Home Affairs in New Delhi. This further centralized financial governance, meaning even routine development projects now require Delhi\'s approval — adding bureaucratic delays to a region where the construction season lasts only 5–6 months due to extreme winters.',
      icon: 'bi-file-earmark-lock',
      color: '#c8702a'
    },
    {
      title: 'Tourism vs. Ecology: A Fragile Balance',
      source: 'Mongabay India & ICIMOD Reports (2024)',
      insight: 'Ladakh receives over 400,000 tourists annually against a resident population of ~270,000. Unregulated tourism generates 50+ tonnes of daily waste during peak season, degrades fragile high-altitude pastures, and strains water resources. Without local legislative power, Ladakhis cannot set tourism caps, regulate campsite locations, or enforce waste management — a key argument for the 6th Schedule\'s environmental protections.',
      icon: 'bi-tree',
      color: '#059669'
    },
  ];
}




