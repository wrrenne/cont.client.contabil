import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'stepper-step',
    standalone: true,
    template: ''
})
export class StepperStepComponent {
    @ContentChild('stepperTitle', { static: true }) title!: TemplateRef<any>;
    @ContentChild('stepperContent', { static: true }) content!: TemplateRef<any>;

    @Input() isValid: () => boolean = () => true;
    @Input() nextButtonText: string | undefined;
    @Input() secondButtonText?: string

    index!: number;
}
