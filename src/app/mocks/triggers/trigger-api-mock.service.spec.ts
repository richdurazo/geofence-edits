/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TriggerApiMockService } from './trigger-api-mock.service';

let triggerApiMockService;

describe('TriggerApiMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TriggerApiMockService]
    });

    triggerApiMockService = TestBed.get(TriggerApiMockService);
  });

  it('should exist', () => {
    expect(triggerApiMockService).toBeTruthy();
  });

  describe('getTriggers', () => {
    it('should be a function', () => {
      expect(typeof triggerApiMockService.getTriggers).toEqual('function');
    });

    it('should return false', () => {
      expect(triggerApiMockService.getTriggers()).toEqual(false);
    })
  });

  describe('createTrigger', () => {
    it('should be a function', () => {
      expect(typeof triggerApiMockService.createTrigger).toEqual('function');
    });

    it('should return false', () => {
      expect(triggerApiMockService.createTrigger()).toEqual(false);
    })
  });

  describe('createTouchTrigger', () => {
    it('should be a function', () => {
      expect(typeof triggerApiMockService.createTouchTrigger).toEqual('function');
    });

    it('should return false', () => {
      expect(triggerApiMockService.createTouchTrigger()).toEqual(false);
    })
  });

  describe('createAudioTrigger', () => {
    it('should be a function', () => {
      expect(typeof triggerApiMockService.createAudioTrigger).toEqual('function');
    });

    it('should return false', () => {
      expect(triggerApiMockService.createAudioTrigger()).toEqual(false);
    })
  });

  describe('createBeaconTrigger', () => {
    it('should be a function', () => {
      expect(typeof triggerApiMockService.createBeaconTrigger).toEqual('function');
    });

    it('should return false', () => {
      expect(triggerApiMockService.createBeaconTrigger()).toEqual(false);
    })
  });
  describe('createGeofenceTrigger', () => {
    it('should be a function', () => {
      expect(typeof triggerApiMockService.createGeofenceTrigger).toEqual('function');
    });

    it('should return false', () => {
      expect(triggerApiMockService.createGeofenceTrigger()).toEqual(false);
    })
  });

  describe('deleteTrigger', () => {
    it('should be a function', () => {
      expect(typeof triggerApiMockService.deleteTrigger).toEqual('function');
    });

    it('should return false', () => {
      expect(triggerApiMockService.deleteTrigger()).toEqual(false);
    })
  });
  describe('getTriggerContentGroups', () => {
    it('should be a function', () => {
      expect(typeof triggerApiMockService.getTriggerContentGroups).toEqual('function');
    });

    it('should return false', () => {
      expect(triggerApiMockService.getTriggerContentGroups()).toEqual(false);
    })
  });
});
