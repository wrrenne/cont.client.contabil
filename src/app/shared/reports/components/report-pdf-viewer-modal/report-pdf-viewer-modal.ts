import { Component, Inject } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ReportParameters } from 'src/app/shared/models';
import { ReportPdfViewerComponent } from '../report-pdf-viewer/report-pdf-viewer';

export interface ReportPdfViewerModalData {
    parameters: ReportParameters;
}

@Component({
    selector: 'report-pdf-viewer-modal',
    templateUrl: './report-pdf-viewer-modal.html',
    standalone: true,
    imports: [ReportPdfViewerComponent],
})
export class ReportPdfViewerModalComponent {
    parameters?: ReportParameters;

    constructor(@Inject(NZ_MODAL_DATA) data: ReportPdfViewerModalData) {
        this.parameters = data.parameters;
    }
}
