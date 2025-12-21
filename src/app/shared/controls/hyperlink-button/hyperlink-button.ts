import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'hyperlink-button',
    templateUrl: './hyperlink-button.html',
    standalone: true,
    imports: [CommonModule, NgIcon],
})
export class HyperlinkButtonComponent {
    @Input() icon: string;
    @Input() iconClass = 'text-base';
    @Input() text: string;
    @Input() link?: string;
    @Input() isButton = true;
    @Input() showSeparator = false;
    @Input() buttonLeftAlign = true;
    @Input() backgroundIconCss?: string;
    @Input() enabled = true;
    @Output() onButtonClick = new EventEmitter();

    constructor(private router: Router) {}

    buttonClick() {
        if (this.enabled) {
            this.onButtonClick.emit();

            if (this.link != undefined) {
                this.router.navigate([this.link]);
            }
        }
    }
}
