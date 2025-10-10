import { Component, Input } from '@angular/core';
import { ApisUtilsService, TMicroService } from '../../../shared/services';

@Component({
    selector: 'avatar-header',
    templateUrl: './avatar-header.html'
})
export class AvatarHeaderComponent {

    @Input() imageUrl: string

    @Input() avatarClass = 'h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100'
    constructor(
        private apisUtilsService: ApisUtilsService,
    ) { }

    private _userId?: number
    @Input() get userId() {
        return this._userId
    }
    set userId(value: number | undefined) {
        this._userId = value
        this.getData()
    }

    getData() {
        var q = this.imageUrl ? '?q=' + Math.floor(Math.random() * 10).toString() : ''

        this.imageUrl = `${this.apisUtilsService.getApiUrl(TMicroService.ApiAvatar)}/Avatar/AvatarUserDownload/${this.userId}${q}`
    }
}
