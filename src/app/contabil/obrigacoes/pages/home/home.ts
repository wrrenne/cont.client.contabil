import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { TObrigacaoTipo } from '../../../models/enums';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ObrigacaoNovoModalComponent } from '../../components/obrigacao-novo-modal/obrigacao-novo-modal';
import { ObrigacoesTableComponent } from '../../components/obrigacoes-table/obrigacoes-table';

@Component({
    selector: 'obrigacoes-home',
    templateUrl: './home.html',
    providers: [NzModalService],
    imports: [PageTitleComponent, NzTabsModule, ObrigacoesTableComponent],
})
export class ObrigacoesHomePage {
    obrigacoesImpostosParameters: ObrigacoesParameter;
    obrigacoesAcessoriasParameters: ObrigacoesParameter;
    obrigacoesRelatoriosParameters: ObrigacoesParameter;
    //perfisParameters: PerfisParameter

    tabIndex = 0;
    subTitle: string;

    displayType = 'grid';

    TObrigacaoTipo = TObrigacaoTipo;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private modalService: NzModalService,
    ) {}

    ngOnInit(): void {
        //this.perfisParameters = { contabilidadeId: this.vars.contabilidade?.id! }

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

    titleOnChange(e: string) {
        this.subTitle = e;
    }

    obrigacaoNovoModal(tipo: TObrigacaoTipo) {
        const modal = this.modalService.create({
            nzContent: ObrigacaoNovoModalComponent,
            nzWidth: 470,
            nzClosable: false,
            nzFooter: null,
            nzData: {
                tipo: tipo,
            },
        });

        modal.afterClose.subscribe((r) => {
            if (r) {
                this.router.navigate(['/sistema/obrigacoes/obrigacao', this.getEncryptedId(r.id)]);
            }
        });
    }

    getEncryptedId(id: number | undefined): string {
        return this.encryptionService.encrypt(<number>id);
    }
}
