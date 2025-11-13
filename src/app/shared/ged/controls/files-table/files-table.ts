import { CommonModule } from '@angular/common';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { environment } from '../../../../../environments/environment';
import { PagingBase } from '../../../../shared/models';
import { TFileType } from '../../enums/ged-enums';
import { ArquivoPageItem } from '../../models/pagings';
import { PastaView } from '../../models/views';
import { ArquivosPagingService } from '../../services/pagings/arquivos.service';
import { GedFileAvatarViewerComponent } from '../ged-file-avatar-viewer/ged-file-avatar-viewer';

export class FilesParameter {
    pastaId?: number;
    cadastroId?: number;
    funcionarioId?: number;
    searchText?: string;
    userId?: number;
}

@Component({
    selector: 'files-table',
    standalone: true,
    templateUrl: './files-table.html',
    imports: [CommonModule, InfiniteScrollDirective, GedFileAvatarViewerComponent],
    host: { class: 'w-full' },
})
export class FilesTableComponent extends PagingBase<ArquivoPageItem> implements OnInit {
    @Input() showTitle = true;

    TFileType = TFileType;

    pasta?: PastaView;

    private _parameters?: FilesParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: FilesParameter | undefined) {
        if (!value) return;
        //if (this.showTitle && value.pastaId)
        //    this.getPastaProperties(value.pastaId!, value.rootId!)

        this._parameters = value;

        this.param.routeStrings = [];
        this.param.routeStrings.push(value?.cadastroId!.toString());

        this.param.queryStrings.clear();

        if (value.pastaId) this.param.queryStrings.set('pastaId', value.pastaId);

        this.param.q = value?.searchText;

        this.refresh();
    }

    constructor(injector: Injector, arquivosPagingService: ArquivosPagingService) {
        super(injector, arquivosPagingService);
    }

    //getPastaProperties(pastaId: number, pastaRootId?: number) {
    //    this.gedService.pastaPropertiesGet(pastaId, pastaRootId).subscribe(x => {
    //        if (x.obj) {
    //            this.pasta = x.obj
    //        }
    //    })
    //}

    //fileClick(item: ArquivoPageItem) {
    //    this.gedService.arquivoDownload(item.id!).subscribe(y => saveAs(y, item.nome))
    //}

    getDebug(id: number): string | undefined {
        return environment.debug ? id.toString() : undefined;
    }
}
