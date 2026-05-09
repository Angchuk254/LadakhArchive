import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  template: `<div #mapContainer class="map-container" [style.height]="height"></div>`,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .map-container {
      width: 100%;
      min-height: inherit;
      border-radius: var(--la-radius);
      overflow: hidden;
      z-index: 1; /* prevent overriding sticky navs */
    }
  `]
})
export class LeafletMapComponent implements OnInit, OnChanges {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  
  @Input() lat!: number;
  @Input() lng!: number;
  @Input() zoom: number = 10;
  @Input() title: string = '';
  @Input() height: string = '300px';

  private map: any;
  private marker: any;
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  async ngOnInit() {
    if (this.isBrowser) {
      await this.initMap();
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (this.isBrowser && this.map && (changes['lat'] || changes['lng'] || changes['zoom'])) {
      const L = (await import('leaflet')).default;
      this.map.setView([this.lat, this.lng], this.zoom);
      
      if (this.marker) {
        this.marker.setLatLng([this.lat, this.lng]);
        if (this.title) {
          this.marker.bindPopup(`<b>${this.title}</b>`);
        }
      }
    }
  }

  private async initMap() {
    // Dynamically import Leaflet to avoid SSR issues
    const L = await import('leaflet');
    
    // Fix default icon path issues in Angular
    L.Icon.Default.imagePath = 'assets/leaflet/';
    // We override the icon directly to use CDNs since local assets might not be configured
    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = defaultIcon;

    this.map = L.map(this.mapContainer.nativeElement).setView([this.lat, this.lng], this.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker([this.lat, this.lng]).addTo(this.map);
    
    if (this.title) {
      this.marker.bindPopup(`<b>${this.title}</b>`);
    }

    // Fix map rendering timing issues in modals/tabs
    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }
}
