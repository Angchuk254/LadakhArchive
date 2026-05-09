import {
  Component, ElementRef, OnDestroy, OnInit, PLATFORM_ID, ViewChild, inject, signal, computed
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface LadakhPlace {
  name: string;
  type: 'Village' | 'Monastery' | 'Lake' | 'Pass' | 'Valley' | 'Town' | 'Trek' | 'Festival Site' | 'Wildlife' | 'Museum';
  lat: number;
  lng: number;
  altitude?: string;
  district: 'Leh' | 'Kargil';
  desc: string;
  icon: string;
  color: string;
}

const ALL_PLACES: LadakhPlace[] = [
  /* ── Towns / Urban ── */
  { name: 'Leh', type: 'Town', lat: 34.1526, lng: 77.5771, altitude: '3,524m', district: 'Leh', icon: '🏙️', color: '#1a365d', desc: 'The capital and cultural heart of Ladakh, at 3,524m on the banks of the Indus.' },
  { name: 'Kargil', type: 'Town', lat: 34.5551, lng: 76.1349, altitude: '2,676m', district: 'Kargil', icon: '🏙️', color: '#1a365d', desc: 'Gateway to Zanskar and the second largest town of Ladakh.' },
  { name: 'Padum', type: 'Town', lat: 33.4671, lng: 76.9270, altitude: '3,500m', district: 'Kargil', icon: '🏘️', color: '#1a365d', desc: 'The tiny capital of Zanskar — medieval atmosphere and ancient monasteries.' },
  { name: 'Diskit', type: 'Town', lat: 34.6053, lng: 77.5707, altitude: '3,100m', district: 'Leh', icon: '🏘️', color: '#1a365d', desc: 'Administrative centre of Nubra Valley with the iconic 32m Maitreya Buddha.' },

  /* ── Monasteries ── */
  { name: 'Hemis Monastery', type: 'Monastery', lat: 33.9142, lng: 77.7028, altitude: '3,563m', district: 'Leh', icon: '🛕', color: '#7c3aed', desc: 'Largest and richest monastery in Ladakh — home of the spectacular Hemis Tsechu.' },
  { name: 'Thiksey Monastery', type: 'Monastery', lat: 33.9855, lng: 77.6678, altitude: '3,600m', district: 'Leh', icon: '🛕', color: '#7c3aed', desc: 'A 12-storey monastery complex resembling the Potala Palace — spectacular at sunrise.' },
  { name: 'Spituk Monastery', type: 'Monastery', lat: 34.1357, lng: 77.5350, altitude: '3,524m', district: 'Leh', icon: '🛕', color: '#7c3aed', desc: 'Ancient Gelugpa monastery perched on a hilltop overlooking the Indus and Leh airport.' },
  { name: 'Diskit Monastery', type: 'Monastery', lat: 34.6009, lng: 77.5641, altitude: '3,098m', district: 'Leh', icon: '🛕', color: '#7c3aed', desc: '500-year-old monastery towering over Nubra Valley beneath the giant Buddha statue.' },
  { name: 'Lamayuru Monastery', type: 'Monastery', lat: 34.2729, lng: 76.7834, altitude: '3,510m', district: 'Leh', icon: '🛕', color: '#7c3aed', desc: 'One of Ladakh\'s oldest monasteries, set in the surreal Moonland eroded landscape.' },
  { name: 'Alchi Monastery', type: 'Monastery', lat: 34.2256, lng: 77.1823, altitude: '3,100m', district: 'Leh', icon: '🛕', color: '#7c3aed', desc: '11th-century temple with rare Kashmiri-style murals — among the finest Buddhist art.' },
  { name: 'Phugtal Monastery', type: 'Monastery', lat: 33.1844, lng: 77.0620, altitude: '3,800m', district: 'Kargil', icon: '🛕', color: '#7c3aed', desc: 'A cave monastery carved into a cliff face above the Tsarap River — accessible only on foot.' },
  { name: 'Rangdum Monastery', type: 'Monastery', lat: 33.8961, lng: 76.2560, altitude: '3,657m', district: 'Kargil', icon: '🛕', color: '#7c3aed', desc: 'Isolated Gelugpa monastery on a hillock in the wide Suru Valley.' },
  { name: 'Karsha Monastery', type: 'Monastery', lat: 33.5031, lng: 76.8793, altitude: '3,600m', district: 'Kargil', icon: '🛕', color: '#7c3aed', desc: 'Zanskar\'s largest monastery housing over 100 monks with centuries-old frescoes.' },
  { name: 'Stok Palace', type: 'Monastery', lat: 34.0729, lng: 77.5458, altitude: '3,407m', district: 'Leh', icon: '🏯', color: '#7c3aed', desc: 'Residence of Ladakh\'s royal family — now a museum with royal artifacts and thangkas.' },
  { name: 'Likir Monastery', type: 'Monastery', lat: 34.2895, lng: 77.0610, altitude: '3,720m', district: 'Leh', icon: '🛕', color: '#7c3aed', desc: 'Ancient monastery with a colossal golden Maitreya Buddha overlooking the Sham Valley.' },

  /* ── Lakes ── */
  { name: 'Pangong Tso', type: 'Lake', lat: 33.7607, lng: 78.6425, altitude: '4,350m', district: 'Leh', icon: '🏔️', color: '#0284c7', desc: 'The iconic high-altitude lake stretching 134 km into Tibet, famous for ever-changing blues.' },
  { name: 'Tso Moriri', type: 'Lake', lat: 32.8500, lng: 78.3200, altitude: '4,522m', district: 'Leh', icon: '🏔️', color: '#0284c7', desc: 'Pristine Ramsar wetland in the Changthang with nomadic Changpa communities.' },
  { name: 'Tso Kar', type: 'Lake', lat: 32.9500, lng: 78.0800, altitude: '4,527m', district: 'Leh', icon: '🏔️', color: '#0284c7', desc: 'The "White Lake" — ghostly salt deposits and flamingo breeding grounds on Changthang.' },
  { name: 'Suraj Tal', type: 'Lake', lat: 32.7600, lng: 77.0250, altitude: '4,883m', district: 'Leh', icon: '🏔️', color: '#0284c7', desc: 'One of India\'s highest lakes, crystal blue, near Baralacha La on the Manali–Leh Highway.' },

  /* ── Passes ── */
  { name: 'Khardung La', type: 'Pass', lat: 34.2818, lng: 77.6025, altitude: '5,602m', district: 'Leh', icon: '⛰️', color: '#c8702a', desc: 'One of the world\'s highest motorable passes — gateway to Nubra Valley.' },
  { name: 'Chang La', type: 'Pass', lat: 34.0467, lng: 77.7800, altitude: '5,390m', district: 'Leh', icon: '⛰️', color: '#c8702a', desc: 'Third highest motorable pass in India — the route to Pangong Tso.' },
  { name: 'Tanglang La', type: 'Pass', lat: 33.5833, lng: 77.5785, altitude: '5,328m', district: 'Leh', icon: '⛰️', color: '#c8702a', desc: 'Highest point on the Manali–Leh Highway with panoramic Zanskar views.' },
  { name: 'Zoji La', type: 'Pass', lat: 34.2833, lng: 75.4833, altitude: '3,528m', district: 'Kargil', icon: '⛰️', color: '#c8702a', desc: 'The gateway from Kashmir to Ladakh — dramatic climate boundary pass.' },
  { name: 'Fotu La', type: 'Pass', lat: 34.2528, lng: 76.5850, altitude: '4,108m', district: 'Leh', icon: '⛰️', color: '#c8702a', desc: 'Highest point on the Srinagar–Leh Highway, near Lamayuru Moonland.' },
  { name: 'Pensi La', type: 'Pass', lat: 33.7367, lng: 76.4490, altitude: '4,401m', district: 'Kargil', icon: '⛰️', color: '#c8702a', desc: 'Gateway to Zanskar Valley with views of the Drang Drung Glacier.' },
  { name: 'Wari La', type: 'Pass', lat: 34.2381, lng: 77.7925, altitude: '5,290m', district: 'Leh', icon: '⛰️', color: '#c8702a', desc: 'Alternative route to Nubra Valley, far less crowded than Khardung La.' },

  /* ── Valleys ── */
  { name: 'Nubra Valley', type: 'Valley', lat: 34.6500, lng: 77.5000, altitude: '3,048m', district: 'Leh', icon: '🏜️', color: '#059669', desc: 'Valley of flowers with Bactrian camels, sand dunes, and the ancient Diskit Monastery.' },
  { name: 'Zanskar Valley', type: 'Valley', lat: 33.5000, lng: 76.8000, altitude: '3,500m', district: 'Kargil', icon: '🏜️', color: '#059669', desc: 'Ladakh\'s most isolated sub-region — remote monasteries and the frozen Chadar Trek.' },
  { name: 'Suru Valley', type: 'Valley', lat: 34.0000, lng: 76.3000, altitude: '2,800m', district: 'Kargil', icon: '🏜️', color: '#059669', desc: 'Green valley stretching from Kargil toward Zanskar, flanked by the Himalayan glaciers.' },
  { name: 'Changthang Plateau', type: 'Valley', lat: 33.5000, lng: 78.5000, altitude: '4,500m', district: 'Leh', icon: '🏜️', color: '#059669', desc: 'High-altitude cold desert plateau home to nomadic Changpa herders and wildlife sanctuaries.' },
  { name: 'Markha Valley', type: 'Valley', lat: 33.7850, lng: 77.4900, altitude: '3,800m', district: 'Leh', icon: '🏜️', color: '#059669', desc: 'Where Ladakh\'s most popular trek winds through Hemis National Park.' },

  /* ── Villages ── */
  { name: 'Turtuk', type: 'Village', lat: 34.8470, lng: 76.8300, altitude: '2,900m', district: 'Leh', icon: '🏡', color: '#dc2626', desc: 'India\'s last village before Pakistan — a Balti settlement with apricot orchards opened in 2010.' },
  { name: 'Hunder', type: 'Village', lat: 34.6473, lng: 77.4939, altitude: '3,100m', district: 'Leh', icon: '🏡', color: '#dc2626', desc: 'Home to the famous white sand dunes and Bactrian camel rides in Nubra Valley.' },
  { name: 'Korzok', type: 'Village', lat: 32.8590, lng: 78.2250, altitude: '4,522m', district: 'Leh', icon: '🏡', color: '#dc2626', desc: 'Tiny village on the shores of Tso Moriri — one of India\'s highest inhabited settlements.' },
  { name: 'Hanle', type: 'Village', lat: 32.7830, lng: 78.9610, altitude: '4,500m', district: 'Leh', icon: '🏡', color: '#dc2626', desc: 'Home to the Indian Astronomical Observatory — 270+ clear nights per year.' },
  { name: 'Dha-Hanu', type: 'Village', lat: 34.5200, lng: 76.7000, altitude: '2,800m', district: 'Leh', icon: '🏡', color: '#dc2626', desc: 'Home of the Drokpa (Aryan people) — one of the most unique ethnic communities in India.' },
  { name: 'Panamik', type: 'Village', lat: 34.7930, lng: 77.5620, altitude: '3,100m', district: 'Leh', icon: '🏡', color: '#dc2626', desc: 'Known for its geothermal hot springs near the upper reaches of Nubra Valley.' },
  { name: 'Dras', type: 'Village', lat: 34.4336, lng: 75.7611, altitude: '3,280m', district: 'Kargil', icon: '🏡', color: '#dc2626', desc: 'Second coldest inhabited place on Earth and gateway to the Kargil War Memorial.' },
  { name: 'Sankoo', type: 'Village', lat: 34.6500, lng: 76.4000, altitude: '2,800m', district: 'Kargil', icon: '🏡', color: '#dc2626', desc: 'Major settlement in the Suru Valley known for its orchards and the Nun-Kun massif views.' },
  { name: 'Zingchen', type: 'Village', lat: 33.9500, lng: 77.5600, altitude: '3,505m', district: 'Leh', icon: '🏡', color: '#dc2626', desc: 'Starting point of the Markha Valley Trek, at the mouth of Zingchen Gorge.' },

  /* ── Wildlife / Heritage ── */
  { name: 'Hemis National Park', type: 'Wildlife', lat: 33.7000, lng: 77.8000, altitude: '3,300m', district: 'Leh', icon: '🐆', color: '#059669', desc: 'India\'s largest national park and the only place where snow leopards outnumber humans.' },
  { name: 'Shanti Stupa', type: 'Museum', lat: 34.1751, lng: 77.5772, altitude: '3,620m', district: 'Leh', icon: '☸️', color: '#7c3aed', desc: 'White-domed Buddhist stupa atop a hill offering 360° panoramic views of Leh.' },
  { name: 'Leh Palace', type: 'Museum', lat: 34.1656, lng: 77.5861, altitude: '3,600m', district: 'Leh', icon: '🏯', color: '#c8702a', desc: '17th-century nine-storey royal palace modelled on the Potala in Lhasa — now a museum.' },
  { name: 'Hall of Fame Museum', type: 'Museum', lat: 34.1580, lng: 77.5700, altitude: '3,524m', district: 'Leh', icon: '🏛️', color: '#1a365d', desc: 'Military museum honouring Kargil War heroes and the Indian Army\'s campaigns in Ladakh.' },
  { name: 'Drang Drung Glacier', type: 'Wildlife', lat: 33.7500, lng: 76.4700, altitude: '4,400m', district: 'Kargil', icon: '🧊', color: '#0284c7', desc: 'One of Ladakh\'s largest glaciers, visible dramatically from Pensi La on the Zanskar route.' },
  { name: 'Magnetic Hill', type: 'Wildlife', lat: 34.2200, lng: 77.3400, altitude: '3,490m', district: 'Leh', icon: '🧲', color: '#c8702a', desc: 'The famous "anti-gravity" spot on the Srinagar–Leh Highway where vehicles appear to roll uphill.' },
];

@Component({
  selector: 'app-location-explorer',
  standalone: true,
  imports: [FormsModule],
  template: `
<section class="lex-section section-padding">
  <div class="container">

    <!-- Header -->
    <div class="lex-header">
      <span class="la-label"><i class="bi bi-map-fill me-1"></i>Explore Ladakh</span>
      <h2 class="section-title">Find Any Place on the Map</h2>
      <p class="section-subtitle">
        Search monasteries, lakes, passes, villages, and more — every location plotted on a live interactive map of Ladakh.
      </p>
    </div>

    <!-- Search + Filter bar -->
    <div class="lex-controls">
      <div class="lex-search-wrap">
        <i class="bi bi-search lex-search-icon"></i>
        <input
          id="lex-search-input"
          class="lex-search-input"
          type="text"
          placeholder="Search Pangong, Hemis, Khardung La, Turtuk…"
          [(ngModel)]="query"
          (ngModelChange)="onQueryChange()"
          autocomplete="off"
        />
        @if (query) {
          <button class="lex-search-clear" (click)="clearSearch()" title="Clear">
            <i class="bi bi-x-circle-fill"></i>
          </button>
        }
      </div>

      <div class="lex-filters">
        @for (f of filters; track f.value) {
          <button
            class="lex-filter-btn"
            [class.active]="activeFilter() === f.value"
            (click)="setFilter(f.value)"
          >
            <span>{{ f.icon }}</span> {{ f.label }}
          </button>
        }
      </div>
    </div>

    <!-- Body: Sidebar + Map -->
    <div class="lex-body">

      <!-- Sidebar -->
      <aside class="lex-sidebar">
        <div class="lex-sidebar__header">
          <span class="lex-sidebar__count">
            <i class="bi bi-geo-alt-fill" style="color:var(--la-accent)"></i>
            {{ filtered().length }} place{{ filtered().length !== 1 ? 's' : '' }}
          </span>
          @if (query || activeFilter() !== 'all') {
            <button class="lex-sidebar__reset" (click)="resetAll()">
              <i class="bi bi-x me-1"></i>Reset
            </button>
          }
        </div>

        <ul class="lex-results-list">
          @for (place of filtered(); track place.name) {
            <li
              class="lex-result-item"
              [class.selected]="selectedPlace()?.name === place.name"
              (click)="selectPlace(place)"
            >
              <span class="lex-result-emoji" [style.background]="place.color + '18'" [style.color]="place.color">
                {{ place.icon }}
              </span>
              <div class="lex-result-text">
                <strong>{{ place.name }}</strong>
                <span class="lex-result-meta">
                  <span class="lex-type-badge" [style.background]="place.color + '14'" [style.color]="place.color">
                    {{ place.type }}
                  </span>
                  @if (place.altitude) { <span>{{ place.altitude }}</span> }
                </span>
              </div>
              <i class="bi bi-chevron-right lex-result-chevron"></i>
            </li>
          } @empty {
            <li class="lex-empty">
              <i class="bi bi-binoculars"></i>
              <p>No results for <strong>"{{ query }}"</strong></p>
              <button class="btn-la-ghost btn-sm" (click)="resetAll()">Clear search</button>
            </li>
          }
        </ul>
      </aside>

      <!-- Map -->
      <div class="lex-map-wrap">
        <div #mapContainer class="lex-map"></div>

        <!-- Selected place overlay card -->
        @if (selectedPlace(); as sp) {
          <div class="lex-place-card">
            <div class="lex-place-card__strip" [style.background]="sp.color"></div>
            <div class="lex-place-card__body">
              <div class="lex-place-card__row">
                <span class="lex-place-card__emoji">{{ sp.icon }}</span>
                <div class="lex-place-card__info">
                  <h5 class="lex-place-card__name">{{ sp.name }}</h5>
                  <span class="lex-place-card__type" [style.color]="sp.color">{{ sp.type }}</span>
                </div>
                <button class="lex-place-card__close" (click)="clearSelected()" title="Close">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
              <p class="lex-place-card__desc">{{ sp.desc }}</p>
              <div class="lex-place-card__meta">
                @if (sp.altitude) {
                  <span><i class="bi bi-arrow-up-circle-fill"></i> {{ sp.altitude }}</span>
                }
                <span><i class="bi bi-geo-alt-fill"></i> {{ sp.district }} District</span>
                <span><i class="bi bi-crosshair"></i> {{ sp.lat.toFixed(3) }}°N, {{ sp.lng.toFixed(3) }}°E</span>
              </div>
            </div>
          </div>
        }

        <!-- Hint when nothing is selected -->
        @if (!selectedPlace()) {
          <div class="lex-hint">
            <i class="bi bi-cursor-fill"></i> Click a marker or result to explore
          </div>
        }
      </div>
    </div>

  </div>
</section>
  `,
  styles: [`
    /* ── Section ── */
    .lex-section { background: var(--la-snow); }

    /* ── Header ── */
    .lex-header { text-align: center; margin-bottom: 2.5rem; }

    /* ── Controls ── */
    .lex-controls { max-width: 860px; margin: 0 auto 2rem; }

    .lex-search-wrap {
      position: relative;
      display: flex; align-items: center;
      margin-bottom: 1rem;
    }
    .lex-search-icon {
      position: absolute; left: 1rem;
      color: var(--la-gray-400); font-size: 1rem; pointer-events: none;
    }
    .lex-search-input {
      width: 100%;
      padding: .85rem 3rem .85rem 2.8rem;
      background: var(--la-white);
      border: 1.5px solid var(--la-gray-200);
      border-radius: var(--la-radius-lg);
      color: var(--la-dark);
      font-family: var(--la-font-body);
      font-size: .95rem;
      box-shadow: var(--la-shadow-sm);
      outline: none;
      transition: border-color var(--la-transition), box-shadow var(--la-transition);
    }
    .lex-search-input::placeholder { color: var(--la-gray-300); }
    .lex-search-input:focus {
      border-color: var(--la-primary);
      box-shadow: 0 0 0 3px rgba(26,54,93,.08);
    }
    .lex-search-clear {
      position: absolute; right: 1rem;
      background: none; border: none; cursor: pointer;
      color: var(--la-gray-400); font-size: 1.1rem;
      transition: color var(--la-transition);
      display: flex;
    }
    .lex-search-clear:hover { color: var(--la-danger); }

    .lex-filters {
      display: flex; flex-wrap: wrap; gap: .5rem; justify-content: center;
    }
    .lex-filter-btn {
      display: inline-flex; align-items: center; gap: .4rem;
      padding: .4rem 1rem;
      border-radius: var(--la-radius-full);
      font-size: .78rem; font-weight: 600;
      border: 1.5px solid var(--la-gray-200);
      background: var(--la-white);
      color: var(--la-gray-600);
      cursor: pointer;
      transition: all var(--la-transition);
      box-shadow: var(--la-shadow-sm);
    }
    .lex-filter-btn:hover {
      border-color: var(--la-primary);
      color: var(--la-primary);
      box-shadow: var(--la-shadow);
    }
    .lex-filter-btn.active {
      background: var(--la-primary);
      border-color: var(--la-primary);
      color: var(--la-white);
      box-shadow: 0 4px 12px rgba(26,54,93,.2);
    }

    /* ── Body ── */
    .lex-body {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 1.5rem;
      align-items: start;
      min-height: 560px;
    }
    @media (max-width: 768px) {
      .lex-body { grid-template-columns: 1fr; }
    }

    /* ── Sidebar ── */
    .lex-sidebar {
      background: var(--la-white);
      border-radius: var(--la-radius-lg);
      border: 1px solid var(--la-gray-100);
      box-shadow: var(--la-shadow);
      overflow: hidden;
      display: flex; flex-direction: column;
      max-height: 560px;
    }
    .lex-sidebar__header {
      display: flex; align-items: center; justify-content: space-between;
      padding: .8rem 1rem;
      border-bottom: 1px solid var(--la-gray-100);
      background: var(--la-snow);
    }
    .lex-sidebar__count {
      font-size: .8rem; font-weight: 600;
      color: var(--la-gray-600);
      display: flex; align-items: center; gap: .35rem;
    }
    .lex-sidebar__reset {
      background: none; border: 1px solid var(--la-gray-200);
      border-radius: var(--la-radius-full);
      font-family: var(--la-font-body);
      font-size: .73rem; font-weight: 600;
      color: var(--la-gray-500); cursor: pointer;
      padding: .25rem .75rem;
      display: flex; align-items: center;
      transition: all var(--la-transition);
    }
    .lex-sidebar__reset:hover { border-color: var(--la-danger); color: var(--la-danger); }

    .lex-results-list {
      list-style: none; margin: 0; padding: 0;
      overflow-y: auto; flex: 1;
    }
    .lex-result-item {
      display: flex; align-items: center; gap: .75rem;
      padding: .75rem 1rem; cursor: pointer;
      border-bottom: 1px solid var(--la-gray-100);
      transition: background var(--la-transition);
    }
    .lex-result-item:hover { background: var(--la-snow); }
    .lex-result-item.selected { background: rgba(26,54,93,.06); }
    .lex-result-emoji {
      width: 38px; height: 38px; border-radius: var(--la-radius);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.25rem; flex-shrink: 0;
    }
    .lex-result-text { flex: 1; min-width: 0; }
    .lex-result-text strong { display: block; font-size: .88rem; color: var(--la-dark); font-weight: 600; }
    .lex-result-meta {
      display: flex; align-items: center; gap: .4rem; flex-wrap: wrap;
      margin-top: .15rem;
    }
    .lex-type-badge {
      font-size: .68rem; font-weight: 700; padding: .1rem .4rem;
      border-radius: var(--la-radius-sm); text-transform: uppercase; letter-spacing: .04em;
    }
    .lex-result-meta span:last-child { font-size: .75rem; color: var(--la-gray-400); }
    .lex-result-chevron { color: var(--la-gray-300); font-size: .75rem; flex-shrink: 0; }
    .lex-result-item.selected .lex-result-chevron { color: var(--la-primary); }

    .lex-empty {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: .75rem; padding: 3rem 1.25rem; text-align: center;
    }
    .lex-empty i { font-size: 2rem; color: var(--la-gray-300); }
    .lex-empty p { color: var(--la-gray-500); font-size: .9rem; margin: 0; }

    /* ── Map Container ── */
    .lex-map-wrap {
      position: relative;
      border-radius: var(--la-radius-lg);
      overflow: hidden;
      border: 1px solid var(--la-gray-200);
      box-shadow: var(--la-shadow);
    }
    .lex-map { width: 100%; height: 560px; }

    /* ── Place Card Overlay ── */
    .lex-place-card {
      position: absolute; bottom: 1.25rem; left: 1.25rem; right: 1.25rem;
      background: var(--la-white);
      border-radius: var(--la-radius-lg);
      border: 1px solid var(--la-gray-200);
      box-shadow: var(--la-shadow-lg);
      overflow: hidden;
      z-index: 800;
    }
    .lex-place-card__strip { height: 4px; }
    .lex-place-card__body { padding: 1rem 1.25rem; }
    .lex-place-card__row {
      display: flex; align-items: flex-start; gap: .75rem; margin-bottom: .6rem;
    }
    .lex-place-card__emoji { font-size: 1.75rem; flex-shrink: 0; line-height: 1; }
    .lex-place-card__info { flex: 1; }
    .lex-place-card__name {
      margin: 0 0 .15rem; font-size: 1.05rem;
      font-family: var(--la-font-heading); color: var(--la-dark); font-weight: 700;
    }
    .lex-place-card__type {
      font-size: .73rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em;
    }
    .lex-place-card__close {
      background: var(--la-snow); border: 1px solid var(--la-gray-200);
      border-radius: 50%; width: 30px; height: 30px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: var(--la-gray-500); font-size: .8rem;
      transition: all var(--la-transition); flex-shrink: 0;
    }
    .lex-place-card__close:hover { background: var(--la-danger); border-color: var(--la-danger); color: #fff; }
    .lex-place-card__desc {
      font-size: .83rem; color: var(--la-gray-500);
      line-height: 1.55; margin: 0 0 .75rem;
    }
    .lex-place-card__meta {
      display: flex; flex-wrap: wrap; gap: .75rem;
      font-size: .76rem; color: var(--la-gray-400);
    }
    .lex-place-card__meta span {
      display: flex; align-items: center; gap: .3rem;
    }
    .lex-place-card__meta i { color: var(--la-accent); }

    /* ── Map Hint ── */
    .lex-hint {
      position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%);
      background: var(--la-white);
      border: 1px solid var(--la-gray-200);
      box-shadow: var(--la-shadow);
      padding: .45rem 1.25rem; border-radius: var(--la-radius-full);
      font-size: .78rem; color: var(--la-gray-500);
      display: flex; align-items: center; gap: .4rem;
      pointer-events: none; z-index: 800;
      white-space: nowrap;
    }
    .lex-hint i { color: var(--la-primary); }
  `]
})
export class LocationExplorerComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private map: any;
  private markers: { marker: any; place: LadakhPlace }[] = [];

  query = '';
  activeFilter = signal<string>('all');
  selectedPlace = signal<LadakhPlace | null>(null);

  filters = [
    { value: 'all', label: 'All', icon: '🗺️' },
    { value: 'Monastery', label: 'Monasteries', icon: '🛕' },
    { value: 'Lake', label: 'Lakes', icon: '🏔️' },
    { value: 'Pass', label: 'Passes', icon: '⛰️' },
    { value: 'Valley', label: 'Valleys', icon: '🏜️' },
    { value: 'Village', label: 'Villages', icon: '🏡' },
    { value: 'Town', label: 'Towns', icon: '🏙️' },
    { value: 'Wildlife', label: 'Nature', icon: '🐆' },
    { value: 'Museum', label: 'Heritage', icon: '🏯' },
  ];

  filtered = computed(() => {
    let list = ALL_PLACES;
    const q = this.query.trim().toLowerCase();
    const f = this.activeFilter();
    if (f !== 'all') list = list.filter(p => p.type === f);
    if (q) list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q)
    );
    return list;
  });

  async ngOnInit() {
    if (this.isBrowser) await this.initMap();
  }

  ngOnDestroy() {
    if (this.map) this.map.remove();
  }

  private async initMap() {
    const L = await import('leaflet');
    this.map = L.map(this.mapContainer.nativeElement, {
      center: [34.1526, 77.5771],
      zoom: 8,
      minZoom: 6,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    await this.renderMarkers(L);
    setTimeout(() => this.map.invalidateSize(), 200);
  }

  private async renderMarkers(L: any) {
    this.markers.forEach(m => this.map.removeLayer(m.marker));
    this.markers = [];

    for (const place of this.filtered()) {
      const icon = L.divIcon({
        html: `<div style="
          background:${place.color};
          color:#fff;width:34px;height:34px;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          display:flex;align-items:center;justify-content:center;
          font-size:15px;
          box-shadow:0 3px 10px rgba(0,0,0,.25);
          border:2.5px solid rgba(255,255,255,.85);
        "><span style="transform:rotate(45deg)">${place.icon}</span></div>`,
        className: '',
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -38]
      });

      const markerObj = L.marker([place.lat, place.lng], { icon }).addTo(this.map);
      markerObj.bindPopup(`
        <div style="min-width:190px;font-family:system-ui;padding:2px 0">
          <div style="font-size:1.1rem;font-weight:700;color:#111;margin-bottom:2px">${place.icon} ${place.name}</div>
          <div style="font-size:.72rem;font-weight:700;color:${place.color};text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px">${place.type}${place.altitude ? ' · ' + place.altitude : ''}</div>
          <p style="font-size:.8rem;color:#555;margin:0;line-height:1.45">${place.desc.slice(0, 110)}…</p>
        </div>
      `);
      markerObj.on('click', () => this.selectedPlace.set(place));
      this.markers.push({ marker: markerObj, place });
    }
  }

  async onQueryChange() {
    if (this.isBrowser && this.map) {
      const L = await import('leaflet');
      await this.renderMarkers(L);
    }
  }

  async setFilter(value: string) {
    this.activeFilter.set(value);
    if (this.isBrowser && this.map) {
      const L = await import('leaflet');
      await this.renderMarkers(L);
    }
  }

  async selectPlace(place: LadakhPlace) {
    this.selectedPlace.set(place);
    if (this.isBrowser && this.map) {
      this.map.flyTo([place.lat, place.lng], 13, { duration: 1.2 });
      const found = this.markers.find(m => m.place.name === place.name);
      if (found) found.marker.openPopup();
    }
  }

  clearSelected() {
    this.selectedPlace.set(null);
    if (this.isBrowser && this.map) this.map.setView([34.1526, 77.5771], 8);
  }

  clearSearch() {
    this.query = '';
    this.onQueryChange();
  }

  async resetAll() {
    this.query = '';
    this.activeFilter.set('all');
    this.selectedPlace.set(null);
    if (this.isBrowser && this.map) {
      const L = await import('leaflet');
      await this.renderMarkers(L);
      this.map.setView([34.1526, 77.5771], 8);
    }
  }
}
