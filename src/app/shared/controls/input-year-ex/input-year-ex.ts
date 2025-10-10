import { Component, forwardRef, OnInit } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { DateUtilsService } from '../../services';
import { InputBaseComponent } from '../input-base/input-base';

@Component({
    selector: 'input-year-ex',
    templateUrl: './input-year-ex.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzDropdownMenuComponent, NzDropDownModule, NgIcon],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputYearExComponent),
            multi: true,
        },
    ],
})
export class InputYearExComponent extends InputBaseComponent implements OnInit {
    private _year: number;
    get year() {
        return this._year;
    }
    set year(value: number) {
        this._year = value;

        const start = value - 4;
        const end = value + 4;
        this.years = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }

    years: number[];

    constructor(private dateUtilsService: DateUtilsService) {
        super();
    }

    ngOnInit(): void {
        // Subscribe to form control changes to emit new values
        if (this.form && this.formControlName) {
            const control = this.form.get(this.formControlName);

            var ano: number;

            if (control?.value) {
                ano = control?.value;
            } else {
                ano = new Date().getFullYear();
            }

            this.year = ano;

            if (control) {
                control.valueChanges.subscribe((value) => {
                    this.year = value;
                });
            }
        }
    }

    changeYear(delta: number): void {
        this.year += delta;
    }

    selectYear(year: number): void {
        this.writeValue(year);
    }
}
