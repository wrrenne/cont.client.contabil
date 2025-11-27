import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../shared/controls/page-title/page-title';
import { AvatarIconComponent } from '../../../shared/controls/avatar-icon/avatar-icon';
import { AnnualHolidaysCalendarComponent } from '../../../shared/tabelas/components/annual-holidays-calendar/annual-holidays-calendar';

@Component({
    selector: 'calendario-anual-page',
    standalone: true,
    imports: [PageTitleComponent, AvatarIconComponent, AnnualHolidaysCalendarComponent],
    templateUrl: './calendario-anual.html'
})
export class CalendarioAnualPage {
    year: number = new Date().getFullYear();


    previousYear() {
        this.year--;
    }

    nextYear() {
        this.year++;
    }
}
