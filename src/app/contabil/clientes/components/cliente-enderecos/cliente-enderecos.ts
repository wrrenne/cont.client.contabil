import { Component, Input } from '@angular/core';
import { EnderecoView } from '../../../../shared/cadastros/models/views';

@Component({
    selector: 'cliente-enderecos',
    templateUrl: './cliente-enderecos.html',
    styleUrls: ['./cliente-enderecos.scss'],
    standalone: true
})
export class ClienteEnderecos {
    @Input() enderecos: EnderecoView[]
}
