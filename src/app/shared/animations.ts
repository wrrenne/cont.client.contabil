import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideDownUp = trigger('slideDownUp', [
    state('true', style({ height: '0', opacity: '0' })),
    state('false', style({ height: '*', opacity: '1' })),
    transition('true => false', animate(300)),
    transition('false => true', [animate(300)])
]);

export const toggleAnimation = trigger('toggleAnimation', [
    transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
    transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
]);

export const fadeInAnimation = trigger('fadeInAnimation', [
    state('void', style({ opacity: 0 })), // Initial state when element is not present
    transition(':enter', [
        animate('500ms ease-in', style({ opacity: 1 })) // Animation on enter
    ])
]);

export const stepSlideAnimation = trigger('stepSlideAnimation', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX({{ enterX }})' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
    ], { params: { enterX: '0%' } }),

    transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX({{ leaveX }})' }))
    ], { params: { leaveX: '0%' } }),
]);

export const stepDownAnimation = trigger('expandCollapse', [
    transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
    ]),
    transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('300ms ease-in', style({ height: '0px', opacity: 0 }))
    ])
]);

export const expandCollapseAnimation = trigger('expandCollapse', [
    transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
    ]),
    transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('300ms ease-in', style({ height: '0px', opacity: 0 }))
    ])
])
