import { Component, Injector } from '@angular/core';
import { UserPainel } from '../../../contabil/models/users';
import { LoginPage } from '../../../shared/login/pages/login/login';
import { SistemaTipo } from '../../../shared/models';
import { UserLoginService } from '../../services/userLogin.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileServerSiteLogotipoComponent } from '../../../shared/controls/file-server-site-logotipo/file-server-site-logotipo';

@Component({
    selector: 'login',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FileServerSiteLogotipoComponent],
    templateUrl: '../../../shared/login/pages/login/login.html',
})
export class LoginAppPage extends LoginPage<UserPainel> {

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
