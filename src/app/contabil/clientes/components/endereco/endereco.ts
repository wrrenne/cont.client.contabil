import { Component, Input } from '@angular/core';
import { EnderecoView } from '../../../../shared/cadastros/models/views';

@Component({
    selector: 'endereco',
    templateUrl: './endereco.html',
    styleUrls: ['./endereco.scss'],
    standalone: true
})
export class EnderecoComponent {

    @Input() endereco: EnderecoView
}
