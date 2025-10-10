import { Component, Input } from '@angular/core';
import { LabelIconComponent } from 'src/app/shared/controls/label-icon/label-icon';
import { ArquivoPageItem } from '../../../../shared/ged/models/pagings';

@Component({
    selector: 'obrigacao-item-arquivos',
    templateUrl: './obrigacao-item-arquivos.html',
    imports: [LabelIconComponent],
})
export class ObrigacaoItemArquivosComponent {
    @Input() arquivos: ArquivoPageItem[];
}
