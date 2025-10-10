import { Component, EventEmitter, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBaseComponent } from '../../../controls/input-base/input-base';
import { SistemaTipo } from '../../../models';
import { PacoteView } from '../../models/planos/views/pacoteView';
import { PlanosService } from '../../services/planos.service';

@Component({
    selector: 'pacote-ponto-select',
    templateUrl: './pacote-ponto-select.html',
    standalone: true,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PacotePontoSelectComponent),
        multi: true
    }]
})
export class PacotePontoSelectComponent extends InputBaseComponent implements OnInit, ControlValueAccessor {

    pacotes: PacoteView[] = []

    @Output() onClick = new EventEmitter<number>()

    constructor(private planosService: PlanosService
    ) {
        super()
    }

    ngOnInit(): void {
        this.planosService.pacotesGet(SistemaTipo.Ponto).subscribe(x => {
            this.pacotes = x.obj
        })
    }
}
