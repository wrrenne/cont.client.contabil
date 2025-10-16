import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { combineLatest } from 'rxjs';
import { ClientesTableComponent } from 'src/app/contabil/clientes/components/clientes-table/clientes-table';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ClientesParameter } from '../../../models/clientes/parameters';
import { PerfisParameter } from '../../../models/obrigacoes/parameters';

@Component({
    selector: 'obrigacoes-por-cliente-page',
    templateUrl: './obrigacoes-por-cliente.html',
    providers: [NzModalService],
    imports: [PageTitleComponent, ClientesTableComponent],
    standalone: true,
})
export class ObrigacoesPorClientePage implements OnInit {
    clientesParameters: ClientesParameter;
    perfisParameters: PerfisParameter;

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
        this.perfisParameters = { cadastroId: this.vars.cadastro?.id! };

        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            this.clientesParameters = { perfilItemId: this.encryptionService.decrypt(r['pi']), searchText: r['q'] };
        });
    }

    titleOnChange(e: string) {
        this.subTitle = e;
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }
}
