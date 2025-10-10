import { Component, Injector, Input } from '@angular/core';
import { PagingBase } from '../../../models';
import { ArquivoPageItem } from '../../models/pagings';
import { ArquivosParameter } from '../../models/parameters';
import { ArquivosByFuncionarioIdService } from '../../services/pagings/arquivosByFuncionarioId.service';
import { FileItemComponent } from '../file-item/file-item';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'funcionario-files-table',
    standalone: true,
    imports: [CommonModule, InfiniteScrollDirective, FileItemComponent],
    templateUrl: './funcionario-files-table.html'
})
export class FuncionarioFilesTableComponent extends PagingBase<ArquivoPageItem> {

    private _parameters?: ArquivosParameter
    @Input() get parameters() {
        return this._parameters
    }
    set parameters(value: ArquivosParameter | undefined) {
        if (value == undefined) return

        this._parameters = value

        this.param.routeStrings = []
        this.param.routeStrings.push(value.funcionarioId!.toString())

        this.param.q = value?.searchText
        this.refresh()
    }

    constructor(
        injector: Injector,
        arquivosByFuncionarioIdService: ArquivosByFuncionarioIdService
    ) {
        super(
            injector,
            arquivosByFuncionarioIdService
        )
    }

    //    fileClick(item: ArquivoPageItem) {
    //        this.gedService.arquivoDownload(item.id!).subscribe(y => saveAs(y, item.nome))
    //    }
}
