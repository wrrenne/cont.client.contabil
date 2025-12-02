import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ObrigacoesAtrasadasObrigacoesTableComponent } from '../../components/obrigacoes-atrasadas-obrigacoes-table/obrigacoes-atrasadas-obrigacoes-table';

@Component({
    selector: 'obrigacoes-atrasadas-obrigacoes',
    templateUrl: './obrigacoes-atrasadas-obrigacoes.html',
    imports: [PageTitleComponent, NzTabsModule, ObrigacoesAtrasadasObrigacoesTableComponent],
})
export class ObrigacoesAtrasadasObrigacoesPage {
    obrigacoesParameters: ObrigacoesParameter;

    subTitle: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vars: Vars,
        private encryptionService: EncryptionService,
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
