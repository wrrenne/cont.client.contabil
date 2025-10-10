import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ActivitiesNotification {

    private hasUnreadSubject = new BehaviorSubject<boolean>(false);

    hasUnread$ = this.hasUnreadSubject.asObservable();

    notifyNew() {
        this.hasUnreadSubject.next(true);
    }

    markAsRead() {
        this.hasUnreadSubject.next(false);
    }
}
