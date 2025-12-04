import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { TDashboardWidget } from 'src/app/contabil/models/enums';
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
            x.obj = this.dateUtils.convertDates(x.obj);
            this.vars.dataInicial = this.dateUtils.convertIsoStringToDate('2025-11-01');
            this.vars.dataFinal = this.dateUtils.convertIsoStringToDate('2025-11-30');

            // this.vars.dataInicial = x.obj.dataInicial;
            // this.vars.dataFinal = x.obj.dataFinal;

            if (!this.vars.dashBoard) {
                this.vars.dashBoard = {
                    widgets: [
                        TDashboardWidget.ObrigacoesEntregues,
                        TDashboardWidget.ProximosImpostos,
                        TDashboardWidget.ClientesObrigacoesAtrasadas,
                        TDashboardWidget.ObrigacoesAtrasadas,
                    ],
                };
            }

            //this.vars.dashBoard = x.obj.dashboardConfig!;

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
