import { HttpParams } from '@angular/common/http';
import { Injector } from '@angular/core';
import { catchError, delay, Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { Paging } from '../models/paging';
import { QueryParam } from '../models/queryParam';
import { ServiceBase } from './serviceBase';
import { environment } from '../../../environments/environment';

export abstract class ServicePagingBase<T> extends ServiceBase {

    constructor(private url: string, injector: Injector) {
        super(injector)
    }

    getPaging(p: QueryParam): Observable<ApiResponse<Paging<T>>> {
        let params = new HttpParams();

        let url = this.url;

        if (p.pg != null) params = params.set('pg', p.pg.toString());
        if (p.q) params = params.set('q', p.q);

        for (const entry of p.queryStrings.entries()) {
            if (entry[1] != undefined)
                params = params.set(entry[0], entry[1]);
        }

        if (p.routeStrings.length > 0) {
            if (url.substring(url.length - 1, 1) == '/')
                url = url.substring(0, url.length - 2);

            for (const route of p.routeStrings) {
                url += '/' + route;
            }
        }

        if (environment.logPaging)
            console.log(['url', url, params, p.queryStrings]);

        return this.http.get<ApiResponse<Paging<T>>>(url, { params }).pipe(
            environment.simulateDelay ? delay(environment.delayMs) : (src => src),
            catchError(this.handleError)
        );
    }
}
