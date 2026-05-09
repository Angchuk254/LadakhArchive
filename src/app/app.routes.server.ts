import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'routes/trip/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'leh-nubra-valley' },
        { slug: 'leh-pangong-tso' },
        { slug: 'leh-tso-moriri' },
        { slug: 'leh-hanle' },
        { slug: 'leh-zanskar-valley' },
        { slug: 'changthang-circuit' },
      ];
    },
  },
  {
    path: 'routes/trek/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'markha-valley' },
        { slug: 'chadar-frozen-river' },
        { slug: 'stok-kangri' },
        { slug: 'rumtse-tso-moriri' },
        { slug: 'lamayuru-alchi' },
        { slug: 'sham-valley' },
      ];
    },
  },
  {
    path: 'nature/wildlife/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'snow-leopard' },
        { slug: 'black-necked-crane' },
        { slug: 'tibetan-wild-ass' },
        { slug: 'himalayan-brown-bear' },
        { slug: 'himalayan-ibex' },
        { slug: 'tibetan-wolf' },
      ];
    },
  },
  {
    path: 'nature/bird/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'black-necked-crane' },
        { slug: 'golden-eagle' },
        { slug: 'lammergeier' },
        { slug: 'himalayan-snowcock' },
        { slug: 'tibetan-sandgrouse' },
        { slug: 'bar-headed-goose' },
        { slug: 'brown-headed-gull' },
        { slug: 'robin-accentor' },
      ];
    },
  },
  {
    path: 'nature/flora/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'blue-poppy' },
        { slug: 'edelweiss' },
        { slug: 'sea-buckthorn' },
        { slug: 'wild-rose' },
        { slug: 'juniper' },
        { slug: 'ephedra' },
        { slug: 'willow' },
        { slug: 'caragana' },
      ];
    },
  },
  {
    path: 'nature/lake/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'pangong-tso' },
        { slug: 'tso-moriri' },
        { slug: 'tso-kar' },
        { slug: 'zanskar-river' },
      ];
    },
  },
  {
    path: 'nature/protected/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'hemis-national-park' },
        { slug: 'changthang-sanctuary' },
        { slug: 'karakoram-sanctuary' },
        { slug: 'tso-moriri-wetland' },
      ];
    },
  },
  {
    path: 'history/monument/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'leh-palace' },
        { slug: 'hemis-monastery' },
        { slug: 'alchi-monastery' },
        { slug: 'basgo-fortress' },
        { slug: 'shey-palace' },
        { slug: 'diskit-monastery' },
      ];
    },
  },
  {
    path: 'politics/era/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'pre-1947' },
        { slug: 'accession' },
        { slug: 'autonomy' },
        { slug: 'lahdc' },
        { slug: 'ut' },
      ];
    },
  },
  {
    path: 'education/institution/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'university-of-ladakh' },
        { slug: 'secmol' },
        { slug: 'lamdon-model-school' },
        { slug: 'mahabodhi-residential-school' },
        { slug: 'ejm-college' },
        { slug: 'imamia-model-school' },
      ];
    },
  },
  {
    path: 'culture/festival/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'losar' },
        { slug: 'hemis-tsechu' },
        { slug: 'saga-dawa' },
        { slug: 'ladakh-festival' },
        { slug: 'muharram' },
        { slug: 'dosmoche' },
        { slug: 'matho-nagrang' },
        { slug: 'stok-guru-tsechu' },
      ];
    },
  },
  {
    path: 'village-search/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'leh' },
        { slug: 'diskit' },
        { slug: 'hunder' },
        { slug: 'hemis' },
        { slug: 'turtuk' },
        { slug: 'pangong' },
        { slug: 'kargil' },
        { slug: 'dras' },
        { slug: 'padum' },
        { slug: 'thiksey' },
        { slug: 'lamayuru' },
        { slug: 'hanle' },
        { slug: 'chumathang' },
        { slug: 'chilling' },
        { slug: 'tso-kar' },
      ];
    },
  },
  {
    path: 'monasteries/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'hemis' },
        { slug: 'thiksay' },
        { slug: 'diskit' },
        { slug: 'alchi' },
        { slug: 'lamayuru' },
        { slug: 'spituk' },
        { slug: 'phyang' },
        { slug: 'stakna' },
        { slug: 'matho' },
        { slug: 'chemrey' },
        { slug: 'likir' },
        { slug: 'stok' },
      ];
    },
  },
  {
    path: 'routes/pass/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'khardung-la' },
        { slug: 'chang-la' },
        { slug: 'tanglang-la' },
        { slug: 'lachalung-la' },
        { slug: 'baralacha-la' },
        { slug: 'wari-la' },
        { slug: 'fotu-la' },
        { slug: 'zoji-la' },
      ];
    },
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'forgotten-kingdom-before-dogra-rule' },
        { slug: 'living-with-snow-leopards' },
        { slug: 'demand-for-statehood' },
        { slug: 'hemis-tsechu-sacred-dance' },
        { slug: 'khardung-la-gateway-to-nubra' },
        { slug: 'secmol-alternative-education' },
        { slug: 'changpa-nomads-of-changthang' },
        { slug: 'pangong-tso-beyond-bollywood' },
        { slug: 'silk-route-ladakh-trade-history' },
        { slug: 'chadar-trek-frozen-river' },
        { slug: 'balti-culture-kargil' },
        { slug: 'ladakh-ut-what-changed' },
      ];
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
