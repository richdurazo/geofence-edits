import { TestBed, inject } from '@angular/core/testing';
import { Observable } from "rxjs/Rx";
import { BaseRequestOptions, Response, ResponseOptions, Http } from '@angular/http';

import { AuthCustomHttpService } from '../auth/auth-custom-http.service';
import { AuthCustomHttpServiceMock } from '../mocks/auth/auth-custom-http-mock.service';

import { UuidApiService } from './uuid-api.service';

let service: UuidApiService;
let authHttp: AuthCustomHttpServiceMock;

describe('UuidApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          UuidApiService,
          { provide: AuthCustomHttpService, useClass: AuthCustomHttpServiceMock }
      ]
    });

    service = TestBed.get(UuidApiService);
    authHttp = TestBed.get(AuthCustomHttpService);
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchUuid', () => {
    it ('should have a fetchUuid function', () => {
      expect(service.fetchUuid).toBeTruthy();
      expect(typeof service.fetchUuid).toEqual('function');
    })

    it ('should call the AuthCustomHttpService and return the response', () => {
      let responseOptions = new ResponseOptions({ body : JSON.stringify({ uuid: '2' }) });
      let response = new Response(responseOptions);
      spyOn(authHttp, 'get').and.returnValue(Observable.of(response));
      service.fetchUuid()
      .subscribe( data => {
          expect(authHttp.get).toHaveBeenCalledWith('http://api.app/uuid');
          expect(data).toEqual({ uuid: '2' });
      });
    });
  });
});
