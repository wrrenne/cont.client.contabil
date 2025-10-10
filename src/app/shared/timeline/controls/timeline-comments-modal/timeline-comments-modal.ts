
import { Component, Inject, Injector } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ModalBaseComponent } from '../../../../shared/controls/modal-base/modal-base';
import { CommentPageItem } from '../../../../shared/timeline/models/pagings';
import { TimelinesService } from '../../../../shared/timeline/services/timelines.service';
import { NewCommentParameter, TimelineCommentFormParameter } from '../../models/parameters';
import { TimelineCommentFormComponent } from '../timeline-comment-form/timeline-comment-form';
import { TimelineCommentsComponent } from '../timeline-comments/timeline-comments';

export interface TimelineCommentsModalData {
    parameter: TimelineCommentFormParameter
    newComment?: NewCommentParameter
}
@Component({
    selector: 'timeline-comments-modal',
    templateUrl: './timeline-comments-modal.html',
    standalone: true,
    imports: [ModalBaseComponent, TimelineCommentsComponent, TimelineCommentFormComponent]
})
export class TimelineCommentsModalComponent extends ModalBaseComponent {

    comments: CommentPageItem[]
    parameter: TimelineCommentFormParameter

    newComment: NewCommentParameter

    constructor(
        private timelinesService: TimelinesService,
        injector: Injector,
        @Inject(NZ_MODAL_DATA) data: TimelineCommentsModalData,
    ) {
        super(injector)

        this.parameter = data.parameter

        if (data.newComment)
            this.newComment = data.newComment

        this.title = data.parameter.title
        this.subTitle = data.parameter.subTitle

        this.getData()
    }

    commented(e: any) {
        this.obj = true

        if (!this.comments)
            this.comments = []

        this.timelinesService
            .commentGet(e)
            .subscribe(x => {
                if (x.obj.commentId) {
                    var foundComment = this.findComment(x.obj.commentId, this.comments)

                    if (foundComment) {
                        if (!foundComment.comments) {
                            foundComment.comments = []
                        }

                        foundComment.comments.push(x.obj)
                    }
                }
                else {
                    this.comments.push(x.obj)
                }

                if (!this.parameter.postInfo) {
                    this.parameter.postInfo = { postId: 0, count: this.comments.length }
                }
                else {
                    this.parameter.postInfo!.count = this.comments.length
                }
            })
    }

    findComment(id: number, comments: CommentPageItem[] | undefined): CommentPageItem | undefined {
        if (!comments) return undefined;

        for (const x of comments!) {
            if (x.id === id) {
                return x;
            }

            if (x.comments) {
                const found = this.findComment(id, x.comments);
                if (found) {
                    return found;
                }
            }
        }

        return undefined;
    }

    getData() {
        this.timelinesService.commentsByOrigemId(this.parameter.origemId!, this.parameter.tipo!)
            .subscribe(x => {
                this.comments = x.obj
            })
    }

    evaluated(e: any) {
        this.obj = true

        if (!this.comments)
            this.comments = []

        // lê o comentário e atualiza a lista de comentários
        this.timelinesService
            .commentGet(e)
            .subscribe(x => {
                var i = this.comments.findIndex(y => y.id == e)

                if (i >= 0)
                    this.comments[i] = x.obj
            })
    }

    newCommentClick(e: any) {
        this.newComment = e
    }
}
