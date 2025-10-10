import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { AvatarIconComponent } from '../avatar-icon/avatar-icon';
import { AvatarImageComponent } from '../avatar-image/avatar-image';
import { AvatarServerIconComponent } from '../avatar-server-icon/avatar-server-icon';
import { AvatarTextComponent } from '../avatar-text/avatar-text';

@Component({
    selector: 'avatar-title',
    templateUrl: './avatar-title.html',
    standalone: true,
    imports: [CommonModule, AvatarImageComponent, AvatarServerIconComponent, AvatarTextComponent, AvatarIconComponent],
    styleUrls: ['./avatar-title.scss'],
})
export class AvatarTitleComponent {
    @Input() title?: string;
    @Input() titleDescription?: string;
    @Input() subTitle?: string;
    @Input() subTitle2?: string;

    @Input() funcionarioId?: number;
    @Input() userId?: number;
    @Input() funcionariosDepartamentoId?: number;
    @Input() contabilDepartamentoId?: number;

    @Input() iconFilename?: string;
    @Input() logotipoFilename?: string;
    @Input() avatarFileName?: string;

    @Input() clienteId?: number;
    @Input() rounded = true;
    @Input() circle = false;
    @Input() avatarText?: string | number;
    @Input() avatarTextFontSize?: string;
    @Input() icon?: string;
    @Input() debug?: string;
    @Input() iconbgcolor: string = 'bg-avatar';
    @Input() iconClass: string;
    @Input() avatarSize?: string = '3.5rem';

    @Input() showInitials = false;

    @Input() tagValue?: any;
    @Input() tagClass?: string = 'tag-blue';

    @Input() badge: 'check' | 'warning' | 'custom' | 'none' = 'none';

    @ContentChild('title', { static: true }) titleTemplate: TemplateRef<any>;
    @ContentChild('subTitle', { static: true }) subTitleTemplate: TemplateRef<any>;

    @Output() onClick = new EventEmitter();

    titleClick() {
        this.onClick.emit();
    }

    isString(value: any): value is string {
        return typeof value === 'string';
    }
}
