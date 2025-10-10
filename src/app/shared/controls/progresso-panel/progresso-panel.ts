import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
    selector: 'progresso-panel',
    standalone: true,
    imports: [CommonModule, NzSpinModule, NzProgressModule],
    templateUrl: './progresso-panel.html',
    styleUrls: ['./progresso-panel.scss']
})
export class ProgressoPanelComponent {
    @Input() title: string
    @Input() subTitle?: string
    @Input() porcento: number
    @Input() showIcon = true
    @Input() centerAlignment = true
}
