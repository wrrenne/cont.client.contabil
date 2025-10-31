import { Component, Input } from '@angular/core';
import { LabelIconComponent } from 'src/app/shared/controls/label-icon/label-icon';
import { GedFileViewerComponent } from 'src/app/shared/ged/controls/ged-file-viewer/ged-file-viewer';
import { ArquivoPageItem } from '../../../../shared/ged/models/pagings';

@Component({
    selector: 'obrigacao-item-arquivos',
    templateUrl: './obrigacao-item-arquivos.html',
    imports: [LabelIconComponent, GedFileViewerComponent],
})
export class ObrigacaoItemArquivosComponent {
    @Input() showAvatar: boolean;
    @Input() arquivos: ArquivoPageItem[];
}
