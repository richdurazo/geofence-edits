import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-expandable-panel',
  templateUrl: './expandable-panel.component.html',
  styleUrls: ['./expandable-panel.component.scss'],
  animations: [
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
                animate('.25s ease-out', style({height: '*'})),
          ]),
          transition('false => true', [
                style({overflow: 'hidden'}),
                animate('.25s ease-out', style({height: '0'})),
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

    targets: any = [];

    isExpanded: boolean = true;

    editing: boolean = false;

    searchString: string = "";

    stateCtrl: FormControl;

    filteredResults: any;

    states = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ];

    constructor() {
      this.stateCtrl = new FormControl();

    }

    ngOnInit() {
        this.setFilteredResults()
    }

    setFilteredResults () {
        this.filteredResults = this.stateCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterStates(name));
    }

    filterStates(val: string) {
      return val ? this.states.filter(s => new RegExp(`^${val}`, 'gi').test(s))
                 : this.states;
    }

    toggleExpanded () {
        this.isExpanded = !this.isExpanded;
    }

    editTarget () {
        this.editing = true;
    }

    itemSelected (event) {
        console.log('event.source.value', event.source.value);
        console.log('this.stateCtrl', this.stateCtrl);
        if (this.targets.indexOf(event.source.value) === -1) {
            this.targets.push(event.source.value);
        }
        this.stateCtrl.setValue(null);
        this.setFilteredResults();
    }

}
