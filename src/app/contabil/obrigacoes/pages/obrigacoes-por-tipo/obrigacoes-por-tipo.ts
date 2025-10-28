import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { ClientesService } from 'src/app/contabil/clientes/services/clientes.service';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';

@Component({
    selector: 'obrigacoes-por-tipo-page',
    templateUrl: './obrigacoes-por-tipo.html',
    providers: [NzModalService],
    imports: [PageTitleComponent, NzTabsModule],
    standalone: true,
})
export class ObrigacoesPorTipoPage implements OnInit {
    parameters: ObrigacoesParameter;

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
            const obrigacaoId = this.encryptionService.decrypt(r['id']);

            var mes = r['mes'] ?? this.dateUtilsService.firstDateOfCurrentMonth();

            this.clientesService.clienteGet(obrigacaoId).subscribe((x) => {
                this.title = x.obj.nome;
                this.subTitle = x.obj.regime;
                this.parameters = { obrigacaoId: obrigacaoId, mes: mes };
            });
        });
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }
}
