/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { DateUtilsMockService } from './date-utils-mock.service';

let dateUtilsMockService;

describe('DateUtilsMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateUtilsMockService]
    });

    dateUtilsMockService = TestBed.get(DateUtilsMockService);
  });

  it('should exist', () => {
    expect(dateUtilsMockService).toBeTruthy();
  });

  describe('formatSQLDate', () => {
    it('should be a function', () => {
      expect(typeof dateUtilsMockService.formatSQLDate).toEqual('function');
    });

    it('should return false', () => {
      expect(dateUtilsMockService.formatSQLDate()).toEqual(false);
    })
  });
});
