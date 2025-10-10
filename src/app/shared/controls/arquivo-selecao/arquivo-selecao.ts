import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
    selector: 'arquivo-selecao',
    standalone: true,
    templateUrl: './arquivo-selecao.html'
})
export class ArquivoSelecaoComponent {

    @Output() onFileSelected = new EventEmitter<File[]>()
    //@Output() onFileDeleted = new EventEmitter()

    //@Input() titles: string[] = [
    //    "Arraste os arquivos aqui",
    //    "ou",
    //    "Clique para selecionar arquivos na pasta"
    //]

    //@Input() verticalMargin = 0
    //@Input() showIcon = true
    //@Input() showButton = false
    //@Input() showDelete = false

    @ContentChild('panelContent') panelContent: TemplateRef<any>;

    constructor() {
    }

    onFileDropped(file: any) {
        this.onFileSelected.emit(file.target.files)
    }

    fileBrowseHandler(file: any) {
        this.onFileSelected.emit(file.target.files)
    }

//    deleteClick() {
//        this.onFileDeleted.emit()
//    }
}
