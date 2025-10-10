import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { PerfisParameter } from '../../../models/obrigacoes/parameters';
import { PerfilNovoModalComponent } from '../../components/perfil-novo-modal/perfil-novo-modal';
import { PerfisTableComponent } from '../../components/perfis-table/perfis-table';

@Component({
    selector: 'perfis-page',
    templateUrl: './perfis.html',
    standalone: true,
    providers: [NzModalService],
    imports: [PageTitleComponent, PerfisTableComponent],
})
export class PerfisPage {
    perfisParameters: PerfisParameter;

    subTitle: string;

    displayType = 'grid';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private modalService: NzModalService,
    ) {}

    ngOnInit(): void {
        this.perfisParameters = { cadastroId: this.vars.cadastro?.id! };

        //    const urlParametrs = combineLatest([this.route.params,
        //        this.route.queryParams], (params, queryParams) => ({
        //            ...params, ...queryParams
        //        }));

        //    urlParametrs.subscribe(r => {
        //        this.perfisParameters = { perfilItemId: this.encryptionService.get(r['pi']), searchText: r['q'] }
        //    });
    }

    titleOnChange(e: any) {
        this.subTitle = e;
    }

    perfilNovoModal() {
        const modal = this.modalService.create({
            nzContent: PerfilNovoModalComponent,
            nzWidth: 570,
            nzClosable: false,
            nzFooter: null,
        });

        modal.afterClose.subscribe((r) => {
            if (r) {
                this.router.navigate(['/sistema/obrigacoes/perfil', this.encryptionService.encrypt(r.perfilItemId)]);
            }
        });

        //    modal.afterClose.subscribe(r => {
        //        if (r) this.modalClosed(r)
        //    })
    }
}
