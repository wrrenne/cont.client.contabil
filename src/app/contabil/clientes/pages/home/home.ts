import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { combineLatest } from 'rxjs';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ClientesParameter } from '../../../models/clientes/parameters';
import { PerfisParameter } from '../../../models/obrigacoes/parameters';
import { ClientePessoaFisicaNovoModalComponent } from '../../components/cliente-pessoa-fisica-novo-modal/cliente-pessoa-fisica-novo-modal';
import { ClientePessoaJuridicaNovoModalComponent } from '../../components/cliente-pessoa-juridica-novo-modal/cliente-pessoa-juridica-novo';
import { ClientesTableComponent } from '../../components/clientes-table/clientes-table';

@Component({
    selector: 'clientes-home',
    templateUrl: './home.html',
    providers: [NzModalService],
    imports: [PageTitleComponent, ButtonDefaultComponent, ClientesTableComponent],
    standalone: true,
})
export class ClientesHomePage implements OnInit {
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

    clientePessoaJuridicaNovoModal() {
        const modal = this.modalService.create({
            nzContent: ClientePessoaJuridicaNovoModalComponent,
            nzWidth: 470,
            nzClosable: false,
            nzFooter: null,
        });

        modal.afterClose.subscribe((r) => {
            if (r) this.router.navigate(['/sistema/clientes/cliente', this.getEncryptedId(r)]);
        });
    }

    clientePessoaFisicaNovoModal() {
        const modal = this.modalService.create({
            nzContent: ClientePessoaFisicaNovoModalComponent,
            nzWidth: 470,
            nzClosable: false,
            nzFooter: null,
        });

        modal.afterClose.subscribe((r) => {
            if (r) this.router.navigate(['/sistema/clientes/cliente', this.getEncryptedId(r)]);
        });
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }
}
