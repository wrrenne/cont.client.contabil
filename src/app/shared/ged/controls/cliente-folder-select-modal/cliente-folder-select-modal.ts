import { Component } from '@angular/core';
import { ModalBaseComponent } from 'src/app/shared/controls/modal-base/modal-base';
import { ClientesFolderTableComponent } from '../clientes-folder-table/clientes-folder-table';

@Component({
    selector: 'cliente-folder-select-modal',
    templateUrl: './cliente-folder-select-modal.html',
    imports: [ModalBaseComponent, ClientesFolderTableComponent],
})
export class ClienteFolderSelectModalComponent extends ModalBaseComponent {
    folderClick(e: any) {
        console.log(e);
    }
}
