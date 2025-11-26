import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { FileServerImageComponent } from 'src/app/shared/controls/file-server-image/file-server-image';
import { PagingBase } from '../../../models';
import { Vars } from '../../../variables';
import { PastaOuArquivoPageItem } from '../../models/pagings';
import { PastasParameter } from '../../models/parameters';
import { PastasOuArquivosPagingService } from '../../services/pagings/pastasOuArquivos.service';

@Component({
    selector: 'clientes-folder-table',
    templateUrl: './clientes-folder-table.html',
    standalone: true,
    imports: [CommonModule, InfiniteScrollDirective, FileServerImageComponent],
})
export class ClientesFolderTableComponent extends PagingBase<PastaOuArquivoPageItem> implements OnInit {
    @Output() onClick = new EventEmitter<PastaOuArquivoPageItem>();

    private _parameters?: PastasParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: PastasParameter | undefined) {
        this._parameters = value;

        this.param.routeStrings = [];

        this.param.queryStrings.clear();

        // if (value?.userId != undefined) {
        //     this.param.queryStrings.set('userId', value.userId);
        // }

        this.param.q = value?.searchText;

        this.refresh();
    }

    constructor(
        injector: Injector,
        pastasOuArquivosPagingService: PastasOuArquivosPagingService,
        private vars: Vars,
    ) {
        super(injector, pastasOuArquivosPagingService);

        this.convertDatesObjects = true;
    }

    folderClick(e: any) {
        this.onClick.emit(e);
    }
}
