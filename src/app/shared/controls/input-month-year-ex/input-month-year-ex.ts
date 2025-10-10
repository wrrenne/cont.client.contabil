import { Component, forwardRef, OnInit } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { DateUtilsService } from '../../services';
import { InputBaseComponent } from '../input-base/input-base';

@Component({
    selector: 'input-month-year-ex',
    templateUrl: './input-month-year-ex.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzDropdownMenuComponent, NzDropDownModule, NgIcon],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputMonthYearExComponent),
            multi: true,
        },
    ],
})
export class InputMonthYearExComponent extends InputBaseComponent implements OnInit {
    year: number = new Date().getFullYear();
    months: string[] = this.dateUtilsService.monthNames;

    data: string = '';

    constructor(private dateUtilsService: DateUtilsService) {
        super();
    }

    ngOnInit(): void {
        // Subscribe to form control changes to emit new values
        if (this.form && this.formControlName) {
            const control = this.form.get(this.formControlName);

            if (control?.value) {
                this.data = this.dateUtilsService.getMonthYear(control?.value);
                this.year = this.dateUtilsService.getYear(control?.value);
            }

            if (control) {
                control.valueChanges.subscribe((value) => {
                    if (value) {
                        this.data = this.dateUtilsService.getMonthYear(value);
                        this.year = this.dateUtilsService.getYear(value);
                    }
                });
            }
        }
    }

    changeYear(delta: number): void {
        this.year += delta;
    }

    selectMonth(month: number): void {
        const d: Date = this.dateUtilsService.createDate(this.year, month + 1, 1);
        this.data = this.dateUtilsService.getMonthYear(d);
        this.writeValue(d);
    }
}
