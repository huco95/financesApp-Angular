import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('LoginPage => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ right: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ right: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('HomePage => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('* => MovePage', [
      query(':enter', [
        style({ opacity: '0' })
      ]),
      group([
        query(':enter', [
          animate('300ms ease', style({ opacity: '1' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('MovePage => *', [
      query(':leave', [
        style({ opacity: '1' })
      ]),
      group([
        query(':leave', [
          animate('300ms ease', style({ opacity: '0' }))
        ])
      ]),
      query(':leave', animateChild()),
    ]),
    transition('RegisterPage => *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ right: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ right: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);