import { Component, HostBinding, Input } from '@angular/core';
import { ApisUtilsService } from '../../services';
import { CommonModule } from '@angular/common';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

@Component({
    selector: 'avatar-server-icon',
    templateUrl: './avatar-server-icon.html',
    standalone: true,
    imports: [CommonModule, NgxTippyModule],
    host: { 'class': 'flex items-center justify-center _rounded-full' }
})
export class AvatarServerIconComponent {

    @Input() defaultIcon: string
    @Input() circle = false
    @Input() rounded = true
    @Input() border = false

    @Input() tooltip?: string
    @Input() tooltipPlacement: string

    @Input() size?: string = '3.5rem';

    @Input() bgcolor: string = 'bg-avatar'

    @HostBinding('style.width') get width() {
        return this.size || 'auto'; // Default to 'auto' if size is not provided
    }

    @HostBinding('style.height') get height() {
        return this.size || 'auto'; // Set the same for height or customize further
    }

    constructor(
        private apisUtilsService: ApisUtilsService
    ) {
        this.defaultIcon = 'bootstrapPersonFill'
    }

    private _iconFilename?: string
    @Input() get iconFilename() {
        return this._iconFilename
    }
    set iconFilename(value: string | undefined) {
        this._iconFilename = value
        if (!value) return
    }

    getImageIconFullPath(): string {
        return `${this.apisUtilsService.getFileServerUrl()}/images/icons/${this.iconFilename}`
    }
}
