import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { UserPainel } from '../../../contabil/models/users';
import { SistemaCadastroView } from '../../../shared/control/models/views';
import { ControlService } from '../../../shared/control/services/control.service';
import { UsersService } from '../../../shared/login/services/users.service';
import { DateUtilsService } from '../../../shared/services';
import { Vars } from '../../../shared/variables';

@Component({
    selector: 'profile-drawer',
    standalone: true,
    templateUrl: './profile-drawer.html',
})
export class ProfileDrawerComponent implements OnInit {
    cadastro: SistemaCadastroView;

    constructor(
        private drawer: NzDrawerRef,
        private controlService: ControlService,
        public vars: Vars,
        private usersService: UsersService<UserPainel>,
        private router: Router,
        private dateUtilsService: DateUtilsService,
    ) {}

    ngOnInit(): void {
        this.controlService.sistemaCadastroGet().subscribe((x) => {
            this.cadastro = x.obj;
        });
    }

    drawerClose() {
        this.drawer.close();
    }

    alterarPlanosClick() {
        this.drawerClose();

        this.router.navigate(['/sistema/planos']);
    }

    signOut() {
        this.drawerClose();

        this.usersService.signOut();
    }

    getPeriodo(): string {
        return this.dateUtilsService.getFormattedPeriod(this.vars.dataInicial, this.vars.dataFinal);
    }

    irParaMesAnterior() {
        const dataInicial = this.dateUtilsService.addMonths(this.vars.dataInicial!, -1);
        const dataFinal = this.dateUtilsService.lastDateOfMonth(dataInicial);

        this.vars.periodo = {
            dataInicial: dataInicial,
            dataFinal: dataFinal,
        };
    }
}
