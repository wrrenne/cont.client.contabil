import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MessageService<T = void> {
    private subject = new Subject<T>();

    // Method overloads
    sendCommand(): void;
    sendCommand(command: T): void;

    // Single implementation
    sendCommand(command?: T): void {
        if (command === undefined) {
            if (typeof command === "undefined" && (null as unknown as T) !== null) {
                throw new Error("sendCommand() called without a value, but T is not void or undefined.");
            }
            // @ts-expect-error: Suppress type error when T is void.
            this.subject.next(undefined);
        } else {
            this.subject.next(command);
        }
    }

    onMessage(): Observable<T> {
        return this.subject.asObservable();
    }
}
