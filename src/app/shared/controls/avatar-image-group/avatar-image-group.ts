import { Component, Input } from '@angular/core';
import { ApisUtilsService } from '../../services';
import { AvatarCountComponent } from '../avatar-count/avatar-count';
import { AvatarIconEmptyComponent } from '../avatar-icon-empty/avatar-icon-empty';
import { AvatarImageComponent } from '../avatar-image/avatar-image';

@Component({
    selector: 'avatar-image-group',
    templateUrl: './avatar-image-group.html',
    standalone: true,
    imports: [AvatarImageComponent, AvatarCountComponent, AvatarIconEmptyComponent],
})
export class AvatarImageGroupComponent {
    @Input() imgClass: string;
    @Input() funcionariosId: number[];
    @Input() usersId: number[];
    @Input() imageFilename: string[];
    @Input() nomes: string[];
    @Input() departamentos: string[];
    @Input() size?: string = '3.5rem';
    @Input() circle: boolean = true;
    @Input() rounded: boolean = false;
    @Input() seeMoreCount?: number;
    @Input() showEmptyIcon = false;
    @Input() emptyIconTooltip?: string;

    constructor(private apisUtilsService: ApisUtilsService) {}
}
