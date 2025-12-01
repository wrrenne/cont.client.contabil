import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ObrigacoesAtrasadasClientesTableComponent } from '../../components/obrigacoes-atrasadas-clientes-table/obrigacoes-atrasadas-clientes-table';

@Component({
    selector: 'obrigacoes-atrasadas-clientes',
    templateUrl: './obrigacoes-atrasadas-clientes.html',
    providers: [NzModalService],
    imports: [PageTitleComponent, NzTabsModule, ObrigacoesAtrasadasClientesTableComponent],
})
export class ObrigacoesAtrasadasClientesPage {
    obrigacoesParameters: ObrigacoesParameter;

    subTitle: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private modalService: NzModalService,
    ) {}

    ngOnInit(): void {
        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            this.obrigacoesParameters = { searchText: r['q'] };
        });
    }

    titleOnChange(e: string) {
        this.subTitle = e;
    }
    getEncryptedId(id: number | undefined): string {
        return this.encryptionService.encrypt(<number>id);
    }
}
