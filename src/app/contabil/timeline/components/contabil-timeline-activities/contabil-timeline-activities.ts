import { Component, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TimelineActivitiesComponent } from 'src/app/shared/timeline/controls/timeline-activities/timeline-activities';
import { ActivityPageItem } from 'src/app/shared/timeline/models/pagings';
import { ActivitiesParameter } from 'src/app/shared/timeline/models/parameters';

@Component({
    selector: 'contabil-timeline-activities',
    templateUrl: './contabil-timeline-activities.html',
    standalone: true,
    imports: [TimelineActivitiesComponent],
})
export class ContabilTimelineActivitiesComponent {
    @Input() parameters: ActivitiesParameter;

    constructor(private modalService: NzModalService) {}

    // espelhoCardModalOpen(apontamentoId: number) {
    //     const modal = this.modalService.create({
    //         nzContent: EspelhoCardModalComponent,
    //         nzWidth: 570,
    //         nzClosable: false,
    //         nzFooter: null,

    //         nzData: {
    //             apontamentoId: apontamentoId,
    //         },
    //     });
    // }

    activityClick(e: any) {
        const activity = <ActivityPageItem>e;

        //this.espelhoCardModalOpen(activity.origemId!);
    }
}
