import { Component, OnInit } from '@angular/core';

import { CampaignApiService } from '../shared/campaign-api.service';
import { CampaignModel } from '../shared/campaign.model';

@Component({
  selector: 'app-campaigns-overview',
  templateUrl: './campaigns-overview.component.html',
  styleUrls: ['./campaigns-overview.component.scss']
})
export class CampaignsOverviewComponent implements OnInit {

    campaigns: CampaignModel[] = [];

  constructor(private campaignApi: CampaignApiService) { }

  ngOnInit() {
      this.campaignApi.getCampaigns()
      .subscribe(
          data => this.processGetSuccess(data)
      )
  }

  processGetSuccess (data) {
      console.log('campaigns data', data);
      this.campaigns = data;
  }

  deleteItem (idx) {
      console.log('idx', idx);
      console.log('this.campaigns[idx]', this.campaigns[idx]);
      this.campaignApi.deleteCampaign(this.campaigns[idx].id)
      .subscribe(
          data => this.processDeleteSuccess(data, idx)
      )
  }

  processDeleteSuccess (data, idx) {
      console.log('processDeleteSuccess data', data);
      this.campaigns.splice(1, idx);
  }

}
