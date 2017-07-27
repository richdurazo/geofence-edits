import { UuidApiMockService } from './../../mocks/shared/uuid-api-mock.service';
import { UuidApiService } from './../../shared/uuid-api.service';
import { DeliveryPresetApiService } from './delivery-preset-api.service';
import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Response, ResponseOptions, Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import { AuthCustomHttpService } from '../../auth/auth-custom-http.service';
import { AuthCustomHttpServiceMock } from '../../mocks/auth/auth-custom-http-mock.service';


let service: DeliveryPresetApiService;
let authHttp: AuthCustomHttpServiceMock;
let uuidApi: UuidApiService;

describe('DeliveryPresetApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DeliveryPresetApiService,
                { provide: AuthCustomHttpService, useClass: AuthCustomHttpServiceMock },
                { provide: UuidApiService, useClass: UuidApiMockService }
            ]
        })
    .compileComponents();

        service = TestBed.get(DeliveryPresetApiService);
        uuidApi = TestBed.get(UuidApiService);
        authHttp = TestBed.get(AuthCustomHttpService);
    });

    it('should ...', () => {
        expect(service).toBeTruthy();
    });

    describe('getDeliveryPreset', () => {
      it ('should have a getDeliveryPreset function', () => {
        expect(service.getDeliveryPreset).toBeTruthy();
        expect(typeof service.getDeliveryPreset).toEqual('function');
      })

      it ('should call the AuthCustomHttpService and return the response', () => {
        let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
        let response = new Response(responseOptions);
        spyOn(authHttp, 'get').and.returnValue(Observable.of(response));
        service.getDeliveryPreset()
        .subscribe( data => {
            expect(authHttp.get).toHaveBeenCalledWith('http://api.app/delivery-preset');
            expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
        });
      });
    });


    describe('createDeliveryPreset', () => {
      it ('should have a createTrigger function', () => {
        expect(service.createDeliveryPreset).toBeTruthy();
        expect(typeof service.createDeliveryPreset).toEqual('function');
      })

      it ('should call the AuthCustomHttpService and return the response', () => {
        let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
        let response = new Response(responseOptions);
        spyOn(authHttp, 'post').and.returnValue(Observable.of(response));
        service.createDeliveryPreset({id: 1})
        .subscribe( data => {
            expect(authHttp.post).toHaveBeenCalledWith('http://api.app/delivery-preset', { id: 1 });
            expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
        });
      });
    });

/*    describe('updateDeliveryPreset', () => {
      it ('should have a createTouchTrigger function', () => {
        expect(service.updateDeliveryPreset).toBeTruthy();
        expect(typeof service.updateDeliveryPreset).toEqual('function');
      })

      it ('should call the AuthCustomHttpService and return the response', () => {
        let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
        let response = new Response(responseOptions);
        spyOn(authHttp, 'post').and.returnValue(Observable.of(response));
        service.updateDeliveryPreset({id: 1})
        .subscribe( data => {
            expect(authHttp.post).toHaveBeenCalledWith('http://api.app/delivery-preset', { id: 1 });
            expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
        });
      });
    });*/


    describe('deleteDeliveryPreset', () => {
      it ('should have a deleteDeliveryPreset function', () => {
        expect(service.deleteDeliveryPreset).toBeTruthy();
        expect(typeof service.deleteDeliveryPreset).toEqual('function');
      })

      it ('should call the AuthCustomHttpService and return the response', () => {
        let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
        let response = new Response(responseOptions);
        spyOn(authHttp, 'delete').and.returnValue(Observable.of(response));
        service.deleteDeliveryPreset({id: 1})
        .subscribe( data => {
            expect(authHttp.delete).toHaveBeenCalledWith('http://api.app/delivery-preset/1');
            expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
        });
      });
    });
});
