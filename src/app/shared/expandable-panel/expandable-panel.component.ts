import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, animate, transition, style } from '@angular/animations';

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

    constructor(private contentApi: ContentApiService, private targetApi: TargetApiService) {
    }

    ngOnInit() {
        this.getGroupTargets();
    }

    getGroupTargets () {
        this.contentApi.getGroupTargets(this.item.id)
        .subscribe(
            data => {
                this.targets = data;
            }
        )
    }

    removeTarget (target) {
        this.contentApi.detachTargetFromGroup(this.item.id, target.id)
        .subscribe(data => {
            this.targets = data;
        })
    }

    toggleExpanded () {
        this.isExpanded = !this.isExpanded;
    }

    editTarget () {
        this.editing = true;
    }

    targetSelected (selectedItem) {
        var targetExists = this.targets.some(function (item) {
          return item.id === selectedItem.id;
        });
        if (!targetExists) {
            this.contentApi.attachTargetToGroup(this.item.id, selectedItem.id)
            .subscribe(data => {
                this.targets = data;;
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
