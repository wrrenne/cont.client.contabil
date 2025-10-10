import { Component, OnInit, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { DateUtilsService } from '../../services';
import { InputBaseComponent } from '../input-base/input-base';

@Component({
    selector: 'input-month-ex',
    templateUrl: './input-month-ex.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzDropDownModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputMonthExComponent),
            multi: true,
        },
    ],
})
export class InputMonthExComponent extends InputBaseComponent implements OnInit {
    private _month: number | undefined;
    get month() {
        return this._month;
    }
    set month(value: number | undefined) {
        this._month = value;
    }

    data: string = '';
    months: string[] = this.dateUtilsService.monthNames;

    constructor(private dateUtilsService: DateUtilsService) {
        super();
    }

    ngOnInit(): void {
        // Subscribe to form control changes to emit new values
        if (this.form && this.formControlName) {
            const control = this.form.get(this.formControlName);

            var month: number | undefined = undefined;

            if (control?.value) {
                month = control?.value;
                if (month) this.data = this.dateUtilsService.monthNamesFull[month - 1];
            }

            this.month = month;

            if (control) {
                control.valueChanges.subscribe((value) => {
                    if (value) {
                        this.month = value - 1;
                        this.data = this.dateUtilsService.monthNamesFull[this.month];
                    } else {
                        this.data = '';
                    }
                });
            }
        }
    }

    selectMonth(month: number): void {
        //this.month = month + 1
        //this.data = this.dateUtilsService.monthNamesFull[month]
        this.writeValue(month + 1);
    }
}
