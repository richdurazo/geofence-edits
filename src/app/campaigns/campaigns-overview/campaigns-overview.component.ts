import { Component, OnInit } from '@angular/core';

import { CampaignApiService } from '../shared/campaign-api.service';

@Component({
  selector: 'app-campaigns-overview',
  templateUrl: './campaigns-overview.component.html',
  styleUrls: ['./campaigns-overview.component.scss']
})
export class CampaignsOverviewComponent implements OnInit {

  constructor(private campaignApi: CampaignApiService) { }

  ngOnInit() {
      this.campaignApi.getCampaigns()
      .subscribe(
          data => this.processSuccess(data)
      )
  }

  processSuccess (data) {
      console.log('campaigns data', data);
  }

}
