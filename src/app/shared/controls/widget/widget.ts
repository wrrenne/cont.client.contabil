import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { AvatarImageComponent } from '../avatar-image/avatar-image';
import { AvatarIconComponent } from '../avatar-icon/avatar-icon';
import { ButtonCircleIconComponent } from '../button-circle-icon/button-circle-icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'widget',
    standalone: true,
    imports: [CommonModule, RouterLink, AvatarImageComponent, AvatarIconComponent, ButtonCircleIconComponent],
    templateUrl: './widget.html'
})
export class WidgetComponent {

    @Input() transparent = false

    @Input() title?: string;
    @Input() subTitle?: string;
    @Input() alignVertical = false
    @Input() showMoreLink?: string | any[];
    @Input() icon?: string
    @Input() avatarFileName?: string
    @Input() bgClass: string
    @Input() iconClass = 'text-2xl'
    @Input() iconColorClass = 'text-yellow-700 dark:text-yellow-600'
    @Input() iconBgColorClass = 'bg-zinc-200/80 dark:bg-zinc-800'
    @Input() iconSize = '3rem'
    @Input() funcionarioId?: number
    @Input() userId?: number
    @Input() funcionariosDepartamentoId?: number
    @Input() contabilDepartamentoId?: number
    @Input() clienteId?: number

    /*@Input() iconBgClass = 'w-[3rem] h-[3rem]'*/
    @Input() circle = true
    @Input() rounded = false

    @ContentChild('title', { static: true }) titleTemplate: TemplateRef<any>;

    @ContentChild('content') content: TemplateRef<any>;
    @ContentChild('footer') footer: TemplateRef<any>;

    constructor() {
    }

    isString(value: any): value is string {
        return typeof value === 'string';
    }

    get routerLinkValue() {
        // If the parent passed an array, return it directly
        if (Array.isArray(this.showMoreLink)) {
            return this.showMoreLink;
        }

        // If the parent passed a string, return it as a one-element array
        return [this.showMoreLink];
    }
}
