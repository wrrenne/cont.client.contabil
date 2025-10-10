import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    template: '',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputBaseComponent),
        multi: true
    }]
})
export class InputBaseComponent implements ControlValueAccessor {

    @Input() form: FormGroup
    @Input() formControlName: any
    @Input() label: string
    @Input() readonly = false
    disabled = false

    private _placeholderText: string
    @Input() get placeholderText() {
        return this._placeholderText
    }
    set placeholderText(value: string) {
        this._placeholderText = value
    }

    private _value: any
    set value(val: any) {
        if (val !== this._value) {
            this._value = val
        }
    }
    get value(): any {
        return this._value
    }

    errorMessages: Record<string, string> = {
        required: 'Preenchimento obrigatório',
        email: 'E-mail inválido'
    }

    onChange: any = (_: any) => { };
    onTouch: any = () => { };

    writeValue(value: any) {
        this.value = value
        this.onChange(value)
        this.onTouch(value)
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
