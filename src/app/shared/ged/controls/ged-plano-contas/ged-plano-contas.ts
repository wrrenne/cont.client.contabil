
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { toggleAnimation } from '../../../animations';
import { LabelIconComponent } from '../../../controls/label-icon/label-icon';
import { PagingBase } from '../../../models';
import { TFileType } from '../../enums/ged-enums';
import { PastaPageItem } from '../../models/pagings';
import { PastasParameter } from '../../models/parameters';
import { GedService } from '../../services/ged.service';
import { GedUtilsService } from '../../services/gedUtils.service';
import { PlanoContasPagingService } from '../../services/pagings/planoContas.service';

@Component({
    selector: 'ged-plano-contas',
    templateUrl: './ged-plano-contas.html',
    standalone: true,
    imports: [InfiniteScrollDirective, LabelIconComponent],
    animations: [toggleAnimation]
})
export class GedPlanoContasComponent extends PagingBase<PastaPageItem> implements OnInit {

    //@Input() showFoldersIcon = true
    @Input() showCodigo = false
    @Output() onClick = new EventEmitter<number>()

    TFileType = TFileType

    selectedId?: number

    private _parameters?: PastasParameter
    @Input() get parameters() {
        return this._parameters
    }
    set parameters(value: PastasParameter | undefined) {

        if (value == null) return

        this._parameters = value

        this.param.routeStrings = []

        if (value.cadastroId)
            this.param.routeStrings.push(value.cadastroId.toString())

        if (value.userId)
            this.param.routeStrings.push(value.userId.toString())

        this.param.queryStrings.clear()
        this.param.queryStrings.set("maxNivel", 2)

        if (value.rootId)
            this.param.queryStrings.set("rootId", value.rootId)

        if (value.id)
            this.param.queryStrings.set("pastaId", value.id)

        this.param.q = value.searchText

        this.refresh()
    }

    constructor(
        injector: Injector,
        planoContasPagingService: PlanoContasPagingService,
        private gedService: GedService,
        public gedUtilsService: GedUtilsService
    ) {
        super(
            injector,
            planoContasPagingService
        )
    }

    pastaClick(id: number, nivel: number) {
        this.selectedId = id

        if (nivel >= 2) {
            this.gedService.planoContasPagingGet(this.parameters?.cadastroId!, id).subscribe(x => {
                var indexId = this.getIndexById(id)

                if (indexId) {
                    this.datas.splice(indexId + 1, 0, ...x.obj.list);
                }
            })
        }

        this.onClick.emit(id)
    }
}
