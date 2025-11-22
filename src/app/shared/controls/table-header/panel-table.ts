import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'panel-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './panel-table.html',
})
export class PanelTableComponent {
    @Input() title: string;

    @ContentChild('content') content: TemplateRef<any>;
}
