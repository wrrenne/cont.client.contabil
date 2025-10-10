import { Component, Input } from '@angular/core';

@Component({
    selector: 'label-bullet',
    templateUrl: './label-bullet.html'
})
export class LabelBulletComponent {
    @Input() bulletClass: string = '';
    @Input() label: string = '';
    @Input() bulletShape: 'dot' | 'square' = 'dot';
    @Input() bulletSize: 'sm' | 'md' | 'lg' = 'md'; // <<< NEW

    get sizeClasses(): string {
        switch (this.bulletSize) {
            case 'sm':
                return 'w-2 h-2';
            case 'lg':
                return 'w-4 h-4';
            default:
                return 'w-3 h-3'; // 'md'
        }
    }
}
