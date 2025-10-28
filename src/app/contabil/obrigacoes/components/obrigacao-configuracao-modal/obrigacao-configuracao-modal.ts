import { Component, Inject, Injector } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { FolderSelectComponent } from 'src/app/shared/ged/controls/folder-select/folder-select';
import { PastasParameter } from '../../../../shared/ged/models/parameters';
import { Vars } from '../../../../shared/variables';
import { ObrigacaoInput } from '../../../models/obrigacoes/inputs';
import { ObrigacaoView } from '../../../models/obrigacoes/views';
import { ObrigacoesService } from '../../services/obrigacoes.service';

@Component({
    selector: 'obrigacao-configuracao-modal',
    templateUrl: './obrigacao-configuracao-modal.html',
    imports: [FormsModule, ReactiveFormsModule, FolderSelectComponent, ButtonDefaultComponent, ModalBaseComponent],
})
export class ObrigacaoConfiguracaoModalComponent extends ModalBaseComponent {
    pastasParameters: PastasParameter;

    firstFormGroup: FormGroup;

    obrigacao: ObrigacaoView;

    // private _obrigacao: ObrigacaoView | undefined;
    // @Input() get obrigacao() {
    //     return this._obrigacao;
    // }
    // set obrigacao(value: ObrigacaoView | undefined) {
    //     this._obrigacao = value;
    //     this.getData(value!);
    // }

    constructor(
        private obrigacoesService: ObrigacoesService,
        private formBuilder: FormBuilder,
        private vars: Vars,
        injector: Injector,
        @Inject(NZ_MODAL_DATA) data: any,
    ) {
        super(injector);
        this.obrigacao = data.obrigacao;
        this.getData(this.obrigacao);
        this.title = this.obrigacao.descricao;
        this.subTitle = 'Configuração';
    }

    ngOnInit(): void {
        this.pastasParameters = {
            cadastroId: this.vars.cadastro?.id,
        };
    }

    getData(obrigacao: ObrigacaoView) {
        this.createFirstForm(obrigacao);
        this.firstFormGroup.get('gedPastaCodigo')?.updateValueAndValidity();
    }

    createFirstForm(obrigacao: ObrigacaoView) {
        this.firstFormGroup = this.formBuilder.group({
            gedPastaCodigo: [obrigacao.gedPastaCodigo],
        });
    }

    submitFirstFormGroup() {
        var input: ObrigacaoInput = {
            id: this.obrigacao?.id,
            gedPastaCodigo: this.firstFormGroup.get('gedPastaCodigo')?.value,
            userId: this.vars.user?.id!,
            comentario: '',
            //comentario: this.firstFormGroup.get('comentario')?.value
        };

        this.obrigacoesService.obrigacaoCreateOrUpdate(input).subscribe((x) => {
            if (x.errorMessage == null) {
                this.firstFormGroup.markAsPristine();
                this.firstFormGroup.markAsUntouched();
                this.firstFormGroup.updateValueAndValidity();

                this.createNotification();
            }
        });
    }

    createNotification(): void {
        this.notification.create('success', 'Obrigação', 'Dados atualizados com sucesso');
    }
}
