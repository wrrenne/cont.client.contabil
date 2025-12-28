import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SistemaTipo } from '../../../models';
import { PacoteView } from '../../models/planos/views/pacoteView';
import { PlanosService } from '../../services/planos.service';
import { PacoteCardComponent } from '../pacote-card/pacote-card';

@Component({
    selector: 'pacote-container',
    standalone: true,
    imports: [CommonModule, PacoteCardComponent],
    templateUrl: './pacote-container.html',
})
export class PacoteContainerComponent {
    pacotes: PacoteView[];

    @Input() set cadastroId(value: number | undefined) {
        this.getData(value);
    }

    @Input() column = false;
    @Output() onPacoteSelected = new EventEmitter<number>();

    constructor(private planosService: PlanosService) {}

    getData(cadastroId?: number) {
        this.planosService.pacotesGet(SistemaTipo.Ponto, cadastroId).subscribe((x) => {
            this.pacotes = x.obj;
        });
    }

    pacoteSelected(e: any) {
        this.onPacoteSelected.emit(e);
    }
}
