import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ImageService {
    private cache: Map<string, { url: string; eTag: string }> = new Map(); // Stores image URLs and ETags
    
    constructor(private http: HttpClient) { }

    getImage(url: string): Observable<{ url: string | null; status: number }> {
        const cachedETag = this.cache.get(url)?.url;

        // Include If-None-Match header if we have a cached ETag
        const headers = cachedETag ? new HttpHeaders({ 'If-None-Match': cachedETag }) : undefined;

        return this.http.get(url, { headers, observe: 'response', responseType: 'blob' }).pipe(
            map((response: HttpResponse<Blob>) => {
                /*console.log([url, response])*/
                if (response.status === 304) {
                    //console.log('Image not modified. Browser cache used.');
                    return { url: null, status: 304 }; // Use cached data if applicable
                }

                if (response.body) {
                    const blobUrl = URL.createObjectURL(response.body);
                    return { url: blobUrl, status: response.status };
                }

                //console.log('No content received from the server.');
                return { url: null, status: 204 }; // Handle no content case
            }),
            catchError((error) => {
                console.error(error.status)
                //console.error('Error fetching image:', error);
                return of({ url: null, status: error.status });
            })
        );
        //    const cachedData = this.cache.get(url);

        //    console.log(cachedData)
        //    const headers = cachedData ? new HttpHeaders({ 'If-None-Match': cachedData.eTag }) : undefined;

        //    return this.http.get(url, { headers, observe: 'response', responseType: 'blob' }).pipe(
        //        map((response: HttpResponse<Blob>) => {
        //            const eTag = response.headers.get('ETag');

        //            if (response.status === 304) {
        //                console.log('Image not modified. Using cached version.');
        //                return { url: cachedData?.url || null, status: 304 };
        //            }

        //            if (eTag && response.body) {
        //                const blobUrl = URL.createObjectURL(response.body);
        //                this.cache.set(url, { url: blobUrl, eTag });
        //                return { url: blobUrl, status: 200 };
        //            }

        //            console.log('No content received from the server.');
        //            return { url: null, status: 204 }; // Handle no content case
        //        }),
        //        catchError((error) => {
        //            console.error('Error fetching image:', error);
        //            return of({ url: null, status: error.status });
        //        })
        //    );
    }
}





//import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
//import { Injectable } from '@angular/core';
//import { Observable, of } from 'rxjs';
//import { catchError, map } from 'rxjs/operators';

//@Injectable({
//    providedIn: 'root',
//})
//export class ImageService {
//    private cache: Map<string, string> = new Map(); // Map to store cached ETags

//    constructor(private http: HttpClient) { }

//    getImage(url: string): Observable<{ url: string | null; status: number }> {
//        const cachedData = this.cache.get(url);

//        // Add ETag to the request if available
//        const headers = cachedData ? new HttpHeaders({ 'If-None-Match': cachedData }) : undefined;

//        return this.http.get(url, { headers, observe: 'response', responseType: 'blob' }).pipe(
//            map((response: HttpResponse<Blob>) => {
//                const eTag = response.headers.get('ETag');

//                // Cache the ETag
//                if (eTag) {
//                    this.cache.set(url, eTag);
//                }

//                if (response.status === 304) {
//                    console.log('Image not modified. Using cached version.');
//                    return { url: cachedData?.url || null, status: 304 };
//                }

//                // Check if the response has content
//                if (response.body && response.body.size > 0) {
//                    // Create a Blob URL for the image
//                    const blobUrl = URL.createObjectURL(response.body);
//                    return { url: blobUrl, status: response.status };
//                } else {
//                    console.log('No content received from the server.');
//                    return { url: null, status: 204 }; // Return a fallback response
//                }
//            }),
//            catchError((error) => {
//                if (error.status === 304) {
//                    console.log('Image not modified. Using cached version.');
//                    return of({ url: null, status: 304 });
//                } else {
//                    console.error('Error fetching image:', error);
//                    return of({ url: null, status: error.status });
//                }
//            })
//        );
//    }
//}
