import { Component, Inject, Injector, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { InputExComponent } from 'src/app/shared/controls/input-ex/input-ex';
import { InputTextAreaExComponent } from 'src/app/shared/controls/input-textarea-ex/input-textarea-ex';
import { ModalBaseComponent } from '../../../../shared/controls/modal-base/modal-base';
import { EncryptionService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';
import { ObrigacaoInput } from '../../../models/obrigacoes/inputs';
import { ObrigacaoView } from '../../../models/obrigacoes/views';
import { ObrigacoesService } from '../../services/obrigacoes.service';

@Component({
    selector: 'obrigacao-dados-modal',
    templateUrl: './obrigacao-dados-modal.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, ModalBaseComponent, InputExComponent, InputTextAreaExComponent, ButtonDefaultComponent],
})
export class ObrigacaoDadosModalComponent extends ModalBaseComponent {
    firstFormGroup: FormGroup;

    obrigacao: ObrigacaoView;

    private _obrigacaoId: number | undefined;
    @Input() get obrigacaoId() {
        return this._obrigacaoId;
    }
    set obrigacaoId(value: number | undefined) {
        if (!value) return;

        this._obrigacaoId = value;
        this.getData(<number>value);
    }

    constructor(
        injector: Injector,
        private router: Router,
        private formBuilder: FormBuilder,
        private obrigacoesService: ObrigacoesService,
        private encryptionService: EncryptionService,
        private vars: Vars,
        @Inject(NZ_MODAL_DATA) data: any,
    ) {
        super(injector);
        this.obrigacaoId = data.id;
    }

    createForm(obrigacao: ObrigacaoView) {
        this.firstFormGroup = this.formBuilder.group({
            descricao: [obrigacao.descricao, Validators.required],
            comentario: [],
        });
    }

    submitFirstFormGroup() {
        var input: ObrigacaoInput = {
            id: this.obrigacao?.id,
            cadastroId: this.vars.cadastro?.id,
            descricao: this.firstFormGroup.get('descricao')?.value,
            comentario: this.firstFormGroup.get('comentario')?.value,
            userId: this.vars.user?.id!,
        };

        this.obrigacoesService.obrigacaoCreateOrUpdate(input).subscribe((x) => {
            if (x.errorMessage == null) {
                this.firstFormGroup.markAsPristine();
                this.firstFormGroup.markAsUntouched();
                this.firstFormGroup.updateValueAndValidity();

                this.createNotificationSucesso();
                this.closeModal(x.obj[0]);
            }
        });
    }

    getData(id: number) {
        this.obrigacoesService.obrigacaoGet(id).subscribe((x) => {
            this.obrigacao = x.obj;
            this.title = this.obrigacao.descricao;
            this.createForm(this.obrigacao);
        });
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
        //    return this.encryptionService.set(id)
    }
}
