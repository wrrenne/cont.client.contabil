import { Component, Input, OnInit } from '@angular/core';
import { PastasParameter } from '../../models/parameters';
import { GedService } from '../../services/ged.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FolderSelectComponent } from '../folder-select/folder-select';
import { FilesTableComponent } from '../files-table/files-table';


@Component({
    selector: 'ged-explorer',
    standalone: true,
    imports: [FolderSelectComponent, FilesTableComponent],
    templateUrl: './ged-explorer.html'
})
export class GedExplorerComponent implements OnInit {

    filesParameters: PastasParameter

    //pasta?: PastaView

    firstFormGroup: FormGroup

    @Input() parameters: PastasParameter

    constructor(
        private gedService: GedService,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.createFirstForm()
    }

    createFirstForm() {
        this.firstFormGroup = this.formBuilder.group({
            pastaId: [null],
        });

        this.firstFormGroup.get('pastaId')?.valueChanges.subscribe(value => {
            this.update(value)
            //const item: PastaPageItem | undefined = this.datas.find(x => x.id === value);
            //this.onChanged.emit(item?.id);
        });
    }

    update(id: number) {
        this.filesParameters = { cadastroId: this.parameters.cadastroId, userId: this.parameters.userId, id: id }
    }

    pastaClick(e: any) {
        this.update(e)
    }

    folderChanged(e: any) {
        this.update(e)
    }
}
