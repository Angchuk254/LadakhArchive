import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'LadakhArchive — The Complete Guide to Ladakh',
  },
  {
    path: 'history',
    loadComponent: () => import('./pages/history/history').then(m => m.History),
    title: 'History of Ladakh — LadakhArchive',
  },
  {
    path: 'culture',
    loadComponent: () => import('./pages/culture/culture').then(m => m.Culture),
    title: 'Culture & People of Ladakh — LadakhArchive',
  },
  {
    path: 'nature',
    loadComponent: () => import('./pages/nature/nature').then(m => m.Nature),
    title: 'Nature & Wildlife of Ladakh — LadakhArchive',
  },
  {
    path: 'politics',
    loadComponent: () => import('./pages/politics/politics').then(m => m.Politics),
    title: 'Politics of Ladakh — LadakhArchive',
  },
  {
    path: 'routes',
    loadComponent: () => import('./pages/routes-page/routes-page').then(m => m.RoutesPage),
    title: 'Routes & Journeys — LadakhArchive',
  },
  {
    path: 'routes/trip/:slug',
    loadComponent: () => import('./pages/road-trip-detail/road-trip-detail').then(m => m.RoadTripDetail),
    title: 'Road Trip — LadakhArchive',
  },
  {
    path: 'routes/trek/:slug',
    loadComponent: () => import('./pages/trek-detail/trek-detail').then(m => m.TrekDetail),
    title: 'Trek — LadakhArchive',
  },
  {
    path: 'education',
    loadComponent: () => import('./pages/education/education').then(m => m.Education),
    title: 'Education in Ladakh — LadakhArchive',
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery').then(m => m.Gallery),
    title: 'Gallery — LadakhArchive',
  },
  {
    path: 'village-search',
    loadComponent: () => import('./pages/village-search/village-search').then(m => m.VillageSearch),
    title: 'Village Search — LadakhArchive',
  },
  {
    path: 'maps',
    loadComponent: () => import('./pages/maps/maps').then(m => m.Maps),
    title: 'Maps of Ladakh — LadakhArchive',
  },
  {
    path: 'contribute',
    loadComponent: () => import('./pages/contribute/contribute').then(m => m.Contribute),
    title: 'Contribute — LadakhArchive',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    title: 'About Us — LadakhArchive',
  },
  {
    path: 'timeline',
    loadComponent: () => import('./pages/timeline/timeline').then(m => m.Timeline),
    title: 'Historical Timeline — LadakhArchive',
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy').then(m => m.Privacy),
    title: 'Privacy Policy — LadakhArchive',
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms').then(m => m.Terms),
    title: 'Terms of Use — LadakhArchive',
  },
  {
    path: 'history/monument/:slug',
    loadComponent: () => import('./pages/monument-detail/monument-detail').then(m => m.MonumentDetail),
    title: 'Monument — LadakhArchive',
  },
  {
    path: 'politics/era/:slug',
    loadComponent: () => import('./pages/era-detail/era-detail').then(m => m.EraDetail),
    title: 'Political Era — LadakhArchive',
  },
  {
    path: 'education/institution/:slug',
    loadComponent: () => import('./pages/institution-detail/institution-detail').then(m => m.InstitutionDetail),
    title: 'Institution — LadakhArchive',
  },
  {
    path: 'culture/festival/:slug',
    loadComponent: () => import('./pages/festival-detail/festival-detail').then(m => m.FestivalDetail),
    title: 'Festival — LadakhArchive',
  },
  {
    path: 'village-search/:slug',
    loadComponent: () => import('./pages/village-detail/village-detail').then(m => m.VillageDetail),
    title: 'Village — LadakhArchive',
  },
  {
    path: 'nature/wildlife/:slug',
    loadComponent: () => import('./pages/wildlife-detail/wildlife-detail').then(m => m.WildlifeDetail),
    title: 'Wildlife — LadakhArchive',
  },
  {
    path: 'nature/bird/:slug',
    loadComponent: () => import('./pages/bird-detail/bird-detail').then(m => m.BirdDetail),
    title: 'Bird — LadakhArchive',
  },
  {
    path: 'nature/flora/:slug',
    loadComponent: () => import('./pages/flora-detail/flora-detail').then(m => m.FloraDetail),
    title: 'Flora — LadakhArchive',
  },
  {
    path: 'nature/lake/:slug',
    loadComponent: () => import('./pages/lake-detail/lake-detail').then(m => m.LakeDetail),
    title: 'Lake — LadakhArchive',
  },
  {
    path: 'nature/protected/:slug',
    loadComponent: () => import('./pages/protected-area-detail/protected-area-detail').then(m => m.ProtectedAreaDetail),
    title: 'Protected Area — LadakhArchive',
  },
  {
    path: 'monasteries',
    loadComponent: () => import('./pages/monasteries/monasteries').then(m => m.Monasteries),
    title: 'Monasteries of Ladakh — LadakhArchive',
  },
  {
    path: 'monasteries/:slug',
    loadComponent: () => import('./pages/monastery-detail/monastery-detail').then(m => m.MonasteryDetail),
    title: 'Monastery — LadakhArchive',
  },
  {
    path: 'routes/pass/:slug',
    loadComponent: () => import('./pages/pass-detail/pass-detail').then(m => m.PassDetail),
    title: 'Mountain Pass — LadakhArchive',
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog').then(m => m.Blog),
    title: 'Blog — LadakhArchive',
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog-detail/blog-detail').then(m => m.BlogDetail),
    title: 'Article — LadakhArchive',
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search').then(m => m.Search),
    title: 'Search — LadakhArchive',
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
    title: 'Page Not Found — LadakhArchive',
  },
];
