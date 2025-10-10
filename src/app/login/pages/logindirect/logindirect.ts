import { Component, Injector } from '@angular/core';
import { UserPainel } from '../../../contabil/models/users';
import { UserLoginService } from '../../../login/services/userLogin.service';
import { LoginDirectPage } from '../../../shared/login/pages/logindirect/logindirect';
import { SistemaTipo } from '../../../shared/models';

@Component({
    selector: 'logindirectapp',
    template: '',
    standalone: true
})
export class LoginDirectAppPage extends LoginDirectPage<UserPainel> {

    constructor(
        injector: Injector,
        private userLoginService: UserLoginService) {
        super(injector)
        this.sistemaTipo = SistemaTipo.Contabil
    }

    override userPainelGet(userId: number, cadastroId?: number) {
        this.userLoginService.userPainelGet(userId, <number>cadastroId, true)
    }
}
