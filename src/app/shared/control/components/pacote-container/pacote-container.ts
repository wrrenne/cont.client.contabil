import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class PacoteContainerComponent implements OnInit {
    pacotes: PacoteView[];

    @Input() column = false;
    @Output() onPacoteSelected = new EventEmitter<number>();

    constructor(private planosService: PlanosService) {}

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        this.planosService.pacotesGet(SistemaTipo.Ponto).subscribe((x) => {
            this.pacotes = x.obj;
        });
    }

    pacoteSelected(e: any) {
        this.onPacoteSelected.emit(e);
    }
}
