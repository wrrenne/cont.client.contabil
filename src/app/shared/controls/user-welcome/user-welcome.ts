import { Component } from '@angular/core';
import { StringsService, DateUtilsService } from '../../services';
import { Vars } from '../../variables';
import { AvatarUserImageComponent } from '../avatar-user-image/avatar-user-image';

@Component({
    selector: 'user-welcome',
    templateUrl: './user-welcome.html',
    standalone: true,
    imports: [AvatarUserImageComponent]
})
export class UserWelcomeComponent {

    constructor(
        private vars: Vars,
        private stringsService: StringsService,
        private dateUtilsService: DateUtilsService
    ) {
    }

    getUserNome(): string {
        return this.stringsService.firstWord(this.vars.user?.nome!)
    }

    getCadastroNome(): string {
        return this.vars.cadastro?.nome!
    }

    getGreeting(): string {
        return this.dateUtilsService.getGreeting()
    }
}
