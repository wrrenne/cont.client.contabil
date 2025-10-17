import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { ClientesService } from 'src/app/contabil/clientes/services/clientes.service';
import { TObrigacaoTipo } from 'src/app/contabil/models/enums';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ClienteObrigacoesComponent } from '../../components/cliente-obrigacoes/cliente-obrigacoes';

@Component({
    selector: 'cliente-obrigacoes-page',
    templateUrl: './cliente-obrigacoes.html',
    providers: [NzModalService],
    imports: [PageTitleComponent, NzTabsModule, ClienteObrigacoesComponent],
    standalone: true,
})
export class ClienteObrigacoesPage implements OnInit {
    //cliente: ContabilClienteView;

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
            const clienteId = this.encryptionService.decrypt(r['id']);

            var mes = r['mes'] ?? this.dateUtilsService.firstDateOfCurrentMonth();

            this.clientesService.clienteGet(clienteId).subscribe((x) => {
                this.title = x.obj.nome;
                this.subTitle = x.obj.regime;
                this.impostosParameters = { clienteId: clienteId, mes: mes, tipo: TObrigacaoTipo.Imposto };
                this.acessoriasParameters = { clienteId: clienteId, mes: mes, tipo: TObrigacaoTipo.Acessoria };
                this.relatoriosParameters = { clienteId: clienteId, mes: mes, tipo: TObrigacaoTipo.Relatorio };
            });
        });
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }
}
