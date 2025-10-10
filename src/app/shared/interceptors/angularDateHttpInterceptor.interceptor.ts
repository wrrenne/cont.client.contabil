import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AngularDateHttpInterceptor implements HttpInterceptor {
    // Migrated from AngularJS https://raw.githubusercontent.com/Ins87/angular-date-interceptor/master/src/angular-date-interceptor.js
    iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;
    iso8601DateRegex = /^\d{4}-\d{2}-\d{2}$/;

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const body = event.body;
                    this.convertToDate(body);
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                    }
                }
            }),
        );
    }

    convertToDate(body: any) {
        if (body === null || body === undefined) {
            return body;
        }

        if (typeof body !== 'object') {
            return body;
        }

        for (const key of Object.keys(body)) {
            const value = body[key];
            if (this.isIso8601(value)) {
                body[key] = new Date(value);
            } else
                if (this.isIso8601DateRegex(value)) {
                    body[key] = this.convertStringToDate(value);
                } else
                    if (typeof value === 'object') {
                        this.convertToDate(value);
                    }
        }
    }

    convertStringToDate(dateString: string): Date {
        // Certifique-se de que o formato da string seja YYYY-MM-DD
        const dateParts = dateString.split('-');
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Os meses são baseados em zero no objeto Date
        const day = parseInt(dateParts[2], 10);

        // Cria um novo objeto Date
        const date = new Date(year, month, day);

        return date;
    }

    isIso8601(value: any) {
        if (value === null || value === undefined) {
            return false;
        }

        return this.iso8601.test(value);
    }

    isIso8601DateRegex(value: any) {
        if (value === null || value === undefined) {
            return false;
        }

        return this.iso8601DateRegex.test(value);
    }
}
