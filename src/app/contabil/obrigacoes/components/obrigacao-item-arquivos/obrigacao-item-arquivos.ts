import { Component, Input } from '@angular/core';
import { LabelIconComponent } from 'src/app/shared/controls/label-icon/label-icon';
import { GedFileAvatarViewerComponent } from 'src/app/shared/ged/controls/ged-file-avatar-viewer/ged-file-avatar-viewer';
import { ArquivoPageItem } from '../../../../shared/ged/models/pagings';

@Component({
    selector: 'obrigacao-item-arquivos',
    templateUrl: './obrigacao-item-arquivos.html',
    imports: [LabelIconComponent, GedFileAvatarViewerComponent],
})
export class ObrigacaoItemArquivosComponent {
    @Input() showAvatar: boolean;
    @Input() arquivos: ArquivoPageItem[];
}
