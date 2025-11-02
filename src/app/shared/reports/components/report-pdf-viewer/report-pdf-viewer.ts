import { HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { PdfViewerComponent } from 'src/app/shared/controls/pdf-viewer/pdf-viewer';
import { ReportParameters } from 'src/app/shared/models';
import { ApisUtilsService, DateUtilsService, TMicroService } from 'src/app/shared/services';
import { Vars } from 'src/app/shared/variables';

@Component({
    selector: 'report-pdf-viewer',
    templateUrl: './report-pdf-viewer.html',
    imports: [PdfViewerComponent],
})
export class ReportPdfViewerComponent {
    private _parameters: ReportParameters;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: ReportParameters) {
        this._parameters = value;

        const cadastroId = this.vars.cadastro?.id;
        const userId = this.vars.user?.id;

        const url = `${this.apisUtilsService.getApiUrl(TMicroService.ApiReports)}/Reports/ReportPdfGet/${cadastroId}/${userId}/${value.reportId}`;

        let params = new HttpParams();

        if (value.dataInicial) {
            params = params.set('dataInicial', this.dateUtilsService.GetDateIsoString(value.dataInicial!));
        }

        if (value.dataFinal) {
            params = params.set('dataFinal', this.dateUtilsService.GetDateIsoString(value.dataFinal!));
        }

        this.url = url + '?' + params.toString();

        console.log(this.url);
    }

    url: string;

    constructor(
        private vars: Vars,
        private apisUtilsService: ApisUtilsService,
        private dateUtilsService: DateUtilsService,
    ) {}
}
