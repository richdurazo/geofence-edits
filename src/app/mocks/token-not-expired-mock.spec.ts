/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { tokenNotExpiredMock } from './token-not-expired-mock';

describe('AuthApiMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [tokenNotExpiredMock]
    });
  });

  it('should exist', () => {
    expect(tokenNotExpiredMock).toBeTruthy();
  });

  it ('should return false', () => {
      expect(tokenNotExpiredMock()).toBeFalsy();
  })

});
