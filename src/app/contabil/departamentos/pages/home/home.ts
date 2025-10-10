import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HyperlinkButtonComponent } from 'src/app/shared/controls/hyperlink-button/hyperlink-button';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { DepartamentosParameter } from '../../../models/contabil/parameters';
import { DepartamentosTableComponent } from '../../componentes/departamentos-table/departamentos-table';

@Component({
    selector: 'departamentos-home',
    standalone: true,
    providers: [NzModalService],
    templateUrl: './home.html',
    imports: [PageTitleComponent, NgIcon, NzDropDownModule, HyperlinkButtonComponent, DepartamentosTableComponent],
})
export class DepartamentosHomePage implements OnInit {
    departamentosParameters: DepartamentosParameter;

    subTitle: string;
    prefLista = false;
    displayType = 'grid';

    constructor(
        private route: ActivatedRoute,
        private vars: Vars,
        private encryptionService: EncryptionService,
        private modalService: NzModalService,
        private router: Router,
        private encryption: EncryptionService,
    ) {}

    ngOnInit(): void {
        this.departamentosParameters = {};
        console.log(['a']);
        //    const urlParametrs = combineLatest([this.route.params,
        //    this.route.queryParams], (params, queryParams) => ({
        //        ...params, ...queryParams
        //    }));

        //    urlParametrs.subscribe(r => {
        //        this.departamentosParameters = { searchText: r['q'] }
        //    });
    }

    titleOnChange(e: string) {
        this.subTitle = e;
    }

    departamentoNovoModal() {
        //    const modal = this.modalService.create({
        //        nzContent: ClientePessoaJuridicaNovoModalComponent,
        //        nzWidth: 470,
        //        nzClosable: false,
        //        nzFooter: null,
        //    })
        //    modal.afterClose.subscribe(r => {
        //        if (r)
        //            this.router.navigate(['/sistema/clientes/cliente', this.getEncryptedId(r)]);
        //    })
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }
}
