import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GedFileAvatarViewerComponent } from 'src/app/shared/ged/controls/ged-file-avatar-viewer/ged-file-avatar-viewer';
import { GedFileViewerModalComponent } from 'src/app/shared/ged/controls/ged-file-viewer-modal/ged-file-viewer-modal';
import { environment } from '../../../../../environments/environment';
import { AvatarImageComponent } from '../../../controls/avatar-image/avatar-image';
import { FileServerImageComponent } from '../../../controls/file-server-image/file-server-image';
import { Vars } from '../../../variables';
import { TSolicitacaoStatus, TSolicitacaoTipo } from '../../enums';
import { CommentPageItem } from '../../models/pagings';
import { NewCommentParameter } from '../../models/parameters';
import { TimelineCommentFormComponent } from '../timeline-comment-form/timeline-comment-form';

@Component({
    selector: 'timeline-comment',
    templateUrl: './timeline-comment.html',
    host: { class: 'flex gap-3' },
    standalone: true,
    imports: [AvatarImageComponent, FileServerImageComponent, GedFileAvatarViewerComponent, TimelineCommentFormComponent],
})
export class TimelineCommentComponent {
    @Input() comment: CommentPageItem;
    @Input() showResponder = false;

    @Output() onCommented = new EventEmitter<CommentPageItem>();
    @Output() onEvaluated = new EventEmitter();
    @Output() onNewCommentClick = new EventEmitter<NewCommentParameter>();

    TSolicitacaoTipo = TSolicitacaoTipo;
    TSolicitacaoStatus = TSolicitacaoStatus;

    constructor(
        private vars: Vars,
        private modalService: NzModalService,
    ) {}

    get isDebug(): boolean {
        return environment.debug;
    }

    get isFuncionario() {
        return this.vars.funcionario != null;
    }

    commented(e: any) {
        if (!this.comment.comments) {
            this.comment.comments = [];
        }

        this.onCommented.emit(e);
        this.comment.comments.push(e);
    }

    evaluated() {
        this.onEvaluated.emit();
    }

    newCommentClick(e: any) {
        this.onNewCommentClick.emit(e);
    }

    fileOpen(fileId: number) {
        const modal = this.modalService.create({
            nzContent: GedFileViewerModalComponent,
            nzClosable: false,

            nzFooter: null,
            nzWidth: 'auto',
            nzStyle: { display: 'table' },
            nzData: {
                fileId: fileId,
            },
        });
    }
}
