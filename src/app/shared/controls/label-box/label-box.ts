import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

@Component({
    selector: 'label-box',
    templateUrl: './label-box.html',
    standalone: true,
    imports: [CommonModule, NgxTippyModule],
})
export class LabelBoxComponent implements OnInit {
    @Input() label?: any;
    @Input() bgColorClass = 'bg-neutral-200 dark:bg-neutral-800';
    @Input() textColorClass = 'text-neutral-700 dark:text-neutral-300';
    @Input() borderColorClass = 'border-neutral-200 dark:border-neutral-800';
    @Input() tooltip?: string;
    @ContentChild('content') content: TemplateRef<any>;

    tippyProps: any = { placement: 'top' };

    constructor(private el: ElementRef<HTMLElement>) {}

    ngOnInit() {
        // Detect if component is inside a Zorro modal or drawer
        const modalContent = this.el.nativeElement.closest('.ant-modal-content');
        const drawerContent = this.el.nativeElement.closest('.ant-drawer-content-wrapper');

        if (modalContent) {
            this.tippyProps.appendTo = () => modalContent;
        } else if (drawerContent) {
            this.tippyProps.appendTo = () => drawerContent;
        } else {
            this.tippyProps.appendTo = 'parent';
        }
    }
}
