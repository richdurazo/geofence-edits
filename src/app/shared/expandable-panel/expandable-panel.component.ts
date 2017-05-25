import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ContentApiService } from '../../content/shared/content-api.service';
import { TargetApiService } from '../../shared/target-api.service';

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

    @Input() item: any;

    targets: any = [];

    isExpanded: boolean = true;

    editing: boolean = false;

    searchString: string = "";

    targetCtrl: FormControl;

    filteredResults: any;

    options = [];

    constructor(private contentApi: ContentApiService, private targetApi: TargetApiService) {
    }

    ngOnInit() {
        this.getGroupTargets();
        this.fetchTargetOptions();
        this.targetCtrl = new FormControl();
        this.setFilteredResults();
    }

    getGroupTargets () {
        this.contentApi.getGroupTargets(this.item.id)
        .subscribe(
            data => {
                this.targets = data;
            }
        )
    }

    fetchTargetOptions () {
        this.targetApi.fetchTargets()
        .subscribe(
            data => {
                this.options = data;
            }
        )
    }

    removeTarget (target) {
        this.contentApi.detachTargetFromGroup(this.item.id, target.id)
        .subscribe(data => {
            this.targets = data;
        })
    }

    setFilteredResults () {
        this.filteredResults = this.targetCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterStates(name));
    }

    filterStates(val: string) {
      return !!val && val.length ? this.options.filter(s => {
          return s.display_name.toLowerCase().indexOf(val.toLowerCase()) != -1;
      }) : this.options;
    }

    toggleExpanded () {
        this.isExpanded = !this.isExpanded;
    }

    editTarget () {
        this.editing = true;
    }

    itemSelected (selectedItem, event) {
        if (event.isUserInput && this.targets.indexOf(selectedItem) === -1) {
            this.targetCtrl.setValue(selectedItem.display_name);
            this.contentApi.attachTargetToGroup(this.item.id, selectedItem.id)
            .subscribe(data => {
                this.targets = data;
                this.setFilteredResults();
                this.targetCtrl.setValue(null);
            })
        }
    }

    updateItem () {
        this.contentApi.updateContentGroup(this.item)
        .subscribe(
            data => this.processUpdateSuccess(data)
        )
    }

    processUpdateSuccess (data) {
        this.editing = false;
    }

    removeItem () {
        console.log('this.item', this.item);
    }

}
