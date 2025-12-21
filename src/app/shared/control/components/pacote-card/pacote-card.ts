import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/shared/services';
import { Vars } from 'src/app/shared/variables';
import { LabelIcon2Component } from '../../../controls/label-icon-2/label-icon-2';
import { PacoteView } from '../../models/planos/views/pacoteView';

@Component({
    selector: 'pacote-card',
    templateUrl: './pacote-card.html',
    standalone: true,
    imports: [LabelIcon2Component],
    host: { class: 'bg-zinc-100 dark:bg-zinc-800 rounded-lg p-5 shadow-lg relative border border-gray-300 dark:border-0' },
})
export class PacoteCardComponent {
    @Input() pacote: PacoteView;
    @Input() showButton = true;
    @Input() buttonText = 'Quero este';
    @Output() onSelected = new EventEmitter<number>();

    constructor(
        private router: Router,
        private vars: Vars,
        private encryptionService: EncryptionService,
    ) {}

    chooseThis(pacoteId: number) {
        this.onSelected.emit(pacoteId);
        // this.vars.pacoteId = pacoteId;
        // this.router.navigate(['/newaccount/']);
    }
}
