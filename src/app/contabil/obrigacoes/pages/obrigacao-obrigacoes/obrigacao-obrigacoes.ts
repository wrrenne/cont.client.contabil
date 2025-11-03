import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { combineLatest } from 'rxjs';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { Profile2Component } from 'src/app/shared/controls/profile2/profile2';
import { DateUtilsService, EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacoesParameter } from '../../../models/obrigacoes/parameters';
import { ObrigacaoObrigacoesTableComponent } from '../../components/obrigacao-obrigacoes-table/obrigacao-obrigacoes-table';
import { ObrigacoesService } from '../../services/obrigacoes.service';

@Component({
    selector: 'obrigacao-obrigacoes-page',
    templateUrl: './obrigacao-obrigacoes.html',
    providers: [NzModalService],
    imports: [NzTabsModule, ObrigacaoObrigacoesTableComponent, Profile2Component, ButtonDefaultComponent],
    standalone: true,
})
export class ObrigacaoObrigacoesPage implements OnInit {
    parameters: ObrigacoesParameter;

    obrigacaoId: number;

    title: string;
    subTitle: string;

    constructor(
        private route: ActivatedRoute,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private modalService: NzModalService,
        private router: Router,
        private dateUtilsService: DateUtilsService,
        private obrigacoesService: ObrigacoesService,
    ) {}

    ngOnInit(): void {
        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            this.obrigacaoId = this.encryptionService.decrypt(r['id']);

            this.subTitle = `Vencimentos de ${this.dateUtilsService.formattedRelativeMonth(this.vars.dataInicial!)}`;

            this.obrigacoesService.obrigacaoGet(this.obrigacaoId).subscribe((x) => {
                this.title = x.obj.descricao;
                this.parameters = { obrigacaoId: this.obrigacaoId, mesInicial: this.vars.dataInicial!, mesFinal: this.vars.dataFinal! };
            });
        });
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }

    cadastroClick() {
        this.router.navigate(['/sistema/obrigacoes/obrigacao', this.encryptionService.encrypt(this.obrigacaoId)]);
    }
}
