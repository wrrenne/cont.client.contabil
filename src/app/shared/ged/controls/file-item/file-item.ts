import { Component, Input } from '@angular/core';
import { TFileType } from '../../enums/ged-enums';
import { ArquivoPageItem, PastaPageItem } from '../../models/pagings';
import { GedUtilsService } from '../../services/gedUtils.service';
import { GedService } from '../../services/ged.service';
import saveAs from 'file-saver';
import { LabelIconComponent } from '../../../controls/label-icon/label-icon';


@Component({
    selector: 'file-item',
    standalone: true,
    imports: [LabelIconComponent],
    templateUrl: './file-item.html'
})
export class FileItemComponent {
    @Input() arquivo: ArquivoPageItem
    @Input() pasta: PastaPageItem

    TFileType = TFileType

    constructor(
        public gedUtilsService: GedUtilsService,
        private gedService: GedService
    ) { }

    fileClick(item: ArquivoPageItem) {
        if (item.fileType == TFileType.EspelhoPonto || item.fileType == TFileType.VariaveisFolha)
            this.gedService.arquivoDownload(item.id!).subscribe(y => saveAs(y, item.nome))
    }

    //    getIcon(tipo: TFileType, topFolder = false): string {
    //        return this.gedUtilsService.getFileTypeIcon(tipo, topFolder)
    //    }

    //    getColor(tipo: TFileType): string {
    //        return this.gedUtilsService.getFileTypeColor(tipo)
    //    }
}
