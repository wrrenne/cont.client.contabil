import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { appIcons } from '../../constants/icons';
import { PercentageBarComponent } from '../percentage-bar/percentage-bar';

export enum TContentAlignment {
    Left,
    Right,
    Center,
}

@Component({
    selector: 'widget-done',
    standalone: true,
    imports: [CommonModule, NgIconComponent, PercentageBarComponent],
    templateUrl: './widget-done.html',
})
export class WidgetDoneComponent {
    @Input() iconClass: string;
    @Input() title?: string;
    @Input() icon!: keyof typeof appIcons;
    @Input() done?: number;
    @Input() porcento?: number;
    @Input() value?: number;
    @Input() valueString?: string;
    @Input() smallValueString?: string;
    @Input() total?: string | number;
    @Input() showPorcentoBar = false;
    @Input() showPorcentoLabel = true;
    @Input() bgClass: string = 'bg-transparent';
    @Input() backgroundColor: string = 'blue';
    @Input() description: string;
    @Input() valueClass = 'text-3xl';
    @Input() porcentoClass = 'text-3xl';
    @Input() blockWSize = 1;
    @Input() contentAlignment: TContentAlignment = TContentAlignment.Left;

    @ContentChild('content') content: TemplateRef<any>;

    get blockWidth() {
        switch (this.blockWSize) {
            case 1:
                return 'w-[160px]';
            case 2:
                return 'w-[332px]';
            case 3:
                return 'w-[504px]';
            default:
                return 'w-[688px]';
        }
    }

    get contentAlignmentClass() {
        switch (this.contentAlignment) {
            case TContentAlignment.Center:
                return 'justify-center';
            case TContentAlignment.Right:
                return 'justify-end';
            default:
                return '';
        }
    }
}
