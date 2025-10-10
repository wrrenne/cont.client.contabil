import { Component, Input } from '@angular/core';
import { fadeInAnimation } from '../../animations';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tab-group',
    templateUrl: './tab-group.html',
    standalone: true,
    imports: [CommonModule],
    animations: [fadeInAnimation]
})
export class TabGroupComponent {
    @Input() tabs: string[] = [];
    @Input() tabContents: any[] = [];

    selectedTab = 0;

    selectTab(index: number) {
        this.selectedTab = index;
    }
}
