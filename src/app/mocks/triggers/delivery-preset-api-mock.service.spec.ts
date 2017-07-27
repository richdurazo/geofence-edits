import { DeliveryPresetApiMockService } from './delivery-preset-api-mock.service';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

let deliveryPresetApiMockService;

describe('DeliveryPresetApiMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryPresetApiMockService]
    });

    deliveryPresetApiMockService = TestBed.get(DeliveryPresetApiMockService);
  });

  it('should exist', () => {
    expect(deliveryPresetApiMockService).toBeTruthy();
  });

  describe('getDeliveryPreset', () => {
    it('should be a function', () => {
      expect(typeof deliveryPresetApiMockService.getDeliveryPreset).toEqual('function');
    });

    it('should return false', () => {
      expect(deliveryPresetApiMockService.getDeliveryPreset()).toEqual(false);
    })
  });

  describe('createDeliveryPreset', () => {
    it('should be a function', () => {
      expect(typeof deliveryPresetApiMockService.createDeliveryPreset).toEqual('function');
    });

    it('should return false', () => {
      expect(deliveryPresetApiMockService.createDeliveryPreset()).toEqual(false);
    })
  });

  describe('updateDeliveryPreset', () => {
    it('should be a function', () => {
      expect(typeof deliveryPresetApiMockService.updateDeliveryPreset).toEqual('function');
    });

    it('should return false', () => {
      expect(deliveryPresetApiMockService.updateDeliveryPreset()).toEqual(false);
    })
  });

  describe('deleteDeliveryPreset', () => {
    it('should be a function', () => {
      expect(typeof deliveryPresetApiMockService.deleteDeliveryPreset).toEqual('function');
    });

    it('should return false', () => {
      expect(deliveryPresetApiMockService.deleteDeliveryPreset()).toEqual(false);
    })
  });


});
