import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'button-selection',
    templateUrl: './button-selection.html',
    standalone: true,
    imports: [CommonModule, NgIcon]
})
export class ButtonSelectionComponent {

    @Input() labels: string[]
    @Input() icons: string[]
    @Input() values: any[]
    @Input() value: any
    @Input() rounded: boolean
    @Input() bgClassSelected: string = 'btn-blue'

    @Output() onButtonClicked = new EventEmitter<any>();

    onButtonClick(i: number): void {
        this.value = this.values[i];
        this.onButtonClicked.emit(this.value);
    }

    get count() {
        return this.labels != undefined ? this.labels.length : this.icons.length
    }
}
