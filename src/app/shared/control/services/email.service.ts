import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, ServiceBase } from '../../../shared/models';
import { ApisUtilsService, TMicroService } from '../../services';
import { Invite, PasswordReset } from '../models/email';

@Injectable({
    providedIn: 'root'
})

export class EmailService extends ServiceBase {

    constructor(
        public injector: Injector,
        private apisUtilsService: ApisUtilsService
    ) {
        super(injector)
    }

    passwordResetEmailSend(passwordReset: PasswordReset): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControlEmail)}/Emails/PasswordResetEmail`, [passwordReset], this.httpService.httpOptions)
            .pipe(catchError(this.handleError))
    }

    InviteEmailSend(invite: Invite): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiControlEmail)}/Emails/InviteEmail`, [invite], this.httpService.httpOptions)
            .pipe(catchError(this.handleError))
    }
}
