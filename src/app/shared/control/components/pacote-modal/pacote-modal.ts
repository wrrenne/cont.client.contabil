import { Component, Inject, Injector, OnInit } from '@angular/core';
import { ModalBaseComponent } from '../../../../shared/controls/modal-base/modal-base';
import { SistemaTipo } from '../../../models';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

export interface PacoteModalData {
    sistemaId: SistemaTipo
}

@Component({
    selector: 'pacote-modal',
    standalone: true,
    templateUrl: './pacote-modal.html'
})
export class PacoteModalComponent extends ModalBaseComponent implements OnInit {

    sistemaId: SistemaTipo

    constructor(
        injector: Injector,
        @Inject(NZ_MODAL_DATA) data: PacoteModalData,
    ) {
        super(injector)

        this.sistemaId = data.sistemaId
    }

    ngOnInit() {
    }
}
