import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'pill-tab-item',
    standalone: true,
    template: `
        <ng-template #contentTpl>
            <ng-content></ng-content>
        </ng-template>
    `,
})
export class PillTabItemComponent {
    @Input() title!: string;
    @ViewChild('contentTpl', { static: true }) template!: TemplateRef<any>;
}
