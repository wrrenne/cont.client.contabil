
import { Component, Input } from '@angular/core';
import { LabelIcon2Component } from '../../../controls/label-icon-2/label-icon-2';
import { PacoteView } from '../../models/planos/views/pacoteView';

@Component({
    selector: 'pacote-card',
    templateUrl: './pacote-card.html',
    standalone: true,
    imports: [LabelIcon2Component],
    host: { 'class': 'bg-zinc-100 dark:bg-zinc-800 rounded-lg p-5 shadow-lg w-60 relative border border-gray-300 dark:border-0' }
})
export class PacoteCardComponent {

    @Input() pacote: PacoteView

    chooseThis() {

    }
}
