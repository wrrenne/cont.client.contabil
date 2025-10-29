import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { TObrigacaoTipo } from 'src/app/contabil/models/enums';
import { ObrigacoesParameter } from 'src/app/contabil/models/obrigacoes/parameters';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrObrigacoesTableComponent } from '../../components/obr-obrigacoes-table/obr-obrigacoes-table';

@Component({
    selector: 'obrigacoes-por-obrigacao-page',
    templateUrl: './obrigacoes-por-obrigacao.html',
    providers: [NzModalService],
    imports: [PageTitleComponent, ObrObrigacoesTableComponent, NzTabsModule],
    standalone: true,
})
export class ObrigacoesPorObrigacaoPage implements OnInit {
    obrigacoesImpostosParameters: ObrigacoesParameter;
    obrigacoesAcessoriasParameters: ObrigacoesParameter;
    obrigacoesRelatoriosParameters: ObrigacoesParameter;

    subTitle: string;
    prefLista = false;
    displayType = 'grid';

    constructor(
        private route: ActivatedRoute,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private modalService: NzModalService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        //this.perfisParameters = { cadastroId: this.vars.cadastro?.id! };

        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            this.obrigacoesImpostosParameters = { tipo: TObrigacaoTipo.Imposto, perfilItemId: this.encryptionService.decrypt(r['pi']), searchText: r['q'] };
            this.obrigacoesAcessoriasParameters = { tipo: TObrigacaoTipo.Acessoria, perfilItemId: this.encryptionService.decrypt(r['pi']), searchText: r['q'] };
            this.obrigacoesRelatoriosParameters = { tipo: TObrigacaoTipo.Relatorio, perfilItemId: this.encryptionService.decrypt(r['pi']), searchText: r['q'] };
        });
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }
}
