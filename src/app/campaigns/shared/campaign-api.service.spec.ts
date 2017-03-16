import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Response, ResponseOptions, Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import { AuthCustomHttpService } from '../../auth/auth-custom-http.service';
import { AuthCustomHttpServiceMock } from '../../mocks/auth/auth-custom-http-mock.service';

import { CampaignApiService } from './campaign-api.service';

let service: CampaignApiService;
let authHttp: AuthCustomHttpServiceMock;

describe('CampaignApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          CampaignApiService,
          { provide: AuthCustomHttpService, useClass: AuthCustomHttpServiceMock }
      ]
    });

    service = TestBed.get(CampaignApiService);
    authHttp = TestBed.get(AuthCustomHttpService);
  });

  it('should ...', () => {
    expect(service).toBeTruthy();
  });

  describe('getCampaigns', () => {
    it ('should have a getCampaigns function', () => {
      expect(service.getCampaigns).toBeTruthy();
      expect(typeof service.getCampaigns).toEqual('function');
    })

    it ('should call the AuthCustomHttpService and return the response', () => {
      let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
      let response = new Response(responseOptions);
      spyOn(authHttp, 'get').and.returnValue(Observable.of(response));
      service.getCampaigns()
      .subscribe( data => {
          console.log('data', data);
          expect(authHttp.get).toHaveBeenCalledWith('http://api.app/campaign');
          expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
      });
    });
  });

  describe('createCampaign', () => {
    it ('should have a createCampaign function', () => {
      expect(service.createCampaign).toBeTruthy();
      expect(typeof service.createCampaign).toEqual('function');
    })

    it ('should call the AuthCustomHttpService and return the response', () => {
      let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
      let response = new Response(responseOptions);
      spyOn(authHttp, 'post').and.returnValue(Observable.of(response));
      service.createCampaign({id: 1})
      .subscribe( data => {
          expect(authHttp.post).toHaveBeenCalledWith('http://api.app/campaign', { id: 1 });
          expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
      });
    });
  });

  describe('deleteCampaign', () => {
    it ('should have a deleteCampaign function', () => {
      expect(service.deleteCampaign).toBeTruthy();
      expect(typeof service.deleteCampaign).toEqual('function');
    })

    it ('should call the AuthCustomHttpService and return the response', () => {
      let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
      let response = new Response(responseOptions);
      spyOn(authHttp, 'delete').and.returnValue(Observable.of(response));
      service.deleteCampaign({id: 1})
      .subscribe( data => {
          expect(authHttp.delete).toHaveBeenCalledWith('http://api.app/campaign/1');
          expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
      });
    });
  });

});
