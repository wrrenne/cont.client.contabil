import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'percentage-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './percentage-bar.html',
})
export class PercentageBarComponent {
    @Input() percentage?: number;
    @Input() total?: number;
    @Input() done?: number;
    @Input() multiColor = true;
    @Input() showInfos = true;
    @Input() showPercentage = true;
    @Input() showDefaultBar = true;
    @Input() barClass = 'w-full';
    @Input() rounded = false;
    @Input() backgroundColor: string = 'blue';
    @Input() defaultBackgroundColor?: string;
    @Input() title?: string;
    @Input() bordered = false;
    @Input() heightClass = 'h-2';

    getBackgroundClass(): string {
        if (this.multiColor) {
            const p = this.getPercentage();

            if (p <= 25) return this._getBackgroundClass('red');
            if (p > 25 && p <= 50) return this._getBackgroundClass('yellow');
            if (p > 50 && p <= 99) return this._getBackgroundClass('green');
            return this._getBackgroundClass('blue');
        } else {
            return this._getBackgroundClass(this.backgroundColor);
        }
    }

    getDefaultClass(): string {
        if (!this.showDefaultBar) return '';

        if (this.multiColor) {
            const p = this.getPercentage();

            if (p <= 25) return this.bordered ? this._getBorderClass('red') : this._getDefaultClass('red');
            if (p > 25 && p <= 50) return this.bordered ? this._getBorderClass('yellow') : this._getDefaultClass('yellow');
            if (p > 50 && p <= 99) return this.bordered ? this._getBorderClass('green') : this._getDefaultClass('green');
            return this.bordered ? this._getBorderClass('blue') : this._getDefaultClass('blue');
        } else {
            return this.bordered
                ? this._getBorderClass(this.defaultBackgroundColor ?? this.backgroundColor)
                : this._getDefaultClass(this.defaultBackgroundColor ?? this.backgroundColor);
        }
    }

    private _getDefaultClass(backgroundColor: string): string {
        switch (backgroundColor) {
            case 'blue':
                return 'bg-blue-200 dark:bg-blue-900/50';
            case 'red':
                return 'bg-red-200 dark:bg-red-900/50';
            case 'green':
                return 'bg-green-200 dark:bg-green-900/50';
            case 'yellow':
                return 'bg-yellow-200 dark:bg-yellow-900/50';
            case 'silver':
                return 'bg-zinc-200 dark:bg-zinc-800/50';
            default:
                return '';
        }
    }

    private _getBackgroundClass(backgroundColor: string): string {
        switch (backgroundColor) {
            case 'blue':
                return 'bg-blue-500 dark:bg-blue-700';
            case 'red':
                return 'bg-red-500 dark:bg-red-700';
            case 'green':
                return 'bg-green-500 dark:bg-green-700';
            case 'yellow':
                return 'bg-yellow-500 dark:bg-yellow-700';
            default:
                return '';
        }
    }

    private _getBorderClass(backgroundColor: string): string {
        switch (backgroundColor) {
            case 'blue':
                return 'border border-blue-300 dark:border-blue-800';
            case 'red':
                return 'border border-red-300 dark:border-red-800';
            case 'green':
                return 'border border-green-300 dark:border-green-800';
            case 'yellow':
                return 'border border-yellow-300 dark:border-yellow-800';
            default:
                return '';
        }
    }

    getPercentage(): number {
        return this.percentage ?? Math.trunc((this.done! / this.total!) * 100);
    }
}
