import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItem } from '../../../shared/models';
import { EncryptionService } from '../../../shared/services';

import { RouterLink } from '@angular/router';
import { AvatarImageComponent } from '../../../shared/controls/avatar-image/avatar-image';

@Component({
    selector: 'clientes-search',
    templateUrl: './clientes-search.html',
    standalone: true,
    imports: [RouterLink, AvatarImageComponent]
})
export class ClientesSearchComponent {

    constructor(public encryptionService: EncryptionService) { }

    @Input() datas: ListItem[]
    @Input() link = '/sistema/clientes/cliente'
    
    @Output() onClick = new EventEmitter<number>()

    funcionarioClick(id: number) {
        this.onClick.emit(id)
    }
}
