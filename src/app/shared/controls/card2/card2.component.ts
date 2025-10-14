import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { HtmlUtilsService } from '../../services/htmlUtils.service';
import { AvatarIconComponent } from '../avatar-icon/avatar-icon';
import { AvatarImageComponent } from '../avatar-image/avatar-image';
import { AvatarTextComponent } from '../avatar-text/avatar-text';
import { TextSeparatorComponent } from '../text-separator/text-separator';

@Component({
    selector: 'card2',
    standalone: true,
    imports: [CommonModule, AvatarImageComponent, AvatarTextComponent, AvatarIconComponent, OverlayscrollbarsModule, TextSeparatorComponent],
    templateUrl: './card2.component.html',
})
export class Card2Component {
    @Input() transparent = false;

    @Input() title: string;
    @Input() titleUppercase = true;
    @Input() subTitle?: string;
    @ContentChild('content') content: TemplateRef<any>;

    constructor(private htmlUtilsService: HtmlUtilsService) {}
}
