import { TestBed, inject } from '@angular/core/testing';

import { CampaignApiService } from './campaign-api.service';

describe('CampaignApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampaignApiService]
    });
  });

  it('should ...', inject([CampaignApiService], (service: CampaignApiService) => {
    expect(service).toBeTruthy();
  }));
});
