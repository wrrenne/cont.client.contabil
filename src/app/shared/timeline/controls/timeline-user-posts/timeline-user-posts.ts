import { Component, Injector, Input, OnInit } from '@angular/core';
import { PagingBase } from '../../../models';
import { PostPageItem } from '../../models/pagings';
import { PostParameter } from '../../models/parameters';
import { PostsUserPagingGetService } from '../../services/pagings/postsUserPagingGetService';
import { TimelinePostComponent } from '../timeline-post/timeline-post';
import { HyperlinkButtonComponent } from '../../../controls/hyperlink-button/hyperlink-button';


@Component({
    selector: 'timeline-user-posts',
    standalone: true,
    imports: [TimelinePostComponent, HyperlinkButtonComponent],
    templateUrl: './timeline-user-posts.html'
})
export class TimelineUserPostsPagingComponent extends PagingBase<PostPageItem> implements OnInit {

    private _parameters?: PostParameter
    @Input() get parameters() {
        return this._parameters
    }
    set parameters(value: PostParameter | undefined) {
        if (value == null) return

        this._parameters = value

        this.param.routeStrings = []
        this.param.routeStrings.push((<number>value.userId).toString())

        this.param.queryStrings.clear()

        this.refresh()
    }

    constructor(
        injector: Injector,
        postsUserPagingGetService: PostsUserPagingGetService
    ) {
        super(
            injector,
            postsUserPagingGetService
        )
    }
}
