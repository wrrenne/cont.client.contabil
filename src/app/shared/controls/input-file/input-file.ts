
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'input-file',
    standalone: true,
    imports: [NgIcon],
    templateUrl: './input-file.html',
})
export class InputFileComponent {
    fileNames: string[] = [];
    files: File[] = [];

    @Input() label?: string;
    @Input() isButton: boolean = false;

    @Output() onFileSelected = new EventEmitter<File[]>();

    /**
     * Handles the file input change event.
     * Adds selected files to the list and emits the selected files.
     * @param e The file input change event
     */
    fileBrowseHandler(e: Event): void {
        const input = e.target as HTMLInputElement;

        if (input?.files && input.files.length > 0) {
            // Convert FileList to an array and add to the files array
            Array.from(input.files).forEach(file => {
                this.files.push(file);
                this.fileNames.push(file.name);
            });

            // Emit the updated files array
            this.onFileSelected.emit(this.files);
        }
    }

    /**
     * Handles deleting a file by its name.
     * Removes the file from the files and fileNames arrays.
     * @param fileName The name of the file to be deleted
     */
    deleteClick(fileName: string): void {
        const index = this.fileNames.indexOf(fileName);

        if (index > -1) {
            this.fileNames.splice(index, 1);
            this.files.splice(index, 1);
        }

        // Emit the updated files array
        this.onFileSelected.emit(this.files);
    }
}
