import { CommonModule } from '@angular/common';
import { Component, ContentChild, Injector, Input, TemplateRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ButtonIconComponent } from '../button-icon/button-icon';

@Component({
    selector: 'modal-base',
    templateUrl: './modal-base.html',
    standalone: true,
    imports: [CommonModule, ButtonIconComponent],
})
export class ModalBaseComponent {
    @Input() title?: string;
    @Input() subTitle?: string;
    @Input() obj: any;
    @Input() loading = false;
    @Input() minHeight = '400px';

    @ContentChild('modalContent') modalContent: TemplateRef<any>;
    @ContentChild('footer') footer: TemplateRef<any>;

    modal: NzModalRef;
    notification: NzNotificationService;

    // showLoading(): void {
    //     this.loading = true;
    // }

    // hideLoading(): void {
    //     this.loading = false;
    // }

    closeModal(e?: any) {
        if (e != undefined) {
            this.modal.result = e;
            this.modal.close(e);
        } else {
            if (this.obj != undefined) this.modal.close(this.obj);
            else this.modal.close();
        }
    }

    constructor(injector: Injector) {
        this.modal = injector.get(NzModalRef);
        this.notification = injector.get(NzNotificationService);
    }

    createNotificationSucesso(title?: string, message?: string): void {
        this.notification.create('success', title ?? '', message ?? 'Dados atualizados com sucesso');
    }
}
