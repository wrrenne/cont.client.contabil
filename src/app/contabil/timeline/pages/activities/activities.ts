import { Component, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PageTitleComponent } from '../../../../shared/controls/page-title/page-title';
import { ActivitiesParameter } from '../../../../shared/timeline/models/parameters';
import { ContabilTimelineActivitiesComponent } from '../../components/contabil-timeline-activities/contabil-timeline-activities';

@Component({
    selector: 'activities-page',
    templateUrl: './activities.html',
    standalone: true,
    imports: [NzModalModule, PageTitleComponent, ContabilTimelineActivitiesComponent],
})
export class ActivitiesPage implements OnInit {
    activitiesParameters: ActivitiesParameter;

    ngOnInit(): void {
        this.activitiesParameters = {};
    }
}
