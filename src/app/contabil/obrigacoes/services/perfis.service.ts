import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, ServiceBase } from '../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../../shared/services';
import { Vars } from '../../../shared/variables';
import { PerfilPageItem } from '../../models/clientes/pageItems';
import { ObrigacaoClienteInput, PerfilClienteInput, PerfilInput, PerfilItemInput, PerfilObrigacaoInput } from '../../models/obrigacoes/inputs';
import { ClientePerfilObrigacaoPageItem, ClientePerfilPageItem } from '../../models/obrigacoes/pagings';
import { PerfilItemView } from '../../models/obrigacoes/views/perfilItemView';

@Injectable({
    providedIn: 'root',
})
export class PerfisService extends ServiceBase {
    constructor(
        public injector: Injector,
        private vars: Vars,
        private apisUtilsService: ApisUtilsService,
    ) {
        super(injector);
    }

    //clientePerfisListGet(clienteId: number): Observable<ApiResponse<ObrigacaoView>> {
    //    return this.http.get<ApiResponse<ObrigacaoView>>(`${environment.apiContabilObrigacoesUrl}/Perfis/ClientePerfisListGet/${clienteId}`)
    //        .pipe(catchError(this.handleError))
    //}

    perfilItemGet(id: number): Observable<ApiResponse<PerfilItemView>> {
        return this.http
            .get<ApiResponse<PerfilItemView>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Perfis/PerfilItemGet/${id}`)
            .pipe(catchError(this.handleError));
    }

    perfilItemCreateOrUpdate(input: PerfilItemInput): Observable<ApiResponse<number[]>> {
        return this.http
            .post<
                ApiResponse<number[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Perfis/PerfilItemCreateOrUpdate/`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    perfilCreateOrUpdate(input: PerfilInput): Observable<ApiResponse<PerfilPageItem[]>> {
        return this.http
            .post<
                ApiResponse<PerfilPageItem[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Perfis/PerfilCreateOrUpdate/`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    clientePerfilAdd(input: PerfilClienteInput): Observable<ApiResponse<ClientePerfilPageItem[]>> {
        return this.http
            .post<
                ApiResponse<ClientePerfilPageItem[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Perfis/ClientePerfilAdd/`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    perfilObrigacaoCreateOrUpdate(input: PerfilObrigacaoInput): Observable<ApiResponse<number[]>> {
        return this.http
            .post<
                ApiResponse<number[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Perfis/PerfilObrigacaoCreateOrUpdate/`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    clienteObrigacaoAvulsaAdd(input: ObrigacaoClienteInput): Observable<ApiResponse<ClientePerfilObrigacaoPageItem[]>> {
        return this.http
            .post<
                ApiResponse<ClientePerfilObrigacaoPageItem[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Perfis/ClienteObrigacaoAvulsaAdd/`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }
}
