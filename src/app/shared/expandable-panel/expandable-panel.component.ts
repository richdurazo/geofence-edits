import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'app-expandable-panel',
  templateUrl: './expandable-panel.component.html',
  styleUrls: ['./expandable-panel.component.scss'],
  animations: [
      trigger('headerChange', [
          state('true' ,
              style({ 'border-width': '0' }),
          ),
          state('false',
              style({ 'border-width': '1px' })
          ),
          transition('void => *', style({ 'border-bottom': '0' })
          ),
          transition('* => *', animate('.25s ease-in')),
      ]),
      trigger('expandChange', [
          state('true' ,
              style({ height: '0', display : 'none' }),
          ),
          state('false',
              style({ height: '*', display: '*' })
          ),
          transition('void => *', style({ height: '0' })
          ),
          transition('true => false', [
                style({overflow: 'hidden'}),
                animate('.5s ease-out', style({height: '*'})),
          ]),
          transition('false => true', [
                style({overflow: 'hidden'}),
                animate('.5s ease-out', style({height: '0'})),
          ]),
      ]),
      trigger('iconChange', [
          state('true',
              style({ transform: 'rotate( -180deg )' })
          ),
          state('false',
              style({ transform: 'rotate( 0deg )' })
          ),
          transition('void => *', style({ transform: 'rotate( 0deg )' })
          ),
          transition('* => *', animate('.25s'))
      ])
  ]
})
export class ExpandablePanelComponent implements OnInit {

    @Input() header: string;

    isExpanded: boolean = true;

    constructor() { }

    ngOnInit() {
    }

    toggleExpanded () {
        console.log('this.isExpanded', this.isExpanded);
        this.isExpanded = !this.isExpanded;
    }

}
