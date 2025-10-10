import { Injectable, NgModule } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';import { environment } from '../../../environments/environment';
import { Vars } from '../variables';
 @Injectable()
 export class HttpsRequestInterceptor implements HttpInterceptor {
     constructor(private vars: Vars) {

     }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = this.vars.token

        const dupReq = req.clone({
            headers: req.headers.set('authorization', token ? 'Bearer ' + token : '')
        });
        return next.handle(dupReq);
    }

    getVarName(name: string) {
        return `${environment.sistemaPrefix}:${name}`
    }

} @NgModule({
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HttpsRequestInterceptor,
        multi: true,
    }]
}) export class Interceptor { }