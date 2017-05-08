import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'app-collapsible-panel',
  templateUrl: './collapsible-panel.component.html',
  styleUrls: ['./collapsible-panel.component.scss'],
  animations: [
      trigger('collapseChange', [
          state('true' ,
              style({ padding: '0 24px', height: '0', overflow : 'hidden' }),
          ),
          state('false',
              style({ height: '*' })
          ),
          transition('* => *', animate('.25s ease-in'))
      ]),
      trigger('iconChange', [
          state('true',
              style({ transform: 'rotate( -180deg )' })
          ),
          state('false',
              style({ transform: 'rotate( 0deg )' })
          ),
          transition('* => *', animate('.25s'))
      ])
  ]
})
export class CollapsiblePanelComponent implements OnInit {

    @Input() header: string;

    isCollapsed: boolean = true;

      constructor() { }

      ngOnInit() {
      }

      toggleCollapsed () {
          console.log('this.isCollapsed', this.isCollapsed);
          this.isCollapsed = !this.isCollapsed;
      }

}
