import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ApiResponse, ListItem, ServiceBase } from '../../../shared/models';
import { ApisUtilsService, DateUtilsService, TMicroService } from '../../../shared/services';
import { Vars } from '../../../shared/variables';
import { ClienteInput } from '../../models/clientes/inputs';
import { ContabilClienteView } from '../../models/clientes/views';

@Injectable({
    providedIn: 'root',
})
export class ClientesService extends ServiceBase {
    constructor(
        public injector: Injector,
        private vars: Vars,
        private apisUtilsService: ApisUtilsService,
        private dateUtilsService: DateUtilsService,
    ) {
        super(injector);
    }

    clienteGet(id: number): Observable<ApiResponse<ContabilClienteView>> {
        const cadastroId = this.vars.cadastro?.id;

        return this.http
            .get<ApiResponse<ContabilClienteView>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/clientes/ClienteGet/${cadastroId}/${id}`)
            .pipe(catchError(this.handleError));
    }

    clienteCreateOrUpdate(cliente: ClienteInput): Observable<ApiResponse<number[]>> {
        return this.http
            .post<
                ApiResponse<number[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/clientes/ClienteCreateOrUpdate`, [cliente], this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    clientesSearchGet(q: string): Observable<ApiResponse<ListItem[]>> {
        var cadastroId = this.vars.cadastro?.id;
        var userId = this.vars.user?.id;
        var dataFinal = this.dateUtilsService.GetDateIsoString(this.vars.dataFinal!);

        let params = new HttpParams();
        params = params.set('dataAtivo', dataFinal);
        params = params.set('q', q);

        return this.http
            .get<
                ApiResponse<ListItem[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiCadastros)}/Cadastros/ClientesSearchGet/${cadastroId}/${environment.sistema}/${userId}`, { params })
            .pipe(catchError(this.handleError));
    }

    clientesUltimosGet(): Observable<ApiResponse<ListItem[]>> {
        var cadastroId = this.vars.cadastro?.id;
        var userId = this.vars.user?.id;

        return this.http
            .get<
                ApiResponse<ListItem[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiCadastros)}/Cadastros/ClientesUltimosGet/${cadastroId}/${userId}/${environment.sistema}`)
            .pipe(catchError(this.handleError));
    }

    cadastroClientesCountGet(): Observable<ApiResponse<number>> {
        var cadastroId = this.vars.cadastro?.id;
        var userId = this.vars.user?.id;

        return this.http
            .get<
                ApiResponse<number>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/Cadastros/CadastroClientesCountGet/${cadastroId}/${userId}`)
            .pipe(catchError(this.handleError));
    }
}
