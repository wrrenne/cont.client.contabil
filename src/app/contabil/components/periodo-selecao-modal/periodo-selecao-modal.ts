import { Component, Inject, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ClientesService } from 'src/app/contabil/clientes/services/clientes.service';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';

export interface ClientePerfilObrigacoesModalData {
    clienteId: number;
    perfilItemId: number;
    perfilItemDescricao: string;
}

@Component({
    selector: 'periodo-selecao-modal',
    templateUrl: './periodo-selecao-modal.html',
    imports: [FormsModule, ReactiveFormsModule, ModalBaseComponent],
})
export class ClientePerfilObrigacoesModalComponent extends ModalBaseComponent {
    parameters: ObrigacoesParameter;

    constructor(injector: Injector, clientesService: ClientesService, @Inject(NZ_MODAL_DATA) data: ClientePerfilObrigacoesModalData) {
        super(injector);

        clientesService.clienteGet(data.clienteId).subscribe((x) => {
            this.title = x.obj.nome;
            this.subTitle = data.perfilItemDescricao;
            this.parameters = { clienteId: data.clienteId, perfilItemId: data.perfilItemId };
        });
    }
}
