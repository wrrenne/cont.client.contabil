import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { Subscription } from 'rxjs';
import { toggleAnimation } from '../../animations';
import { MessageService, SearchService } from '../../services';
import { Vars } from '../../variables';

@Component({
    selector: 'search',
    templateUrl: './search.html',
    standalone: true,
    imports: [CommonModule, NgTemplateOutlet, FormsModule, NgIcon],
    animations: [toggleAnimation],
})
export class SearchComponent {
    subscription: Subscription;

    search = false;

    @Input() placeHolderText: string;

    @Output() onQuery = new EventEmitter<string>();
    @Output() onOpenBox = new EventEmitter();

    @ContentChild('content') content: TemplateRef<any>;

    private _query: string;
    get query() {
        return this._query;
    }
    set query(value: string) {
        this._query = value;
        this.searchService.sendCommand(value);
        this.onQuery.emit(value);
    }

    isFormVisible: boolean = false;

    constructor(
        private elementRef: ElementRef,
        private vars: Vars,
        private searchService: SearchService,
        private messageService: MessageService<boolean>,
    ) {
        this.subscription = this.messageService.onMessage().subscribe((x) => {
            this.isFormVisible = x;
            this.search = x;
        });
    }

    onFocus() {
        if (this.vars.search?.showSearchBox) {
            this.onOpenBox.emit();
            this.isFormVisible = true;
        }
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: MouseEvent) {
        const clickedInside = this.elementRef.nativeElement.contains(event.target);
        if (!clickedInside) {
            this.search = false;
            this.isFormVisible = false; // Close form if clicked outside
        }
    }
}
