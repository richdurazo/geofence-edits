import { TestBed, inject } from '@angular/core/testing';

import { AuthCustomHttpService } from '../../auth/auth-custom-http.service';
import { AuthCustomHttpServiceMock } from '../../mocks/auth/auth-custom-http-mock.service';

import { CampaignApiService } from './campaign-api.service';

describe('CampaignApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          CampaignApiService,
          { provide: AuthCustomHttpService, useClass: AuthCustomHttpServiceMock }
      ]
    });
  });

  it('should ...', inject([CampaignApiService], (service: CampaignApiService) => {
    expect(service).toBeTruthy();
  }));
});
