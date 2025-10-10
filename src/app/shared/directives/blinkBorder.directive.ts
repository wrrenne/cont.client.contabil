import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition, AnimationBuilder, AnimationPlayer } from '@angular/animations';

@Directive({
    selector: '[appBlinkBorder]'
})
export class BlinkBorderDirective implements OnInit, OnDestroy {
    @Input() blinkDuration: number = 4000; // Duration for the blinking effect
    private player: AnimationPlayer | null = null;
    private isAnimating: boolean = false; // To control the animation state

    constructor(private el: ElementRef, private builder: AnimationBuilder) { }

    ngOnInit() {
        // Do not start the animation automatically
    }

    // Method to trigger the animation when called
    triggerBlink() {
        if (this.isAnimating) return; // Prevent multiple simultaneous animations

        // Set the animation state to start
        this.isAnimating = true;
        this.el.nativeElement.style.border = '2px solid blue';

        const animation = this.builder.build([
            trigger('blinkBorder', [
                state('start', style({
                    border: '2px solid blue',
                })),
                transition('start => end', [
                    animate('0.5s', style({
                        border: '2px solid transparent',
                    })),
                    animate('0.5s', style({
                        border: '2px solid blue',
                    })),
                ]),
                transition('end => start', [
                    animate('0.5s', style({
                        border: '2px solid transparent',
                    })),
                    animate('0.5s', style({
                        border: '2px solid blue',
                    })),
                ]),
            ])
        ]);

        // Create and play the animation
        this.player = animation.create(this.el.nativeElement);
        this.player.play();

        // Reset after the given duration
        setTimeout(() => {
            this.resetAnimation();
        }, this.blinkDuration);
    }

    private resetAnimation() {
        if (this.player) {
            this.player.destroy(); // Clean up the animation
        }
        // Optionally reset the border style after the animation completes
        this.el.nativeElement.style.border = '2px solid transparent';
        this.isAnimating = false; // Allow the animation to be triggered again
    }

    ngOnDestroy() {
        // Cleanup the player if the directive is destroyed
        if (this.player) {
            this.player.destroy();
        }
    }
}
