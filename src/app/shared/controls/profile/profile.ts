import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ApisUtilsService, TMicroService } from '../../services';
import { AvatarImageComponent } from '../avatar-image/avatar-image';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'profile',
    standalone: true,
    imports: [CommonModule, AvatarImageComponent],
    templateUrl: './profile.html'
})
export class ProfileComponent {
    url: string

    private _funcionarioId: number
    @Input() get funcionarioId() {
        return this._funcionarioId
    }
    set funcionarioId(value: number) {
        this._funcionarioId = value
        this.url = `${this.apisUtilsService.getApiUrl(TMicroService.ApiAvatar)}/Avatar/AvatarFuncionarioDownload/${value}`
    }


    @Input() userId?: number
    @Input() clienteId?: number
    @Input() funcionariosDepartamentoId?: number
    @Input() contabilDepartamentoId?: number
    @Input() avatarFileName?: string
    @Input() title: string
    @Input() subTitle?: string
    @Input() showAvatar = true

    @ContentChild('profilecontent') profilecontent: TemplateRef<any>;
    @ContentChild('profilesubtitle') profilesubtitle: TemplateRef<any>;
    @ContentChild('profileavatar') profileavatar: TemplateRef<any>;

    constructor(private apisUtilsService: ApisUtilsService) {

    }

    isString(value: any): value is string {
        return typeof value === 'string';
    }
}
