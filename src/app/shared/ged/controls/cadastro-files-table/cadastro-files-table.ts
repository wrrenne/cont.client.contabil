import { CommonModule } from '@angular/common';
import { Component, Injector, Input } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { PagingBase } from '../../../models';
import { ArquivoPageItem } from '../../models/pagings';
import { ArquivosParameter } from '../../models/parameters';
import { ArquivosByCadastroIdService } from '../../services/pagings/arquivosByCadastroId.service';
import { FileItemComponent } from '../file-item/file-item';

@Component({
    selector: 'cadastro-files-table',
    standalone: true,
    imports: [CommonModule, InfiniteScrollDirective, FileItemComponent],
    templateUrl: './cadastro-files-table.html',
})
export class CadastroFilesTableComponent extends PagingBase<ArquivoPageItem> {
    private _parameters?: ArquivosParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: ArquivosParameter | undefined) {
        if (value == undefined) return;

        this._parameters = value;

        this.param.routeStrings = [];
        this.param.routeStrings.push(value.funcionarioId!.toString());

        this.param.q = value?.searchText;
        this.refresh();
    }

    constructor(injector: Injector, arquivosByFuncionarioIdService: ArquivosByCadastroIdService) {
        super(injector, arquivosByFuncionarioIdService);
    }

    //    fileClick(item: ArquivoPageItem) {
    //        this.gedService.arquivoDownload(item.id!).subscribe(y => saveAs(y, item.nome))
    //    }
}
