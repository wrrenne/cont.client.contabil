import { Component, Input } from '@angular/core';
import { Vars } from '../../variables';
import { AvatarImageComponent } from '../avatar-image/avatar-image';

@Component({
    selector: 'avatar-user-image',
    templateUrl: './avatar-user-image.html',
    standalone: true,
    imports: [AvatarImageComponent]
})
export class AvatarUserImageComponent {

    @Input() imgClass: string
    @Input() rounded = true
    @Input() circle = false

    @Input() size?: string = '2.5rem'; // Accept size as '100px', '50%', etc.

    constructor(private vars: Vars) {
    }

    getUserId(): number {
        return this.vars.user?.id!
    }
}
