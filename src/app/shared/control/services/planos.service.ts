import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, ServiceBase, SistemaTipo } from '../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../services';
import { PacoteView } from '../models/planos/views/pacoteView';

@Injectable({
    providedIn: 'root'
})

export class PlanosService extends ServiceBase {

    constructor(
        public injector: Injector,
        private apisUtilsService: ApisUtilsService
    ) {
        super(injector)
    }

    pacotesGet(sistemaId: SistemaTipo): Observable<ApiResponse<PacoteView[]>> {
        return this.http.get<ApiResponse<PacoteView[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Planos/PacotesGet/${sistemaId}`)
            .pipe(catchError(this.handleError))
    }
}
