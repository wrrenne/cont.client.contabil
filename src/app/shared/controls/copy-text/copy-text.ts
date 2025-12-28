import { Component, ElementRef, ViewChild } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroCheck, heroClipboard } from '@ng-icons/heroicons/outline';
import { ButtonIconComponent } from '../button-icon/button-icon';

@Component({
    selector: 'copy-text',
    standalone: true,
    imports: [ButtonIconComponent],
    providers: [
        provideIcons({
            heroClipboard,
            heroCheck,
        }),
    ],
    templateUrl: './copy-text.html',
})
export class CopyTextComponent {
    @ViewChild('content', { static: true })
    contentRef!: ElementRef<HTMLElement>;

    copied = false;

    copy(): void {
        const text = this.contentRef.nativeElement.innerText.trim();
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
            this.copied = true;
            setTimeout(() => (this.copied = false), 3000);
        });
    }
}
