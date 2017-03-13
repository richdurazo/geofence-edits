import { Component, OnInit } from '@angular/core';
import { TriggerApiService } from '../shared/trigger-api.service';
import { TriggerModel } from '../shared/trigger.model';

@Component({
  selector: 'app-trigger-creator-form',
  templateUrl: './trigger-creator-form.component.html',
  styleUrls: ['./trigger-creator-form.component.scss']
})
export class TriggerCreatorFormComponent implements OnInit {

    trigger: TriggerModel;

  constructor(private triggerApi: TriggerApiService) { }

  ngOnInit() {
      this.trigger = new TriggerModel();
      this.setModelDefaults();
  }

  public submitForm () {
      var obj = JSON.parse(JSON.stringify(this.trigger));

      this.triggerApi.createTrigger(obj)
      .subscribe(
          data => this.processSuccess(data)
      )
  }

  processSuccess (data) {
      console.log('saved trigger data', data);
  }


  private setModelDefaults () {
      this.trigger.name = '';
      this.trigger.value = '';
      this.trigger.campaign_id = '';
  }

}
