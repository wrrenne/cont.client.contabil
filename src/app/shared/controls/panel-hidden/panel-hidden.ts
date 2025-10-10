import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'panel-hidden',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './panel-hidden.html',
    styleUrls: ['./panel-hidden.scss'],
animations: [
        trigger('expandCollapse', [
            transition(':enter', [
                style({ height: '0px', opacity: 0 }),
                animate('300ms ease-out', style({ height: '*', opacity: 1 }))
            ]),
            transition(':leave', [
                style({ height: '*', opacity: 1 }),
                animate('300ms ease-in', style({ height: '0px', opacity: 0 }))
            ])
        ])
    ]})
export class PanelHiddenComponent {

    private _expanded: boolean
    @Input() get expanded() {
        return this._expanded
    }
    set expanded(value: boolean) {
        this._expanded = value
    }

    @ContentChild('content') content: TemplateRef<any>;
}
