import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse, ServiceBase, SistemaTipo } from '../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../services';
import { Vars } from '../../variables';
import { CadastroPacote } from '../models/planos';
import { PacoteView } from '../models/planos/views/pacoteView';

@Injectable({
    providedIn: 'root',
})
export class PlanosService extends ServiceBase {
    constructor(
        public injector: Injector,
        private apisUtilsService: ApisUtilsService,
        private vars: Vars,
    ) {
        super(injector);
    }

    pacotesGet(sistemaId: SistemaTipo): Observable<ApiResponse<PacoteView[]>> {
        let params = new HttpParams();
        params = params.set('cadastroId', this.vars.cadastro?.id!);

        return this.http
            .get<ApiResponse<PacoteView[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Planos/PacotesGet/${sistemaId}`, { params })
            .pipe(catchError(this.handleError));
    }

    pacoteGet(id: number): Observable<ApiResponse<PacoteView>> {
        const simulatedDelay = environment.production ? 0 : 0; //1500;

        return this.http
            .get<ApiResponse<PacoteView>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Planos/PacoteGet/${id}`)
            .pipe(delay(simulatedDelay), catchError(this.handleError));
    }

    // cadastroPacoteIdGet(cadastroId: number): Observable<ApiResponse<PacoteView>> {
    //     return this.http
    //         .get<ApiResponse<PacoteView>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Planos/CadastroPacoteIdGet/${cadastroId}`)
    //         .pipe(catchError(this.handleError));
    // }

    cadastroPacoteFuncionariosGet(): Observable<ApiResponse<CadastroPacote>> {
        const cadastroId = this.vars.cadastro?.id;

        return this.http
            .get<ApiResponse<CadastroPacote>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Planos/CadastroPacoteFuncionariosGet/${cadastroId}`)
            .pipe(catchError(this.handleError));
    }
}
