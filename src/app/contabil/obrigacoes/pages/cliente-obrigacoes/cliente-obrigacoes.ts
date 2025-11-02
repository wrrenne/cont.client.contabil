import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { ClientesService } from 'src/app/contabil/clientes/services/clientes.service';
import { TObrigacaoTipo } from 'src/app/contabil/models/enums';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { Profile2Component } from 'src/app/shared/controls/profile2/profile2';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ClienteObrigacoesTableComponent } from '../../components/cliente-obrigacoes-table/cliente-obrigacoes-table';

@Component({
    selector: 'cliente-obrigacoes-page',
    templateUrl: './cliente-obrigacoes.html',
    providers: [NzModalService],
    imports: [NzTabsModule, ClienteObrigacoesTableComponent, Profile2Component, ButtonDefaultComponent],
    standalone: true,
})
export class ClienteObrigacoesPage implements OnInit {
    clienteId: number;
    impostosParameters: ObrigacoesParameter;
    acessoriasParameters: ObrigacoesParameter;
    relatoriosParameters: ObrigacoesParameter;

    title: string;
    subTitle: string;

    constructor(
        private route: ActivatedRoute,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private modalService: NzModalService,
        private router: Router,
        private dateUtilsService: DateUtilsService,
        private clientesService: ClientesService,
    ) {}

    ngOnInit(): void {
        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            this.clienteId = this.encryptionService.decrypt(r['id']);

            this.subTitle = `Vencimentos de ${this.dateUtilsService.formattedRelativeMonth(this.vars.dataInicial!)}`;

            var mes = r['mes'] ?? this.dateUtilsService.firstDateOfCurrentMonth();

            this.clientesService.clienteGet(this.clienteId).subscribe((x) => {
                this.title = x.obj.nome;
                //this.subTitle = x.obj.regime;
                this.impostosParameters = { clienteId: this.clienteId, mes: mes, tipo: TObrigacaoTipo.Imposto };
                this.acessoriasParameters = { clienteId: this.clienteId, mes: mes, tipo: TObrigacaoTipo.Acessoria };
                this.relatoriosParameters = { clienteId: this.clienteId, mes: mes, tipo: TObrigacaoTipo.Relatorio };
            });
        });
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }

    cadastroClick() {
        this.router.navigate(['/sistema/clientes/cliente', this.encryptionService.encrypt(this.clienteId)]);
    }
}
