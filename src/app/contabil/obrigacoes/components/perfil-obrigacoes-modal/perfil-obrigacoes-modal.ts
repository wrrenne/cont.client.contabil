import { Component, Inject, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ObrigacoesParameter } from 'src/app/contabil/models/obrigacoes/parameters';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { PerfisService } from '../../services/perfis.service';
import { ObrigacoesTableComponent } from '../obrigacoes-table/obrigacoes-table';

export interface PerfilObrigacoesModalData {
    perfilItemId?: number;
}

@Component({
    selector: 'perfil-obrigacoes-modal',
    templateUrl: './perfil-obrigacoes-modal.html',
    imports: [FormsModule, ReactiveFormsModule, ModalBaseComponent, ObrigacoesTableComponent],
})
export class PerfilObrigacoesModalComponent extends ModalBaseComponent {
    obrigacoesParameter: ObrigacoesParameter;

    perfilItemId?: number;

    constructor(injector: Injector, perfisService: PerfisService, @Inject(NZ_MODAL_DATA) data: PerfilObrigacoesModalData) {
        super(injector);
        perfisService.perfilItemGet(data.perfilItemId!).subscribe((x) => {
            this.title = x.obj.descricao;
            this.obrigacoesParameter = { perfilItemId: data.perfilItemId };
        });
    }
}
