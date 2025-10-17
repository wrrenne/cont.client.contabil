import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsComponent } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ClienteObrigacoesTableComponent } from '../../components/cliente-obrigacoes-table/cliente-obrigacoes-table';

@Component({
    selector: 'cliente-obrigacoes-page',
    templateUrl: './cliente-obrigacoes.html',
    providers: [NzModalService],
    imports: [PageTitleComponent, ClienteObrigacoesTableComponent, NzTabsComponent],
    standalone: true,
})
export class ClienteObrigacoesPage implements OnInit {
    impostosParameters: ObrigacoesParameter;
    acessoriasParameters: ObrigacoesParameter;
    relatoriosParameters: ObrigacoesParameter;

    title: string;

    constructor(
        private route: ActivatedRoute,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private modalService: NzModalService,
        private router: Router,
        private dateUtilsService: DateUtilsService,
    ) {}

    ngOnInit(): void {
        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            var mes = r['mes'] ?? this.dateUtilsService.firstDateOfCurrentMonth();

            this.obrigacoesParameters = { clienteId: this.encryptionService.decrypt(r['id']), mes: mes };
        });
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }
}
