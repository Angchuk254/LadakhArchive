import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
  host: { '(document:keydown.escape)': 'onEscape()' },
})
export class Gallery {
  private sanitizer = inject(DomSanitizer);

  /* â”€â”€ UI State â”€â”€ */
  activeCategory = signal<string>('all');
  activeTab = signal<'photos' | 'videos'>('photos');
  lightboxItem = signal<any>(null);
  activeVideo = signal<SafeResourceUrl | null>(null);
  activeVideoTitle = signal<string>('');

  /* â”€â”€ Categories â”€â”€ */
  categories = [
    { value: 'all', label: 'all', icon: 'bi-grid-3x3-gap' },
    { value: 'landscape', label: 'Landscapes', icon: 'bi-mountains' },
    { value: 'monastery', label: 'Monasteries', icon: 'bi-building' },
    { value: 'people', label: 'People & Life', icon: 'bi-people' },
    { value: 'festival', label: 'Festivals', icon: 'bi-music-note-beamed' },
    { value: 'wildlife', label: 'Wildlife', icon: 'bi-bug' },
    { value: 'adventure', label: 'adventure', icon: 'bi-bicycle' },
    { value: 'heritage', label: 'Heritage & art', icon: 'bi-palette' },
  ];

  /* â”€â”€ Stats â”€â”€ */
  stats = [
    { icon: 'bi-image', value: '500+', label: 'Photographs' },
    { icon: 'bi-camera-video', value: '45+', label: 'Videos' },
    { icon: 'bi-person-badge', value: '60+', label: 'Photographers' },
    { icon: 'bi-tags', value: '8', label: 'Categories' },
  ];

  /* â”€â”€ Photos â”€â”€ */
  photos: GalleryPhoto[] = [
    // Landscapes
    { id: 1, title: 'Pangong Tso at Sunrise', category: 'landscape', location: 'Pangong Lake, 14,270 ft', photographer: 'Tsewang Namgyal', desc: 'The ethereal blue waters of Pangong Tso reflecting the first light of dawn against the Changchenmo Range.', gradient: 'linear-gradient(135deg, #0c4a6e, #0d9488)', icon: 'bi-water', tags: ['Lake', 'Sunrise', 'Changthang'] },
    { id: 2, title: 'Nubra Valley Sand Dunes', category: 'landscape', location: 'Hunder, Nubra Valley', photographer: 'Padma Chorol', desc: 'The surreal cold desert sand dunes of Hunder with Bactrian camels silhouetted against the Karakoram Range.', gradient: 'linear-gradient(135deg, #92400e, #c8702a)', icon: 'bi-sun', tags: ['Desert', 'Nubra', 'Camels'] },
    { id: 3, title: 'Zanskar River Gorge', category: 'landscape', location: 'Zanskar, 11,500 ft', photographer: 'Dorjay angchuk', desc: 'The dramatic frozen Zanskar River cutting through towering canyon walls during the legendary Chadar Trek season.', gradient: 'linear-gradient(135deg, #1e3a5f, #4f46e5)', icon: 'bi-snow2', tags: ['Frozen River', 'Chadar', 'Winter'] },
    { id: 4, title: 'Magnetic Hill Panorama', category: 'landscape', location: 'Magnetic Hill, Leh', photographer: 'Sonam Wangchuk', desc: 'The optical illusion of Magnetic Hill with the sweeping Indus Valley and the distant peaks of the Stok Range.', gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)', icon: 'bi-signpost', tags: ['Magnetic Hill', 'Indus Valley', 'Leh'] },
    { id: 5, title: 'Tso Moriri Twilight', category: 'landscape', location: 'Tso Moriri, 15,075 ft', photographer: 'angmo Dolma', desc: ' A stunning twilight view of Tso Moriri with the stars beginning to appear over Ladakh\'s highest lake.', gradient: 'linear-gradient(135deg, #1e1b4b, #312e81)', icon: 'bi-stars', tags: ['Lake', 'Stars', 'High altitude'] },

    // Monasteries
    { id: 6, title: 'Thiksey Monastery Dawn', category: 'monastery', location: 'Thiksey, Leh District', photographer: 'Rigzin Wangmo', desc: 'The 12-storey Thiksey Gompa — often called the "Mini Potala" — bathed in golden morning light with prayer flags fluttering.', gradient: 'linear-gradient(135deg, #c8702a, #e89b4e)', icon: 'bi-building', tags: ['Gompa', 'Buddhist', 'architecture'] },
    { id: 7, title: 'Hemis Monastery Interior', category: 'monastery', location: 'Hemis, Leh District', photographer: 'Tsewang Namgyal', desc: 'The ornate interior of Hemis — Ladakh\'s wealthiest monastery — with Ancient thangka paintings and gold-plated Buddha statues.', gradient: 'linear-gradient(135deg, #92400e, #b45309)', icon: 'bi-lamp', tags: ['Hemis', 'Thangka', 'Interior'] },
    { id: 8, title: 'Diskit Buddha Statue', category: 'monastery', location: 'Diskit, Nubra Valley', photographer: 'Padma Chorol', desc: 'The majestic 32-metre Maitreya Buddha statue at Diskit Monastery overlooking the vast Nubra Valley at sunset.', gradient: 'linear-gradient(135deg, #b45309, #f59e0b)', icon: 'bi-emoji-smile', tags: ['Buddha', 'Statue', 'Nubra'] },
    { id: 9, title: 'alchi Ancient Murals', category: 'monastery', location: 'alchi, Leh District', photographer: 'Dorjay angchuk', desc: 'The exquisite 11th-century murals of alchi Monastery — among the finest examples of Kashmiri-Buddhist art surviving anywhere in the world.', gradient: 'linear-gradient(135deg, #7c2d12, #dc2626)', icon: 'bi-palette', tags: ['Murals', 'ancient', '11th Century'] },

    // People & Life
    { id: 10, title: 'Changpa Nomad Family', category: 'people', location: 'Changthang Plateau', photographer: 'Fatima Bano', desc: ' A Changpa nomadic family with their Pashmina goats on the windswept Changthang plateau at 15,000+ feet — preserving traditions spanning millennia.', gradient: 'linear-gradient(135deg, #059669, #10b981)', icon: 'bi-people', tags: ['Nomads', 'Changpa', 'Pashmina'] },
    { id: 11, title: 'Ladakhi Grandmother Spinning', category: 'people', location: 'Likir Village', photographer: 'Stanzin Dorjay', desc: 'an elderly Ladakhi woman spinning yak wool using A traditional hand spindle — A daily ritual passed through generations.', gradient: 'linear-gradient(135deg, #b45309, #d97706)', icon: 'bi-person', tags: ['Weaving', 'Village', 'Traditional'] },
    { id: 12, title: 'Balti Children at School', category: 'people', location: 'Turtuk, Nubra Valley', photographer: 'Mohd. Iqbal', desc: 'Smiling Balti children in Turtuk — India\'s northernmost village — walking to school through apricot orchards with the Karakoram as backdrop.', gradient: 'linear-gradient(135deg, #2563eb, #3b82f6)', icon: 'bi-emoji-laughing', tags: ['Children', 'Turtuk', 'Balti'] },
    { id: 13, title: 'Monk Debate at Likir', category: 'people', location: 'Likir Monastery', photographer: 'angmo Dolma', desc: 'Young monks engaged in philosophical debate at Likir Monastery — A centuries-old Buddhist tradition of intellectual challenge and learning.', gradient: 'linear-gradient(135deg, #7c3aed, #8b5cf6)', icon: 'bi-chat-dots', tags: ['Monks', 'Debate', 'Buddhist'] },

    // Festivals
    { id: 14, title: 'Hemis Festival Cham Dance', category: 'festival', location: 'Hemis Monastery', photographer: 'Rigzin Wangmo', desc: ' A masked dancer performing the sacred Cham dance at Hemis Tsechu — Ladakh\'s largest and most famous monastery festival celebrating Guru Padmasambhava.', gradient: 'linear-gradient(135deg, #dc2626, #ef4444)', icon: 'bi-music-note-beamed', tags: ['Cham', 'Hemis', 'Dance'] },
    { id: 15, title: 'Losar New Year Celebration', category: 'festival', location: 'Leh Town', photographer: 'Tsewang Namgyal', desc: 'Families gathering for the Ladakhi Losar (New Year) celebration with traditional foods, chang (barley beer), and folk performances.', gradient: 'linear-gradient(135deg, #c8702a, #f59e0b)', icon: 'bi-stars', tags: ['Losar', 'New Year', 'Cultural'] },
    { id: 16, title: 'Sindhu Darshan Festival', category: 'festival', location: 'Shey, Indus River', photographer: 'Stanzin Dorjay', desc: 'The grand Sindhu Darshan ceremony on the banks of the Indus River — celebrating India\'s civilisational river where it flows through Ladakh.', gradient: 'linear-gradient(135deg, #0c4a6e, #06b6d4)', icon: 'bi-water', tags: ['Sindhu', 'River', 'National'] },

    // Wildlife
    { id: 17, title: 'Snow Leopard in Hemis', category: 'wildlife', location: 'Hemis National Park', photographer: 'Dorjay angchuk', desc: 'The elusive Ghost of the Mountains — A snow leopard spotted in its natural habitat in Hemis National Park, home to the world\'s densest population.', gradient: 'linear-gradient(135deg, #475264, #737d8e)', icon: 'bi-github', tags: ['Snow Leopard', 'Hemis', 'Predator'] },
    { id: 18, title: 'Black-necked Cranes', category: 'wildlife', location: 'Hanle Marshes, Changthang', photographer: 'Padma Chorol', desc: ' A pair of endangered Black-necked Cranes — sacred in Buddhist tradition — breeding at the Hanle marshlands, their highest-altitude breeding ground.', gradient: 'linear-gradient(135deg, #1e3a5f, #2563eb)', icon: 'bi-feather', tags: ['Cranes', 'Hanle', 'Endangered'] },
    { id: 19, title: 'Wild Yaks of Changthang', category: 'wildlife', location: 'Changthang, 16,000 ft', photographer: 'Sonam angmo', desc: ' A herd of domesticated yaks grazing on the sparse Changthang vegetation — the backbone of nomadic life providing milk, wool, and transport.', gradient: 'linear-gradient(135deg, #713f12, #a16207)', icon: 'bi-circle', tags: ['Yak', 'Changthang', 'Nomadic'] },

    // Adventure
    { id: 20, title: 'Chadar Trek — Frozen River', category: 'adventure', location: 'Zanskar River', photographer: 'Stanzin Dorjay', desc: 'Trekkers navigating the legendary Chadar Trek — walking on the frozen Zanskar River through narrow canyons in -25ÂaC temperatures.', gradient: 'linear-gradient(135deg, #0c4a6e, #0ea5e9)', icon: 'bi-snow', tags: ['Chadar', 'Trek', 'Winter'] },
    { id: 21, title: 'Cycling Khardung La', category: 'adventure', location: 'Khardung La, 17,982 ft', photographer: 'Mohd. Iqbal', desc: ' A cyclist conquering Khardung La — one of the world\'s highest motorable passes — with stunning views of the Karakoram and Ladakh Ranges.', gradient: 'linear-gradient(135deg, #059669, #10b981)', icon: 'bi-bicycle', tags: ['Cycling', 'Khardung La', 'Pass'] },
    { id: 22, title: 'Rafting on Indus River', category: 'adventure', location: 'Phey to Nimmu, Indus River', photographer: 'angmo Dolma', desc: 'White-water rafting through the Zanskar-Indus confluence — the dramatic meeting of two rivers amid towering cliffs and monasteries.', gradient: 'linear-gradient(135deg, #1e40af, #3b82f6)', icon: 'bi-water', tags: ['Rafting', 'Indus', 'Confluence'] },

    // Heritage & art
    { id: 23, title: 'Thangka Painting Master', category: 'heritage', location: 'Leh Old Town', photographer: 'Tsewang Namgyal', desc: ' A master thangka artist meticulously painting A Buddhist deity using natural mineral pigments — A meditative art form requiring years of training.', gradient: 'linear-gradient(135deg, #c8702a, #d97706)', icon: 'bi-brush', tags: ['Thangka', 'art', 'Buddhist'] },
    { id: 24, title: 'Pashmina Weaving', category: 'heritage', location: 'Leh Craft Centre', photographer: 'Fatima Bano', desc: 'The intricate art of Pashmina weaving — transforming the world\'s finest wool from Changra goats into luxurious shawls worth thousands.', gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)', icon: 'bi-align-center', tags: ['Pashmina', 'Weaving', 'Craft'] },
    { id: 25, title: 'ancient Rock Carvings', category: 'heritage', location: 'Dras, Kargil District', photographer: 'Mohd. Iqbal', desc: 'Petroglyphs and rock carvings dating back over 2,000 years at Dras — depicting ibex, hunters, and early Buddhist symbols along Ancient trade routes.', gradient: 'linear-gradient(135deg, #713f12, #92400e)', icon: 'bi-pencil', tags: ['Petroglyphs', 'ancient', 'Rock art'] },
  ];

  /* â”€â”€ Videos â”€â”€ */
  videos: GalleryVideo[] = [
    { id: 1, title: 'Ladakh: Land of High Passes', category: 'landscape', duration: '22 min', youtubeId: 'dQw4w9WgXcQ', desc: 'an aerial journey across Ladakh\'s breathtaking landscapes — from the Indus Valley to the frozen lakes of Changthang.', gradient: 'linear-gradient(135deg, #0c4a6e, #0d9488)', icon: 'bi-camera-reels', tags: ['aerial', 'Documentary', 'Landscape'] },
    { id: 2, title: 'Hemis Festival Documentary', category: 'festival', duration: '18 min', youtubeId: 'dQw4w9WgXcQ', desc: ' A complete documentation of the annual Hemis Tsechu with Cham dances, ceremonies, and the rare unfurling of the giant thangka.', gradient: 'linear-gradient(135deg, #dc2626, #ef4444)', icon: 'bi-film', tags: ['Hemis', 'Festival', 'Cham'] },
    { id: 3, title: 'Chadar Trek: Walking on Ice', category: 'adventure', duration: '28 min', youtubeId: 'dQw4w9WgXcQ', desc: 'Follow trekkers on the legendary frozen river trek through Zanskar — one of the most extreme and beautiful treks on Earth.', gradient: 'linear-gradient(135deg, #1e3a5f, #4f46e5)', icon: 'bi-snow', tags: ['Chadar', 'Trek', 'Winter'] },
    { id: 4, title: 'The Snow Leopard Quest', category: 'wildlife', duration: '32 min', youtubeId: 'dQw4w9WgXcQ', desc: 'Join wildlife photographers in Hemis National Park as they track the elusive snow leopard through frozen valleys and rocky ridges.', gradient: 'linear-gradient(135deg, #475264, #64748b)', icon: 'bi-binoculars', tags: ['Snow Leopard', 'Wildlife', 'Hemis'] },
    { id: 5, title: 'Pashmina: Fibre of Gods', category: 'heritage', duration: '15 min', youtubeId: 'dQw4w9WgXcQ', desc: 'From Changra goats on the Changthang plateau to luxury shawls — the entire journey of the world\'s finest wool.', gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)', icon: 'bi-camera-video', tags: ['Pashmina', 'Craft', 'Documentary'] },
    { id: 6, title: 'Changpa Nomads: Last Shepherds', category: 'people', duration: '20 min', youtubeId: 'dQw4w9WgXcQ', desc: 'The vanishing way of life of the Changpa nomads, who endure -40ÂaC winters on the Changthang plateau herding Pashmina goats.', gradient: 'linear-gradient(135deg, #059669, #10b981)', icon: 'bi-people', tags: ['Nomads', 'Changpa', 'Lifestyle'] },
    { id: 7, title: 'Monasteries of Ladakh', category: 'monastery', duration: '25 min', youtubeId: 'dQw4w9WgXcQ', desc: ' A spiritual journey through Ladakh\'s most Ancient monasteries — Hemis, Thiksey, alchi, Lamayuru, and Diskit.', gradient: 'linear-gradient(135deg, #b45309, #f59e0b)', icon: 'bi-building', tags: ['Monastery', 'Buddhist', 'Spiritual'] },
    { id: 8, title: 'SECMOL: Education Revolution', category: 'people', duration: '17 min', youtubeId: 'dQw4w9WgXcQ', desc: 'How Sonam Wangchuk\'s SECMOL campus is revolutionising education in Ladakh with solar power, ice stupas, and hands-on learning.', gradient: 'linear-gradient(135deg, #dc2626, #f97316)', icon: 'bi-mortarboard', tags: ['SECMOL', 'Education', 'Innovation'] },
    { id: 9, title: 'Cycling Manali to Leh', category: 'adventure', duration: '24 min', youtubeId: 'dQw4w9WgXcQ', desc: 'an epic cycling journey across five 4,000m+ passes on one of the world\'s highest and most dramatic cycling routes.', gradient: 'linear-gradient(135deg, #059669, #0d9488)', icon: 'bi-bicycle', tags: ['Cycling', 'Manali-Leh', 'adventure'] },
  ];

  /* â”€â”€ Featured Collections â”€â”€ */
  collections = [
    { title: 'Frozen Ladakh', desc: 'Winter landscapes, frozen rivers, and the legendary Chadar Trek season — Ladakh at its most extreme and beautiful.', count: 35, icon: 'bi-snow3', color: '#0c4a6e' },
    { title: 'Monastery architecture', desc: ' A curated collection of the region\'s most stunning Buddhist monasteries, from 10th-century alchi to the towering Thiksey.', count: 28, icon: 'bi-building', color: '#c8702a' },
    { title: 'Faces of Ladakh', desc: 'Portraits of the people who call this high-altitude desert home — monks, nomads, farmers, Artisans, and children.', count: 42, icon: 'bi-person', color: '#7c3aed' },
    { title: 'Festivals & Ceremonies', desc: 'The vibrant colours and masked dances of Ladakh\'s annual monastery festivals and cultural celebrations.', count: 31, icon: 'bi-music-note', color: '#dc2626' },
    { title: 'Wildlife Encounters', desc: 'Snow leopards, black-necked cranes, wild yaks, and bharal spotted in their natural high-altitude habitats.', count: 24, icon: 'bi-binoculars', color: '#059669' },
    { title: 'adventure Routes', desc: 'From Khardung La conquests to Indus rafting — the most thrilling Adventure moments captured across Ladakh.', count: 19, icon: 'bi-bicycle', color: '#0d9488' },
  ];

  /* â”€â”€ Computed: Filtered Photos â”€â”€ */
  filteredPhotos = computed(() => {
    const cat = this.activeCategory();
    return cat === 'all' ? this.photos : this.photos.filter(p => p.category === cat);
  });

  filteredVideos = computed(() => {
    const cat = this.activeCategory();
    return cat === 'all' ? this.videos : this.videos.filter(v => v.category === cat);
  });

  /* â”€â”€ Methods â”€â”€ */
  setCategory(cat: string) {
    this.activeCategory.set(cat);
  }

  setTab(tab: 'photos' | 'videos') {
    this.activeTab.set(tab);
  }

  openLightbox(item: any) {
    this.lightboxItem.set(item);
  }

  closeLightbox() {
    this.lightboxItem.set(null);
  }

  playVideo(vid: GalleryVideo) {
    const url = `https://www.youtube.com/embed/${vid.youtubeId}?autoplay=1&rel=0`;
    this.activeVideo.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
    this.activeVideoTitle.set(vid.title);
  }

  closeVideo() {
    this.activeVideo.set(null);
    this.activeVideoTitle.set('');
  }

  onEscape() {
    if (this.activeVideo()) {
      this.closeVideo();
    } else if (this.lightboxItem()) {
      this.closeLightbox();
    }
  }

  getCategoryCount(cat: string): number {
    if (cat === 'all') return this.photos.length;
    return this.photos.filter(p => p.category === cat).length;
  }

  getVideoCategoryCount(cat: string): number {
    if (cat === 'all') return this.videos.length;
    return this.videos.filter(v => v.category === cat).length;
  }
}

interface GalleryPhoto {
  id: number;
  title: string;
  category: string;
  location: string;
  photographer: string;
  desc: string;
  gradient: string;
  icon: string;
  tags: string[];
}

interface GalleryVideo {
  id: number;
  title: string;
  category: string;
  duration: string;
  youtubeId: string;
  desc: string;
  gradient: string;
  icon: string;
  tags: string[];
}




