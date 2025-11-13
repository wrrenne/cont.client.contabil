import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// exemplo de uso
// private sub!: Subscription;

//   constructor(private refreshService: RefreshService) {}

//   ngOnInit() {
//     this.sub = this.refreshService.refresh$.subscribe(() => this.reloadData());
//   }

//   ngOnDestroy() {
//     this.sub.unsubscribe();
//   }

//   reloadData() {
// your logic to refresh the data
// }

@Injectable({
    providedIn: 'root',
})
export class PeriodoRefreshService {
    private subject = new Subject<void>();
    refresh$ = this.subject.asObservable();

    notify() {
        this.subject.next();
    }
}
