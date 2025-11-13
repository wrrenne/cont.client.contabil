import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FileServerImageComponent } from 'src/app/shared/controls/file-server-image/file-server-image';
import { PagingBase } from '../../../models';
import { Vars } from '../../../variables';
import { PastaPageItem } from '../../models/pagings';
import { PastasParameter } from '../../models/parameters';
import { PastasPagingService } from '../../services/pagings/pastas.service';

@Component({
    selector: 'folders-block-table',
    standalone: true,
    templateUrl: './folders-block-table.html',
    imports: [FileServerImageComponent],
})
export class FoldersBlockTableComponent extends PagingBase<PastaPageItem> {
    @Input() codigoAsId = true;
    @Output() onPastaClick = new EventEmitter<number>();

    private _parameters?: PastasParameter;
    @Input() get parameters() {
        return this._parameters;
    }
    set parameters(value: PastasParameter | undefined) {
        if (value == undefined) return;

        this._parameters = value;

        const userId = this.vars.user?.id!;
        const pastaId = value.pastaId ?? value.rootId!;
        this.param.routeStrings = [];
        this.param.routeStrings.push(pastaId.toString());
        this.param.routeStrings.push(userId.toString());

        this.param.q = value?.searchText;
        this.refresh();
    }

    constructor(
        injector: Injector,
        pastasPagingService: PastasPagingService,
        private vars: Vars,
    ) {
        super(injector, pastasPagingService);
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
}
