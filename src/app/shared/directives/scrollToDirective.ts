import { Directive, Input, OnInit } from '@angular/core';

//<div appScrollTo="3"></div> <!-- Automatically scrolls to Div 3 on load -->

//<div>
//  <div id="1" style="height: 100px; background: lightblue;">Div 1</div>
//  <div id="2" style="height: 100px; background: lightcoral;">Div 2</div>
//  <div id="3" style="height: 100px; background: lightgreen;">Div 3</div>
//  <div id="4" style="height: 100px; background: lightsalmon;">Div 4</div>
//  <div id="5" style="height: 100px; background: lightgoldenrodyellow;">Div 5</div>
//</div>

@Directive({
    selector: '[appScrollTo]'
})
export class ScrollToDirective implements OnInit {
    @Input('appScrollTo') targetId!: string;

    ngOnInit() {
        this.scrollToElement();
    }

    private scrollToElement() {
        if (!this.targetId) return;

        const element = document.getElementById(this.targetId);
        if (element) {
            setTimeout(() => { // Ensures the view is rendered before scrolling
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }
}
