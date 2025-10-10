import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { HyperlinkButtonComponent } from '../../../controls/hyperlink-button/hyperlink-button';
import { Vars } from '../../../variables';
import { TimelineCommentFormParameter } from '../../models/parameters';
import { TimelineCommentsModalComponent } from '../timeline-comments-modal/timeline-comments-modal';

@Component({
    selector: 'timeline-post-footer',
    templateUrl: './timeline-post-footer.html',
    standalone: true,
    providers: [NzModalService],
    imports: [NzModalModule, NgIcon, HyperlinkButtonComponent],
})
export class TimelinePostFooterComponent {
    @Input() parameter: TimelineCommentFormParameter;
    @Output() onUpdate = new EventEmitter();

    constructor(
        private modalService: NzModalService,
        private vars: Vars,
    ) {}

    openCommentsClick(openComentar: boolean) {
        const modal = this.modalService.create({
            nzContent: TimelineCommentsModalComponent,
            nzWidth: 570,
            nzClosable: false,
            nzFooter: null,
            nzData: {
                parameter: this.parameter,
                newComment: openComentar ? { commentUserNome: this.vars.user?.nome, funcionarioNome: this.parameter.funcionarioNome } : undefined,
            },
            nzMaskClosable: false,
        });

        modal.afterClose.subscribe((r) => {
            if (r) this.onUpdate.emit();
        });
    }
}
