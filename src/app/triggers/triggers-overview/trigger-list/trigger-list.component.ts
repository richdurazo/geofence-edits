import { Component, OnInit, Input } from '@angular/core';

import { TriggerApiService } from '../../shared/trigger-api.service';
import { TriggerModel } from '../../shared/trigger.model';

@Component({
  selector: 'app-trigger-list',
  templateUrl: './trigger-list.component.html',
  styleUrls: ['./trigger-list.component.scss']
})

export class TriggerListComponent implements OnInit {
    @Input() trigger: TriggerModel;
    triggers: TriggerModel[] = [];

  constructor(private triggerApi: TriggerApiService) { }

  ngOnInit() {
      this.getTriggers();
  }

  getTriggers () {
    this.triggerApi.getTriggers()
    .subscribe(
        data => this.processGetSuccess(data)
    )
  }

  processGetSuccess (data) {
      this.triggers = data;
  }

  deleteItem (idx) {
      this.triggerApi.deleteTrigger(this.triggers[idx])
      .subscribe(
          data => this.processDeleteSuccess(data, idx)
      )
  }

  processDeleteSuccess (data, idx) {
      this.triggers.splice(idx, 1);
  }

}
