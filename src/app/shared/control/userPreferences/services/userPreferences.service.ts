import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Vars } from '../../../variables';
import { ApisUtilsService, TMicroService } from '../../../services';
import { ApiResponse, ServiceBase } from '../../../models';
import { environment } from '../../../../../environments/environment';
import { TUserPrefTipo } from '../../models/enums';
import { UserPrefItem } from '../../models/userPreferences';
import { UserPrefInput } from '../../models/userPreferences/inputs';

@Injectable({
    providedIn: 'root'
})

export class UserPreferencesService extends ServiceBase {

    prefs: UserPrefItem[] = [];

    constructor(
        public injector: Injector,
        private vars: Vars,
        private apisUtilsService: ApisUtilsService
    ) {
        super(injector)
    }

    userPrefsByTiposValueGet(prefs: UserPrefItem[], userId?: number, cadastroId?: number): Observable<ApiResponse<UserPrefItem[]>> {
        if (!userId)
            userId = this.vars.user?.id

        if (!cadastroId)
            cadastroId = this.vars.cadastro?.id

        return this.http.post<ApiResponse<UserPrefItem[]>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControlUserPreferences)}/preferences/UserPrefsByTiposValueGet/${userId}/${environment.sistema}/${cadastroId}`, prefs, this.httpService.httpOptions)
            .pipe(catchError(this.handleError))
    }

    getPrefValue(tipo: TUserPrefTipo): string {
        return <string>this.prefs.find(x => x.tipo == tipo)?.valor!
    }

    getPrefBoolValue(tipo: TUserPrefTipo): boolean {
        return this.prefs.find(x => x.tipo == tipo)?.valor! == 'true'
    }

    setPrefValue(tipo: TUserPrefTipo, value: string) {
        var c = this.prefs.find(x => x.tipo == tipo)

        if (c) c.valor = value
    }

    userPrefSave(tipo: TUserPrefTipo, valor: string, add: boolean = false, remove: boolean = false): Observable<ApiResponse> {
        var input: UserPrefInput =
        {
            tipo: tipo,
            userId: <number>this.vars.user?.id,
            cadastroId: <number>this.vars.cadastro?.id,
            sistemaId: <number>environment.sistema,
            valor: valor,
            add: add,
            remove: remove
        }

        return this.http.post<ApiResponse>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControlUserPreferences)}/preferences/UserPrefSave`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError))
    }
}
