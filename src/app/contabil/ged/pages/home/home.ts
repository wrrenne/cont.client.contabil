import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { VarsApp } from 'src/app/contabil/variables';
import { FoldersTableComponent } from 'src/app/shared/ged/controls/folders-table/folders-table';
import { PageTitleComponent } from '../../../../shared/controls/page-title/page-title';
import { PastasParameter } from '../../../../shared/ged/models/parameters';
import { GedService } from '../../../../shared/ged/services/ged.service';
import { EncryptionService } from '../../../../shared/services';

@Component({
    selector: 'ged-home',
    templateUrl: './home.html',
    standalone: true,
    imports: [PageTitleComponent, FoldersTableComponent],
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
                this.gedService.pastaIdGet(this.pastaRoot).subscribe((x) => {
                    if (x.obj) {
                        this.pastaRootId = x.obj;
                        this.getPastasArquivos(id ?? x.obj!);
                    }
                });
            } else {
                this.gedService.pastaCadastroIdGet(this.vars.cadastro?.id!).subscribe((x) => {
                    if (x.obj) {
                        this.pastaRootId = x.obj;
                        console.log(this.pastaRootId);
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

    // pastaClick(e: any) {
    //     this.filesParameters = { cadastroId: this.filesParameters.cadastroId, pastaId: e };
    // }
}
