import { Component, Injector, Input } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { AvatarImageComponent } from '../../../controls/avatar-image/avatar-image';
import { PagingBase } from '../../../models';
import { ActivityPageItem } from '../../models/pagings';
import { ActivitiesParameter } from '../../models/parameters';
import { ActivitiesPagingGetService } from '../../services/pagings/activitiesPagingGetService';

@Component({
    selector: 'timeline-activities',
    templateUrl: './timeline-activities.html',
    standalone: true,
    imports: [InfiniteScrollDirective, AvatarImageComponent],
})
export class TimelineActivitiesComponent extends PagingBase<ActivityPageItem> {
    funcionarioId?: number;
    userId?: number;

    @Input() set parameters(value: ActivitiesParameter | undefined) {
        if (!value) return;

        this.param.routeStrings = [];

        this.param.queryStrings.clear();

        this.funcionarioId = value.funcionarioId;
        this.userId = value.userId;

        if (value.funcionarioId) {
            this.param.queryStrings.set('funcionarioId', value.funcionarioId);
        }

        if (value.userId) {
            this.param.queryStrings.set('userId', value.userId);
        }

        this.refresh();
    }

    constructor(injector: Injector, activitiesPagingGetService: ActivitiesPagingGetService) {
        super(injector, activitiesPagingGetService);
    }
}
