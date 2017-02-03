/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';

import { AuthApiService } from '../auth/auth-api.service';
import { AuthApiMockService } from '../mocks/auth-api-mock.service';
import { tokenNotExpired } from 'angular2-jwt';
import { tokenNotExpiredMock } from '../mocks/token-not-expired-mock';

let authService;

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: AuthApiService, useClass: AuthApiMockService },
        // not functioning properly yet
        {provide: tokenNotExpired, useClass: tokenNotExpiredMock }
      ]
    });

    authService = TestBed.get(AuthService);
  });

  it('should exist', () => {
    expect(authService).toBeTruthy();
  });

  describe('loggedIn', () => {
    it('should be a function', () => {
      expect(typeof authService.loggedIn).toEqual('function');
    });

    it('should return the value from tokenNotExpired', () => {
      // TODO: this is not currently using the mock properly, and is using the service itself
      // looking for better documentation as to how to properly mock/spy on this function
      expect(authService.loggedIn()).toEqual(false);
    })
  });

  describe('logOut', () => {
    it('should be a function', () => {
      expect(typeof authService.logOut).toEqual('function');
    });

    it('should call localStorage.removeItem with "id_token"', () => {
      spyOn(localStorage, 'removeItem');
      authService.logOut();
      expect(localStorage.removeItem).toHaveBeenCalledWith('id_token');
    })
  });

  describe('setUrl', () => {
    it('should be a function', () => {
      expect(typeof authService.setUrl).toEqual('function');
    });

    it('should set the value of this.redirectUrl', () => {
      expect(authService.redirectUrl).toEqual('');
      authService.setUrl('/foo');
      expect(authService.redirectUrl).toEqual('/foo');
    })
  });

  describe('getRedirectUrl', () => {
    it('should be a function', () => {
      expect(typeof authService.getRedirectUrl).toEqual('function');
    });

    it('should return the value of this.redirectUrl', () => {
      authService.redirectUrl = '/foo';
      expect(authService.getRedirectUrl()).toEqual('/foo');
    });
  });

  describe('processSuccess', () => {
    it('should be a function', () => {
      expect(typeof authService.processSuccess).toEqual('function');
    });

    it('should call localStorage.setItem with its input', () => {
      spyOn(localStorage, 'setItem');
      let data = {token: 'foo'}
      authService.processSuccess(data);
      expect(localStorage.setItem).toHaveBeenCalledWith('id_token', 'foo');
    });
  });

  describe('processError', () => {
    it('should be a function', () => {
      expect(typeof authService.processError).toEqual('function');
    });

    it('should parse the JSON string in the error response and return an object with the error message', () => {
      let error = {
        _body: {
          error: 'foo'
        }
      }
      error._body = JSON.stringify(error._body);
      expect(typeof authService.processError(error)).toEqual('object');
      expect(authService.processError(error).error).toEqual('foo');
    });
  });
});
