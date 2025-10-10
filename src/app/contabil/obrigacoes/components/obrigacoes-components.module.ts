import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ControlsModule } from '../../../shared/controls/controls.module';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import { GedControlsModule } from '../../../shared/ged/controls/ged-controls.module';
import { AppPipesModule } from '../../../shared/pipes/appPipes.module';
import { SharedModule } from '../../../shared/shared.module';
import { TabelasControlsModule } from '../../../shared/tabelas/components/controls.module';
import { TimelineControlsModule } from '../../../shared/timeline/controls/timeline-controls.module';
import { ClientesComponentsModule } from '../../clientes/components/clientes-components.module';
import { ContabilComponentsModule } from '../../components/contabil-components.module';
import { DepartamentosComponentsModule } from '../../departamentos/componentes/departamentos-components.module';
import { ClienteObrigacoesStatsMesComponent } from './cliente-obrigacoes-stats-mes/cliente-obrigacoes-stats-mes';
import { ClienteObrigacoesTableComponent } from './cliente-obrigacoes-table/cliente-obrigacoes-table';
import { ClientePerfilAssociarModalComponent } from './cliente-perfil-associar-modal/cliente-perfil-associar-modal';
import { ClientePerfisTableComponent } from './cliente-perfis-table/cliente-perfis-table';
import { ObrigacaoArquivosComponent } from './obrigacao-arquivos/obrigacao-arquivos';
import { ObrigacaoCardComponent } from './obrigacao-card/obrigacao-card';
import { ObrigacaoClientePeriodoComponent } from './obrigacao-cliente-periodo/obrigacao-cliente-periodo';
import { ObrigacaoConclusaoModalComponent } from './obrigacao-conclusao-modal/obrigacao-conclusao-modal';
import { ObrigacaoDadosModalComponent } from './obrigacao-dados-modal/obrigacao-dados-modal';
import { ObrigacaoDadosComponent } from './obrigacao-dados/obrigacao-dados';
import { ObrigacaoGedConfiguracaoComponent } from './obrigacao-ged-configuracao/obrigacao-ged-configuracao';
import { ObrigacaoItemArquivosComponent } from './obrigacao-item-arquivos/obrigacao-item-arquivos';
import { ObrigacaoItem } from './obrigacao-item/obrigacao-item';
import { ObrigacaoNovoModalComponent } from './obrigacao-novo-modal/obrigacao-novo-modal';
import { ObrigacaoObrigacoesTableComponent } from './obrigacao-obrigacoes-table/obrigacao-obrigacoes-table';
import { ObrigacaoResumoChartConcluidosComponent } from './obrigacao-resumo-chart-concluidos/obrigacao-resumo-chart-concluidos';
import { ObrigacaoResumoChartComponent } from './obrigacao-resumo-chart/obrigacao-resumo-chart';
import { ObrigacaoResumoDatasComponent } from './obrigacao-resumo-datas/obrigacao-resumo-datas';
import { ObrigacoesResumoUsersComponent } from './obrigacao-resumo-users/obrigacao-resumo-users';
import { ObrigacaoResumoComponent } from './obrigacao-resumo/obrigacao-resumo';
import { ObrigacaoSelectComponent } from './obrigacao-select/obrigacao-select';
import { ObrigacaoVencimentosEPrazosModalComponent } from './obrigacao-vencimentos-e-prazos-modal/obrigacao-vencimentos-e-prazos-modal';
import { ObrigacaoVencimentosEPrazosComponent } from './obrigacao-vencimentos-e-prazos/obrigacao-vencimentos-e-prazos';
import { ObrigacoesSidebarComponent } from './obrigacoes-sidebar/obrigacoes-sidebar';
import { ObrigacoesTableComponent } from './obrigacoes-table/obrigacoes-table';
import { PerfilClienteAssociarModalComponent } from './perfil-cliente-associar-modal/perfil-cliente-associar-modal';
import { PerfilClientesTableComponent } from './perfil-clientes-table/perfil-clientes-table';
import { PerfilsDadosComponent } from './perfil-dados/perfil-dados';
import { PerfilNovoModalComponent } from './perfil-novo-modal/perfil-novo-modal';
import { PerfilObrigacaoAssociarModalComponent } from './perfil-obrigacao-associar-modal/perfil-obrigacao-associar-modal';
import { PerfilSelectComponent } from './perfil-select/perfil-select.component';
import { PerfisTableComponent } from './perfis-table/perfis-table';
import { UserObrigacoesTableComponent } from './user-obrigacoes-table/user-obrigacoes-table';
import { PerfilCardComponent } from './perfil-card/perfil-card';

const NzComponents = [
    NzToolTipModule,
    NzTagModule,
    NzButtonModule,
    NzAvatarModule,
    NzFormModule,
    NzDropDownModule,
    NzCardModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTableModule,
    NzTabsModule
]

const matComponents = [
    MatStepperModule
]

const modals = [
    ClientePerfilAssociarModalComponent,
    PerfilClienteAssociarModalComponent,
    ObrigacaoNovoModalComponent,
    PerfilObrigacaoAssociarModalComponent,
    PerfilNovoModalComponent,
    ObrigacaoConclusaoModalComponent,
    ObrigacaoArquivosComponent,
    ObrigacaoResumoComponent,
    ObrigacaoResumoDatasComponent,
    ObrigacaoResumoChartConcluidosComponent,
    ObrigacaoResumoChartComponent,
    ObrigacaoDadosModalComponent,
    ObrigacaoVencimentosEPrazosModalComponent
]

const Components = [
    PerfilSelectComponent,
    ObrigacoesSidebarComponent,
    ClientePerfisTableComponent,
    ObrigacaoCardComponent,
    ObrigacoesTableComponent,
    ObrigacaoDadosComponent,
    ObrigacaoSelectComponent,
    ClienteObrigacoesTableComponent,
    ObrigacaoObrigacoesTableComponent,
    ObrigacaoClientePeriodoComponent,
    ObrigacaoGedConfiguracaoComponent,
    PerfisTableComponent,
    PerfilsDadosComponent,
    PerfilSelectComponent,
    PerfilClientesTableComponent,
    ObrigacaoItem,
    ObrigacaoItemArquivosComponent,
    UserObrigacoesTableComponent,
    ObrigacoesResumoUsersComponent,
    ObrigacaoVencimentosEPrazosComponent,
    ClienteObrigacoesStatsMesComponent,
    PerfilCardComponent
]

@NgModule({
    declarations: [
        Components,
        ...modals
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        ControlsModule,
        NgIconsModule,
        ContabilComponentsModule,
        MatStepperModule,
        GedControlsModule,
        SharedModule,
        NgIconsModule,
        ClientesComponentsModule,
        TimelineControlsModule,
        AppPipesModule,
        DepartamentosComponentsModule,
        TabelasControlsModule,
        ...NzComponents
    ],
    exports: [
        Components,
        ...modals
    ],
})
export class ObrigacoesComponentsModule { }
