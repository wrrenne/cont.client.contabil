import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputBaseComponent } from '../input-base/input-base';
import { ListItem } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'input-radio-text',
    templateUrl: './input-radio-text.html',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputRadioTextComponent),
        multi: true
    }]
})
export class InputRadioTextComponent extends InputBaseComponent {
    @Input() items: ListItem[] = [];
    @Input() color: string = 'bg-blue-500';
    @Output() onSelected = new EventEmitter<ListItem>();

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
        this.writeValue(id)
        this.onSelected.emit(this.items.find(x => x.id == id));
    }

    isSelected(id: number): boolean {
        return this.selectedId === id;
    }

    getCircleClasses(id: number): string[] {
        const base = ['px-4', 'py-1.5', 'rounded-full', 'flex', 'items-center', 'justify-center', 'transition-colors', 'border'];
        if (this.isSelected(id)) {
            const borderColor = 'border-transparent';
            return [...base, this.color, borderColor];
        } else {
            //const borderColor = this.color.replace('bg-', 'border-');
            const borderColor = 'border-gray-400 dark:border-gray-500'
            return [...base, borderColor];
        }
    }

    private focusSelectedCircle() {
        // Wait a tick for the view to update
        setTimeout(() => {
            const selectedIndex = this.items?.findIndex(i => i.id === this.selectedId);
            const selectedBtn = this.circleBtns?.get(selectedIndex);
            selectedBtn?.nativeElement.focus();
        });
    }
}
