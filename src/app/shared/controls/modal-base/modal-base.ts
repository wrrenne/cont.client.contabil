import { Component, ContentChild, EventEmitter, Injector, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ButtonIconComponent } from '../button-icon/button-icon';

@Component({
    selector: 'modal-base',
    templateUrl: './modal-base.html',
    standalone: true,
    imports: [CommonModule, ButtonIconComponent]
})
export class ModalBaseComponent {
    @Input() title?: string
    @Input() subTitle?: string
    @Input() obj: any

    @ContentChild('modalContent') modalContent: TemplateRef<any>;
    @ContentChild('footer') footer: TemplateRef<any>;

    modal: NzModalRef
    notification: NzNotificationService;

    closeModal(e?: any) {
        if (e != undefined) {
            this.modal.result = e;
            this.modal.close(e)
        }
        else {
            if (this.obj != undefined)
                this.modal.close(this.obj)
            else
                this.modal.close()
        }
    }

    constructor(injector: Injector) {
        this.modal = injector.get(NzModalRef)
        this.notification = injector.get(NzNotificationService)
    }

    createNotificationSucesso(title?: string, message?: string): void {
        this.notification.create(
            'success',
            title ?? '',
            message ?? 'Dados atualizados com sucesso'
        );
    }
}
