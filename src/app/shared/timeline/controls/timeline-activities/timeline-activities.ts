import { NgClass } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { AvatarImageComponent } from '../../../controls/avatar-image/avatar-image';
import { PagingBase } from '../../../models';
import { TPostTipo } from '../../enums';
import { ActivityPageItem } from '../../models/pagings';
import { ActivitiesParameter } from '../../models/parameters';
import { ActivitiesPagingGetService } from '../../services/pagings/activitiesPagingGetService';

@Component({
    selector: 'timeline-activities',
    templateUrl: './timeline-activities.html',
    standalone: true,
    imports: [NgClass, InfiniteScrollDirective, AvatarImageComponent],
})
export class TimelineActivitiesComponent extends PagingBase<ActivityPageItem> {
    TPostTipo = TPostTipo;

    funcionarioId?: number;
    userId?: number;

    @Output() onActivityClick = new EventEmitter<ActivityPageItem>();

    @Input() set parameters(value: ActivitiesParameter | undefined) {
        console.log(value);

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

    activityClick(item: ActivityPageItem) {
        switch (item.tipo) {
            case TPostTipo.Ponto:
                if (item.origemId) this.onActivityClick.emit(item);
                //if (item.origemId) this.espelhoCardModalOpen(item.origemId);
                break;
        }
    }
}
