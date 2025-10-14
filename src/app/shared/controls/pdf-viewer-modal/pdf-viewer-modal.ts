import { Component, Inject } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ReportParameters } from '../../models';
import { ModalBaseComponent } from '../modal-base/modal-base';
import { ReportPdfViewerComponent } from '../pdf-viewer/pdf-viewer';

export interface ReportPdfViewerModalData {
    reportId: number;
    parameters: ReportParameters;
}

@Component({
    selector: 'pdf-viewer-modal',
    templateUrl: './pdf-viewer-modal.html',
    imports: [ReportPdfViewerComponent, ModalBaseComponent],
})
export class ReportPdfViewerModalComponent {
    reportId?: number;
    parameters?: ReportParameters;

    constructor(@Inject(NZ_MODAL_DATA) data: ReportPdfViewerModalData) {
        this.reportId = data.reportId;
        this.parameters = data.parameters;
    }
}
