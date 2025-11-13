import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { FileServerImageComponent } from 'src/app/shared/controls/file-server-image/file-server-image';
import { PagingBase } from '../../../models';
import { FormatBytesPipe } from '../../../pipes/formatBytes.pipe';
import { FormatSingularPluralPipe } from '../../../pipes/singular-plural.pipe';
import { Vars } from '../../../variables';
import { ArquivoPageItem, PastaOuArquivoPageItem } from '../../models/pagings';
import { PastasParameter } from '../../models/parameters';
import { PastasOuArquivosPagingService } from '../../services/pagings/pastasOuArquivos.service';
import { GedFileViewerModalComponent } from '../ged-file-viewer-modal/ged-file-viewer-modal';

@Component({
    selector: 'folders-table',
    standalone: true,
    templateUrl: './folders-table.html',
    providers: [NzModalService],
    imports: [CommonModule, InfiniteScrollDirective, FileServerImageComponent, FormatSingularPluralPipe, FormatBytesPipe, DatePipe],
})
export class FoldersTableComponent extends PagingBase<PastaOuArquivoPageItem> {
    @Input() codigoAsId = true;
    @Output() onPastaClick = new EventEmitter<number>();

    private _parameters?: PastasParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: PastasParameter | undefined) {
        if (value == undefined) return;

        this._parameters = value;

        //const userId = this.vars.user?.id!;
        const pastaId = value.pastaId ?? value.rootId!;
        this.param.routeStrings = [];
        this.param.routeStrings.push(pastaId.toString());
        //this.param.routeStrings.push(userId.toString());

        this.param.queryStrings.clear;

        if (value.rootId != null) this.param.queryStrings.set('rootId', value.rootId);

        this.param.q = value?.searchText;
        this.refresh();
    }

    constructor(
        injector: Injector,
        pastasOuArquivosPagingService: PastasOuArquivosPagingService,
        private vars: Vars,
        private modalService: NzModalService,
    ) {
        super(injector, pastasOuArquivosPagingService);
    }

    getColor(nivel: number): string {
        switch (nivel) {
            case 1:
                return 'text-blue-500';
            case 2:
                return 'text-yellow-500';
            default:
                return '';
        }
    }

    compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1 === o2 : o1 === o2);

    pastaClick(pastaId: number) {
        this.onPastaClick.emit(pastaId);

        var par = this.parameters;

        par!.pastaId = pastaId;

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
}
