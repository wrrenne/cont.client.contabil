import { Component, Input } from '@angular/core';
import { EncryptionService } from '../../../../shared/services';
import { ObrigacoesStat } from '../../../models/obrigacoes';
import { TEsfera } from '../../../models/enums';

@Component({
    selector: 'obrigacao-card',
    templateUrl: './obrigacao-card.html'
})
export class ObrigacaoCardComponent {

    @Input() link = '/sistema/obrigacoes/obrigacao'
    @Input() obrigacaoId: number
    @Input() obrigacaoNome: string
    @Input() tipo?: string
    @Input() esfera?: TEsfera
    @Input() uf?: string
    @Input() municipioCodigo?: number

    @Input() obrigacoesStat?: ObrigacoesStat

    constructor(public encryption: EncryptionService) {
    }
}
