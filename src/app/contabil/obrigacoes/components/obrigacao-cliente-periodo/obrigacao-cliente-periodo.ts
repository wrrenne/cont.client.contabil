import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DateUtilsService } from '../../../../shared/services';
import { ObrigacaoClientePeriodoView } from '../../../models/obrigacoes/views';
import { ObrigacoesService } from '../../services/obrigacoes.service';
import { TObrigacaoClientePeriodoPor } from '../../../models/enums';

@Component({
    selector: 'obrigacao-cliente-periodo',
    templateUrl: './obrigacao-cliente-periodo.html',
    styleUrls: ['./obrigacao-cliente-periodo.scss']
})
export class ObrigacaoClientePeriodoComponent {

    //calendarParameters: CalendarParameters

    obrigacaoClientePeriodo: ObrigacaoClientePeriodoView

    @Output() onBackClick = new EventEmitter()

    TObrigacaoClientePeriodoPor = TObrigacaoClientePeriodoPor
    @Input() obrigacaoClientePeriodoPor: TObrigacaoClientePeriodoPor

    private _id: number | undefined
    @Input() get id() {
        return this._id
    }
    set id(value: number | undefined) {
        this._id = value

        if (value)
            this.getData(value!)
    }

    constructor(
        private obrigacoesService: ObrigacoesService,
        private formBuilder: FormBuilder,
        private notification: NzNotificationService,
        private dateUtilsService: DateUtilsService
    ) {
    }

    getData(id: number) {
        this.obrigacoesService.obrigacaoClientePeriodoGet(id).subscribe(x => {
            this.obrigacaoClientePeriodo = x.obj

            this.obrigacoesService.fillAvatares([x.obj])

        //    this.calendarParameters = {
        //        markedDates: [
        //            {
        //                data: this.dateUtilsService.convertIsoStringToDate(x.obj.vencimento!),
        //                css: 'bg-amber-300 dark:bg-amber-800',
        //                title: 'Vencimento',
        //                subTitle: x.obj.vencimentoDescricao
        //            },
        //            {
        //                data: this.dateUtilsService.convertIsoStringToDate(x.obj.prazo!),
        //                css: 'bg-red-300 dark:bg-red-800',
        //                title: 'Prazo',
        //                subTitle: x.obj.prazoDescricao
        //            }
        //        ]
        //    }
        })
    }

    backClick() {
        this.onBackClick.emit()
    }

    //submitFirstFormGroup() {
    //    this.createNotification()
    //    //    var input: ClienteInput =
    //    //    {
    //    //        id: this.id,
    //    //        cliente:
    //    //        {
    //    //            nome: this.firstFormGroup.get('nome')?.value,
    //    //            cpf: this.firstFormGroup.get('cpf')?.value,
    //    //            pis: this.firstFormGroup.get('pis')?.value
    //    //        }
    //    //    }

    //    //    this.clientesService.clienteCreateOrUpdate(input).subscribe(x => {
    //    //        if (x.errorMessage == null) {
    //    //            this.firstFormGroup.markAsPristine();
    //    //            this.firstFormGroup.markAsUntouched();
    //    //            this.firstFormGroup.updateValueAndValidity();

    //    //            this.createNotification()
    //    //        }
    //    //    })
    //}

//    createNotification(): void {
//        this.notification.create(
//            'success',
//            'Obrigação',
//            'Obrigação atualizada com sucesso'
//        );
//    }
}
