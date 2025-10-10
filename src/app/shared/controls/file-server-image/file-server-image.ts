import { Component, Input } from '@angular/core';
import { ApisUtilsService } from '../../services';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'file-server-image',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './file-server-image.html'
})
export class FileServerImageComponent {

    constructor(public apisUtilsService: ApisUtilsService)
    { }

    @Input() width?: number
    @Input() height?: number
    @Input() rounded = true
    @Input() src: string
    @Input() imageClass: string
}
