import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputBaseComponent } from '../input-base/input-base';
import * as _ from 'lodash';
import { NzSelectModule } from 'ng-zorro-antd/select';


@Component({
    selector: 'input-select-number-ex',
    templateUrl: './input-select-number-ex.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NzSelectModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputSelectNumberExComponent),
        multi: true
    }]
})
export class InputSelectNumberExComponent extends InputBaseComponent implements OnInit {

    @Input() showSearch = true
    @Input() start = 1;
    @Input() end = 100;

    numbers: number[];

    ngOnInit(): void {
        this.numbers = this.fillNumbers(this.start, this.end + 1);
    }

    fillNumbers(inicio: number, fim: number): number[] {

        return _.range(inicio, fim)
            .map((d: number): number => {
                return d;
            });
    }
}
