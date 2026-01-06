import {
  trigger,
  transition,
  style,
  query,
  group,
  animate
} from '@angular/animations';

const ease = 'cubic-bezier(.25,.8,.25,1)';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    // container setup
    style({ position: 'relative', overflow: 'hidden' }),

    // make both pages absolute for animation
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      })
    ], { optional: true }),

    // entering page starts offscreen right
    query(':enter', [
      style({
        transform: 'translateX(100%)',
        opacity: 0
      })
    ], { optional: true }),

    group([
      // leaving page slides slightly left and fades
      query(':leave', [
        animate('500ms ' + ease, style({
          transform: 'translateX(-20%) scale(0.95)',
          opacity: 0.5
        }))
      ], { optional: true }),

      // entering page slides in from right and becomes fully opaque
      query(':enter', [
        animate('600ms ' + ease, style({
          transform: 'translateX(0%) scale(1)',
          opacity: 1
        }))
      ], { optional: true })
    ])
  ])
]);
