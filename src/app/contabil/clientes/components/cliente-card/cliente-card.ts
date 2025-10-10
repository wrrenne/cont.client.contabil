import { Component, Input } from '@angular/core';
import { EncryptionService } from '../../../../shared/services';
import { ObrigacoesStat } from '../../../models/obrigacoes';

@Component({
    selector: 'cliente-card',
    templateUrl: './cliente-card.html',
    host: { 'class': 'h-[170px]' },
    standalone: true
})
export class ClienteCardComponent {

    @Input() link = '/sistema/clientes/cliente'
    @Input() clienteId: number
    @Input() clienteNome: string
    @Input() regime?: string

    @Input() obrigacoesStat?: ObrigacoesStat

    constructor(public encryptionService: EncryptionService) {
    }
}
