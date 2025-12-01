import { Component, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PageTitleComponent } from '../../../../shared/controls/page-title/page-title';
import { TimelineActivitiesComponent } from '../../../../shared/timeline/controls/timeline-activities/timeline-activities';
import { ActivitiesParameter } from '../../../../shared/timeline/models/parameters';

@Component({
    selector: 'activities-page',
    templateUrl: './activities.html',
    standalone: true,
    imports: [NzModalModule, PageTitleComponent, TimelineActivitiesComponent]
})
export class ActivitiesPage implements OnInit {

    activitiesParameters: ActivitiesParameter

    ngOnInit(): void {
        this.activitiesParameters = {}
    }
}
