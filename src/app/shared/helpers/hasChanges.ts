import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export function hasChanges$(control: AbstractControl, initialValue: any): Observable<boolean> {
    return control.valueChanges.pipe(
        startWith(control.getRawValue()),
        map(() => !deepEqual(control.getRawValue(), initialValue)),
    );
}

function deepEqual(a: any, b: any): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}
