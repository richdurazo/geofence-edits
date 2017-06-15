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

  describe('deleteTrigger', () => {
    it('should be a function', () => {
      expect(typeof triggerApiMockService.deleteTrigger).toEqual('function');
    });

    it('should return false', () => {
      expect(triggerApiMockService.deleteTrigger()).toEqual(false);
    })
  });

  describe('getDeliveryModes', () => {
    it('should be a function', () => {
      expect(typeof triggerApiMockService.getDeliveryModes).toEqual('function');
    });

    it('should return false', () => {
      expect(triggerApiMockService.getDeliveryModes()).toEqual(false);
    })
  });
});
