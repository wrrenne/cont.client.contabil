import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'no-data-panel',
    standalone: true,
    imports: [NgIcon],
    templateUrl: './no-data-panel.html'
})
export class NoDataPanelComponent {
    @Input() title: string = 'Nada para mostrar';
}
