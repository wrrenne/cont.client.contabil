import { Component, Input } from '@angular/core';
import { SistemaCadastroPageItem } from '../../models/pagings';
import { CardComponent } from '../../../controls/card/card.component';
import { LabelTextComponent } from '../../../controls/label-text/label-text';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'cadastro-sistema-card',
    templateUrl: './cadastro-sistema-card.html',
    standalone: true,
    imports: [CommonModule, CardComponent, LabelTextComponent]
})
export class CadastroSistemaCardComponent {

    @Input() sistema: SistemaCadastroPageItem
}
