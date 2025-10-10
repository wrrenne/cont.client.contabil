import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SystemUtilsService {

    constructor() { }

    compare(obj1: any, obj2: any): boolean {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    range(inicio: number, fim: number): number[] {
        return Array.from({ length: fim - inicio }, (_, i) => inicio + i);
    }

    getUrlLastSegment(url: string) {
        url = url.split('?')[0]
        const segments = url.split('/').filter(segment => segment);
        return segments.pop() || ''; // Get last segment safely
    }

    buildUrl(
        url: string,
        queryStrings: { [key: string]: string },
        routes: string[] = []
    ): string {
        // Join the routes with '/' and ensure no double slashes
        const routePath = routes
            .filter(r => r) // skip empty strings
            .map(r => r.replace(/^\/+|\/+$/g, '')) // trim leading/trailing slashes
            .join('/');

        const baseUrl = routePath ? `${url.replace(/\/+$/, '')}/${routePath}` : url;

        if (!queryStrings || Object.keys(queryStrings).length === 0) {
            return baseUrl;
        }

        const params = new URLSearchParams(queryStrings).toString();
        return `${baseUrl}?${params}`;
    }
}
