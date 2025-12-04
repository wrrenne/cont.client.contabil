import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserWelcomeComponent } from 'src/app/shared/controls/user-welcome/user-welcome';
import { TSetor } from 'src/app/shared/enums';
import { DateUtilsService } from '../../../shared/services';
import { Vars } from '../../../shared/variables';
import { TDashboardWidget } from '../../models/enums';
import { ArquivosDisponibilizadosWidgetComponent } from '../../widgets/components/arquivos-disponibilizados-widget/arquivos-disponibilizados-widget';
import { ClientesCountWidgetComponent } from '../../widgets/components/clientes-count/clientes-count';
import { DepartamentoWidgetComponent } from '../../widgets/components/departamento-widget/departamento-widget';
import { ObrigacoesAtrasadasClientesWidgetComponent } from '../../widgets/components/obrigacoes-atrasadas-clientes-widget/obrigacoes-atrasadas-clientes-widget';
import { ObrigacoesAtrasadasObrigacoesWidgetComponent } from '../../widgets/components/obrigacoes-atrasadas-obrigacoes-widget/obrigacoes-atrasadas-obrigacoes-widget';
import { ObrigacoesEntreguesGeralWidgetComponent } from '../../widgets/components/obrigacoes-entregues-geral-widget/obrigacoes-entregues-geral-widget';
import { PeriodoWidgetComponent } from '../../widgets/components/periodo-widget/periodo-widget';
import { ProximosImpostosWidgetComponent } from '../../widgets/components/proximos-impostos-widget/proximos-impostos-widget';
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
        DepartamentoWidgetComponent,
        ProximosImpostosWidgetComponent,
        ObrigacoesAtrasadasClientesWidgetComponent,
        ObrigacoesAtrasadasObrigacoesWidgetComponent,
    ],
})
export class ContabilHomePage {
    datas = [this.dateUtilsService.firstDateOfCurrentMonth(), this.dateUtilsService.lastDateOfCurrentMonth()];

    nome: string;
    TSetor = TSetor;
    TDashboardWidget = TDashboardWidget;

    constructor(
        private router: Router,
        protected route: ActivatedRoute,
        public vars: Vars,
        private dateUtilsService: DateUtilsService,
    ) {}

    getDashboardWidget(widget: TDashboardWidget): boolean {
        return this.vars.dashBoard?.widgets.includes(widget) ?? false;
    }
}
