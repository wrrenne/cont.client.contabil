import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { AvatarService } from '../../../avatar/services/avatar.service';
import { CardComponent } from '../../../controls/card/card.component';
import { AvatarImageComponent } from '../../../controls/avatar-image/avatar-image';
import { ArquivoSelecaoButtonComponent } from '../../../controls/arquivo-selecao-button/arquivo-selecao-button';

@Component({
    selector: 'user-avatar',
    standalone: true,
    imports: [CardComponent, AvatarImageComponent, ArquivoSelecaoButtonComponent],
    templateUrl: './user-avatar.html'
})
export class UserAvatarComponent {

    @Input() userId?: number

    eventsSubject: Subject<void> = new Subject<void>()

    constructor(
        private avatarService: AvatarService
    ) { }

    avatarSelected(file: any) {
        this.avatarService.AvatarUserUpload(this.userId!, file).subscribe(z => {
            this.eventsSubject.next()
        })
    }
}
