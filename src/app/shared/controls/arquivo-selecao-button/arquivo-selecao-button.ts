import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'arquivo-selecao-button',
    standalone: true,
    imports: [NgIcon],
    templateUrl: './arquivo-selecao-button.html'
})
export class ArquivoSelecaoButtonComponent {

    @Output() onFileSelected = new EventEmitter<File[]>()
    @Output() onFileDeleted = new EventEmitter()

    constructor() {
    }

    fileBrowseHandler(file: any) {
        this.onFileSelected.emit(file.target.files)
    }

    deleteClick() {
        this.onFileDeleted.emit()
    }
}
