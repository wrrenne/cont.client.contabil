import { Component, Injector, Input } from '@angular/core';
import { PagingBase } from '../../../models';
import { ActivityPageItem } from '../../models/pagings';
import { ActivitiesParameter } from '../../models/parameters';
import { ActivitiesByFuncionarioIdPagingGetService } from '../../services/pagings/activitiesByFuncionarioIdPagingGetService';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';


@Component({
    selector: 'timeline-activities-funcionario',
    templateUrl: './timeline-activities-funcionario.html',
    styleUrls: ['./timeline-activities-funcionario.scss'],
    standalone: true,
    imports: [NzTimelineModule]
})
export class TimelineActivitiesFuncionarioComponent extends PagingBase<ActivityPageItem> {

    @Input() set parameters(value: ActivitiesParameter | undefined) {

        if (!value) return

        this.param.routeStrings = []

        if (value.funcionarioId) {
            this.param.routeStrings.push((<number>value.funcionarioId).toString())
        }

        if (value.userId) {
            this.param.routeStrings.push((<number>value.userId).toString())
        }

        this.param.queryStrings.clear()

        this.refresh()
    }

    constructor(
        injector: Injector,
        activitiesByFuncionarioIdPagingGetService: ActivitiesByFuncionarioIdPagingGetService
    ) {
        super(
            injector,
            activitiesByFuncionarioIdPagingGetService
        )
    }
}
