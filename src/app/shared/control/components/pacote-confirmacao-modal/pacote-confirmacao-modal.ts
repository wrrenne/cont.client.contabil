import { Component, Inject, Injector } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ModalBaseComponent } from '../../../controls/modal-base/modal-base';
import { PacoteView } from '../../models/planos/views/pacoteView';
import { PlanosService } from '../../services/planos.service';
import { PacoteCardComponent } from '../pacote-card/pacote-card';

export interface PacoteConfirmacaoModalData {
    pacoteId: number;
}

@Component({
    selector: 'pacote-confirmacao-modal',
    standalone: true,
    templateUrl: './pacote-confirmacao-modal.html',
    imports: [ModalBaseComponent, PacoteCardComponent],
})
export class PacoteConfirmacaoModalComponent extends ModalBaseComponent {
    pacote: PacoteView;

    constructor(
        injector: Injector,
        private planosService: PlanosService,
        @Inject(NZ_MODAL_DATA) data: PacoteConfirmacaoModalData,
    ) {
        super(injector);

        this.loading = true;

        this.planosService.pacoteGet(data.pacoteId).subscribe((x) => {
            this.loading = false;
            this.pacote = x.obj;
        });
    }

    pacoteSelected(e: any) {
        this.closeModal(e);
    }
}
