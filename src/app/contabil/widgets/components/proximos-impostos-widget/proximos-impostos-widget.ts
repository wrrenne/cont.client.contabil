import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { WidgetProximosImpostos } from 'src/app/contabil/models/widgets';
import { PercentageBarComponent } from 'src/app/shared/controls/percentage-bar/percentage-bar';
import { WidgetComponent } from 'src/app/shared/controls/widget/widget';
import { DateUtilsService, EncryptionService } from 'src/app/shared/services';
import { PadNumberPipe } from '../../../../shared/pipes/padNumber.pipe';
import { WidgetsService } from '../../services/widgets.service';

@Component({
    selector: 'proximos-impostos-widget',
    templateUrl: './proximos-impostos-widget.html',
    host: { class: 'h-[430px]' },
    imports: [CommonModule, RouterLink, WidgetComponent, PercentageBarComponent, PadNumberPipe, OverlayscrollbarsModule],
})
export class ProximosImpostosWidgetComponent implements OnInit {
    private isHidden = false;
    @HostBinding('style.display') get display() {
        return this.isHidden ? 'none' : 'block';
    }

    subTitle: string;

    widget: WidgetProximosImpostos;

    constructor(
        public encryptionService: EncryptionService,
        private widgetsService: WidgetsService,
        private dateUtilsService: DateUtilsService,
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        this.widgetsService.widgetProximosImpostosGet().subscribe((x) => {
            x.obj = this.dateUtilsService.convertDates(x.obj);
            this.widget = x.obj;
            this.subTitle = x.obj.periodo;
            this.isHidden = !this.widget;
        });
    }

    isSelected(i: number): boolean {
        return this.widget.datas[i].obrigacoes.length > 0;
    }

    getWeekDayName(d: Date): string {
        return this.dateUtilsService.getWeekDateNameAbbreviated(d);
    }

    getDay(d: Date): number {
        return this.dateUtilsService.getDay(d);
    }
}
