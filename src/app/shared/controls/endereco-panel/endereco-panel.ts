import { Component, Input } from '@angular/core';
import { EnderecoView } from '../../cadastros/models/views';

@Component({
    selector: 'endereco-panel',
    templateUrl: './endereco-panel.html',
    standalone: true,
})
export class EnderecoPanelComponent {
    @Input({ required: true })
    endereco!: EnderecoView;

    @Input() showLabel = false;

    get hasEndereco(): boolean {
        return !!(this.endereco?.logradouro || this.endereco?.bairro || this.endereco?.municipioTexto || this.endereco?.cepFormat);
    }

    get enderecoLinha1(): string {
        const parts = [this.endereco.logradouro, this.endereco.numero ? `nº ${this.endereco.numero}` : null, this.endereco.complemento];
        return parts.filter(Boolean).join(', ');
    }

    get enderecoLinha2(): string {
        const parts = [this.endereco.cepFormat, this.endereco.municipioTexto, this.endereco.uf];
        return parts.filter(Boolean).join(' - ');
    }
}
