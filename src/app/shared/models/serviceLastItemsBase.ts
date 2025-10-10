import { Injector } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ListItem } from '.';
import { ApiResponse } from '../models/apiResponse';
import { ServiceBase } from './serviceBase';

export abstract class ServiceLastItemsBase extends ServiceBase {

    constructor(private url: string, injector: Injector) {
        super(injector)
    }

    getLastItems(): Observable<ApiResponse<ListItem[]>> {
        let url = this.url

        return this.http.get<ApiResponse<ListItem[]>>(url)
            .pipe(catchError(this.handleError))
    }
}
