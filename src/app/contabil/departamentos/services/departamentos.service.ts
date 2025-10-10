import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, ServiceBase } from '../../../shared/models';
import { ApisUtilsService, DateUtilsService, TMicroService } from '../../../shared/services';
import { Vars } from '../../../shared/variables';
import { UserDepartamentoInput } from '../../models/contabil/inputs';
import { UserDepartamentoPageItem } from '../../models/contabil/pageItems';
import { DepartamentoView } from '../../models/contabil/views';

@Injectable({
    providedIn: 'root'
})

export class DepartamentosService extends ServiceBase {

    constructor(
        public injector: Injector,
        private vars: Vars,
        private apisUtilsService: ApisUtilsService,
        private dateUtilsService: DateUtilsService
    ) {
        super(injector)
    }

    departamentoGet(id: number): Observable<ApiResponse<DepartamentoView>> {
        const cadastroId = this.vars.cadastro?.id

        return this.http.get<ApiResponse<DepartamentoView>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/departamentos/DepartamentoGet/${cadastroId}/${id}`)
            .pipe(catchError(this.handleError))
    }

    departamentoAddUser(input: UserDepartamentoInput): Observable<ApiResponse<UserDepartamentoPageItem[]>> {
        const cadastroId = this.vars.cadastro?.id

        return this.http.post<ApiResponse<UserDepartamentoPageItem[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/departamentos/DepartamentoAddUser/${cadastroId}`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError))
    }

    //ClienteCreateOrUpdate(cliente: ClienteInput): Observable<ApiResponse<number[]>> {
    //    return this.http.post<ApiResponse<number[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/clientes/ClienteCreateOrUpdate`, [cliente], this.httpService.httpOptions)
    //        .pipe(catchError(this.handleError))
    //}

    //    clientesSearchGet(q: string): Observable<ApiResponse<ListItem[]>> {
    //        var cadastroId = this.vars.cadastro?.id
    //        var userId = this.vars.user?.id
    //        var dataFinal = this.dateUtilsService.GetDateIsoString(this.vars.dataFinal!)

    //        let params = new HttpParams()
    //        params = params.set('dataAtivo', dataFinal)
    //        params = params.set('q', q)

    //        return this.http.get<ApiResponse<ListItem[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiCadastros)}/Cadastros/ClientesSearchGet/${cadastroId}/${environment.sistema}/${userId}`, { params })
    //            .pipe(catchError(this.handleError))
    //    }

    //    clientesUltimosGet(): Observable<ApiResponse<ListItem[]>> {
    //        var cadastroId = this.vars.cadastro?.id
    //        var userId = this.vars.user?.id

    //        return this.http.get<ApiResponse<ListItem[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiCadastros)}/Cadastros/ClientesUltimosGet/${cadastroId}/${userId}/${environment.sistema}`)
    //            .pipe(catchError(this.handleError))
    //    }
}
