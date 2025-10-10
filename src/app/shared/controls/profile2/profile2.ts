import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ApisUtilsService, TMicroService } from '../../services';

@Component({
    selector: 'profile2',
    standalone: true,
    imports: [CommonModule, NzTabsModule],
    templateUrl: './profile2.html',
})
export class Profile2Component {
    url: string;

    @Input() title: string;
    @Input() subTitle?: string;
    @Input() background = 'https://picsum.photos/1200/400?blur=3';

    private _funcionarioId: number;
    @Input() get funcionarioId() {
        return this._funcionarioId;
    }
    set funcionarioId(value: number) {
        this._funcionarioId = value;
        this.url = `${this.apisUtilsService.getApiUrl(TMicroService.ApiAvatar)}/Avatar/AvatarFuncionarioDownload/${value}`;
    }

    private _userId: number;
    @Input() get userId() {
        return this._userId;
    }
    set userId(value: number) {
        this.userId = value;
        this.url = `${this.apisUtilsService.getApiUrl(TMicroService.ApiAvatar)}/Avatar/AvatarUserDownload/${value}`;
    }

    @ContentChild('content') content: TemplateRef<any>;

    constructor(private apisUtilsService: ApisUtilsService) {}
}
