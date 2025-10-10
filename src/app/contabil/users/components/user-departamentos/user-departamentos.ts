import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { CardComponent } from 'src/app/shared/controls/card/card.component';
import { UserDepartamentoPageItem } from '../../../models/contabil/pageItems';
import { UserDepartamentoModalComponent } from '../user-departamento-modal/user-departamento-modal';

@Component({
    selector: 'user-departamentos',
    standalone: true,
    templateUrl: './user-departamentos.html',
    imports: [CardComponent, AvatarTitleComponent],
})
export class UserDepartamentosComponent {
    @Output() onClick = new EventEmitter<number>();

    @Input() userId: number;
    @Input() departamentos: UserDepartamentoPageItem[];

    constructor(private modalService: NzModalService) {}

    openUserDepartamentoModal() {
        const modal = this.modalService.create({
            nzContent: UserDepartamentoModalComponent,
            nzWidth: 460,
            nzClosable: false,
            nzFooter: null,
            nzData: {
                userId: this.userId,
            },
        });

        modal.afterClose.subscribe((r) => {
            if (r) this.departamentoInserted(r);
        });
    }

    //updateRow(e: FuncionarioCargoPageItem) {
    //    var i = this.datas.findIndex(y => y.id == e.id)

    //    if (i >= 0)
    //        this.datas[i] = e
    //}

    departamentoInserted(funcionarioDepartamentoPageItem: UserDepartamentoPageItem) {
        this.departamentos.push(funcionarioDepartamentoPageItem);
    }
}
