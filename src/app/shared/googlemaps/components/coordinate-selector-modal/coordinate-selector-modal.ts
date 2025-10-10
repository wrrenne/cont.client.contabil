import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { DateUtilsService, TWeekDay } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';
import { MapCoordinate } from '../../models';
import { GoogleMapsLoaderService } from '../../services/google-maps-loader.service';

export interface CoordinateSelectorModalData {
    weekDay: TWeekDay;
}

@Component({
    selector: 'coordinate-selector-modal',
    standalone: true,
    templateUrl: './coordinate-selector-modal.html',
    imports: [CommonModule, FormsModule, GoogleMapsModule, ModalBaseComponent],
})
export class CoordinateSelectorModalComponent extends ModalBaseComponent {
    googleApiKey = environment.googleMapsApiKey!;
    loading = false;
    loadingFull = false;
    query = '';
    suggestions: google.maps.places.AutocompletePrediction[] = [];
    service?: google.maps.places.AutocompleteService;
    placesService?: google.maps.places.PlacesService;

    mapOptions: google.maps.MapOptions = {
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
    };

    apiLoaded = false;
    center: google.maps.LatLngLiteral = { lat: -23.55052, lng: -46.633308 };
    zoom = 12;
    markers: { position: google.maps.LatLngLiteral; title: string }[] = [];
    //selectedCoords: { lat: number; lng: number; address?: string } | null = null;
    selectedCoords: MapCoordinate;

    constructor(
        private mapsLoader: GoogleMapsLoaderService,
        private el: ElementRef,
        injector: Injector,
        dateUtilsService: DateUtilsService,
        @Inject(NZ_MODAL_DATA) data: CoordinateSelectorModalData,
    ) {
        super(injector);

        this.subTitle = dateUtilsService.dayNamesFull[data.weekDay];
    }

    async ngAfterViewInit() {
        await this.mapsLoader.load(this.googleApiKey, ['places']);
        this.service = new google.maps.places.AutocompleteService();
        const mapDiv = document.createElement('div');
        this.placesService = new google.maps.places.PlacesService(mapDiv);
        this.apiLoaded = true;
    }

    onSearchChange() {
        if (!this.query.trim() || !this.service) {
            this.suggestions = [];
            this.loading = false;
            return;
        }

        this.loading = true;

        this.service.getPlacePredictions({ input: this.query }, (predictions, status) => {
            this.loading = false;
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                this.suggestions = predictions;
            } else {
                this.suggestions = [];
            }
        });
    }

    selectSuggestion(suggestion: google.maps.places.AutocompletePrediction) {
        if (!this.placesService) return;

        this.suggestions = [];
        this.loadingFull = true;

        this.placesService.getDetails({ placeId: suggestion.place_id, fields: ['geometry', 'address_components'] }, (place, status) => {
            this.loadingFull = false;
            if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                const simpleAddress = this.getSimpleAddressFromComponents(place.address_components!);

                this.center = { lat, lng };
                this.markers = [{ position: this.center, title: simpleAddress }];
                this.zoom = 16;
                this.selectedCoords = { lat, lng, address: simpleAddress };
            }
        });
    }

    async onMapClick(event: google.maps.MapMouseEvent) {
        if (!event.latLng) return;

        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        // Move marker immediately
        this.center = { lat, lng };
        this.markers = [{ position: { lat, lng }, title: 'Selected location' }];
        this.zoom = 16;

        // Get address from reverse geocoding
        await this.getAddressFromCoords(lat, lng);
    } // onMapClick(event: google.maps.MapMouseEvent) {
    //     if (!event.latLng) return;
    //     const lat = event.latLng.lat();
    //     const lng = event.latLng.lng();

    //     this.center = { lat, lng };
    //     this.markers = [{ position: this.center, title: 'Selected location' }];
    //     this.zoom = 16;
    //     this.getAddressFromCoords(lat, lng);
    // }

    confirmSelection() {
        if (!this.selectedCoords) return;
        this.closeModal(this.selectedCoords);
    }

    getAddressFromCoords(lat: number, lng: number) {
        const geocoder = new google.maps.Geocoder();
        this.loadingFull = true;

        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            this.loadingFull = false;
            if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
                const comps = results[0].address_components;
                const simpleAddress = this.getSimpleAddressFromComponents(comps);
                this.selectedCoords = { lat, lng, address: simpleAddress };
            } else {
                this.selectedCoords = { lat, lng, address: 'Unknown location' };
            }
        });
    }

    private getSimpleAddressFromComponents(components: google.maps.GeocoderAddressComponent[]): string {
        const get = (type: string) => {
            const c = components.find((x) => x.types.includes(type));
            return c ? c.long_name : '';
        };

        const streetNumber = get('street_number');
        const route = get('route');
        const neighborhood = get('sublocality') || get('neighborhood');
        const city = get('administrative_area_level_2');
        const state = get('administrative_area_level_1');

        return [[route, streetNumber].filter(Boolean).join(', '), neighborhood, [city, state].filter(Boolean).join(' - ')].filter(Boolean).join(', ');
    }
}
