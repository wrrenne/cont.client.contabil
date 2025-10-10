import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { PagingBase } from '../../../models';
import { PastaPageItem } from '../../models/pagings';
import { PastasParameter } from '../../models/parameters';
import { PastasByFuncionarioIdService } from '../../services/pagings/pastasByFuncionarioId.service';
import { FileItemComponent } from '../file-item/file-item';

@Component({
    selector: 'funcionario-folders-table',
    standalone: true,
    imports: [FileItemComponent],
    templateUrl: './funcionario-folders-table.html'
})
export class FuncionarioFoldersTableComponent extends PagingBase<PastaPageItem> {

    @Output() onFolderChange = new EventEmitter<number>()

    private _parameters?: PastasParameter
    @Input() get parameters() {
        return this._parameters
    }
    set parameters(value: PastasParameter | undefined) {
        if (value == undefined) return

        this._parameters = value

        this.param.routeStrings = []
        this.param.routeStrings.push(value.funcionarioId!.toString())

        this.param.q = value?.searchText
        this.refresh()
    }

    constructor(
        injector: Injector,
        pastasByFuncionarioIdService: PastasByFuncionarioIdService
    ) {
        super(
            injector,
            pastasByFuncionarioIdService
        )
    }

    fileClick(item: PastaPageItem) {
        this.onFolderChange.emit(item.id)
    }
}
