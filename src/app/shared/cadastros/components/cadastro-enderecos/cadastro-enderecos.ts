import { Component, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CardComponent } from 'src/app/shared/controls/card/card.component';
import { EnderecoView } from '../../../../shared/cadastros/models/views';
import { CadastrosService } from '../../services/cadastros.service';
import { CadastroEnderecoModalComponent } from '../cadastro-endereco-modal/cadastro-endereco-modal';
import { CadastroEnderecoComponent } from '../cadastro-endereco/cadastro-endereco';

@Component({
    selector: 'cadastro-enderecos',
    providers: [NzModalService],
    templateUrl: './cadastro-enderecos.html',
    standalone: true,
    imports: [CardComponent, CadastroEnderecoComponent],
})
export class CadastroEnderecosComponent {
    @Input() cadastroNome: string;
    @Input() cadastroId: number;

    constructor(
        private modalService: NzModalService,
        private cadastrosService: CadastrosService,
    ) {}

    @Input() enderecos: EnderecoView[];

    enderecoNovoModal(id?: number) {
        const modal = this.modalService.create({
            nzContent: CadastroEnderecoModalComponent,
            nzWidth: 460,
            nzClosable: false,
            nzFooter: null,

            nzData: {
                id: id,
                cadastroNome: this.cadastroNome,
                cadastroId: this.cadastroId,
            },
        });

        modal.afterClose.subscribe((r) => this.getData(r));
    }

    getData(id: number) {
        this.cadastrosService.enderecoGet(id).subscribe((x) => {
            const i = this.enderecos.findIndex((e) => e.id == id);

            if (i > -1) {
                this.enderecos[i] = x.obj;
            } else {
                this.enderecos.push(x.obj);
            }
        });
    }

    enderecoUpdate(e: any) {
        this.getData(<number>e);
    }
}
