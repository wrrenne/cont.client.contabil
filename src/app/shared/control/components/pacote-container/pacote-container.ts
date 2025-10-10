import { Component, Input, OnInit } from '@angular/core';
import { PacoteView } from '../../models/planos/views/pacoteView';
import { PlanosService } from '../../services/planos.service';
import { SistemaTipo } from '../../../models';
import { PacoteCardComponent } from '../pacote-card/pacote-card';

@Component({
    selector: 'pacote-container',
    standalone: true,
    imports: [PacoteCardComponent],
    templateUrl: './pacote-container.html'
})
export class PacoteContainerComponent {

    pacotes: PacoteView[]

    private _sistemaId: SistemaTipo
    @Input() get sistemaId() {
        return this._sistemaId
    }
    set sistemaId(value: SistemaTipo) {
        this._sistemaId = value
        this.getData()
    }

    constructor(private planosService: PlanosService) { }

    getData() {
        this.planosService.pacotesGet(this.sistemaId).subscribe(x => {
            this.pacotes = x.obj
        })
    }
}
