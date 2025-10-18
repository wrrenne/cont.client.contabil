import { Component, Input } from '@angular/core';
import { ApisUtilsService } from '../../services';
import { AvatarCountComponent } from '../avatar-count/avatar-count';
import { AvatarIconComponent } from '../avatar-icon/avatar-icon';
import { AvatarImageComponent } from '../avatar-image/avatar-image';
import { AvatarTitleComponent } from '../avatar-title/avatar-title';

@Component({
    selector: 'avatar-image-vertical-group',
    templateUrl: './avatar-image-vertical-group.html',
    standalone: true,
    imports: [AvatarImageComponent, AvatarCountComponent, AvatarIconComponent, AvatarTitleComponent],
})
export class AvatarImageVerticalGroupComponent {
    @Input() label?: string;
    @Input() imgClass: string;
    @Input() funcionariosId: number[];
    @Input() usersId: number[];
    @Input() imageFilename: string[];
    @Input() nomes: string[];
    @Input() subTitles: string[];
    @Input() size?: string = '2.2rem';
    @Input() circle: boolean = true;
    @Input() rounded: boolean = false;
    @Input() seeMoreCount?: number;
    @Input() showEmptyIcon = false;
    @Input() emptyIconTooltip?: string;

    constructor(private apisUtilsService: ApisUtilsService) {}
}
