import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/shared/services';
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

    constructor(
        private router: Router,
        private encryptionService: EncryptionService,
    ) {}

    chooseThis() {
        this.router.navigate(['/login/'], { queryParams: { c: this.encryptionService.encrypt('contratando') } });
    }
}
