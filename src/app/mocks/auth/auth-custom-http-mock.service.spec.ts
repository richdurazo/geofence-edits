/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthCustomHttpServiceMock } from './auth-custom-http-mock.service';

let authCustomHttpMockService;

describe('AuthCustomHttpServiceMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthCustomHttpServiceMock]
    });

    authCustomHttpMockService = TestBed.get(AuthCustomHttpServiceMock);
  });

  it('should exist', () => {
    expect(authCustomHttpMockService).toBeTruthy();
  });

  describe('get', () => {
    it('should be a function', () => {
      expect(typeof authCustomHttpMockService.get).toEqual('function');
    });

    it('should return false', () => {
      expect(authCustomHttpMockService.get()).toEqual(false);
    })
  });

  describe('post', () => {
    it('should be a function', () => {
      expect(typeof authCustomHttpMockService.post).toEqual('function');
    });

    it('should return false', () => {
      expect(authCustomHttpMockService.post()).toEqual(false);
    })
  });

  describe('delete', () => {
    it('should be a function', () => {
      expect(typeof authCustomHttpMockService.delete).toEqual('function');
    });

    it('should return false', () => {
      expect(authCustomHttpMockService.delete()).toEqual(false);
    })
  });

});
