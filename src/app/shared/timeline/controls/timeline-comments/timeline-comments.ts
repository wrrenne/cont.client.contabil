import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentPageItem } from '../../models/pagings';
import { NewCommentParameter } from '../../models/parameters';
import { TimelineCommentComponent } from '../timeline-comment/timeline-comment';

@Component({
    selector: 'timeline-comments',
    templateUrl: './timeline-comments.html',
    imports: [TimelineCommentComponent],
    standalone: true,
})
export class TimelineCommentsComponent {
    @Input() comments: CommentPageItem[];
    @Input() showResponder = false;

    @Output() onNewCommentClick = new EventEmitter<NewCommentParameter>();

    newCommentClick(e: any) {
        this.onNewCommentClick.emit(e);
    }
}
