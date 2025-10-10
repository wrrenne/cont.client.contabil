import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpService } from '../services/http.service';
import { StringsService } from '../services/strings.service';

export abstract class ServiceBase {

    protected http: HttpClient
    protected httpService: HttpService
    protected stringsService: StringsService

    constructor(injector: Injector) {
        this.http = injector.get(HttpClient)
        this.httpService = injector.get(HttpService)
        this.stringsService = injector.get(StringsService)
    }

    protected handleError(error: any): Observable<any> {
        console.error("erro da requisição =>", error)
        return throwError(error);
    }
}
