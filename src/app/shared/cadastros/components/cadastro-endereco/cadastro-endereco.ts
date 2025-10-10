import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { EnderecoView } from '../../../../shared/cadastros/models/views';
import { CadastroEnderecoModalComponent } from '../cadastro-endereco-modal/cadastro-endereco-modal';


@Component({
    selector: 'cadastro-endereco',
    standalone: true,
    imports: [NzModalModule],
    providers: [NzModalService],
    templateUrl: './cadastro-endereco.html'
})
export class CadastroEnderecoComponent {

    @Output() onUpdate = new EventEmitter<number>()

    @Input() endereco: EnderecoView
    @Input() cadastroNome: string
    @Input() cadastroId: number

    constructor(private modalService: NzModalService) {

    }

    editModal(id?: number) {
        const modal = this.modalService.create({
            nzContent: CadastroEnderecoModalComponent,
            nzWidth: 460,
            nzClosable: false,
            nzFooter: null,

            nzData: {
                id: id,
                cadastroNome: this.cadastroNome,
                cadastroId: this.cadastroId
            }
        })

        modal.afterClose.subscribe(r => this.onUpdate.emit(r))
    }
}
