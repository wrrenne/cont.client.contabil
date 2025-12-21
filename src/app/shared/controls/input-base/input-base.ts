import { Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup } from '@angular/forms';

@Component({
    template: '',
})
export class InputBaseComponent<T = any> implements ControlValueAccessor {
    /* ===== Form metadata ===== */

    @Input() form!: FormGroup;
    @Input() formControlName!: string;
    @Input() label?: string;
    @Input() readonly = false;

    private _placeholderText: string;
    @Input() get placeholderText() {
        return this._placeholderText;
    }
    set placeholderText(value: string) {
        this._placeholderText = value;
    }

    disabled = false;

    /* ===== Internal value ===== */

    protected _value?: T;

    get value(): T | undefined {
        return this._value;
    }

    protected setValue(val: T | null | undefined): void {
        this._value = val ?? undefined;
    }

    /* ===== Validation helpers ===== */

    errorMessages: Record<string, string> = {
        required: 'Preenchimento obrigatório',
        email: 'E-mail inválido',
    };

    /* ===== CVA callbacks ===== */

    protected onChange: (value: T | undefined) => void = () => {};
    protected onTouched: () => void = () => {};

    /* ===== ControlValueAccessor ===== */

    writeValue(value: T | null | undefined): void {
        this.setValue(value);
    }

    registerOnChange(fn: (value: T | undefined) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /* ===========================
       Validation helpers
       =========================== */

    private get control(): AbstractControl | null {
        return this.form?.get(this.formControlName) ?? null;
    }

    get showError(): boolean {
        const c = this.control;
        return !!(c && c.invalid && (c.touched || c.dirty));
    }

    get isRequired(): boolean {
        const c = this.control;
        return !!(c && c.errors?.['required']);
    }

    get errorMessage(): string {
        const errors = this.control?.errors;
        if (!errors) return '';

        if (errors['required']) {
            return 'Campo obrigatório';
        }

        if (errors['email']) {
            return 'E-mail inválido';
        }

        if (errors['minlength']) {
            return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
        }

        if (errors['maxlength']) {
            return `Máximo de ${errors['maxlength'].requiredLength} caracteres`;
        }

        /* fallback for custom validators */
        const firstKey = Object.keys(errors)[0];
        return errors[firstKey] ?? 'Valor inválido';
    }
}
