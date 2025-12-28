import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

interface WeekDayItem {
    label: string;
    day: number;
    date: Date;
    isActive: boolean;
}

@Component({
    selector: 'weekly-date-strip',
    standalone: true,
    templateUrl: './weekly-date-strip.html',
})
export class WeeklyDateStripComponent implements OnChanges {
    @Input({ required: true }) date!: Date;
    @Input() clickable = false;

    @Output() dateChange = new EventEmitter<Date>();

    days: WeekDayItem[] = [];

    private readonly weekLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

    ngOnChanges(): void {
        if (!this.date) {
            return;
        }

        this.buildWeek(this.date);
    }

    onDaySelect(item: WeekDayItem): void {
        if (!this.clickable || item.isActive) {
            return;
        }

        this.date = new Date(item.date);
        this.buildWeek(this.date);
        this.dateChange.emit(this.date);
    }

    private buildWeek(baseDate: Date): void {
        const reference = new Date(baseDate);
        reference.setHours(0, 0, 0, 0);

        const sunday = new Date(reference);
        sunday.setDate(reference.getDate() - reference.getDay());

        this.days = Array.from({ length: 7 }).map((_, index) => {
            const d = new Date(sunday);
            d.setDate(sunday.getDate() + index);

            return {
                label: this.weekLabels[index],
                day: d.getDate(),
                date: d,
                isActive: d.getTime() === reference.getTime(),
            };
        });
    }
}
