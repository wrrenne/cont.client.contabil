import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ReportsService } from 'src/app/ponto-shared/reports/services/reports.service';
import { ReportParameters } from '../../models';

@Component({
    selector: 'pdf-viewer',
    templateUrl: './pdf-viewer.html',
    styleUrls: ['./pdf-viewer.scss'],
})
export class ReportPdfViewerComponent implements OnInit, OnDestroy {
    @Input() reportId!: number;
    @Input() parameters!: ReportParameters;

    pdfUrl?: SafeResourceUrl;
    loading = false;
    error?: string;
    private sub?: Subscription;

    constructor(
        private reportsService: ReportsService,
        private sanitizer: DomSanitizer,
    ) {}

    ngOnInit(): void {
        if (!this.reportId) {
            this.error = 'Invalid report ID.';
            return;
        }

        this.loading = true;
        this.sub = this.reportsService.reportPdfGet(this.reportId, this.parameters).subscribe({
            next: (blob) => {
                const objectUrl = URL.createObjectURL(blob);
                this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Erro na leitura do PDF';
                this.loading = false;
                console.error(err);
            },
        });
    }

    ngOnDestroy(): void {
        if (this.sub) this.sub.unsubscribe();
    }
}
