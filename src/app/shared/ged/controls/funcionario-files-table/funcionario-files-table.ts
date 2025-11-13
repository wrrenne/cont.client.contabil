import { CommonModule } from '@angular/common';
import { Component, Injector, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { FileServerImageComponent } from 'src/app/shared/controls/file-server-image/file-server-image';
import { PagingBase } from '../../../models';
import { FormatBytesPipe } from '../../../pipes/formatBytes.pipe';
import { ArquivoPageItem } from '../../models/pagings';
import { ArquivosParameter } from '../../models/parameters';
import { ArquivosByFuncionarioIdService } from '../../services/pagings/arquivosByFuncionarioId.service';
import { GedFileViewerModalComponent } from '../ged-file-viewer-modal/ged-file-viewer-modal';

@Component({
    selector: 'funcionario-files-table',
    standalone: true,
    imports: [CommonModule, InfiniteScrollDirective, FileServerImageComponent, FormatBytesPipe],
    providers: [NzModalService],
    templateUrl: './funcionario-files-table.html',
})
export class FuncionarioFilesTableComponent extends PagingBase<ArquivoPageItem> {
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

    constructor(
        injector: Injector,
        arquivosByFuncionarioIdService: ArquivosByFuncionarioIdService,
        private modalService: NzModalService,
    ) {
        super(injector, arquivosByFuncionarioIdService);
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

    //    fileClick(item: ArquivoPageItem) {
    //        this.gedService.arquivoDownload(item.id!).subscribe(y => saveAs(y, item.nome))
    //    }
}
