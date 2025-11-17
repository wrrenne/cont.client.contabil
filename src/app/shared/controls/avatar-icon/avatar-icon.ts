import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

@Component({
    selector: 'avatar-icon',
    standalone: true,
    imports: [CommonModule, NgIcon, NgxTippyModule],
    templateUrl: './avatar-icon.html',
})
export class AvatarIconComponent implements OnInit {
    @Input() rounded = false;
    @Input() circle = true;
    @Input() icon!: string;
    @Input() iconCss = 'text-lg';
    @Input() iconColor? = 'text-gray-800 dark:text-gray-200';
    @Input() size?: string = '3.5rem';
    @Input() bgColor = 'bg-avatar';
    @Input() tooltip?: string;
    @Input() badge: 'check' | 'warning' | 'custom' | 'none' = 'none';
    @Input() badgeSize = 18;
    @Input() badgeCustom?: string;
    @Input() badgeCustomClass?: string;

    tippyProps: any = { placement: 'top' };

    @HostBinding('style.width') get width() {
        return this.size || 'auto';
    }

    @HostBinding('style.height') get height() {
        return this.size || 'auto';
    }

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
