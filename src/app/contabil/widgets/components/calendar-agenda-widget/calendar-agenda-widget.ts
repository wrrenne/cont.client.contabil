import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PercentageBarComponent } from 'src/app/shared/controls/percentage-bar/percentage-bar';
import { WidgetComponent } from 'src/app/shared/controls/widget/widget';

@Component({
    selector: 'calendar-agenda-widget',
    templateUrl: './calendar-agenda-widget.html',
    host: { class: 'h-[430px]' },
    imports: [CommonModule, WidgetComponent, PercentageBarComponent],
})
export class CalendarAgendaWidgetComponent {
    selectedDates = [1, 3]; // multiple selected days
    days = [31, 1, 2, 3, 4, 5, 6];
    weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    toggleDate(day: number) {
        if (this.selectedDates.includes(day)) {
            this.selectedDates = this.selectedDates.filter((d) => d !== day);
        } else {
            this.selectedDates.push(day);
        }
    }

    isSelected(day: number): boolean {
        return this.selectedDates.includes(day);
    }
}
