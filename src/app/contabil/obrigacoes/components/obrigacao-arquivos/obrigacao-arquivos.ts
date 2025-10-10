import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PastasParameter } from '../../../../shared/ged/models/parameters';
import { Vars } from '../../../../shared/variables';
import { ObrigacaoInput } from '../../../models/obrigacoes/inputs';
import { ObrigacaoView } from '../../../models/obrigacoes/views';
import { ObrigacoesService } from '../../services/obrigacoes.service';

@Component({
    selector: 'obrigacao-arquivos',
    templateUrl: './obrigacao-arquivos.html'
})
export class ObrigacaoArquivosComponent implements OnInit {

    pastasParameters: PastasParameter

    firstFormGroup: FormGroup

    private _obrigacao: ObrigacaoView | undefined
    @Input() get obrigacao() {
        return this._obrigacao
    }
    set obrigacao(value: ObrigacaoView | undefined) {
        this._obrigacao = value
        this.getData(value!)
    }

    constructor(
        private obrigacoesService: ObrigacoesService,
        private formBuilder: FormBuilder,
        private notification: NzNotificationService,
        private vars: Vars
    ) {
    }
    ngOnInit(): void {
        this.pastasParameters = {
            cadastroId: this.vars.cadastro?.id
        }
    }

    getData(obrigacao: ObrigacaoView) {
        this.createFirstForm(obrigacao)
        this.firstFormGroup.get('gedPastaCodigo')?.updateValueAndValidity();
    }

    createFirstForm(obrigacao: ObrigacaoView) {
        this.firstFormGroup = this.formBuilder.group({
            gedPastaCodigo: [obrigacao.gedPastaCodigo],
        });
    }

    submitFirstFormGroup() {
        var input: ObrigacaoInput =
        {
            id: this.obrigacao?.id,
            gedPastaCodigo: this.firstFormGroup.get('gedPastaCodigo')?.value,
            userId: this.vars.user?.id!,
            comentario: ''
            //comentario: this.firstFormGroup.get('comentario')?.value
        }

        this.obrigacoesService.obrigacaoCreateOrUpdate(input).subscribe(x => {
            if (x.errorMessage == null) {
                this.firstFormGroup.markAsPristine();
                this.firstFormGroup.markAsUntouched();
                this.firstFormGroup.updateValueAndValidity();

                this.createNotification()
            }
        })
    }

    createNotification(): void {
        this.notification.create(
            'success',
            'Obrigação',
            'Dados atualizados com sucesso'
        );
    }
}
