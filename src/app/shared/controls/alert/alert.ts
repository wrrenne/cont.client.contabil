import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'alert',
    standalone: true,
    imports: [CommonModule, NgIcon],
    templateUrl: './alert.html'
})
export class AlertComponent {
    @Input() title: string;
    @Input() description: string;
    @Input() description2?: string;
    @Input() type: AlertType;
    @Input() big = false
    @Input() iconBig = false
    @Input() textSmall = false

    getIcon(): string {
        switch (this.type) {
            case AlertType.Error:
                return 'ionCloseCircle';
            case AlertType.Success:
                return 'bootstrapCheckCircleFill';
            case AlertType.Warning:
                return 'bootstrapExclamationCircleFill';
            case AlertType.Info:
                return 'bootstrapInfoCircleFill';
            default:
                return 'bootstrapCheckCircleFill';
        }
    }

    getClass(): string {
        switch (this.type) {
            case AlertType.Error:
                return 'text-red-700 dark:text-red-500';
            case AlertType.Success:
                return 'text-green-700 dark:text-green-500';
            case AlertType.Warning:
                return 'text-yellow-700 dark:text-yellow-500';
            case AlertType.Info:
                return 'text-blue-700 dark:text-blue-500';
            default:
                return 'text-green-700 dark:text-green-500';
        }
    }

    getIconClass() {
        switch (this.type) {
            case AlertType.Error:
                return 'border-red-700 dark:border-red-800';
            case AlertType.Success:
                return 'border-green-700 dark:border-green-800';
            case AlertType.Warning:
                return 'border-yellow-700 dark:border-yellow-800';
            case AlertType.Info:
                return 'border-blue-700 dark:border-blue-800';
            default:
                return 'border-green-700 dark:border-green-800';
        }
    }
}

export enum AlertType {
    Error,
    Success,
    Warning,
    Info
}
