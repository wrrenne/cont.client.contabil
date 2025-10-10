
import { Component, Input } from '@angular/core';
import { AvatarIconComponent } from '../../../controls/avatar-icon/avatar-icon';
import { TSolicitacaoStatus } from '../../enums';

@Component({
    selector: 'timeline-status-icone',
    templateUrl: './timeline-status-icone.html',
    standalone: true,
    imports: [AvatarIconComponent]
})
export class TimelineStatusIconeComponent {

    TSolicitacaoStatus = TSolicitacaoStatus

    @Input() status: TSolicitacaoStatus
}
