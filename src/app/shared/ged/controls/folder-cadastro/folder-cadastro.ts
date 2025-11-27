import { Component, Input } from '@angular/core';
import { FileServerImageComponent } from 'src/app/shared/controls/file-server-image/file-server-image';
import { FormatSingularPluralPipe } from '../../../pipes/singular-plural.pipe';
import { PastaView } from '../../models/views';
import { GedService } from '../../services/ged.service';

@Component({
    selector: 'folder-cadastro',
    standalone: true,
    templateUrl: './folder-cadastro.html',
    imports: [FileServerImageComponent, FormatSingularPluralPipe],
})
export class FolderCadastroComponent {
    pasta: PastaView;

    private _cadastroId: number;
    @Input() get cadastroId() {
        return this._cadastroId;
    }
    set cadastroId(value: number) {
        this._cadastroId = value;
        this.getData();
    }

    constructor(private gedService: GedService) {}

    getData() {
        this.gedService.pastaCadastroIdGet(this.cadastroId).subscribe((x) => {
            if (x.obj) {
                this.gedService.pastaPropertiesGet(x.obj).subscribe((x) => {
                    this.pasta = x.obj;
                });
            }
        });
    }

    // fileClick(item: ArquivoPageItem) {
    //         if (item.fileType == TFileType.EspelhoPonto || item.fileType == TFileType.VariaveisFolha)
    //             this.gedService.arquivoDownload(item.id!).subscribe((y) => saveAs(y, item.nome));
    //     }

    //    getIcon(tipo: TFileType, topFolder = false): string {
    //        return this.gedUtilsService.getFileTypeIcon(tipo, topFolder)
    //    }

    //    getColor(tipo: TFileType): string {
    //        return this.gedUtilsService.getFileTypeColor(tipo)
    //    }
}
