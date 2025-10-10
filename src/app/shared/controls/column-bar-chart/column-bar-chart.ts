import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { DateUtilsService } from '../../services';

@Component({
    selector: 'column-bar-chart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './column-bar-chart.html',
})
export class ColumnBarChartComponent implements OnChanges {
    @Input() barClass = 'bg-gray-400 dark:bg-gray-300';
    @Input() barTextClass = 'text-gray-200 dark:text-gray-700';
    @Input() labelTextClass = 'text-gray-200 dark:text-gray-700';
    @Input() values: number[] = [];
    @Input() labels: string[] = [];
    @Input() valuesHour = false;

    maxValue = 0;
    minValue = 0;
    maxRelative = 0;

    constructor(private dateUtilsService: DateUtilsService) {}

    ngOnChanges(): void {
        this.maxValue = Math.max(...this.values);
        this.minValue = Math.min(...this.values);
        this.maxRelative = this.maxValue - this.minValue;

        this.maxRelative += this.maxRelative / 10;
        this.minValue -= this.maxRelative / 10;
    }

    getHeight(value: number): string {
        var valueRelative = value - this.minValue;

        if (this.maxRelative === 0) return '0%';

        return `${Math.trunc((valueRelative / this.maxRelative) * 100)}%`;
    }

    getValue(v: number) {
        if (this.valuesHour) return this.getHourValue(v);
        else return v.toString();
    }

    getLabel(i: number) {
        return this.labels[i];
    }

    getHourValue(min: number): string {
        return this.dateUtilsService.getHourStringFromMinutes(min);
    }
}
