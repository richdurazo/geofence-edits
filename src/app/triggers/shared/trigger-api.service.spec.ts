import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Response, ResponseOptions, Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import { AuthCustomHttpService } from '../../auth/auth-custom-http.service';
import { AuthCustomHttpServiceMock } from '../../mocks/auth/auth-custom-http-mock.service';

import { TriggerApiService } from './trigger-api.service';

let service: TriggerApiService;
let authHttp: AuthCustomHttpServiceMock;

describe('TriggerApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TriggerApiService,
                { provide: AuthCustomHttpService, useClass: AuthCustomHttpServiceMock }
            ]
        });

        service = TestBed.get(TriggerApiService);
        authHttp = TestBed.get(AuthCustomHttpService);
    });

    it('should ...', () => {
        expect(service).toBeTruthy();
    });

    describe('getTriggers', () => {
      it ('should have a getTriggers function', () => {
        expect(service.getTriggers).toBeTruthy();
        expect(typeof service.getTriggers).toEqual('function');
      })

      it ('should call the AuthCustomHttpService and return the response', () => {
        let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
        let response = new Response(responseOptions);
        spyOn(authHttp, 'get').and.returnValue(Observable.of(response));
        service.getTriggers()
        .subscribe( data => {
            expect(authHttp.get).toHaveBeenCalledWith('http://api.app/trigger');
            expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
        });
      });
    });

    describe('createTrigger', () => {
      it ('should have a createTrigger function', () => {
        expect(service.createTrigger).toBeTruthy();
        expect(typeof service.createTrigger).toEqual('function');
      })

      it ('should call the AuthCustomHttpService and return the response', () => {
        let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
        let response = new Response(responseOptions);
        spyOn(authHttp, 'post').and.returnValue(Observable.of(response));
        service.createTrigger({id: 1})
        .subscribe( data => {
            expect(authHttp.post).toHaveBeenCalledWith('http://api.app/trigger', { id: 1 });
            expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
        });
      });
    });

    describe('deleteTrigger', () => {
      it ('should have a deleteTrigger function', () => {
        expect(service.deleteTrigger).toBeTruthy();
        expect(typeof service.deleteTrigger).toEqual('function');
      })

      it ('should call the AuthCustomHttpService and return the response', () => {
        let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
        let response = new Response(responseOptions);
        spyOn(authHttp, 'delete').and.returnValue(Observable.of(response));
        service.deleteTrigger({id: 1})
        .subscribe( data => {
            expect(authHttp.delete).toHaveBeenCalledWith('http://api.app/trigger/1');
            expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
        });
      });
    });
});
