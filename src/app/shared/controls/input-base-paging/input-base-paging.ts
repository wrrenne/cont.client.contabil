import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PageItemBase, PagingBase } from '../../models';

@Component({
    template: '',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputBasePagingComponent),
            multi: true,
        },
    ],
})
export class InputBasePagingComponent<T extends PageItemBase> extends PagingBase<T> implements ControlValueAccessor {
    @Input() form: FormGroup;
    @Input() formControlName: any;
    @Input() label: string;
    @Input() label2: string;
    @Input() readonly = false;

    private _placeholderText: string;
    @Input() get placeholderText() {
        if (this._placeholderText) return this._placeholderText;
        else return this.label;
    }
    set placeholderText(value: string) {
        this._placeholderText = value;
    }

    public value: string | number | undefined;

    disabled = false;

    onChange: any = () => {};
    onTouched: any = () => {};

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
