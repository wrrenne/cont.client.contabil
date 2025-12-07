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

    pdfClick() {
        console.log('aaa');
    }
}
