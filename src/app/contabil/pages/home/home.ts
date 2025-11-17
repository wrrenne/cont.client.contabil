import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserWelcomeComponent } from 'src/app/shared/controls/user-welcome/user-welcome';
import { DateUtilsService } from '../../../shared/services';
import { Vars } from '../../../shared/variables';
import { ArquivosDisponibilizadosWidgetComponent } from '../../widgets/components/arquivos-disponibilizados-widget/arquivos-disponibilizados-widget';
import { CalendarAgendaWidgetComponent } from '../../widgets/components/calendar-agenda-widget/calendar-agenda-widget';
import { ClientesCountWidgetComponent } from '../../widgets/components/clientes-count/clientes-count';
import { ClientesObrigacoesAtrasadasGeralWidgetComponent } from '../../widgets/components/clientes-obrigacoes-atrasadas-geral-widget/clientes-obrigacoes-atrasadas-geral-widget';
import { DepartamentoWidgetComponent } from '../../widgets/components/departamento-widget/departamento-widget';
import { ObrigacoesAtrasadasGeralWidgetComponent } from '../../widgets/components/obrigacoes-atrasadas-geral-widget/obrigacoes-atrasadas-geral-widget';
import { ObrigacoesEntreguesGeralWidgetComponent } from '../../widgets/components/obrigacoes-entregues-geral-widget/obrigacoes-entregues-geral-widget';
import { PeriodoWidgetComponent } from '../../widgets/components/periodo-widget/periodo-widget';
import { UsuariosCountWidgetComponent } from '../../widgets/components/usuarios-count/usuarios-count';

@Component({
    selector: 'home',
    templateUrl: './home.html',
    standalone: true,
    imports: [
        UserWelcomeComponent,
        PeriodoWidgetComponent,
        ClientesCountWidgetComponent,
        UsuariosCountWidgetComponent,
        ArquivosDisponibilizadosWidgetComponent,
        ObrigacoesEntreguesGeralWidgetComponent,
        CalendarAgendaWidgetComponent,
        ClientesObrigacoesAtrasadasGeralWidgetComponent,
        ObrigacoesAtrasadasGeralWidgetComponent,
        DepartamentoWidgetComponent,
    ],
})
export class ContabilHomePage {
    datas = [this.dateUtilsService.firstDateOfCurrentMonth(), this.dateUtilsService.lastDateOfCurrentMonth()];

    nome: string;
    constructor(
        private router: Router,
        protected route: ActivatedRoute,
        public vars: Vars,
        private dateUtilsService: DateUtilsService,
    ) {}
}
