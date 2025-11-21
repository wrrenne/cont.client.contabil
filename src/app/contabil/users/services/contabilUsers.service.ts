import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, ServiceBase } from '../../../shared/models';
import { ApisUtilsService, DateUtilsService, TMicroService } from '../../../shared/services';
import { Vars } from '../../../shared/variables';
import { UserClienteInput, UserObrigacaoInput } from '../../models/users/inputs';
import { ContUserPageItem } from '../../models/users/pageItems';
import { ContabilUserView } from '../../models/users/views';

@Injectable({
    providedIn: 'root',
})
export class ContabilUsersService extends ServiceBase {
    constructor(
        public injector: Injector,
        private apisUtilsService: ApisUtilsService,
        private vars: Vars,
        private dateUtilsService: DateUtilsService,
    ) {
        super(injector);
    }

    userClienteAdd(userCliente: UserClienteInput): Observable<ApiResponse<ContUserPageItem[]>> {
        return this.http
            .post<
                ApiResponse<ContUserPageItem[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/Users/UserClienteAdd`, [userCliente], this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    userObrigacaoAdd(userObrigacao: UserObrigacaoInput): Observable<ApiResponse<ContUserPageItem[]>> {
        return this.http
            .post<
                ApiResponse<ContUserPageItem[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabilObrigacoes)}/Users/UserObrigacaoAdd`, [userObrigacao], this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    contabilUserGet(id: number): Observable<ApiResponse<ContabilUserView>> {
        return this.http
            .get<ApiResponse<ContabilUserView>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/Users/UserGet/${id}/${this.vars.cadastro?.id}`)
            .pipe(catchError(this.handleError));
    }
}
