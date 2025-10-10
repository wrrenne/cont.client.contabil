import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'page-title',
    templateUrl: './page-title.html',
    standalone: true,
    imports: [CommonModule],
    styleUrls: ['./page-title.scss']
})
export class PageTitleComponent {

    @Input() title?: string;
    @Input() subTitle?: string;
    @Input() subTitle2?: string;
    @Input() noBorder = false;

    @ContentChild('buttonsHeader') buttonsHeader: TemplateRef<any>;

    constructor(
    ) { }

}
