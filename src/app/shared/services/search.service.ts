import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

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
//import { Injectable } from "@angular/core";
//import { Observable, Subject } from "rxjs";
//import { TEspelhoTipo } from "../../ponto/enums/enums";

//@Injectable({ providedIn: 'root' })
//export class MessageService {
//    private subject = new Subject<TEspelhoTipo>();

//    sendCommand(command: TEspelhoTipo) {
//        this.subject.next(command);
//    }

//    onMessage(): Observable<TEspelhoTipo> {
//        return this.subject.asObservable();
//    }
//}
