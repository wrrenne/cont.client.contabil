import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ApiResponse, ServiceBase } from '../../models';
import { LoginInput } from '../../models/inputs';
import { LoginOutput } from '../../models/outputs';
import { ApisUtilsService, TMicroService } from '../../services';
import { Vars } from '../../variables';
import { ConviteInput, SistemaCadastroInput } from '../models/inputs';
import { PasswordResetInput } from '../models/inputs/passwordResetInput';
import { SistemaCadastroView } from '../models/views';

@Injectable({
    providedIn: 'root',
})
export class ControlService extends ServiceBase {
    constructor(
        public injector: Injector,
        private vars: Vars,
        private apisUtilsService: ApisUtilsService,
    ) {
        super(injector);
    }

    login(input: LoginInput): Observable<ApiResponse<LoginOutput>> {
        return this.http
            .post<ApiResponse<LoginOutput>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Users/Login`, input, this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    sistemaCadastroAdd(input: SistemaCadastroInput): Observable<ApiResponse<SistemaCadastroView[]>> {
        return this.http
            .post<
                ApiResponse<SistemaCadastroView[]>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Control/SistemaCadastroAdd`, [input], this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    conviteResposta(convite: ConviteInput): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Users/ConviteResposta`, convite, this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    passwordReset(passwordReset: PasswordResetInput): Observable<ApiResponse> {
        return this.http
            .post<ApiResponse>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Users/PasswordReset`, passwordReset, this.httpService.httpOptions)
            .pipe(catchError(this.handleError));
    }

    sistemaCadastroGet(): Observable<ApiResponse<SistemaCadastroView>> {
        const sistemaId = environment.sistema;
        const cadastroId = this.vars.cadastro?.id;

        console.log(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Control/SistemaCadastroGet/${cadastroId}/${sistemaId}`);

        return this.http
            .get<
                ApiResponse<SistemaCadastroView>
            >(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Control/SistemaCadastroGet/${cadastroId}/${sistemaId}`)
            .pipe(catchError(this.handleError));
    }

    SistemaCadastrosCountByCadastroId(cadastroId: number): Observable<ApiResponse<number>> {
        return this.http
            .get<ApiResponse<number>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Control/SistemaCadastrosCountByCadastroId/${cadastroId}`)
            .pipe(catchError(this.handleError));
    }

    cadastroUsuariosCountGet(): Observable<ApiResponse<number>> {
        const sistemaId = environment.sistema;
        const cadastroId = this.vars.cadastro?.id;

        return this.http
            .get<ApiResponse<number>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControl)}/Users/CadastroUsuariosCountGet/${cadastroId}/${sistemaId}`)
            .pipe(catchError(this.handleError));
    }
}
