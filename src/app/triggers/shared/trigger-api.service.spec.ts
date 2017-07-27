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

    describe('createTouchTrigger', () => {
      it ('should have a createTouchTrigger function', () => {
        expect(service.createTouchTrigger).toBeTruthy();
        expect(typeof service.createTouchTrigger).toEqual('function');
      })

      it ('should call the AuthCustomHttpService and return the response', () => {
        let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
        let response = new Response(responseOptions);
        spyOn(authHttp, 'post').and.returnValue(Observable.of(response));
        service.createTouchTrigger({id: 1})
        .subscribe( data => {
            expect(authHttp.post).toHaveBeenCalledWith('http://api.app/touch', { id: 1 });
            expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
        });
      });
    });
    describe('createAudioTrigger', () => {
      it ('should have a createAudioTrigger function', () => {
        expect(service.createAudioTrigger).toBeTruthy();
        expect(typeof service.createAudioTrigger).toEqual('function');
      })

      it ('should call the AuthCustomHttpService and return the response', () => {
        let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
        let response = new Response(responseOptions);
        spyOn(authHttp, 'post').and.returnValue(Observable.of(response));
        service.createAudioTrigger({id: 1})
        .subscribe( data => {
            expect(authHttp.post).toHaveBeenCalledWith('http://api.app/audio', { id: 1 });
            expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
        });
      });
    });
    describe('createBeaconTrigger', () => {
      it ('should have a createBeaconTrigger function', () => {
        expect(service.createBeaconTrigger).toBeTruthy();
        expect(typeof service.createBeaconTrigger).toEqual('function');
      })

      it ('should call the AuthCustomHttpService and return the response', () => {
        let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
        let response = new Response(responseOptions);
        spyOn(authHttp, 'post').and.returnValue(Observable.of(response));
        service.createBeaconTrigger({id: 1})
        .subscribe( data => {
            expect(authHttp.post).toHaveBeenCalledWith('http://api.app/beacon', { id: 1 });
            expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
        });
      });
    });
      describe('createGeofenceTrigger', () => {
      it ('should have a createGeofenceTrigger function', () => {
        expect(service.createGeofenceTrigger).toBeTruthy();
        expect(typeof service.createGeofenceTrigger).toEqual('function');
      })

      it ('should call the AuthCustomHttpService and return the response', () => {
        let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
        let response = new Response(responseOptions);
        spyOn(authHttp, 'post').and.returnValue(Observable.of(response));
        service.createGeofenceTrigger({id: 1})
        .subscribe( data => {
            expect(authHttp.post).toHaveBeenCalledWith('http://api.app/geofence', { id: 1 });
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
    describe('getTriggerContentGroups', () => {
      it ('should have a getTriggerContentGroups function', () => {
        expect(service.getTriggerContentGroups).toBeTruthy();
        expect(typeof service.getTriggerContentGroups).toEqual('function');
      })

      it ('should call the AuthCustomHttpService and return the response', () => {
        let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
        let response = new Response(responseOptions);
        spyOn(authHttp, 'get').and.returnValue(Observable.of(response));
        service.getTriggerContentGroups(1)
/*        .subscribe( data => {
            expect(authHttp.get).toHaveBeenCalledWith('http://api.app/delivery-preset/1/content-group');
            expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
        });*/
      });
    });
});
