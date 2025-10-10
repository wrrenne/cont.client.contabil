import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, ServiceBase, SistemaTipo } from '../../../shared/models';
import { ApisUtilsService, DateUtilsService, TMicroService } from '../../services';
import { Vars } from '../../variables';
import { UserInput } from '../models/inputs';
import { UserView } from '../models/views';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UsersService extends ServiceBase {

    constructor(
        public injector: Injector,
        private vars: Vars,
        private apisUtilsService: ApisUtilsService,
        private dateUtilsService: DateUtilsService
    ) {
        super(injector)
    }

    userGet(id: number, cadastroId?: number, sistemaId?: SistemaTipo): Observable<ApiResponse<UserView>> {
        if (!sistemaId) sistemaId = environment.sistema
        if (!cadastroId) cadastroId = this.vars.cadastro?.id
        return this.http.get<ApiResponse<UserView>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Users/UserGet/${id}/${cadastroId}/${sistemaId}`)
            .pipe(catchError(this.handleError))
    }

    userByEmailGet(email: string): Observable<ApiResponse<UserView>> {
        return this.http.get<ApiResponse<UserView>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Users/UserByEmailGet/${email}`)
            .pipe(catchError(this.handleError))
    }

    userCreateOrUpdate(user: UserInput): Observable<ApiResponse<number[]>> {
        return this.http.post<ApiResponse<number[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Users/UserCreateOrUpdate`, [user], this.httpService.httpOptions)
            .pipe(catchError(this.handleError))
    }
}
