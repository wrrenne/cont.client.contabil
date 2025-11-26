import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
    private subject = new Subject<string>();

    sendCommand(q: string) {
        this.subject.next(q);
    }

    onMessage(): Observable<string> {
        return this.subject.asObservable();
    }
}
