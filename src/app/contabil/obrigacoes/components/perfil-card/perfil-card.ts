import { Component, Input } from '@angular/core';
import { EncryptionService } from '../../../../shared/services';
import { ObrigacoesStat } from '../../../models/obrigacoes';
import { TEsfera } from '../../../models/enums';

@Component({
    selector: 'perfil-card',
    templateUrl: './perfil-card.html'
})
export class PerfilCardComponent {

    @Input() link = '/sistema/obrigacoes/perfil'
    @Input() perfilItemId: number
    @Input() perfilNome: string
    @Input() avatarFileName: string

    @Input() obrigacoesStat?: ObrigacoesStat

    constructor(public encryption: EncryptionService) {
    }
}
