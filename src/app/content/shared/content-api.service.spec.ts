import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Response, ResponseOptions, Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import { AuthCustomHttpService } from '../../auth/auth-custom-http.service';
import { AuthCustomHttpServiceMock } from '../../mocks/auth/auth-custom-http-mock.service';

import { ContentApiService } from './content-api.service';

let service: ContentApiService;
let authHttp: AuthCustomHttpServiceMock;

describe('ContentApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ContentApiService,
                { provide: AuthCustomHttpService, useClass: AuthCustomHttpServiceMock }
            ]
        });

        service = TestBed.get(ContentApiService);
        authHttp = TestBed.get(AuthCustomHttpService);
    });

    it('should ...', () => {
        expect(service).toBeTruthy();
    });

    describe('getContent', () => {
      it ('should have a getContent function', () => {
        expect(service.getContent).toBeTruthy();
        expect(typeof service.getContent).toEqual('function');
      })

      it ('should call the AuthCustomHttpService and return the response', () => {
        let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
        let response = new Response(responseOptions);
        spyOn(authHttp, 'get').and.returnValue(Observable.of(response));
        service.getContent()
        .subscribe( data => {
            expect(authHttp.get).toHaveBeenCalledWith('http://api.app/content');
            expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
        });
      });
    });

    describe('createContent', () => {
      it ('should have a createContent function', () => {
        expect(service.createContent).toBeTruthy();
        expect(typeof service.createContent).toEqual('function');
      })

      it ('should call the AuthCustomHttpService and return the response', () => {
        let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
        let response = new Response(responseOptions);
        spyOn(authHttp, 'post').and.returnValue(Observable.of(response));
        service.createContent({id: 1})
        .subscribe( data => {
            expect(authHttp.post).toHaveBeenCalledWith('http://api.app/content', { id: 1 });
            expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
        });
      });
    });

    describe('deleteContent', () => {
      it ('should have a deleteContent function', () => {
        expect(service.deleteContent).toBeTruthy();
        expect(typeof service.deleteContent).toEqual('function');
      })

      it ('should call the AuthCustomHttpService and return the response', () => {
        let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
        let response = new Response(responseOptions);
        spyOn(authHttp, 'delete').and.returnValue(Observable.of(response));
        service.deleteContent({id: 1})
        .subscribe( data => {
            expect(authHttp.delete).toHaveBeenCalledWith('http://api.app/content/1');
            expect(data).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
        });
      });
    });

});
