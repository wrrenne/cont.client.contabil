import { AbstractControl, ValidationErrors } from '@angular/forms';

// ====================== CPF ======================
export function cpfValidator(control: AbstractControl): ValidationErrors | null {
    const value = (control.value || '').replace(/\D/g, '');
    if (value.length !== 11) return { cpfInvalid: true };

    let sum = 0,
        rest;

    for (let i = 1; i <= 9; i++) sum += parseInt(value.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(value.substring(9, 10))) return { cpfInvalid: true };

    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(value.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;

    return rest !== parseInt(value.substring(10, 11)) ? { cpfInvalid: true } : null;
}

// ====================== CNPJ ======================
export function cnpjValidator(control: AbstractControl): ValidationErrors | null {
    const value = (control.value || '').replace(/\D/g, '');
    if (value.length !== 14) return { cnpjInvalid: true };

    let length = value.length - 2;
    let numbers = value.substring(0, length);
    let digits = value.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += +numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== +digits.charAt(0)) return { cnpjInvalid: true };

    length++;
    numbers = value.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += +numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result !== +digits.charAt(1) ? { cnpjInvalid: true } : null;
}
