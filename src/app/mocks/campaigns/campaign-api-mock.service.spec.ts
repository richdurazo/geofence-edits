/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CampaignApiMockService } from './campaign-api-mock.service';

let campaignApiMockService;

describe('CampaignApiMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampaignApiMockService]
    });

    campaignApiMockService = TestBed.get(CampaignApiMockService);
  });

  it('should exist', () => {
    expect(campaignApiMockService).toBeTruthy();
  });

  describe('getCampaigns', () => {
    it('should be a function', () => {
      expect(typeof campaignApiMockService.getCampaigns).toEqual('function');
    });

    it('should return false', () => {
      expect(campaignApiMockService.getCampaigns()).toEqual(false);
    })
  });

  describe('createCampaign', () => {
    it('should be a function', () => {
      expect(typeof campaignApiMockService.createCampaign).toEqual('function');
    });

    it('should return false', () => {
      expect(campaignApiMockService.createCampaign()).toEqual(false);
    })
  });

  describe('deleteCampaign', () => {
    it('should be a function', () => {
      expect(typeof campaignApiMockService.deleteCampaign).toEqual('function');
    });

    it('should return false', () => {
      expect(campaignApiMockService.deleteCampaign()).toEqual(false);
    })
  });
});
