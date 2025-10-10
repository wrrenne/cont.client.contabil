import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CardComponent } from 'src/app/shared/controls/card/card.component';
import { InputExComponent } from 'src/app/shared/controls/input-ex/input-ex';
import { PerfilItemInput } from '../../../models/obrigacoes/inputs';
import { PerfilItemView } from '../../../models/obrigacoes/views';
import { PerfisService } from '../../services/perfis.service';

@Component({
    selector: 'perfil-dados',
    templateUrl: './perfil-dados.html',
    imports: [FormsModule, ReactiveFormsModule, CardComponent, InputExComponent, NgIcon],
})
export class PerfilsDadosComponent {
    firstFormGroup: FormGroup;

    private _perfilItem: PerfilItemView | undefined;
    @Input() get perfilItem() {
        return this._perfilItem;
    }
    set perfilItem(value: PerfilItemView | undefined) {
        this._perfilItem = value;
        this.getData(value!);
    }

    constructor(
        private perfisService: PerfisService,
        private formBuilder: FormBuilder,
        private notification: NzNotificationService,
    ) {}

    //ngOnInit(): void {
    //    const urlParametrs = combineLatest([this.route.params,
    //        this.route.queryParams], (params, queryParams) => ({
    //            ...params, ...queryParams
    //        }));

    //    urlParametrs.subscribe(r => {
    //        const id: number = this.encryptionService.get(r['id'])

    //        this.getData(id)
    //        //this.parameters = { perfilItemId: r['pi'], searchText: r['q'] }
    //    });
    //}

    getData(perfilItem: PerfilItemView) {
        this.createFirstForm(perfilItem);
    }

    createFirstForm(obrigacao: PerfilItemView) {
        this.firstFormGroup = this.formBuilder.group({
            descricao: [obrigacao.descricao, Validators.required],
        });
    }

    submitFirstFormGroup() {
        var input: PerfilItemInput = {
            id: this.perfilItem?.id,
            descricao: this.firstFormGroup.get('descricao')?.value,
        };

        this.perfisService.perfilItemCreateOrUpdate(input).subscribe((x) => {
            if (x.errorMessage == null) {
                this.firstFormGroup.markAsPristine();
                this.firstFormGroup.markAsUntouched();
                this.firstFormGroup.updateValueAndValidity();

                this.createNotification();
            }
        });
    }

    createNotification(): void {
        this.notification.create('success', 'Perfil', 'Perfil atualizado com sucesso');
    }
}
