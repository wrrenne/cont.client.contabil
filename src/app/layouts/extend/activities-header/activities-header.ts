import { Component, OnInit } from '@angular/core';
import { toggleAnimation } from '../../../shared/animations';
import { ActivityPageItem } from '../../../shared/timeline/models/pagings';
import { TimelinesService } from '../../../shared/timeline/services/timelines.service';
import { ActivitiesNotification } from '../../../shared/timeline/notifications/activities.notification';

@Component({
    selector: 'activities-header',
    templateUrl: './activities-header.html',
    host: { 'class': 'dropdown shrink-0' },
    animations: [toggleAnimation],
    standalone: true
})
export class ActivitiesHeaderComponent implements OnInit {

    activities: ActivityPageItem[]

    hasUnread = false;
    opened = false

    constructor(
        private timelinesService: TimelinesService,
        private activitiesNotification: ActivitiesNotification
    ) {
    }

    ngOnInit(): void {
        this.timelinesService.ActivityReadStatusHasUnredGet().subscribe(x => {
            if (x.obj == true) {
                this.activitiesNotification.notifyNew()

                this.activitiesNotification.hasUnread$.subscribe(status => {
                    this.hasUnread = status;
                });
            }
        })
    }

    getData() {
        this.opened = !this.opened

        if (this.opened) {
            this.activitiesNotification.markAsRead()
            this.timelinesService.ActivityReadStatusUpdate().subscribe()

            this.timelinesService.activitiesByCadastroIdListGet()
                .subscribe(x => {
                    this.activities = x.obj
                })
        }
    }
}
