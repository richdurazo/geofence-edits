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

    deleteCampaign (data) {
      return false;
    }
}
