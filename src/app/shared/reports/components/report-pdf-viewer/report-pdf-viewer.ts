import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ReportsService } from 'src/app/ponto-shared/reports/services/reports.service';
import { PdfViewerComponent } from 'src/app/shared/controls/pdf-viewer/pdf-viewer';
import { ReportParameters } from 'src/app/shared/models';

@Component({
    selector: 'report-pdf-viewer',
    templateUrl: './report-pdf-viewer.html',
    imports: [PdfViewerComponent],
})
export class ReportPdfViewerComponent extends PdfViewerComponent implements OnInit, OnDestroy {
    @Input() reportId!: number;
    @Input() parameters!: ReportParameters;

    constructor(
        private reportsService: ReportsService,
        sanitizer: DomSanitizer,
    ) {
        super(sanitizer);
    }

    ngOnInit(): void {
        if (!this.reportId) {
            this.error = 'Relatório inválido';
            return;
        }

        this.loading = true;
        this.sub = this.reportsService.reportPdfGet(this.reportId, this.parameters).subscribe({
            next: (blob) => {
                this.blob = blob;
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
