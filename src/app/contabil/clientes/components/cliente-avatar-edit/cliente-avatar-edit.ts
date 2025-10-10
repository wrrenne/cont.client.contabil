import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { AvatarService } from '../../../../shared/avatar/services/avatar.service';

@Component({
    selector: 'cliente-avatar-edit',
    templateUrl: './cliente-avatar-edit.html',
    standalone: true,
})
export class ClienteAvatarEditComponent {

    @Input() clienteId: number

    eventsSubject: Subject<void> = new Subject<void>()

    constructor(
        private avatarService: AvatarService
    ) { }

    avatarSelected(file: any) {
        this.avatarService.AvatarCadastroUpload(this.clienteId, file).subscribe(z => {
            this.eventsSubject.next()
        })
    }
}
