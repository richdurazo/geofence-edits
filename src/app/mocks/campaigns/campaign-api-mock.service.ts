import { Injectable } from '@angular/core';

@Injectable()
export class CampaignApiMockService {

    constructor() {}

    getCampaigns () {
      return false;
    }

    getCampaign () {
      return false;
    }

    getCampaignTriggers () {
        return false;
    }

    createCampaign (data) {
      return false;
    }

    attachTrigger (campaign_id, trigger_id) {
        return false;
    }

    deleteCampaign (data) {
      return false;
    }
}
