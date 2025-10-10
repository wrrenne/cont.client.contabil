import { Component, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter, Input, SimpleChanges, ContentChild, TemplateRef } from '@angular/core';
import { StepperStepComponent } from './stepper-step';
import { stepSlideAnimation } from '../../animations';
import { NgIcon } from '@ng-icons/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'stepper',
    templateUrl: './stepper.html',
    standalone: true,
    imports: [CommonModule, NgIcon],
    animations: [stepSlideAnimation]
})
export class StepperComponent implements AfterContentInit {
    @ContentChildren(StepperStepComponent) steps!: QueryList<StepperStepComponent>;

    @ContentChild('stepperConclusion') stepperConclusion: TemplateRef<any>;

    @Input() selectedStep?: number;
    @Input() showConclusion = false

    ngOnChanges(changes: SimpleChanges): void {
        if ('selectedStep' in changes) {
            const newStep = changes['selectedStep'].currentValue;
            this.selectStep(newStep);
        }
    }

    @Output() beforeStepChange = new EventEmitter<{
        from: number;
        to: number;
        buttonNumber?: number;
        proceed: () => void;
    }>();

    selectedIndex = 0;
    direction: 'forward' | 'backward' = 'forward';

    ngAfterContentInit() {
        this.steps.forEach((step, index) => step.index = index + 1);
    }

    selectStep(i: number) {
        if (!this.steps) return;

        const stepsArr = this.steps.toArray();
        const currentStep = stepsArr[this.selectedIndex];

        if (i < 0 || i >= stepsArr.length) return;

        // Prevent moving forward if current step is invalid
        if (i > this.selectedIndex && currentStep?.isValid && !currentStep.isValid()) return;

        const direction = i > this.selectedIndex ? 'forward' : 'backward';

        if (this.beforeStepChange.observed) {
            this.beforeStepChange.emit({
                from: this.selectedIndex,
                to: i,
                proceed: () => {
                    this.direction = direction;
                    this.selectedIndex = i;
                }
            });
        } else {
            this.direction = direction;
            this.selectedIndex = i;
        }
    }

    get currentNextButtonText(): string {
        return this.steps.toArray()[this.selectedIndex]?.nextButtonText ?? (this.selectedIndex < this.steps.length - 1 ? 'Próximo' : 'Concluir');
    }

    get secondButtonText(): string | undefined {
        return this.steps.toArray()[this.selectedIndex]?.secondButtonText;
    }

    get activeStepKey() {
        return this.selectedIndex;
    }

    goForward(buttonNumber: number) {
        const currentStep = this.steps.toArray()[this.selectedIndex];
        const nextIndex = this.selectedIndex + 1;

        if (buttonNumber == 0 && !currentStep.isValid()) return;

        if (this.beforeStepChange.observed) {
            this.beforeStepChange.emit({
                from: this.selectedIndex,
                to: nextIndex,
                buttonNumber: buttonNumber,
                proceed: () => {
                    this.direction = 'forward';
                    this.selectedIndex = nextIndex;
                }
            });
        } else {
            this.direction = 'forward';
            this.selectedIndex = nextIndex;
        }
    }
}
