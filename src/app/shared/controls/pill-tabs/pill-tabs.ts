import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, QueryList } from '@angular/core';
import { PillTabItemComponent } from '../pill-tab-item/pill-tab-item';

@Component({
    selector: 'pill-tabs',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pill-tabs.html',
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(6px)' }),
                animate('240ms cubic-bezier(.22,.9,.3,1)', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
            transition(':leave', [animate('180ms cubic-bezier(.4,0,.2,1)', style({ opacity: 0, transform: 'translateY(-6px)' }))]),
        ]),
    ],
})
export class PillTabsComponent implements AfterContentInit {
    @ContentChildren(PillTabItemComponent) tabs!: QueryList<PillTabItemComponent>;
    activeTab?: PillTabItemComponent;

    constructor(private cdr: ChangeDetectorRef) {}

    ngAfterContentInit() {
        // default to first tab and ensure change detection runs so initial content appears
        if (this.tabs && this.tabs.length > 0) {
            this.activeTab = this.tabs.first;
            this.cdr.detectChanges();
        }
    }

    setActive(tab: PillTabItemComponent) {
        if (this.activeTab === tab) return;
        this.activeTab = tab;
    }
}
