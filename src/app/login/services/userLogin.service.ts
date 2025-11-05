import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { UserPainel } from '../../contabil/models/users';
import { VarsApp } from '../../contabil/variables';
import { ServiceBase } from '../../shared/models';
import { DateUtilsService } from '../../shared/services';
import { UsersService } from './users.service';

@Injectable({
    providedIn: 'root',
})
export class UserLoginService extends ServiceBase {
    constructor(
        public injector: Injector,
        private usersService: UsersService<UserPainel>,
        private vars: VarsApp,
        private dateUtils: DateUtilsService,
        protected router: Router,
    ) {
        super(injector);
    }

    userPainelGet(userId: number, cadastroId: number, goToHome: boolean) {
        this.usersService.userPainelGet(userId, cadastroId).subscribe((x) => {
            // this.vars.dataInicial = this.dateUtils.convertIsoStringToDate('2025-08-01')
            // this.vars.dataFinal = this.dateUtils.convertIsoStringToDate('2025-08-31')

            this.vars.dataInicial = x.obj.dataInicial;
            this.vars.dataFinal = x.obj.dataFinal;

            this.vars.cadastro = {
                id: <number>x.obj.cadastroId,
                nome: x.obj.cadastroNome,
            };

            this.vars.user = {
                id: <number>x.obj.userId,
                nome: x.obj.userNome,
                email: x.obj.email,
                p: x.obj.pwd,
            };

            this.vars.loaded = true;

            if (goToHome) this.router.navigate(['/sistema/home']);
        });
    }
}
