import { Component, Input } from '@angular/core';

@Component({
    selector: 'regime-tag',
    templateUrl: './regime-tag.html',
    standalone: true,
})
export class RegimeTagComponent {
    private _regime: string | undefined;
    @Input() get regime() {
        return this._regime;
    }
    set regime(value: string | undefined) {
        this._regime = value;
    }

    getClass(): string {
        switch (this.regime) {
            case 'Lucro Presumido':
                return 'tag-blue';
            case 'Lucro Real':
                return 'tag-green';
            case 'Autônomo':
                return 'tag-sky';
            case 'MEI':
                return 'tag-yellow';
            case 'Simples':
                return 'tag-red';
        }

        return 'tag-muted-outline';
    }
}
