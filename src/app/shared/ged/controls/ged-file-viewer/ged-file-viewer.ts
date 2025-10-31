import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApisUtilsService, TMicroService } from '../../../services';
import { Vars } from '../../../variables';

export interface GedFileViewerParameter {
    fileId: number;
    size?: number;
    showAvatar?: boolean;
}

@Component({
    selector: 'ged-file-viewer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ged-file-viewer.html',
})
export class GedFileViewerComponent {
    TMicroService = TMicroService;

    constructor(
        private apisUtilsService: ApisUtilsService,
        private vars: Vars,
    ) {}

    public url: string = '';

    // 2. Use a private field to store the input value
    private _parameter: GedFileViewerParameter | undefined;

    // 3. Improved Input Setter
    @Input()
    set parameter(value: GedFileViewerParameter) {
        // Only update if the value is defined and different from the current
        if (value && value !== this._parameter) {
            this._parameter = value;
            this.url = this.buildDownloadUrl(value);
        }
    }

    // Optional: Getter for completeness
    get parameter(): GedFileViewerParameter | undefined {
        return this._parameter;
    }

    /**
     * Constructs the full file download URL with path and query parameters.
     */
    private buildDownloadUrl(params: GedFileViewerParameter): string {
        const userId = this.vars.user?.id;
        const avatarSize = 120;

        // 4. Input Validation/Type Safety Check
        if (!params.fileId || !userId) {
            // Log an error or return a default/empty URL if necessary data is missing
            console.error('Cannot build download URL: fileId or userId is missing.');
            return '';
        }

        // 5. Use URLSearchParams for robust query string handling (recommended)
        const baseUrl = `${this.apisUtilsService.getApiUrl(TMicroService.ApiGed)}/Arquivo/ArquivoDownload/${params.fileId}/${userId}?size=${avatarSize}&showAvatar=${params.showAvatar ?? false}`;

        const urlParams = new URLSearchParams();

        // Only add 'size' if it exists in the input
        if (params.size) {
            urlParams.set('size', params.size.toString());
        }

        const queryString = urlParams.toString();

        // Combine base URL and query string
        return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    }

    // url: string;

    // @Input() set parameter(value: GedFileViewerParameter) {
    //     this.url = `${this.apisUtilsService.getApiUrl(TMicroService.ApiGed)}/Arquivo/ArquivoDownload/${value.fileId}/${this.vars.user?.id}${value.size ? '?size=' + value.size : ''}`;
    // }

    // constructor(
    //     private apisUtilsService: ApisUtilsService,
    //     private vars: Vars,
    // ) {}
}
