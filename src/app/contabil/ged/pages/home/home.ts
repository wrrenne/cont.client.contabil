import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { combineLatest } from 'rxjs';
import { VarsApp } from 'src/app/contabil/variables';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { ClienteFolderSelectModalComponent } from 'src/app/shared/ged/controls/cliente-folder-select-modal/cliente-folder-select-modal';
import { FoldersTableComponent } from 'src/app/shared/ged/controls/folders-table/folders-table';
import { PastaOuArquivoPageItem } from 'src/app/shared/ged/models/pagings';
import { PageTitleComponent } from '../../../../shared/controls/page-title/page-title';
import { PastasParameter } from '../../../../shared/ged/models/parameters';
import { GedService } from '../../../../shared/ged/services/ged.service';
import { EncryptionService } from '../../../../shared/services';

@Component({
    selector: 'ged-home',
    templateUrl: './home.html',
    standalone: true,
    providers: [NzModalService],
    imports: [PageTitleComponent, FoldersTableComponent, ButtonDefaultComponent],
})
export class GedHomePage {
    // pastaRoot = '1.01.08';
    pastaRoot?: string = undefined;
    pastaRootId?: number;
    subTitle: string;

    pastasParameters: PastasParameter;
    // filesParameters: FilesParameter;

    constructor(
        private route: ActivatedRoute,
        private vars: VarsApp,
        private encryptionService: EncryptionService,
        private gedService: GedService,
        private modalService: NzModalService,
    ) {}

    ngOnInit(): void {
        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            var id = this.encryptionService.decrypt(r['id']);
            //var id = this.encryptionService.get(r['id'])

            if (this.pastaRoot) {
                this.gedService.pastaIdGet(this.vars.cadastro?.id!, this.pastaRoot).subscribe((x) => {
                    if (x.obj) {
                        this.pastaRootId = x.obj;
                        this.getPastasArquivos(id ?? x.obj!);
                    }
                });
            } else {
                this.gedService.pastaCadastroIdGet(this.vars.cadastro?.id!).subscribe((x) => {
                    if (x.obj) {
                        this.pastaRootId = x.obj;
                        this.getPastasArquivos(this.pastaRootId);
                    }
                });
            }
        });
    }

    // getCadastroPasta() {
    //    this.gedService.pastaCadastroIdGet(this.vars.cadastro?.id!).subscribe(x => {
    //        this.pastasParameters = {
    //            id: x.obj!,
    //        }
    //    })
    // }

    // filesFolderChange(e: any) {
    //     this.getPastaProperties(e);
    // }

    getPastasArquivos(pastaId: number) {
        var cadastroId = this.vars.cadastro?.id!;
        var userId = this.vars.user?.id;

        this.pastasParameters = {
            cadastroId: cadastroId,
            pastaId: pastaId,
            //id: pastaId,
            userId: userId,
            rootId: this.pastaRootId,
        };

        //this.filesParameters = { cadastroId: cadastroId };

        //this.getPastaProperties(pastaId);
    }

    // getPastaProperties(pastaId: number) {
    //     this.gedService.pastaPropertiesGet(pastaId, this.pastaRootId!).subscribe((x) => {
    //         if (x.obj) {
    //             this.subTitle = x.obj.nome;
    //         }
    //     });
    // }

    // planoContasClick(e: any) {
    //     this.filesParameters = { cadastroId: this.filesParameters.cadastroId, pastaId: e };
    // }

    titleOnChange(e: string) {
        this.subTitle = e;
    }

    clienteChangeClick() {
        const modal = this.modalService.create({
            nzContent: ClienteFolderSelectModalComponent,
            nzWidth: 460,
            nzClosable: false,
            nzFooter: null,
        });

        modal.afterClose.subscribe((r) => {
            if (r) {
                this.clienteChanged(r);
            }
        });
    }

    clienteChanged(pasta: PastaOuArquivoPageItem) {
        console.log(pasta);
    }

    // pastaClick(e: any) {
    //     this.filesParameters = { cadastroId: this.filesParameters.cadastroId, pastaId: e };
    // }
}
