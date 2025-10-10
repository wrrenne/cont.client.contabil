import { Component, Inject, Injector } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { SafeUrlPipe } from 'src/app/shared/pipes/safe-url.pipe';

export interface MapComponentData {
    longitude: number;
    latitude: number;
}

@Component({
    selector: 'map',
    standalone: true,
    imports: [SafeUrlPipe],
    templateUrl: './map.html',
})
export class MapComponent {
    lat: number;
    lng: number;

    constructor(injector: Injector, @Inject(NZ_MODAL_DATA) data: MapComponentData) {
        this.lng = data.longitude;
        this.lat = data.latitude;
    }

    get mapUrl() {
        return `https://maps.google.com/maps?q=${this.lat},${this.lng}&z=14&output=embed&z=18`;
        //return `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${this.lat},${this.lng}&zoom=14&maptype=roadmap`;
    }
}
