import { Injectable, Injector } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ApiResponse, ServiceBase } from '../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../services';
import { Vars } from '../../variables';


@Injectable({
    providedIn: 'root'
})

export class AvatarService extends ServiceBase {

    constructor(
        injector: Injector,
        private apisUtilsService: ApisUtilsService,
        private vars: Vars
    ) {
        super(injector)
    }

    AvatarFuncionarioUpload(funcionarioId: number, file: File[]): Observable<ApiResponse> {
        const formData = new FormData();
        formData.append('file', file[0], file[0].name);
        formData.append('funcionarioId', funcionarioId.toString());

        formData.append('cadastroId', (this.vars.cadastro?.id!).toString());

        return this.http.post<ApiResponse>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiAvatar)}/Avatar/ArquivoFormUpload`, formData)
            .pipe(catchError(this.handleError))
    }

    AvatarCadastroUpload(cadastroId: number, file: File[]): Observable<ApiResponse> {
        const formData = new FormData();
        formData.append('file', file[0], file[0].name);
        formData.append('cadastroId', cadastroId.toString());

        return this.http.post<ApiResponse>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiAvatar)}/Avatar/ArquivoFormUpload`, formData)
            .pipe(catchError(this.handleError))
    }

    AvatarUserUpload(userId: number, file: File[]): Observable<ApiResponse> {
        const formData = new FormData();
        formData.append('file', file[0], file[0].name);
        formData.append('userId', userId.toString());

        return this.http.post<ApiResponse>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiAvatar)}/Avatar/ArquivoFormUpload`, formData)
            .pipe(catchError(this.handleError))
    }
}
