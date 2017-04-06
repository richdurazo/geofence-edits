import { Component, OnInit } from '@angular/core';

import { CampaignApiService } from '../../shared/campaign-api.service';
import { CampaignModel } from '../../shared/campaign.model';

@Component({
  selector: 'app-campaigns-table',
  templateUrl: './campaigns-table.component.html',
  styleUrls: ['./campaigns-table.component.scss']
})
export class CampaignsTableComponent implements OnInit {

    campaigns: CampaignModel[] = [];

    constructor(private campaignApi: CampaignApiService) { }

  ngOnInit() {
      this.getCampaigns();
  }

  getCampaigns () {
    this.campaignApi.getCampaigns()
    .subscribe(
        data => this.processGetSuccess(data)
    )
  }

  processGetSuccess (data) {
      this.campaigns = data;
  }

  deleteItem (idx) {
      this.campaignApi.deleteCampaign(this.campaigns[idx])
      .subscribe(
          data => this.processDeleteSuccess(data, idx)
      )
  }

  processDeleteSuccess (data, idx) {
      this.campaigns.splice(idx, 1);
  }

}
