import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import saveAs from 'file-saver';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PagingBase } from '../../../../shared/models';
import { TFileType } from '../../enums/ged-enums';
import { PastaOuArquivoPageItem } from '../../models/pagings';
import { PastasParameter } from '../../models/parameters';
import { PastaView } from '../../models/views';
import { GedService } from '../../services/ged.service';
import { PastasOuArquivosPagingService } from '../../services/pagings/pastasOuArquivos.service';
import { FileItemComponent } from '../file-item/file-item';


@Component({
    selector: 'files-or-folders-table',
    standalone: true,
    imports: [FileItemComponent],
    templateUrl: './files-or-folders-table.html'
})
export class FilesOrFoldersTableComponent extends PagingBase<PastaOuArquivoPageItem> implements OnInit {

    private subscription!: Subscription;

    @Input() link: string
    @Input() showTitle = true
    @Input() showTopFolder = true

    TFileType = TFileType

    @Output() onFolderChange = new EventEmitter<number>()

    topFolders?: PastaOuArquivoPageItem[]
    folders: PastaOuArquivoPageItem[]

    pasta?: PastaView

    override ngOnInit() {
        super.ngOnInit()

        this.subscription = this.datasChanged$.subscribe(() => {
            this.topFolders = this.showTopFolder ? this.datas.filter(x => x.pasta?.topFolder == true) : undefined
            this.folders = this.datas.filter(x => x.pasta?.topFolder == false || x.arquivo)
        });

    }

    override ngOnDestroy(): void {
        super.ngOnDestroy()

        this.subscription.unsubscribe(); // Prevent memory leak
    }

    private _parameters?: PastasParameter
    @Input() get parameters() {
        return this._parameters
    }
    set parameters(value: PastasParameter | undefined) {

        if (value == null || value.id == null) return

        if (this.showTitle)
            this.getPastaProperties(value.id, value.rootId!)

        this._parameters = value

        this.param.routeStrings = []
        this.param.routeStrings.push(value.id.toString())

        this.param.queryStrings.clear()

        if (value.rootId)
            this.param.queryStrings.set('rootId', value.rootId)

        this.param.q = value?.searchText

        this.refresh()
    }

    constructor(
        injector: Injector,
        pastasOuArquivosPagingService: PastasOuArquivosPagingService,
        private gedService: GedService,
    ) {
        super(
            injector,
            pastasOuArquivosPagingService
        )
    }

    getPastaProperties(pastaId: number, pastaRootId?: number) {
        this.gedService.pastaPropertiesGet(pastaId, pastaRootId).subscribe(x => {
            if (x.obj) {
                this.pasta = x.obj
            }
        })
    }

    fileClick(item: PastaOuArquivoPageItem) {
        if (item.pasta) {
            this.onFolderChange.emit(item.id)

            this.parameters = {
                id: item.id,
                rootId: this.parameters?.rootId
            }
        }
        else {
            this.gedService.arquivoDownload(item.id!).subscribe(y => saveAs(y, item.arquivo.nome))
        }
    }

    getDebug(id: number): string | undefined {
        return environment.debug ? id.toString() : undefined
    }
}
