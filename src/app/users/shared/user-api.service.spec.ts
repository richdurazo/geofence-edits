import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Response, ResponseOptions, Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import { AuthCustomHttpService } from '../../auth/auth-custom-http.service';
import { AuthCustomHttpServiceMock } from '../../mocks/auth/auth-custom-http-mock.service';

import { UserApiService } from './user-api.service';

let service: UserApiService;
let authHttp: AuthCustomHttpServiceMock;

describe('UserApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserApiService,
        { provide: AuthCustomHttpService, useClass: AuthCustomHttpServiceMock }
      ]
    });

    service = TestBed.get(UserApiService);
    authHttp = TestBed.get(AuthCustomHttpService);
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  describe('getUser', () => {
    it ('should have a getUser function', () => {
      expect(service.getUser).toBeTruthy();
      expect(typeof service.getUser).toEqual('function');
    })

    it ('should call the AuthCustomHttpService and return the response', () => {
      let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
      let response = new Response(responseOptions);
      spyOn(authHttp, 'get').and.returnValue(Observable.of(response));
      service.getUser()
      .subscribe( data => {
          expect(authHttp.get).toHaveBeenCalledWith('http://api.app/index');
          expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
      });
    });
  });
});
