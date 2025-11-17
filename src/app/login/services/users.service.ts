import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, ServiceBase } from '../../shared/models';
import { ApisUtilsService, TMicroService } from '../../shared/services';

@Injectable({
    providedIn: 'root',
})
export class UsersService<T> extends ServiceBase {
    constructor(
        public injector: Injector,
        private apisUtilsService: ApisUtilsService,
    ) {
        super(injector);
    }

    userPainelGet(userId: number, cadastroId: number): Observable<ApiResponse<T>> {
        console.log([userId, cadastroId]);
        return this.http
            .get<ApiResponse<T>>(`${this.apisUtilsService.getApiUrl(TMicroService.ApiContabil)}/Users/UserPainelGet/${userId}/${cadastroId}`)
            .pipe(catchError(this.handleError));
    }
}
