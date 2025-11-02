import { Component, Inject, Injector } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { GedFileViewerComponent } from '../ged-file-viewer/ged-file-viewer';

export interface GedFileViewerModalData {
    fileId: number;
    extension: string;
}

@Component({
    selector: 'ged-file-viewer-modal',
    templateUrl: './ged-file-viewer-modal.html',
    imports: [GedFileViewerComponent],
})
export class GedFileViewerModalComponent extends ModalBaseComponent {
    fileId?: number;
    extension: string;

    constructor(injector: Injector, @Inject(NZ_MODAL_DATA) data: GedFileViewerModalData) {
        super(injector);
        this.fileId = data.fileId;
        this.extension = data.extension;
    }
}
