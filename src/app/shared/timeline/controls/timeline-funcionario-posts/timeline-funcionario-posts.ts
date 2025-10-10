import { Component, Injector, Input, OnInit } from '@angular/core';
import { PagingBase } from '../../../models';
import { PostPageItem } from '../../models/pagings';
import { PostParameter } from '../../models/parameters';
import { PostsFuncionarioPagingGetService } from '../../services/pagings/postsFuncionarioPagingGetService';
import { TimelinePostComponent } from '../timeline-post/timeline-post';
import { HyperlinkButtonComponent } from '../../../controls/hyperlink-button/hyperlink-button';


@Component({
    selector: 'timeline-funcionario-posts',
    templateUrl: './timeline-funcionario-posts.html',
    standalone: true,
    imports: [TimelinePostComponent, HyperlinkButtonComponent]
})
export class TimelineFuncionarioPostsPagingComponent extends PagingBase<PostPageItem> implements OnInit {

    private _parameters?: PostParameter
    @Input() get parameters() {
        return this._parameters
    }
    set parameters(value: PostParameter | undefined) {
        if (value == null) return

        this._parameters = value

        this.param.routeStrings = []
        this.param.routeStrings.push((<number>value.funcionarioId).toString())

        this.param.queryStrings.clear()

        this.refresh()
    }

    constructor(
        injector: Injector,
        postsFuncionarioPagingGetService: PostsFuncionarioPagingGetService
    ) {
        super(
            injector,
            postsFuncionarioPagingGetService
        )
    }
}
