import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pdf-viewer',
    templateUrl: './pdf-viewer.html',
})
export class PdfViewerComponent {
    private _blob: Blob;
    get blob() {
        return this._blob;
    }
    set blob(value: Blob) {
        this._blob = value;

        const objectUrl = URL.createObjectURL(value);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
        this.loading = false;
    }

    pdfUrl?: SafeResourceUrl;
    loading = false;

    error?: string;
    protected sub?: Subscription;

    constructor(protected sanitizer: DomSanitizer) {}
}
