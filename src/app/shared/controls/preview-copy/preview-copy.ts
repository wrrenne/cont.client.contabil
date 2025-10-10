import { Component, Input } from '@angular/core';
import { HtmlUtilsService } from '../../services/htmlUtils.service';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'app-preview-copy',
    templateUrl: './preview-copy.html',
    standalone: true,
    imports: [CommonModule, NgIcon]
})
export class PreviewCopyComponent {

    /** The full string to preview & copy */
    @Input() value = '';

    /** Visible chars at the start of the preview */
    @Input() head = 6;

    /** Visible chars at the end of the preview */
    @Input() tail = 4;

    /** Optional label shown next to the icon */
    @Input() showCopyLabel = false;

    /** If true, always show the full string instead of a preview */
    @Input() showFull = false;

    @Input() color?: string

    copied = false;

    constructor(private htmlUtilsService: HtmlUtilsService) {
    }

    get displayValue(): string {
        if (this.showFull || !this.value) return this.value ?? '';
        const s = this.value ?? '';
        const min = this.head + this.tail + 1;
        if (s.length <= min) return s;
        const start = s.slice(0, Math.max(0, this.head));
        const end = this.tail > 0 ? s.slice(-this.tail) : '';
        return `${start}…${end}`;
    }

    get textColor(): string {
        return this.color ? this.htmlUtilsService.getTextColor(this.color) : ''
    }

    get iconColor(): string {
        return this.color ? this.htmlUtilsService.getIconColor(this.color) : ''
    }

    async copy(e?: Event) {
        e?.preventDefault();
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(this.value ?? '');
            } else {
                const ta = document.createElement('textarea');
                ta.value = this.value ?? '';
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
            }
            this.copied = true;
        } catch {
            this.copied = false;
        } finally {
            setTimeout(() => {
                this.copied = false;
            }, 1200);
        }
    }
}
