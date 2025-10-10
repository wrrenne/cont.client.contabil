import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

@Component({
    selector: 'avatar-icon',
    standalone: true,
    imports: [CommonModule, NgIcon, NgxTippyModule],
    templateUrl: './avatar-icon.html',
})
export class AvatarIconComponent {
    @Input() rounded = true;
    @Input() circle = false;
    @Input() icon: string;
    @Input() iconCss = 'text-lg';
    @Input() iconColor? = 'text-gray-800 dark:text-gray-200';
    @Input() size?: string = '3.5rem';
    @Input() bgColor = 'bg-avatar';
    @Input() tooltip?: string;
    @Input() badge: 'check' | 'warning' | 'custom' | 'none' = 'none';
    @Input() badgeSize = 18;
    @Input() badgeCustom?: string;
    @Input() badgeCustomClass?: string;

    @HostBinding('style.width') get width() {
        return this.size || 'auto'; // Default to 'auto' if size is not provided
    }

    @HostBinding('style.height') get height() {
        return this.size || 'auto'; // Set the same for height or customize further
    }

    constructor() {}

    //getClass(): string {
    //    var result = this.rounded ? "rounded-full " : "rounded-md "

    //    result += this.bgClass + " "

    //    switch (this.color) {
    //        case 'success':
    //            result += `text-success bg-success-light dark:text-success-light dark:bg-success`
    //            break;
    //        case 'primary':
    //            result += `text-primary bg-primary-light dark:text-primary-light dark:bg-primary`
    //            break;
    //        case 'secondary':
    //            result += `text-secondary bg-secondary-light dark:text-secondary-light dark:bg-secondary`
    //            break;
    //        case 'warning':
    //            result += `text-yellow-900 bg-yellow-300 dark:text-yellow-900 dark:bg-yellow-700`
    //            break;
    //        case 'danger':
    //            result += `text-danger bg-danger-light dark:text-danger-light dark:bg-danger`
    //            break;
    //        case 'info':
    //            result += `text-info bg-info-light dark:text-info-light dark:bg-info`
    //            break;
    //        case 'silver':
    //            result += `text-gray bg-silver-light dark:text-silver-light dark:bg-silver`
    //            break;
    //        case 'purple':
    //            result += `text-purple-900 bg-purple-300 dark:text-purple-900 dark:bg-purple-700`
    //            break;
    //        case 'white':
    //            result += `bg-gray-900 text-white dark:bg-white dark:text-black`
    //            break;
    //        default:
    //            result += `text-gray-400 bg-transparent dark:text-silver-light border border-gray-400 dark:border-gray-700`
    //            break;
    //    }

    //    return result;
    //}
}
