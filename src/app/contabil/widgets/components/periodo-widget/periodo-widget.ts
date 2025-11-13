import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PeriodoRefreshService } from 'src/app/shared/variables/periodo-refresh.service';
import { WidgetDoneComponent } from '../../../../shared/controls/widget-done/widget-done';
import { DateUtilsService } from '../../../../shared/services';
import { Vars } from '../../../../shared/variables';

@Component({
    selector: 'periodo-widget',
    templateUrl: './periodo-widget.html',
    standalone: true,
    imports: [WidgetDoneComponent],
})
export class PeriodoWidgetComponent implements OnInit, OnDestroy {
    description: string;

    diaAtual: number;
    diaLast: number;

    private periodoSubscription: Subscription;

    constructor(
        private vars: Vars,
        private periodoRefreshService: PeriodoRefreshService,
        private dateUtilsService: DateUtilsService,
    ) {}

    ngOnDestroy() {
        this.periodoSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.getPeriodoValues();

        this.periodoSubscription = this.periodoRefreshService.refresh$.subscribe((_) => {
            this.getPeriodoValues();
        });
    }

    getPeriodoValues() {
        this.diaLast = this.vars.dataFinal!.getDate();
        this.diaAtual = this.dateUtilsService.getToday() < this.vars.dataFinal! ? this.dateUtilsService.getToday().getDate() : this.diaLast;

        this.description = this.dateUtilsService.getFormattedPeriodDayMonth(this.vars.dataInicial, this.vars.dataFinal);
    }
}
