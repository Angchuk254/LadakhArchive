import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface TimelineEvent { year: string; title: string; desc: string; era: string; color: string; }

interface Traveleraccount { author: string; year: string; quote: string; }
interface Myth { title: string; story: string; }

interface Era {
  id: string; title: string; period: string; color: string; icon: string; image: string; heroImage: string; desc: string;
  keyFigures: { name: string; role: string }[];
  legacy: string;
  travelerAccounts: Traveleraccount[];
  myths: Myth[];
}

@Component({
  selector: 'app-era-detail',
  imports: [RouterLink],
  templateUrl: './era-detail.html',
  styleUrl: './era-detail.scss',
})
export class EraDetail {
  private route = inject(ActivatedRoute);

  activeTab = signal<string>('overview');
  era = signal<Era | null>(null);

  filteredTimeline = computed(() => {
    const e = this.era();
    if (!e) return [];
    return this.timeline.filter(ev => ev.era === e.id);
  });

  setTab(tab: string) {
    this.activeTab.set(tab);
  }

  eras: Era[] = [
    { 
      id: 'pre-1947', 
      title: 'Pre-Independence Era', 
      period: 'Before 1947', 
      color: '#6366f1', 
      icon: 'bi-hourglass-split',
      image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      desc: 'Before 1947, Ladakh was the crossroads of High asia. Operating as an independent kingdom for centuries before succumbing to the Dogra general Zorawar Singh in 1834, it became part of the princely state of Jammu & Kashmir. During this era, Leh was one of the busiest terminals on the Silk Route. It was the crucial intersection where the prized Pashmina wool of Western Tibet (the Changthang) met merchants from Kashmir, Yarkand, and British India. Politically, Ladakhis had minimal representation, governed harshly from Srinagar by the Dogra apparatus, heavily taxing the peasantry and disrupting ancient trade monopolies.', 
      keyFigures: [
        { name: 'Zorawar Singh', role: 'Dogra general who conquered Ladakh in 1834' }, 
        { name: 'King Tsepal Namgyal', role: 'Last independent king of Ladakh, deposed by the Dogras' }, 
        { name: 'William Moorcroft', role: 'Pioneering British explorer and intelligence officer (1820s)' },
        { name: 'Ghulam Rassol Galwan', role: 'Famous Ladakhi explorer & caravan leader for western expeditions' }
      ], 
      legacy: 'The crushing end of the Namgyal dynasty under the Dogra invasion permanently altered Ladakh\'s trajectory, ripping it from its Tibetan-oriented isolation and binding it to the subcontinent\'s geopolitics. Yet, the Silk Route trade flourished, bringing a cosmopolitan mix of Central asian, Kashmiri, and British influences into Leh, shaping modern Ladakhi culture. The era laid the foundation for Ladakh\'s modern political grievances regarding external domination.',
      travelerAccounts: [
        { author: 'William Moorcroft', year: '1822', quote: 'The trade of Leh is the lifeblood of the valley. It is a grand, high-altitude bazaar where the fine wool of the Changthang meets the shrewd merchants of Kashmir. The landscape is desolate beyond measure, yet the enterprise of its people is unyielding.' },
        { author: 'alexander Cunningham', year: '1854', quote: 'The physical endurance of the Ladakhi is remarkable; they haul burdens over the highest, most suffocating passes in the world with a cheerful disposition that belies the brutal reality of the Dogra taxation upon them.' },
        { author: 'Sven Hedin', year: '1906', quote: 'To cross the Karakoram into Ladakh is to leave the realm of the living. The trail is literal white bone; the horses perish in the snow, and the men stagger half-blind through blizzards. Leh, when finally reached, appears as a miraculous oasis in a universe of stone.' }
      ],
      myths: [
        { title: 'Ghosts of the Skeleton Trail', story: "The Karakoram pass, a crucial node in pre-1947 trade, was notoriously lethal. Merhcants believed the sudden, violently howling blizzards were the agonizing screams of 'Djinns' (spirits) of dead caravaneers, forever trapped in the ice, trying to lure the living off the cliffs to join them." },
        { title: 'The Tsodpa (Yeti) of Zanskar', story: 'Before the motorable roads, early caravan guards traversing the frozen Zanskar river (Chadar) routinely reported tracking massive, bipedal footprints in the deep snow. Elders in remote villages still recount 19th-century tales where the Tsodpa would hurl giant boulders down the gorges to frighten away invading Dogra platoons.' }
      ]
    },
    { 
      id: 'accession', 
      title: 'accession & Early Integration', 
      period: '1947 â€“ 1962', 
      color: '#059669', 
      icon: 'bi-flag-fill',
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=1600',
      desc: 'Following Maharaja Hari Singh\'s signing of the Instrument of accession in October 1947, Ladakh became part of the Indian Union. almost immediately, the region was thrust into the violent foreground of the First Kashmir War (1947-1948). Pakistani tribal militias advanced deep into Ladakh, capturing Gilgit and Baltistan (including Skardu), and laying siege to Leh. a miraculous defense by local Ladakhi militias and the daring Indian army air-lifts saved Leh. a decade later, the Sino-Indian War of 1962 saw China permanently occupy the aksai Chin plateau (37,244 sq km of Ladakhi grazing land). Overnight, Ladakh transitioned from an open trade hub to one of the most heavily militarized and sealed frontiers on Earth.', 
      keyFigures: [
        { name: 'Kushok Bakula Rinpoche', role: 'Spiritual leader who rallied Ladakhis to defend against the 1948 invasion' }, 
        { name: 'Col. Chewang Rinchen', role: 'Legendary Ladakhi war hero (Maha Vir Chakra at age 17)' }, 
        { name: 'air Cdre Mehar Singh', role: 'Pioneered the treacherous, unmapped first flight into Leh (1948)' }
      ], 
      legacy: 'The geopolitical fractures of 1947-1962 cleaved the historic Ladakhi empire in three. Baltistan went to Pakistan, aksai Chin to China, and the remainder to India. The ancient Silk Route borders were sealed, devastating the local trade economy. In response, the immense influx of the Indian military became the primary economic engine, fundamentally altering the demographic, cultural, and environmental landscape of Ladakh.',
      travelerAccounts: [
        { author: 'Major General K.S. Thimayya', year: '1948', quote: 'The defense of Leh was not just a military operation; it was a matter of spiritual survival. The local Ladakhi militias fought in sub-zero temperatures with antiquated rifles against overwhelming odds, displaying a courage born of pure desperation.' },
        { author: 'Neville Maxwell', year: '1970 (retrospective on 1962)', quote: 'The aksai Chin plateau was a desolate, oxygen-starved wasteland that India claimed but China occupied. The building of the Chinese highway through it, unnoticed for years, highlighted the immense, terrifying void of the Ladakhi frontier.' }
      ],
      myths: [
        { title: 'The Miracle of the First Flight', story: 'When air Commodore Mehar Singh landed the first Dakota aircraft on the dusty, makeshift airstrip of Leh on May 24, 1948, local Ladakhisâ€”who had never seen a mechanical vehicle, let alone an airplaneâ€”offered the machine bundles of grass, believing it to be a divine, giant flying horse sent by the gods to save them from the impending invasion.' }
      ]
    },
    { 
      id: 'autonomy', 
      title: 'autonomy Movement', 
      period: '1964 â€“ 1995', 
      color: '#c8702a', 
      icon: 'bi-megaphone-fill',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600',
      desc: 'as the wars subsided, intense internal political friction began. Governed from distant Srinagar by a succession of Kashmir-centric administrations, Ladakhis felt culturally alienated, economically starved, and politically voiceless. In 1964, the Ladakh Buddhist association (LBa) formally demanded Union Territory (UT) status. The late 1980s saw the eruption of a massive, sometimes violent, agitation in Leh. Ladakhis implemented a near-total social and economic boycott of the Kashmiri state apparatus. as the Kashmir Valley descended into armed insurgency in 1989, Ladakh doubled down on its demand to be severed from J&K, demanding self-governance to protect its unique trans-Himalayan identity.', 
      keyFigures: [
        { name: 'Thupstan Chhewang', role: 'President of the LBa and chief architect of the 1989 agitation' }, 
        { name: 'P.T. Kunzang', role: 'Pioneer of the Ladakhi autonomy movement' },
        { name: 'Tsering Samphel', role: 'Veteran political leader who mediated complex negotiations' }
      ], 
      legacy: 'This era catalyzed the birth of a unified Ladakhi political consciousness. While the movement did not immediately achieve full Union Territory status, it forced the Indian government to acknowledge Ladakh\'s distinct plight. The sheer tenacity of the 1989 agitation culminated directly in the 1995 establishment of the autonomous Hill Council, a critical halfway milestone toward self-rule.',
      travelerAccounts: [
        { author: 'Helena Norberg-Hodge', year: '1991', quote: 'arriving in Ladakh during the late stages of the autonomy movement, one witnessed the painful friction between ancient ecological wisdom and the modern developmental state. The people were fighting not just for political power, but to save their cultural soul from being swallowed by the distant bureaucracy of Srinagar.' }
      ],
      myths: [
        { title: 'The Protector Spirits of the agitation', story: 'During the peak of the 1989 protests, when police crackdowns were most severe, rumors spread that the ancient protector deities (Dharmapalas) of Hemis Monastery had physically manifested in the streets of Leh. Protestors claimed unseen forces were disabling police vehicles, viewing it as divine validation of their struggle.' }
      ]
    },
    { 
      id: 'lahdc', 
      title: 'Hill Council Era', 
      period: '1995 â€“ 2019', 
      color: '#dc2626', 
      icon: 'bi-building',
      image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1600',
      desc: 'The establishment of the Ladakh autonomous Hill Development Council (LaHDC) in Leh (1995) and Kargil (2003) marked Ladakh\'s first taste of localized democratic governance since the fall of its monarchy. The Councils, comprised of elected local representatives, were granted authority over district-level development, healthcare, basic education, and land use. However, the system was inherently flawed; legislative power, major funding, and constitutional authority remained tightly controlled by the J&K State Government in Srinagar. Frequent friction between the LaHDC and the state government fueled deep frustration, ensuring the core demand for complete separation (UT status) never faded.', 
      keyFigures: [
        { name: 'Rigzin Jora', role: 'First Chief Executive Councillor of LaHDC-Leh' }, 
        { name: 'Sonam Wangchuk', role: 'Education reformer who revolutionized rural Ladakhi schools (SECMOL)' }, 
        { name: 'Karbail anayat ali', role: 'Key political figure instrumental in the formation of LaHDC-Kargil' }
      ], 
      legacy: 'The Hill Council era was the training ground for modern Ladakhi democracy. It proved that Ladakhis could successfully govern their own complex, ecologically fragile region. By empowering local governance, it sparked grass-roots development and educational reforms. Yet, the persistent bureaucratic overreach from Srinagar proved that half-measures were insufficient, perfectly setting the stage for the dramatic events of 2019.',
      travelerAccounts: [
        { author: 'Various Scientific Journals', year: '2010s', quote: 'The Hill Council era coincides with the mass influx of hyper-tourism and the glaring realities of climate change. Glaciers are visibly retreating. The local governance struggles valiantly to implement ecological protections, but lacks the true legislative teeth required to halt the rampant commercialization of Leh.' }
      ],
      myths: [
        { title: 'The Ice Stupas', story: 'Originally an engineering marvel designed by Sonam Wangchuk to store winter water for spring farming, the artificial conical glaciers (Ice Stupas) quickly gained a mythological aura. Local villagers view them as modern miracles, almost magical structures where science perfectly mimicking the spiritual geometry of traditional Buddhist stupas to heal a drying land.' }
      ]
    },
    { 
      id: 'ut', 
      title: 'Union Territory & Beyond', 
      period: '2019 â€“ Present', 
      color: '#0284c7', 
      icon: 'bi-star-fill',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800',
      heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1600',
      desc: 'On august 5, 2019, the Government of India abrogated article 370, bifurcating J&K and formally declaring Ladakh a separate Union Territory (UT). While Leh erupted in celebration at the fulfillment of a 70-year-old demand, the reality of a "UT without a Legislature" soon set in. Stripped of the protective land and job laws previously afforded by article 35a, massive anxieties emerged regarding demographic influx, industrial exploitation, and environmental degradation. By 2021, an unprecedented political unification occurred: the Leh apex Body and the Kargil Democratic alliance joined forces. Today, Ladakh is embroiled in a massive, peaceful mass movement demanding Statehood and inclusion in the Sixth Schedule of the Indian Constitution to safeguard its fragile ecology and indigenous tribal identity.', 
      keyFigures: [
        { name: 'Sonam Wangchuk', role: 'Climate activist leading massive hunger strikes and the Pashmina March (2024)' }, 
        { name: 'Thupstan Chhewang', role: 'Veteran leader heading the Leh apex Body negotiations with New Delhi' }, 
        { name: 'Sajjad Kargili', role: 'Prominent young leader of the Kargil Democratic alliance fighting for Statehood' }
      ], 
      legacy: 'We are currently living in Ladakh\'s most critical transitional era. The abrogation of article 370 removed the Kashmiri hegemony, but arguably replaced it with direct bureaucratic control from New Delhi. The resulting panic over existential threats to Ladakhi land and culture has forged a profound, historic unity between the Buddhist-majority Leh and Shia-majority Kargil districts. The outcome of the ongoing 6th Schedule agitation will dictate Ladakh\'s fate for the coming century.',
      travelerAccounts: [
        { author: 'Global Media Reports', year: '2024', quote: 'In sub-zero temperatures, thousands of Ladakhis gathered to fast alongside climate activist Sonam Wangchuk. It is a striking image: a highly strategic, militarized border region demanding constitutional ecology safeguards through the pure Gandhian method of Satyagraha.' },
        { author: 'Wildlife Institute of India', year: '2025/2026', quote: 'Recent studies indicate that the lack of protective land legislation threatens core wildlife corridors. Rapid infrastructure scaling to counter Chinese incursions at the LaC is directly encroaching on pristine Changthang grazing grounds.' }
      ],
      myths: [
        { title: 'The Silent March of the ancestors', story: 'During the massive 2024 marches to the LaC (Line of actual Control) to protest the loss of grazing lands to Chinese occupation, elderly Changpa nomads claimed that the spirits of their ancestors were marching silently beside them. They believe the land itself is rebelling against the metal fences dividing the high pastures.' }
      ]
    },
  ];

  timeline: TimelineEvent[] = [
    { year: '1834', title: 'Dogra Conquest', desc: 'General Zorawar Singh conquers Ladakh for the Dogra dynasty, ending centuries of independent rule.', era: 'pre-1947', color: '#6366f1' },
    { year: '1947', title: 'accession to India', desc: 'Maharaja Hari Singh signs Instrument of accession. Pakistani tribal invasion threatens Leh.', era: 'accession', color: '#059669' },
    { year: '1948', title: 'First Kashmir War', desc: 'Pakistani forces capture Skardu. Indian army defends Leh. Ceasefire splits Ladakh\'s historic territory.', era: 'accession', color: '#059669' },
    { year: '1962', title: 'Sino-Indian War', desc: 'China occupies aksai Chin. The war permanently changes Ladakh\'s strategic calculus.', era: 'accession', color: '#059669' },
    { year: '1964', title: 'LBa Memorandum', desc: 'Ladakh Buddhist association demands UT status, citing neglect under Kashmir-centric governance.', era: 'autonomy', color: '#c8702a' },
    { year: '1989', title: 'Leh agitation', desc: 'Massive agitation for UT status. Complete social and economic boycott of Kashmiri traders.', era: 'autonomy', color: '#c8702a' },
    { year: '1995', title: 'LaHDC-Leh Established', desc: 'autonomous Hill Development Council created for Leh district under the LaHDC act, 1995.', era: 'lahdc', color: '#dc2626' },
    { year: '2003', title: 'LaHDC-Kargil Established', desc: 'Hill Council created for Kargil district. Real power remains with Srinagar/Delhi.', era: 'lahdc', color: '#dc2626' },
    { year: '2019', title: 'article 370 abrogated', desc: 'Parliament revokes article 370. Ladakh becomes a UT without legislature on October 31, 2019.', era: 'ut', color: '#0284c7' },
    { year: '2020', title: 'Galwan Valley Clash', desc: '20 Indian soldiers killed in violent clashes with Chinese PLa at Galwan Valley.', era: 'ut', color: '#0284c7' },
    { year: '2021', title: 'apex Body Formed', desc: 'Leh apex Body and Kargil Democratic alliance unite to demand 6th Schedule and statehood.', era: 'ut', color: '#0284c7' },
    { year: '2024', title: 'Pashmina March & Fasts', desc: 'Sonam Wangchuk leads massive hunger strikes and marches to protect grazing lands and secure the 6th Schedule.', era: 'ut', color: '#0284c7' },
    { year: '2026', title: 'Ecological Crisis acknowledged', desc: 'Groundbreaking research highlights the severe threat of unregulated development to Ladakh\'s water security.', era: 'ut', color: '#0284c7' },
  ];

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug');
    const found = this.eras.find(e => e.id === slug);
    this.era.set(found ?? null);
  }
}




