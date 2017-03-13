import { Component, OnInit } from '@angular/core';

import { TriggerApiService } from '../shared/trigger-api.service';
import { TriggerModel } from '../shared/trigger.model';

@Component({
  selector: 'app-trigger-overview',
  templateUrl: './trigger-overview.component.html',
  styleUrls: ['./trigger-overview.component.scss']
})
export class TriggerOverviewComponent implements OnInit {

    triggers: TriggerModel[] = [];

  constructor(private triggerApi: TriggerApiService) { }

  ngOnInit() {
      this.triggerApi.getTriggers()
      .subscribe(
          data => this.processGetSuccess(data)
      )
  }

  processGetSuccess (data) {
      console.log('trigger data', data);
      this.triggers = data;
  }

  deleteItem (idx) {
      console.log('idx', idx);
      console.log('this.triggers[idx]', this.triggers[idx]);
      this.triggerApi.deleteTrigger(this.triggers[idx])
      .subscribe(
          data => this.processDeleteSuccess(data, idx)
      )
  }

  processDeleteSuccess (data, idx) {
      console.log('processDeleteSuccess data', data);
      this.triggers.splice(1, idx);
  }

}
