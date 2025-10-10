import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';

@Component({
    selector: 'circle-radio-button',
    templateUrl: './circle-radio-button.html',
    standalone: true,
    imports: [CommonModule]
})
export class CircleRadioButtonComponent {
    @Input() items: { id: number; text?: string }[] = [];
    @Input() color: string = 'bg-blue-500';
    @Output() selected = new EventEmitter<number>();

    @ViewChildren('circleBtn') circleBtns!: QueryList<ElementRef<HTMLDivElement>>;

    private _selectedId: number | undefined;
    @Input()
    set selectedId(val: number | undefined) {
        this._selectedId = val;
        this.focusSelectedCircle();
    }
    get selectedId(): number | undefined {
        return this._selectedId;
    }

    ngAfterViewInit() {
        this.focusSelectedCircle();
    }

    selectItem(id: number) {
        this.selectedId = id;
        this.selected.emit(id);
    }

    isSelected(id: number): boolean {
        return this.selectedId === id;
    }

    getCircleClasses(id: number): string[] {
        const base = ['w-10', 'h-10', 'rounded-full', 'flex', 'items-center', 'justify-center', 'transition-colors'];
        if (this.isSelected(id)) {
            return [...base, this.color];
        } else {
            const borderColor = this.color.replace('bg-', 'border-');
            return [...base, 'border', borderColor];
        }
    }

    private focusSelectedCircle() {
        // Wait a tick for the view to update
        setTimeout(() => {
            const selectedIndex = this.items.findIndex(i => i.id === this.selectedId);
            const selectedBtn = this.circleBtns?.get(selectedIndex);
            selectedBtn?.nativeElement.focus();
        });
    }
}
