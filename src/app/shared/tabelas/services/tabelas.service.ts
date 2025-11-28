import { Injectable, Injector } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ApiResponse, ServiceBase } from '../../models';
import { ApisUtilsService, TMicroService } from '../../services';
import { FeriadoData } from '../models/feriadoData';

@Injectable({
    providedIn: 'root',
})
export class TabelasService extends ServiceBase {
    constructor(
        public injector: Injector,
        private apisUtilsService: ApisUtilsService,
    ) {
        super(injector);
    }

    feriadoDatasGet(dataInicial: string, dataFinal: string): Observable<ApiResponse<FeriadoData[]>> {
        return this.http
            .post<
                ApiResponse<FeriadoData[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiTabelas)}/Feriados/FeriadoDatasGet/${dataInicial}/${dataFinal}`, [3550308])
            .pipe(catchError(this.handleError));
    }
}
