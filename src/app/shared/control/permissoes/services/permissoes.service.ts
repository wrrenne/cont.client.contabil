import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDepartamentoPermissoesView, UserPermissoesView } from '../models/views';
import { ApiResponse, ServiceBase } from '../../../models';
import { Vars } from '../../../variables';
import { ApisUtilsService, TMicroService } from '../../../services';
import { UserDepartamentoPermissaoInput, UserPermissaoInput } from '../models/inputs';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PermissoesService extends ServiceBase {

    constructor(
        public injector: Injector,
        private vars: Vars,
        private apisUtilsService: ApisUtilsService
    ) {
        super(injector)
    }

    userPermissoesGet(userId: number): Observable<ApiResponse<UserPermissoesView>> {
        return this.http.get<ApiResponse<UserPermissoesView>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControlPermissoes)}/Permissoes/UserPermissoesGet/${userId}/${this.vars.cadastro?.id}/${environment.sistema}`)
            .pipe(catchError(this.handleError))
    }

    userDepartamentoPermissoesGet(userId: number): Observable<ApiResponse<UserDepartamentoPermissoesView>> {
        return this.http.get<ApiResponse<UserDepartamentoPermissoesView>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControlPermissoes)}/Permissoes/UserDepartamentoPermissoesGet/${userId}/${this.vars.cadastro?.id}/${environment.sistema}`)
            .pipe(catchError(this.handleError))
    }

    userPermissaoSet(input: UserPermissaoInput): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControlPermissoes)}/Permissoes/UserPermissaoSet`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError))
    }

    userDepartamentoPermissaoSet(input: UserDepartamentoPermissaoInput): Observable<ApiResponse<UserDepartamentoPermissoesView[]>> {
        return this.http.post<ApiResponse<UserDepartamentoPermissoesView[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControlPermissoes)}/Permissoes/UserDepartamentoPermissaoSet`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError))
    }
}
