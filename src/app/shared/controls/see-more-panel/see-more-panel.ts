import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { HyperlinkButtonComponent } from '../hyperlink-button/hyperlink-button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'see-more-panel',
    templateUrl: './see-more-panel.html',
    styleUrls: ['./see-more-panel.scss'],
    standalone: true,
    imports: [CommonModule, HyperlinkButtonComponent],
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
    ]
})
export class SeeMorePanelComponent {

    expanded = false

    @Input() icon = 'ionChevronDownSharp'
    @Input() iconCollapsed = 'ionChevronUpSharp'
    @Input() text = 'Ver mais'
    @Input() textCollapse = 'Ver menos'
    @Input() hideOnExpand = true
    @Input() alwaysExpanded = true

    @ContentChild('content') content: TemplateRef<any>;

    buttonClick() {
        this.expanded = !this.expanded
    }
}
