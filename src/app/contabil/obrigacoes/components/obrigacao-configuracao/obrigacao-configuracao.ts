import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { CardComponent } from 'src/app/shared/controls/card/card.component';
import { LabelTextComponent } from 'src/app/shared/controls/label-text/label-text';
import { PastasParameter } from '../../../../shared/ged/models/parameters';
import { Vars } from '../../../../shared/variables';
import { ObrigacaoView } from '../../../models/obrigacoes/views';
import { ObrigacaoConfiguracaoModalComponent } from '../obrigacao-configuracao-modal/obrigacao-configuracao-modal';

@Component({
    selector: 'obrigacao-configuracao',
    templateUrl: './obrigacao-configuracao.html',
    imports: [FormsModule, ReactiveFormsModule, CardComponent, ButtonDefaultComponent, LabelTextComponent],
})
export class ObrigacaoConfiguracaoComponent {
    pastasParameters: PastasParameter;

    firstFormGroup: FormGroup;

    private _obrigacao: ObrigacaoView | undefined;
    @Input() get obrigacao() {
        return this._obrigacao;
    }
    set obrigacao(value: ObrigacaoView | undefined) {
        this._obrigacao = value;
    }

    constructor(
        private vars: Vars,
        private modalService: NzModalService,
    ) {}
    ngOnInit(): void {
        this.pastasParameters = {
            cadastroId: this.vars.cadastro?.id,
        };
    }

    editModal() {
        const modal = this.modalService.create({
            nzContent: ObrigacaoConfiguracaoModalComponent,
            nzWidth: 460,
            nzClosable: false,
            nzFooter: null,

            nzData: {
                obrigacao: this.obrigacao,
            },
        });

        // modal.afterClose.subscribe((r) => this.getData(r));
    }
}
