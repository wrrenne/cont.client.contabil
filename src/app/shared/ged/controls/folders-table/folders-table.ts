import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';
import { FileServerImageComponent } from 'src/app/shared/controls/file-server-image/file-server-image';
import { SearchService } from 'src/app/shared/services';
import { environment } from 'src/environments/environment';
import { PagingBase } from '../../../models';
import { FormatBytesPipe } from '../../../pipes/formatBytes.pipe';
import { Vars } from '../../../variables';
import { ArquivoPageItem, PastaOuArquivoPageItem, PastaPageItem } from '../../models/pagings';
import { PastasParameter } from '../../models/parameters';
import { PastasOuArquivosPagingService } from '../../services/pagings/pastasOuArquivos.service';
import { GedFileViewerModalComponent } from '../ged-file-viewer-modal/ged-file-viewer-modal';

@Component({
    selector: 'folders-table',
    standalone: true,
    templateUrl: './folders-table.html',
    providers: [NzModalService],
    imports: [FormsModule, CommonModule, InfiniteScrollDirective, FileServerImageComponent, FormatBytesPipe, DatePipe],
})
export class FoldersTableComponent extends PagingBase<PastaOuArquivoPageItem> {
    searchSubscription: Subscription;

    cadastroId!: number;
    cadastroNome: string;

    @Input() codigoAsId = true;
    @Output() onPastaClick = new EventEmitter<number>();

    private _parameters?: PastasParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: PastasParameter | undefined) {
        if (value == undefined) return;

        this._parameters = value;

        const pastaId = value.pastaId ?? value.rootId!;
        this.param.routeStrings = [];

        this.param.queryStrings.clear();

        if (value.rootId != undefined) {
            this.param.queryStrings.set('rootId', value.rootId);
        }
        if (value.pastaId != undefined) {
            this.param.queryStrings.set('pastaId', value.pastaId);
        }

        this.param.q = value?.searchText;
        this.refresh();
    }

    constructor(
        injector: Injector,
        pastasOuArquivosPagingService: PastasOuArquivosPagingService,
        private vars: Vars,
        private modalService: NzModalService,
        private searchService: SearchService,
    ) {
        super(injector, pastasOuArquivosPagingService);

        this.convertDatesObjects = true;

        this.vars.search = { showSearchBox: false };

        this.searchSubscription = this.searchService.onMessage().subscribe((x) => {
            var p = this.parameters;
            p!.searchText = x;
            p!.pastaId = undefined;
            p!.rootId = undefined;
            this.parameters = p;
        });
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
        this.vars.search = null;
        if (this.searchSubscription) this.searchSubscription.unsubscribe();
    }

    compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1 === o2 : o1 === o2);

    pastaClick(pasta: PastaPageItem) {
        this.onPastaClick.emit(pasta.id);

        var par = this.parameters;

        par!.pastaId = pasta.id;

        this.parameters = par;
    }

    fileOpen(item: ArquivoPageItem) {
        const modal = this.modalService.create({
            nzContent: GedFileViewerModalComponent,
            nzClosable: false,

            nzFooter: null,
            nzWidth: 'auto',
            nzStyle: { display: 'table' },
            nzData: {
                fileId: item.id,
                extension: item.extensao,
            },
        });
    }

    get isDebug(): boolean {
        return environment.debug;
    }
}
