import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { AvatarIconComponent } from '../avatar-icon/avatar-icon';

@Component({
    selector: 'avatar-icon-empty',
    standalone: true,
    imports: [CommonModule, NgxTippyModule, AvatarIconComponent],
    templateUrl: './avatar-icon-empty.html',
})
export class AvatarIconEmptyComponent {
    @Input() tooltip?: string;
}
