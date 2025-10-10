import { Component, OnInit, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { InputBaseComponent } from '../input-base/input-base';

@Component({
    selector: 'input-day-ex',
    templateUrl: './input-day-ex.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzDropDownModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputDayExComponent),
            multi: true,
        },
    ],
})
export class InputDayExComponent extends InputBaseComponent implements OnInit {
    private _day: number | undefined;
    get day() {
        return this._day;
    }
    set day(value: number | undefined) {
        this._day = value;
    }

    days: number[];

    constructor() {
        super();

        const start = 1;
        const end = 31;
        this.days = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }

    ngOnInit(): void {
        // Subscribe to form control changes to emit new values
        if (this.form && this.formControlName) {
            const control = this.form.get(this.formControlName);

            var day: number | undefined = undefined;

            if (control?.value) {
                day = control?.value;
            }

            this.day = day;

            if (control) {
                control.valueChanges.subscribe((value) => {
                    this.day = value;
                });
            }
        }
    }

    selectDay(day: number): void {
        this.writeValue(day);
    }
}
