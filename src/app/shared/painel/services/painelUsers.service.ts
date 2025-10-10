import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SistemaPainel } from '../../../painel/models/painel';
import { ApiResponse, ServiceBase, SistemaTipo } from '../../models';
import { ApisUtilsService, TMicroService } from '../../services';
import { Vars } from '../../variables';

@Injectable({
    providedIn: 'root'
})

export class PainelUsersService extends ServiceBase {

    constructor(
        public injector: Injector,
        private apisUtilsService: ApisUtilsService,
        private vars: Vars
    ) {
        super(injector)
    }

    userPainelsGet(userId: number, sistemaId?: SistemaTipo): Observable<ApiResponse<SistemaPainel[]>> {
        let params = new HttpParams()

        if (sistemaId)
            params = params.set('sistemaId', sistemaId)

        return this.http.get<ApiResponse<SistemaPainel[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiPainel)}/Users/UserPainelsGet/${userId}`, { params })
            .pipe(catchError(this.handleError))
    }
}
