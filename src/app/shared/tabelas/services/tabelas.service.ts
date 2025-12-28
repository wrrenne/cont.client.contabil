import { Injectable, Injector } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ApiResponse, ServiceBase } from '../../models';
import { ApisUtilsService, TMicroService } from '../../services';
import { Vars } from '../../variables';
import { FeriadoData } from '../models/feriadoData';

@Injectable({
    providedIn: 'root',
})
export class TabelasService extends ServiceBase {
    constructor(
        public injector: Injector,
        private vars: Vars,
        private apisUtilsService: ApisUtilsService,
    ) {
        super(injector);
    }

    feriadoDatasGet(dataInicial: string, dataFinal: string): Observable<ApiResponse<FeriadoData[]>> {
        const cadastroId = this.vars.cadastro?.id;

        return this.http
            .get<
                ApiResponse<FeriadoData[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiPonto)}/Feriados/FeriadoDatasGet/${cadastroId}/${dataInicial}/${dataFinal}`)
            .pipe(catchError(this.handleError));
    }
}
