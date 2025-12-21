import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

export const MaskTypes = {
    cpf: '000.000.000-00',
    cnpj: '00.000.000/0000-00',
    cep: '00000-000',
    telefone: '00000-0000',
    rg: '00.000.000-0',
} as const;

export type MaskTypeKey = keyof typeof MaskTypes;

@Directive({
    selector: '[mask]',
})
export class MaskDirective {
    //@Input('mask') maskType?: 'cpf' | 'cnpj' | 'cep' | 'telefone' | 'rg';
    @Input('mask') maskType?: MaskTypeKey;

    constructor(
        private el: ElementRef,
        private control: NgControl,
    ) {}

    @HostListener('input', ['$event'])
    onInput(event: any) {
        let value = event.target.value;

        if (!this.maskType) {
            return;
        }

        switch (this.maskType) {
            case 'cpf':
                value = this.applyCPF(value);
                break;

            case 'cnpj':
                value = this.applyCNPJ(value);
                break;

            case 'cep':
                value = this.applyCEP(value);
                break;

            case 'telefone':
                value = this.applyTelefone(value);
                break;

            case 'rg':
                value = this.applyRG(value);
                break;
        }

        this.control.control?.setValue(value, { emitEvent: false });
    }

    // === Máscaras ===

    private applyCPF(value: string): string {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .slice(0, 14);
    }

    private applyCNPJ(value: string): string {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
            .slice(0, 18);
    }

    private applyCEP(value: string): string {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 9);
    }

    private applyTelefone(value: string): string {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 10);
    } // private applyTelefone(value: string): string {
    //     return value
    //         .replace(/\D/g, '')
    //         .replace(/(\d{2})(\d)/, '($1) $2')
    //         .replace(/(\d{5})(\d)/, '$1-$2')
    //         .slice(0, 15);
    // }

    private applyRG(value: string): string {
        value = value.replace(/[^0-9xX]/g, ''); // aceita X/x no final

        // 12.345.678-X
        return value
            .replace(/^(\d{1,2})(\d)/, '$1.$2')
            .replace(/^(\d{2}\.\d{1,3})(\d)/, '$1.$2')
            .replace(/^(\d{2}\.\d{3}\.\d{1,3})([\dxX])/, '$1-$2')
            .slice(0, 12); // tamanho final máximo
    }
}
