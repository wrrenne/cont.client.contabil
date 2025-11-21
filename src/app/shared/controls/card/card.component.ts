import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { HtmlUtilsService } from '../../services/htmlUtils.service';
import { AvatarIconComponent } from '../avatar-icon/avatar-icon';
import { AvatarImageComponent } from '../avatar-image/avatar-image';
import { AvatarTextComponent } from '../avatar-text/avatar-text';

@Component({
    selector: 'card',
    standalone: true,
    imports: [CommonModule, AvatarImageComponent, AvatarTextComponent, AvatarIconComponent, OverlayscrollbarsModule],
    templateUrl: './card.component.html',
})
export class CardComponent {
    @Input() transparent = false;

    @Input() title?: string;
    @Input() titleUppercase = true;
    @Input() subTitle?: string;
    @Input() icon?: string;
    @Input() rounded = false;
    @Input() circle = true;
    @Input() iconClass = 'text-2xl';
    // @Input() iconColorClass = 'text-yellow-700 dark:text-yellow-600';
    @Input() iconColorClass = 'text-black/90 dark:text-white/90';
    @Input() iconBgColorClass = 'bg-zinc-200/80 dark:bg-zinc-800';
    @Input() headerBgColorClass = 'bg-transparent';
    @Input() color?: string;
    @Input() avatarFileName?: string;
    @Input() avatarText?: string | number;
    @Input() avatarSubText?: string | number;
    @Input() funcionarioId?: number;
    @Input() userId?: number;
    @Input() funcionariosDepartamentoId?: number;
    @Input() contabilDepartamentoId?: number;
    @Input() clienteId?: number;
    @Input() iconSize = '3rem';
    @Input() border = true;
    @Input() contentPadding = true;

    @ContentChild('title', { static: true }) titleTemplate: TemplateRef<any>;
    @ContentChild('tools') tools: TemplateRef<any>;

    @ContentChild('icon', { static: true }) iconTemplate: TemplateRef<any>;
    @ContentChild('content') content: TemplateRef<any>;
    @ContentChild('footer') footer: TemplateRef<any>;

    constructor(private htmlUtilsService: HtmlUtilsService) {}

    isString(value: any): value is string {
        return typeof value === 'string';
    }

    getClass(): string {
        return [
            this.color ? this.htmlUtilsService.getLightBgColor(this.color) : '',
            this.border ? 'border border-color' : '!pl-2',
            this.contentPadding ? 'p-5' : '',
        ]
            .filter(Boolean)
            .join(' ');
    }

    getHeaderClass(): string {
        return [this.headerBgColorClass, this.border ? 'border-b border-color' : '', this.contentPadding ? '-m-5 mb-5' : ''].filter(Boolean).join(' ');
    }
}
