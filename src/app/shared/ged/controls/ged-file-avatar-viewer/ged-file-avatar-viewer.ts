import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApisUtilsService, TMicroService } from '../../../services';
import { Vars } from '../../../variables';
import { GedFileViewerModalComponent } from '../ged-file-viewer-modal/ged-file-viewer-modal';

export interface GedFileAvatarViewerParameter {
    fileId: number;
    extension: string;
    size?: number;
}

@Component({
    selector: 'ged-file-avatar-viewer',
    standalone: true,
    imports: [CommonModule],
    providers: [NzModalService],
    templateUrl: './ged-file-avatar-viewer.html',
})
export class GedFileAvatarViewerComponent {
    TMicroService = TMicroService;

    constructor(
        private apisUtilsService: ApisUtilsService,
        private modalService: NzModalService,
        private vars: Vars,
    ) {}

    public url: string = '';

    // 2. Use a private field to store the input value
    private _parameter: GedFileAvatarViewerParameter | undefined;

    // 3. Improved Input Setter
    @Input()
    set parameter(value: GedFileAvatarViewerParameter) {
        // Only update if the value is defined and different from the current
        if (value && value !== this._parameter) {
            this._parameter = value;
            this.url = this.buildDownloadUrl(value);
        }
    }

    // Optional: Getter for completeness
    get parameter(): GedFileAvatarViewerParameter | undefined {
        return this._parameter;
    }

    /**
     * Constructs the full file download URL with path and query parameters.
     */
    private buildDownloadUrl(params: GedFileAvatarViewerParameter): string {
        const userId = this.vars.user?.id;

        // 4. Input Validation/Type Safety Check
        if (!params.fileId || !userId) {
            // Log an error or return a default/empty URL if necessary data is missing
            console.error('Cannot build download URL: fileId or userId is missing.');
            return '';
        }

        // 5. Use URLSearchParams for robust query string handling (recommended)
        const baseUrl = `${this.apisUtilsService.getApiUrl(TMicroService.ApiGed)}/Arquivo/ArquivoDownload/${params.fileId}/${userId}`;

        const urlParams = new URLSearchParams();

        // Only add 'size' if it exists in the input
        // if (params.size) {
        //     urlParams.set('size', params.size.toString());
        // }
        urlParams.set('showAvatar', 'true');

        const queryString = urlParams.toString();

        // Combine base URL and query string
        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    }

    fileOpen() {
        const modal = this.modalService.create({
            nzContent: GedFileViewerModalComponent,
            nzClosable: false,

            nzFooter: null,
            nzWidth: 'auto',
            nzStyle: { display: 'table' },
            nzData: {
                fileId: this.parameter?.fileId!,
                extension: this.parameter?.extension,
            },
        });
    }
}
