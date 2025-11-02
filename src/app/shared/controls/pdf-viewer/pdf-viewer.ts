import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'pdf-viewer',
    templateUrl: './pdf-viewer.html',
})
export class PdfViewerComponent {
    private _url: string;
    @Input() get url() {
        return this._url;
    }
    set url(value: string) {
        this._url = value;
        this.getData();
    }

    // @Input() reportId!: number;
    // @Input() parameters?: Record<string, any>; // optional extra parameters for the report

    pdfUrl?: SafeResourceUrl;
    loading = true;
    error?: string;

    constructor(
        private http: HttpClient,
        private sanitizer: DomSanitizer,
    ) {}

    private getData() {
        // The backend should set Content-Type: application/pdf
        this.http
            .get(this.url, { responseType: 'blob' })
            .pipe(finalize(() => (this.loading = false)))
            .subscribe({
                next: (blob) => {
                    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
                },
                error: (err) => {
                    console.error(err);
                    this.error = 'Failed to load PDF.';
                },
            });
    }
}

// import { Component, Input } from '@angular/core';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { Subscription } from 'rxjs';

// @Component({
//     selector: 'pdf-viewer',
//     templateUrl: './pdf-viewer.html',
// })
// export class PdfViewerComponent {
//     private _url: string;
//     @Input() get url() {
//         return this._url;
//     }
//     set data(value: string) {
//         this._url = value;
//     }

//     private _blob: Blob;
//     @Input() get blob() {
//         return this._blob;
//     }
//     set blob(value: Blob) {
//         this._blob = value;

//         if (!value) return;

//         const objectUrl = URL.createObjectURL(value);
//         this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
//         this.loading = false;
//     }

//     pdfUrl?: SafeResourceUrl;
//     @Input() loading = false;

//     error?: string;
//     protected sub?: Subscription;

//     constructor(protected sanitizer: DomSanitizer) {}
// }
