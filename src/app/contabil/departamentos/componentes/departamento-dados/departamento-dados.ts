import { Component, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DepartamentoView } from 'src/app/contabil/models/contabil/views';
import { ButtonDefaultComponent } from 'src/app/shared/controls/button-default/button-default';
import { CardComponent } from 'src/app/shared/controls/card/card.component';
import { LabelTextComponent } from 'src/app/shared/controls/label-text/label-text';
import { DepartamentosService } from '../../services/departamentos.service';
import { DepartamentoDadosModalComponent } from '../departamento-dados-modal/departamento-dados-modal';

@Component({
    selector: 'departamento-dados',
    templateUrl: './departamento-dados.html',
    providers: [NzModalService],
    standalone: true,
    imports: [CardComponent, LabelTextComponent, ButtonDefaultComponent],
})
export class DepartamentoDadosComponent {
    departamento: DepartamentoView;

    private _id: number | undefined;
    @Input() get id() {
        return this._id;
    }
    set id(value: number | undefined) {
        this._id = value;
        this.getData(<number>value);
    }

    constructor(
        private departamentosService: DepartamentosService,
        private modalService: NzModalService,
    ) {}

    getData(id: number) {
        this.departamentosService.departamentoGet(id).subscribe((x) => {
            this.departamento = x.obj;
        });
    }

    editModal() {
        const modal = this.modalService.create({
            nzContent: DepartamentoDadosModalComponent,
            nzWidth: 460,
            nzClosable: false,
            nzFooter: null,

            nzData: {
                id: <number>this.departamento?.id,
            },
        });

        modal.afterClose.subscribe((r) => this.getData(r));
    }
}
