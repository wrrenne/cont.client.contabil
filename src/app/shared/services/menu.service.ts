import { Injectable, TemplateRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MenuService {
    private menuTemplate = new BehaviorSubject<TemplateRef<any> | null>(null);
    menuTemplate$ = this.menuTemplate.asObservable();

    setMenu(template: TemplateRef<any> | null) {
        this.menuTemplate.next(template);
    }
}
