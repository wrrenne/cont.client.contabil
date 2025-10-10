import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { MenuModule } from 'headlessui-angular';
import { toggleAnimation } from '../../animations';

export class RadioItem {
    value: any;
    text: string;
    checked: boolean;
}

@Component({
    selector: 'dropdown-radio',
    templateUrl: './dropdown-radio.html',
    host: { class: 'dropdown inline-flex' },
    standalone: true,
    imports: [CommonModule, NgIcon, MenuModule],
    animations: [toggleAnimation],
})
export class DropDownRadioComponent {
    @Input() label: string;
    @Input() icon: string;
    @Input() items: RadioItem[];
    @Input() btnClass = 'btn-gray';
    @Output() valueChanged = new EventEmitter<string>();

    itemClick(item: RadioItem) {
        const i = this.items.findIndex((x) => x.value == item.value);
        this.items[i].checked = !this.items[i].checked;

        // se todos estão checked, retorna vazio
        var items =
            this.items.filter((x) => x.checked == true).length != this.items.length
                ? this.items
                      .filter((x) => x.checked == true)
                      .map((x) => x.value)
                      .join(',')
                : '';

        this.valueChanged.emit(items);
    }
}
