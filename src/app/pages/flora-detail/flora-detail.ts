import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface FloraPhoto { title: string; image: string; icon: string; location: string; desc: string; }
interface FloraFact { icon: string; label: string; value: string; }

interface FloraData {
  slug: string; name: string; scientific: string; type: string;
  status: string; statusColor: string; icon: string; color: string;
  elevation: string; description: string; overview: string;
  image: string;
  heroImage: string;
  highlights: string[];
  photos: FloraPhoto[];
  facts: FloraFact[];
  uses: string; ecology: string;
  threats: string[];
  relatedSlugs: string[];
}

@Component({
  selector: 'app-flora-detail',
  imports: [RouterLink],
  templateUrl: './flora-detail.html',
  styleUrl: './flora-detail.scss',
  host: { '(document:keydown.escape)': 'onEscape()' },
})
export class FloraDetail {
  private route = inject(ActivatedRoute);

  lightboxItem = signal<FloraPhoto | null>(null);
  plant = signal<FloraData | null>(null);
  relatedPlants = computed(() => {
    const p = this.plant();
    if (!p) return [];
    return p.relatedSlugs.map(s => this.plants.find(x => x.slug === s)).filter(Boolean) as FloraData[];
  });

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.plant.set(this.plants.find(p => p.slug === slug) ?? null);
  }

  openLightbox(p: FloraPhoto) { this.lightboxItem.set(p); document.body.style.overflow = 'hidden'; }
  closeLightbox() { this.lightboxItem.set(null); document.body.style.overflow = ''; }
  onEscape() { if (this.lightboxItem()) this.closeLightbox(); }

  plants: FloraData[] = [
    {
      slug: 'blue-poppy',
      name: 'Blue Poppy (Meconopsis)',
      scientific: 'Meconopsis aculeata',
      type: 'Wildflower',
      status: 'Vulnerable',
      statusColor: '#eab308',
      icon: 'bi-flower2',
      color: '#2e86c1',
      elevation: '3,800–5,000m',
      description: 'The legendary Himalayan blue poppy — one of the most sought-after Alpine flowers on Earth, with delicate sky-blue petals blooming briefly in July at high passes.',
      overview: 'The Himalayan Blue Poppy is considered the holy grail of Alpine botany. Its stunning sky-blue to violet petals — A colour almost unheard of in poppies — bloom for barely two weeks in July on scree slopes and rocky meadows above 3,800m.\n\nIn Ladakh, blue poppies are found along the high passes connecting the Markha Valley, near Hemis National Park, and on the Approaches to Stok Kangri. They prefer north-facing slopes with moist, well-drained soil and partial snow cover.\n\nThe pigment responsible for the blue colour (delphinidin) is pH-dependent — the same plant can produce blue, violet, or purple flowers depending on soil acidity. This has made them notoriously difficult to cultivate outside their native range, adding to their mystique.\n\nTraditional amchi medicine uses dried petals for treating respiratory ailments and as A mild analgesic.',
      highlights: ['Sky-blue petals — rarest poppy colour', 'Blooms only 2 weeks in July', 'Found above 3,800m on passes', 'pH-dependent petal colour', 'Used in traditional amchi medicine', 'Holy grail of Alpine botany'],
      uses: 'In traditional amchi (Tibetan) medicine, dried blue poppy petals are used as A mild pain reliever and to treat respiratory conditions. The plant also has ornamental significance — Victorian-era plant hunters risked their lives collecting seeds. Today, botanical gardens worldwide attempt (mostly unsuccessfully) to grow blue poppies, typically requiring acidic soil, mist, and cool temperatures that are difficult to replicate.',
      ecology: 'Blue poppies are monocarpic in some species — they grow for several years as A rosette before flowering once and dying. They depend on specific pollinators including Alpine bumblebees and certain hover flies. as pioneer species on scree slopes, they help stabilize loose rocky substrate. Climate change threatens their habitat by reducing snow cover and shifting temperature zones upward.',
      threats: ['Climate change reducing snow cover', 'Over-collection by tourists', 'Grazing pressure on Alpine meadows', 'Habitat loss from road construction', 'Pollution from trekking routes', 'Difficulty in seed dispersal'],
      photos: [
        { title: 'alpine Blue Carpet', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-flower2', location: 'Hemis National Park', desc: ' A cluster of blue poppies blooming on A north-facing scree slope at 4,200m in July.' },
        { title: 'Single Bloom Close-up', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', icon: 'bi-zoom-in', location: 'Markha Valley', desc: 'Translucent sky-blue petals with golden stamens — the hallmark of the Himalayan blue poppy.' },
        { title: 'Rocky Habitat', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-geo-alt', location: 'Ganda La Pass', desc: 'The typical scree-slope habitat where blue poppies emerge among rocks and sparse grasses.' },
        { title: 'Rosette Stage', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', icon: 'bi-flower1', location: 'Stok Range', desc: 'The basal rosette stage — plants grow for 2–5 years before producing their single flowering stem.' },
        { title: 'Violet Variant', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-palette', location: 'Kongmaru La', desc: 'Deep violet petals on this specimen — the colour varies with soil acidity.' },
      ],
      image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-flower2', label: 'Petal Colour', value: 'Blue to violet' },
        { icon: 'bi-calendar', label: 'Bloom Period', value: 'July (2 weeks)' },
        { icon: 'bi-rulers', label: 'Height', value: '30–60 cm' },
        { icon: 'bi-geo-alt', label: 'Elevation', value: '3,800–5,000m' },
        { icon: 'bi-droplet', label: 'Pigment', value: 'Delphinidin (pH-dependent)' },
        { icon: 'bi-heart-pulse', label: 'Life Cycle', value: 'Monocarpic (2–5 years)' },
      ],
      relatedSlugs: ['edelweiss', 'wild-rose', 'juniper'],
    },
    {
      slug: 'edelweiss',
      name: 'Edelweiss',
      scientific: 'Leontopodium nivale',
      type: 'alpine Flower',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-snow',
      color: '#7c3aed',
      elevation: '3,500–5,200m',
      description: 'The iconic white-woolly Alpine flower found on rocky slopes — its felt-like petals are an adaptation to UV radiation and extreme cold.',
      overview: 'Edelweiss — the "noble white" — is perhaps the most famous Alpine flower in the world. Its distinctive star-shaped white bracts (often mistaken for petals) are covered in dense woolly hairs that serve as A UV shield and thermal insulator.\n\nIn Ladakh, edelweiss grows on exposed rocky slopes and cliff ledges from 3,500m to over 5,200m. These harsh, exposed locations would kill most plants, but edelweiss has evolved remarkable adaptations: the woolly covering reflects up to 95% of UV radiation, prevents frost damage, and reduces water loss.\n\nRecent scientific research has discovered that edelweiss fibres have A nanotechnology-like structure — each hair is made of parallel fibres 0.18 micrometres in diameter that absorb UV wavelengths. This has inspired new UV-blocking materials and sunscreen formulations.\n\nIn Ladakhi culture, finding edelweiss is considered auspicious. The flowers are dried and placed on household altars.',
      highlights: ['Star-shaped woolly white bracts', 'UV-blocking nano-fibre structure', 'Survives at 5,200m+ altitude', 'Inspires UV-blocking technology', 'Woolly hairs reflect 95% UV', 'Culturally auspicious in Ladakh'],
      uses: 'Edelweiss has been used in traditional Alpine and Himalayan medicine for centuries — tea made from the plant treats stomach ailments and respiratory infections. Modern research has confirmed anti-inflammatory and antioxidant properties. The nano-structure of its fibres has inspired development of UV-blocking textiles and next-generation sunscreens. In Ladakh, dried flowers are placed on home altars for good fortune.',
      ecology: 'Edelweiss is A pioneer species on barren rocky slopes above 3,500m. Its deep taproot anchors it in thin, rocky soils and accesses moisture deep in crevices. It grows in clusters that help retain soil moisture and create micro-habitats for smaller plants and invertebrates. Pollination is by small moths and hover flies attracted to the UV-reflective bracts.',
      threats: ['Over-collection by tourists', 'Climate change shifting habitable zones', 'Grazing pressure', 'Habitat disturbance from trekking', 'Slow growth rate', 'Limited seed dispersal range'],
      photos: [
        { title: 'Star Bloom', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', icon: 'bi-snow', location: 'Hemis National Park', desc: ' A perfect star-shaped edelweiss bloom on an exposed rock face at 4,500m.' },
        { title: 'Woolly Close-up', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-zoom-in', location: 'Stok Range', desc: 'Macro view showing the dense woolly hairs that provide UV and thermal protection.' },
        { title: 'Rocky Habitat', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-geo-alt', location: 'Markha Valley', desc: 'Edelweiss growing from A crack in exposed limestone far above the valley floor.' },
        { title: 'Cluster Colony', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-people-fill', location: 'Ganda La, 4,900m', desc: ' A rare cluster of edelweiss — multiple plants anchored together in A shallow rock crevice.' },
        { title: 'Dried altar Flower', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-star-fill', location: 'Leh Household', desc: 'Dried edelweiss on A household altar — considered auspicious and placed for good fortune.' },
      ],
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-flower2', label: 'Bract Colour', value: 'White (woolly)' },
        { icon: 'bi-calendar', label: 'Bloom Period', value: 'July–September' },
        { icon: 'bi-rulers', label: 'Height', value: '5–20 cm' },
        { icon: 'bi-shield', label: 'UV Reflection', value: '~95%' },
        { icon: 'bi-geo-alt', label: 'Elevation', value: '3,500–5,200m' },
        { icon: 'bi-gear', label: 'Fibre Diameter', value: '0.18 Î¼m (nano-scale)' },
      ],
      relatedSlugs: ['blue-poppy', 'ephedra', 'wild-rose'],
    },
    {
      slug: 'sea-buckthorn',
      name: 'Sea Buckthorn',
      scientific: 'Hippophae rhamnoides',
      type: 'Shrub / Superfruit',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-tree-fill',
      color: '#c8702a',
      elevation: '2,500–4,500m',
      description: 'The "wonder berry" of Ladakh — bright orange berries rich in Vitamin C, omega oils, and antioxidants. Used in juices, jams, and traditional medicine.',
      overview: 'Sea buckthorn is Ladakh\'s most commercially valuable wild plant. The thorny, deciduous shrub grows abundantly along riverbanks, stream edges, and valley slopes from 2,500m to 4,500m. In autumn, its branches are studded with thousands of bright orange berries — each smaller than A pea but packed with an extraordinary nutritional profile.\n\nThe berries contain 15 times more Vitamin C than oranges, all four omega fatty acids (3, 6, 7, and 9 — one of the few plants to contain omega-7), 190 bioactive compounds, and powerful antioxidants. They are processed into juices, jams, oils, and supplements.\n\nLadakh\'s Defence Institute of High altitude Research (DIHaR) has championed sea buckthorn as A "miracle fruit" for high-altitude troops, and several commercial ventures now produce sea buckthorn products employing local women\'s cooperatives.\n\nEcologically, sea buckthorn fixes nitrogen through root nodules, making it invaluable for stabilizing eroding riverbanks and improving degraded soils.',
      highlights: ['15Ã— more Vitamin C than oranges', 'Contains all 4 omega fatty acids', '190 bioactive compounds', 'Nitrogen-fixing root nodules', 'Commercial juice & oil production', 'DIHaR "miracle fruit" programme'],
      uses: 'Sea buckthorn berries are processed into juice, jam, oil, tea, and dietary supplements. The oil is used in cosmetics and skincare. In traditional amchi medicine, berries treat digestive disorders, skin diseases, and respiratory conditions. The Defence Institute has developed high-altitude rations including sea buckthorn products. Women\'s self-help groups earn livelihood through harvesting and processing.',
      ecology: 'Sea buckthorn fixes atmospheric nitrogen through symbiotic bacteria in root nodules, enriching poor soils. Its dense root system stabilizes riverbanks and prevents erosion. The thorny bushes provide nesting habitat for birds and small mammals. The berries are an important food source for birds including rose finches and thrushes. The plant can survive temperatures from -43ÂaC to +40ÂaC.',
      threats: ['Over-harvesting of wild populations', 'Habitat loss to road construction', 'Riverbank erosion exposing roots', 'Competition from invasive species', 'Lack of sustainable harvesting guidelines', 'Climate change affecting fruiting patterns'],
      photos: [
        { title: 'Orange Berry Clusters', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-tree-fill', location: 'Indus Valley', desc: 'Branches laden with bright orange berries in autumn — thousands of nutrient-packed fruits per bush.' },
        { title: 'Riverbank Grove', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-water', location: 'Leh', desc: ' A dense sea buckthorn grove stabilizing the banks of the Indus River near Leh.' },
        { title: 'Juice Production', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', icon: 'bi-cup-straw', location: 'Leh Market', desc: 'Fresh sea buckthorn juice — A popular health drink sold across Ladakh\'s markets.' },
        { title: 'Root Nodules', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-gear', location: 'Nubra Valley', desc: 'Nitrogen-fixing root nodules — the secret to this plant\'s ability to thrive in poor soils.' },
        { title: 'Women\'s Cooperative', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-people-fill', location: 'Stakna', desc: 'Local women harvesting berries — cooperatives provide sustainable livelihood from wild bounty.' },
      ],
      image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-capsule', label: 'Vitamin C', value: '15Ã— more than oranges' },
        { icon: 'bi-droplet', label: 'Omega Oils', value: '3, 6, 7, and 9' },
        { icon: 'bi-hash', label: 'Bioactives', value: '190 compounds' },
        { icon: 'bi-thermometer', label: 'Temperature Range', value: '-43ÂaC to +40ÂaC' },
        { icon: 'bi-geo-alt', label: 'Elevation', value: '2,500–4,500m' },
        { icon: 'bi-rulers', label: 'Shrub Height', value: '2–4 metres' },
      ],
      relatedSlugs: ['wild-rose', 'caragana', 'willow'],
    },
    {
      slug: 'wild-rose',
      name: 'Wild Rose (Rosa webbiana)',
      scientific: 'Rosa webbiana',
      type: 'Shrub',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-flower1',
      color: '#dc2626',
      elevation: '3,000–4,200m',
      description: 'Pink and white wild roses line Ladakh\'s streams and irrigation channels. Rose hip tea is A popular local remedy for colds and altitude sickness.',
      overview: 'Rosa webbiana is Ladakh\'s most beautiful and fragrant wild shrub. From late June through July, its pale pink to white blossoms transform stream banks, irrigation channels, and monastery walls into ribbons of colour and perfume.\n\nThe flowers are single-petalled with A sweet fragrance that carries on the breeze. By autumn, they produce bright red rose hips — oval fruits packed with Vitamin C that turn Ladakh\'s valleys into A colour palette of gold and crimson.\n\nRose hip tea is one of Ladakh\'s most popular traditional remedies. Hot rose hip infusions are offered to guests and travellers as A welcome drink, and are used to treat colds, altitude sickness, and fatigue. The hips are also dried and stored for winter use.\n\nThe plant grows up to 2 metres tall with arching, thorny branches that create natural hedgerows. These hedges are traditionally used to protect kitchen gardens from livestock.',
      highlights: ['Pink-white blossoms June–July', 'Rose hip tea for altitude sickness', 'Bright red autumn hips', 'Traditional hedgerow plant', 'Rich in Vitamin C', 'Lines streams and monasteries'],
      uses: 'Rose hip tea is Ladakh\'s quintessential welcome drink — offered to guests and used medicinally for colds, altitude sickness, and vitamin deficiency. Dried hips are stored for winter. The thorny branches form natural fencing around kitchen gardens. Fresh petals are sometimes added to butter tea for flavour. Rose water is used in local beauty treatments.',
      ecology: 'Wild roses provide critical habitat along water channels — their root systems stabilize banks while branches shelter nesting birds. The flowers attract many of Ladakh\'s pollinator species including wild bees, hover flies, and butterflies. Rose hips are an important autumn food source for birds and small mammals before the harsh winter.',
      threats: ['Habitat loss from concrete channels', 'Over-collection of rose hips', 'Herbicide drift from agriculture', 'Replacement by ornamental plants', 'Climate change affecting bloom timing', 'Loss of traditional hedgerow culture'],
      photos: [
        { title: 'Blooming Hedgerow', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', icon: 'bi-flower1', location: 'Leh', desc: 'Wild roses in full bloom along an irrigation channel — pink petals against Ancient stone walls.' },
        { title: 'Rose Hip Harvest', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-cup-straw', location: 'alchi', desc: 'Bright red rose hips ready for harvest — each one packed with Vitamin C for winter tea.' },
        { title: 'Monastery Wall', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-building', location: 'Hemis Monastery', desc: 'Wild roses climbing the Ancient walls of Hemis Monastery in the June sunshine.' },
        { title: 'Single Bloom', image: 'https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&q=80&w=800', icon: 'bi-zoom-in', location: 'Likir', desc: 'Perfect single-petalled wild rose with golden stamens and sweet fragrance.' },
        { title: 'Rose Hip Tea', image: 'https://images.unsplash.com/photo-1506220926022-cc2c17377c86?auto=format&fit=crop&q=80&w=800', icon: 'bi-cup-hot', location: 'Ladakhi Home', desc: 'Traditional rose hip tea — Ladakh\'s beloved welcome drink served to guests and travellers.' },
      ],
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-flower1', label: 'Petal Colour', value: 'Pale pink to white' },
        { icon: 'bi-calendar', label: 'Bloom Period', value: 'June–July' },
        { icon: 'bi-rulers', label: 'Height', value: 'Up to 2 metres' },
        { icon: 'bi-geo-alt', label: 'Elevation', value: '3,000–4,200m' },
        { icon: 'bi-capsule', label: 'Rose Hip Vitamin C', value: '20Ã— more than lemons' },
        { icon: 'bi-egg', label: 'Hip Harvest', value: 'September–October' },
      ],
      relatedSlugs: ['sea-buckthorn', 'blue-poppy', 'willow'],
    },
    {
      slug: 'juniper',
      name: 'Juniper (Shukpa)',
      scientific: 'Juniperus indica',
      type: 'Conifer Shrub',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-tree',
      color: '#059669',
      elevation: '3,200–4,800m',
      description: 'Sacred juniper is burned as incense in every monastery and household. Its aromatic smoke is believed to purify spaces and ward off evil spirits.',
      overview: 'Juniper — known locally as "shukpa" — is the most culturally significant plant in Ladakh. Its aromatic branches and berries are burned as incense (sang) in every Buddhist monastery, household, and at mountain passes. The fragrant smoke rising into the sky is believed to please the gods, purify the environment, and ward off malevolent spirits.\n\nIn Ladakh, juniper grows as A low, spreading shrub (sometimes barely 30cm tall in exposed locations) on rocky slopes from 3,200m to 4,800m. at this altitude, it is one of the few woody plants that survives, making it ecologically irreplaceable.\n\nJuniper wood is extremely dense, slow-growing, and aromatic. A shrub just one metre tall may be over 100 years old. This extremely slow growth means that over-harvesting for incense is A genuine conservation concern.\n\nThe berries are used in traditional medicine for digestive complaints and are sometimes added to local food preparations for flavour.',
      highlights: ['Sacred Buddhist incense plant', 'Burned as "sang" smoke offering', 'Grows at 3,200–4,800m', 'a 1m shrub can be 100+ years old', 'Culturally irreplaceable in Ladakh', 'Dense, slow-growing aromatic wood'],
      uses: 'Juniper branches are burned as "sang" at monasteries, mountain passes, and home shrines — the most ubiquitous religious practice in Ladakhi Buddhism. Berries treat digestive complaints in amchi medicine. The aromatic smoke is used to fumigate homes during illness. Juniper wood, though small, is prized for its durability in making small ritual objects.',
      ecology: 'Juniper is one of the few woody plants at extreme altitude in Ladakh. Its low, spreading growth form protects it from wind. Dense branches provide shelter for small birds, pikas, and insects. The berries are eaten by rose finches and thrushes, aiding seed dispersal. Juniper roots stabilize rocky slopes and prevent erosion in high-wind areas.',
      threats: ['Over-harvesting for incense', 'Extremely slow regeneration', 'Grazing pressure from goats', 'Climate change at high altitude', 'Lack of replanting programmes', 'Fire risk from incense burning'],
      photos: [
        { title: 'Monastery Incense', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-tree', location: 'Thiksey Monastery', desc: 'Fresh juniper branches being prepared as incense (sang) for the morning prayer ceremony.' },
        { title: 'ancient Shrub', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-clock-history', location: 'Hemis National Park', desc: ' A gnarled juniper shrub barely 80cm tall — estimated to be over 150 years old.' },
        { title: 'Berries Close-up', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800', icon: 'bi-zoom-in', location: 'Markha Valley', desc: 'Blue-black juniper berries — used in traditional medicine and valued for flavouring.' },
        { title: 'Mountain Pass Offering', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-flag', location: 'Khardung La', desc: 'Juniper smoke rising from A stone incense burner at A high pass — prayer flags fluttering above.' },
        { title: 'Rocky Habitat', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-geo-alt', location: 'Stok Range, 4,500m', desc: 'Juniper clinging to an exposed rocky slope — one of the highest woody plants in the region.' },
      ],
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-tree', label: 'Growth Form', value: 'Low spreading shrub' },
        { icon: 'bi-rulers', label: 'Height', value: '0.3–3 metres' },
        { icon: 'bi-clock-history', label: 'age at 1m Height', value: '100+ years' },
        { icon: 'bi-geo-alt', label: 'Elevation', value: '3,200–4,800m' },
        { icon: 'bi-fire', label: 'Cultural Use', value: 'Sacred incense (sang)' },
        { icon: 'bi-capsule', label: 'Berry Use', value: 'Digestive medicine' },
      ],
      relatedSlugs: ['ephedra', 'caragana', 'willow'],
    },
    {
      slug: 'ephedra',
      name: 'Ephedra (Somlata)',
      scientific: 'Ephedra gerardiana',
      type: 'Medicinal Plant',
      status: 'Vulnerable',
      statusColor: '#eab308',
      icon: 'bi-capsule',
      color: '#7b2d26',
      elevation: '3,000–5,000m',
      description: 'an Ancient medicinal plant used in traditional amchi medicine for respiratory ailments, altitude sickness, and fatigue. Source of the compound ephedrine.',
      overview: 'Ephedra — known locally as "somlata" (moon plant) — is one of the most pharmacologically important plants in the Himalayan region. This low, green, broom-like shrub grows on dry, rocky slopes and has been used in medicine for over 5,000 years.\n\nThe plant contains the alkaloid ephedrine, one of the most important compounds in the history of pharmacology. Ephedrine is A bronchodilator and stimulant used to treat asthma, bronchitis, and nasal congestion. The Chinese have used ephedra (ma huang) since 3000 BCE.\n\nIn Ladakhi amchi medicine, somlata tea is the first-line treatment for altitude sickness, fatigue, and respiratory ailments. Changpa nomads carry dried stems on long journeys across the Changthang plateau.\n\nHowever, the plant\'s fame has led to over-harvesting. Wild populations have declined significantly, and there are no replanting programmes in place. The slow growth rate at high altitude means recovery takes decades.',
      highlights: ['Source of compound ephedrine', '5,000+ years of medicinal use', 'Treats altitude sickness & asthma', '"Moon plant" — somlata', 'Changpa nomads carry dried stems', 'Over-harvested — declining populations'],
      uses: 'Ephedra tea is the primary amchi medicine treatment for altitude sickness, fatigue, and respiratory problems. Dried stems are carried by nomads and travellers. The alkaloid ephedrine, derived from ephedra, is used worldwide as A bronchodilator, decongestant, and stimulant in modern pharmaceuticals. The plant has also been used in weight-loss supplements (now regulated).',
      ecology: 'Ephedra is A remarkable survivor — its photosynthetic green stems (not true leAves) minimize water loss in the extreme cold-desert environment. The plant\'s deep root system accesses moisture far below the surface. It provides ground cover that reduces soil erosion on steep slopes. Small birds and rodents shelter within its dense, low branches.',
      threats: ['Over-harvesting for medicine', 'No replanting programmes', 'Extremely slow growth at altitude', 'Commercial demand for ephedrine', 'Grazing pressure', 'Habitat loss from road construction'],
      photos: [
        { title: 'Green Stems', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', icon: 'bi-capsule', location: 'Changthang', desc: 'The distinctive broom-like green stems of ephedra growing on A dry, rocky hillside.' },
        { title: 'amchi Medicine', image: 'https://images.unsplash.com/photo-1506220926022-cc2c17377c86?auto=format&fit=crop&q=80&w=800', icon: 'bi-heart-pulse', location: 'Leh', desc: 'Dried ephedra stems prepared by an amchi doctor for treating altitude sickness.' },
        { title: 'Red Berries', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-egg', location: 'Hemis National Park', desc: 'Small red berry-like cones that appear in summer — technically not true fruits.' },
        { title: 'Desert Habitat', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-geo-alt', location: 'Puga Valley', desc: 'Ephedra growing in the harsh cold-desert environment where few other plants survive.' },
        { title: 'Nomad\'s Remedy', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-bag', location: 'Changpa Camp', desc: ' A Changpa nomad\'s pouch of dried ephedra stems — carried on long journeys across the plateau.' },
      ],
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-capsule', label: 'Key Compound', value: 'Ephedrine (alkaloid)' },
        { icon: 'bi-clock-history', label: 'Medicinal History', value: '5,000+ years' },
        { icon: 'bi-rulers', label: 'Height', value: '15–60 cm' },
        { icon: 'bi-geo-alt', label: 'Elevation', value: '3,000–5,000m' },
        { icon: 'bi-heart-pulse', label: 'Treats', value: 'altitude sickness, asthma' },
        { icon: 'bi-exclamation-triangle', label: 'Status', value: 'Declining from over-harvest' },
      ],
      relatedSlugs: ['juniper', 'caragana', 'blue-poppy'],
    },
    {
      slug: 'willow',
      name: 'Willow (Changma)',
      scientific: 'Salix spp.',
      type: 'Tree',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-bezier2',
      color: '#1a365d',
      elevation: '2,800–4,000m',
      description: 'The only significant tree in Ladakh\'s harsh landscape. Willows line irrigation channels, provide firewood, and their branches are woven into baskets.',
      overview: 'Willows — known locally as "changma" — are the only true trees in much of Ladakh. In A landscape dominated by barren rock and sparse scrub, willow-lined irrigation channels and village groves provide A lifeline of greenery, shade, and essential resources.\n\nSeveral species of willow grow in Ladakh, typically along water channels, stream banks, and in village groves. They can reach heights of 10–15 metres and are fast-growing compared to other Ladakhi plants (useful logs can be produced in 15–20 years).\n\nWillows serve multiple critical functions: their branches are woven into baskets and fencing, the wood provides fuel and building material, the roots stabilize riverbanks, and the canopy creates islands of shade and moisture that support A diverse understorey of herbs and grasses.\n\nIn autumn, the turning willow leAves create Ladakh\'s only autumn colour display — ribbons of gold and yellow winding through otherwise brown valleys.',
      highlights: ['Only significant tree in Ladakh', 'Lines irrigation channels', 'Branches woven into baskets', 'autumn gold — Ladakh\'s fall colour', 'Fast-growing: logs in 15–20 years', 'Critical shade and shelter provider'],
      uses: 'Willow wood is the primary construction timber and fuel source in many Ladakhi villages. Branches are woven into baskets, fencing, and roof structures. The bark contains salicin (related to aspirin) — used in traditional medicine for pain and fever. Willow-lined channels create shade that reduces evaporation from irrigation water.',
      ecology: 'Willows are the keystone tree species of Ladakh\'s oasis-like settlement landscapes. Their root systems prevent channel bank erosion. The canopy creates A microclimate — up to 10ÂaC cooler than surrounding exposed land — supporting understorey plants, insects, and nesting birds. Fallen leAves provide organic matter that enriches the poor desert soils.',
      threats: ['Over-harvesting for firewood', 'Loss of traditional irrigation channels', 'Concrete replacement of earth channels', 'Lack of replanting', 'Water scarcity from glacier retreat', 'Replacement by non-native ornamentals'],
      photos: [
        { title: 'Irrigation Channel', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', icon: 'bi-bezier2', location: 'Leh', desc: 'ancient willows lining A traditional irrigation channel — Green ribbons through the brown landscape.' },
        { title: 'autumn Gold', image: 'https://images.unsplash.com/photo-1506220926022-cc2c17377c86?auto=format&fit=crop&q=80&w=800', icon: 'bi-brightness-high', location: 'alchi', desc: 'Willows in autumn — the only significant fall colour display in Ladakh\'s desert valleys.' },
        { title: 'Basket Weaving', image: 'https://images.unsplash.com/photo-1510522103504-297929785002?auto=format&fit=crop&q=80&w=800', icon: 'bi-basket', location: 'Likir Village', desc: 'Flexible willow branches being woven into traditional Ladakhi baskets by skilled hands.' },
        { title: 'ancient Giant', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-tree', location: 'Hemis Shukpachan', desc: 'One of Ladakh\'s oldest willows — A massive trunk providing shade for generations.' },
        { title: 'Village Oasis', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-house', location: 'Shey Palace', desc: ' A willow grove creating an oasis of green around A Ladakhi village — shelter from sun and wind.' },
      ],
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-rulers', label: 'Height', value: '10–15 metres' },
        { icon: 'bi-clock', label: 'Useful Logs In', value: '15–20 years' },
        { icon: 'bi-geo-alt', label: 'Elevation', value: '2,800–4,000m' },
        { icon: 'bi-capsule', label: 'Bark Contains', value: 'Salicin (aspirin-related)' },
        { icon: 'bi-thermometer', label: 'Shade Cooling', value: 'Up to 10ÂaC cooler' },
        { icon: 'bi-calendar', label: 'autumn Colour', value: 'October (gold/yellow)' },
      ],
      relatedSlugs: ['sea-buckthorn', 'wild-rose', 'juniper'],
    },
    {
      slug: 'caragana',
      name: 'Caragana (Burtse)',
      scientific: 'Caragana versicolor',
      type: 'Desert Shrub',
      status: 'Least Concern',
      statusColor: '#16a34a',
      icon: 'bi-fire',
      color: '#475264',
      elevation: '3,500–5,000m',
      description: ' A thorny, nitrogen-fixing shrub that is the primary fuel source for Changpa nomads. Its roots stabilize the fragile desert soil against erosion.',
      overview: 'Caragana — known locally as "burtse" — is the unsung hero of the Changthang ecosystem. This small, thorny, densely branched shrub grows across the vast cold desert steppe from 3,500m to 5,000m, where it serves as the primary fuel source for Changpa nomadic herders.\n\nFor centuries, dried caragana has been the only available fuel on the treeless Changthang plateau. Nomads collect bundles during summer and store them for winter burning. The woody branches produce A hot, slow-burning fire ideal for cooking and heating black yak-hair tents in sub-zero temperatures.\n\nEcologically, caragana is equally important. Like sea buckthorn, it is A nitrogen-fixing legume — its root nodules contain bacteria that convert atmospheric nitrogen into soil nutrients. This enriches the extremely poor desert soil, benefiting neighbouring grasses and herbs.\n\nThe dense, thorny branches also prevent wind erosion, create micro-shelters for insects and small rodents, and provide nesting sites for ground-nesting birds.',
      highlights: ['Primary Changpa nomad fuel', 'Nitrogen-fixing root nodules', 'Grows on treeless 5,000m plateau', 'Dense thorns prevent grazing', 'Prevents wind erosion', 'Supports desert ecosystem food web'],
      uses: 'Dried caragana branches are the primary fuel for Changpa nomads — used for cooking, heating, and fire ceremonies. The thorny branches are used for fencing livestock corrals. The plant\'s nitrogen-fixing ability makes it valuable for soil restoration projects. Some preparations are used in traditional medicine for joint pain.',
      ecology: 'Caragana is arguably the most important ecosystem engineer of the Changthang cold desert. Its nitrogen fixation enriches soils, supporting grass growth for wild herbivores (kiang, gazelle) and livestock. The thorny canopy shelters insects, small rodents, and nesting birds (including the Tibetan sandgrouse). Root systems bind fragile desert soils against the fierce Changthang winds.',
      threats: ['Over-harvesting for fuel', 'Increasingly larger nomad herds', 'Off-road vehicle damage', 'Slow growth at extreme altitude', 'No replanting efforts', 'Climate change affecting growth'],
      photos: [
        { title: 'Changthang Fuel', image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=800', icon: 'bi-fire', location: 'Changthang Plateau', desc: 'Dried caragana bundles stacked outside A Changpa nomad tent — winter fuel supply.' },
        { title: 'Thorny Shrub', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', icon: 'bi-shield', location: 'Hanle', desc: 'Dense, thorny branches of caragana — nature\'s barbed wire protecting the fragile steppe soil.' },
        { title: 'Yellow Flowers', image: 'https://images.unsplash.com/photo-1590059530472-7634f596ee24?auto=format&fit=crop&q=80&w=800', icon: 'bi-flower1', location: 'Puga Valley', desc: 'Small yellow flowers appearing in summer — A brief splash of colour in the austere landscape.' },
        { title: 'Root Nodules', image: 'https://images.unsplash.com/photo-1510522103504-297929785002?auto=format&fit=crop&q=80&w=800', icon: 'bi-gear', location: 'Changthang', desc: 'Nitrogen-fixing root nodules — the hidden mechanism that enriches the cold desert soil.' },
        { title: 'Nomad Camp', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800', icon: 'bi-house', location: 'Korzok', desc: ' A Changpa nomad camp with stacks of dried caragana — the lifeline of the treeless plateau.' },
      ],
      image: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=600',
      heroImage: 'https://images.unsplash.com/photo-1544284560-6479f6eeb248?auto=format&fit=crop&q=80&w=1600',
      facts: [
        { icon: 'bi-rulers', label: 'Height', value: '30–100 cm' },
        { icon: 'bi-geo-alt', label: 'Elevation', value: '3,500–5,000m' },
        { icon: 'bi-fire', label: 'Use', value: 'Primary nomad fuel' },
        { icon: 'bi-gear', label: 'Root Feature', value: 'Nitrogen-fixing nodules' },
        { icon: 'bi-flower1', label: 'Flower Colour', value: 'Yellow (June–July)' },
        { icon: 'bi-thermometer', label: 'Survives', value: 'Down to -40ÂaC' },
      ],
      relatedSlugs: ['sea-buckthorn', 'ephedra', 'juniper'],
    },
  ];
}




