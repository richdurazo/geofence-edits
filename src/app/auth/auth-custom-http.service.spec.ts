import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Response, ResponseOptions, ResponseType, Http } from '@angular/http';
import { Observable } from "rxjs/Rx";

import { AuthHttp } from 'angular2-jwt';
import { AuthHttpMockService } from '../mocks/auth/auth-http-mock.service';
import { RouterModule, Router, RouterStateSnapshot } from '@angular/router';
import { RouterMockService } from '../mocks/router/router-mock.service';

import { AuthCustomHttpService } from './auth-custom-http.service';

let authHttp: AuthHttpMockService;
let service: AuthCustomHttpService;
let router: Router;

describe('AuthCustomHttpService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthCustomHttpService,
                { provide: AuthHttp, useClass: AuthHttpMockService },
                { provide: Router, useClass: RouterMockService}
            ]
        });

        authHttp = TestBed.get(AuthHttp);
        service = TestBed.get(AuthCustomHttpService);
        router = TestBed.get(Router);
    });

    it('should ...', () => {
        expect(service).toBeTruthy();
    });

    describe('setGlobalHeaders', () => {
        it ('should have a setGlobalHeaders function', () => {
            expect(service.setGlobalHeaders).toBeTruthy();
            expect(typeof service.setGlobalHeaders).toEqual('function');
        })

        it ('should call setGlobalHeaders on the AuthHttp', () => {
            spyOn(authHttp, 'setGlobalHeaders');
            expect(authHttp.setGlobalHeaders).not.toHaveBeenCalled();
            service.setGlobalHeaders([], {});
            expect(authHttp.setGlobalHeaders).toHaveBeenCalledWith([], {});
        });
    });

    describe('get', () => {
        it ('should have a get function', () => {
            expect(service.get).toBeTruthy();
            expect(typeof service.get).toEqual('function');
        })

        it ('should call the AuthHttp and return the response', () => {
            let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
            let response = new Response(responseOptions);
            spyOn(authHttp, 'get').and.returnValue(Observable.of(response));
            service.get('url', {})
            .subscribe( data => {
                expect(authHttp.get).toHaveBeenCalledWith('url', {});
                expect(data.json()).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
            });
        });
    });

    describe('post', () => {
        it ('should have a post function', () => {
            expect(service.post).toBeTruthy();
            expect(typeof service.post).toEqual('function');
        })

        it ('should call the AuthHttp and return the response', () => {
            let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
            let response = new Response(responseOptions);
            spyOn(authHttp, 'post').and.returnValue(Observable.of(response));
            service.post('url', {}, {})
            .subscribe( data => {
                expect(authHttp.post).toHaveBeenCalledWith('url', {}, {});
                expect(data.json()).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
            });
        });
    });

    describe('put', () => {
        it ('should have a put function', () => {
            expect(service.put).toBeTruthy();
            expect(typeof service.put).toEqual('function');
        })

        it ('should call the AuthHttp and return the response', () => {
            let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
            let response = new Response(responseOptions);
            spyOn(authHttp, 'put').and.returnValue(Observable.of(response));
            service.put('url', {}, {})
            .subscribe( data => {
                expect(authHttp.put).toHaveBeenCalledWith('url', {}, {});
                expect(data.json()).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
            });
        });
    });

    describe('delete', () => {
        it ('should have a delete function', () => {
            expect(service.delete).toBeTruthy();
            expect(typeof service.delete).toEqual('function');
        })

        it ('should call the AuthHttp and return the response', () => {
            let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
            let response = new Response(responseOptions);
            spyOn(authHttp, 'delete').and.returnValue(Observable.of(response));
            service.delete('url', {})
            .subscribe( data => {
                expect(authHttp.delete).toHaveBeenCalledWith('url', {});
                expect(data.json()).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
            });
        });
    });

    describe('patch', () => {
        it ('should have a patch function', () => {
            expect(service.patch).toBeTruthy();
            expect(typeof service.patch).toEqual('function');
        })

        it ('should call the AuthHttp and return the response', () => {
            let responseOptions = new ResponseOptions({ body : JSON.stringify([{ foo:'bar' }, { hay: 'guyz' }]) });
            let response = new Response(responseOptions);
            spyOn(authHttp, 'patch').and.returnValue(Observable.of(response));
            service.patch('url', {}, {})
            .subscribe( data => {
                expect(authHttp.patch).toHaveBeenCalledWith('url', {});
                expect(data.json()).toEqual([{foo:'bar'}, {hay: 'guyz'}]);
            });
        });
    });

    describe('error handling', () => {
        it ('should have a get function', () => {
            expect(service.get).toBeTruthy();
            expect(typeof service.get).toEqual('function');
        })

        it ('should redirect to login if the response is unauthorized', () => {
            spyOn(router, 'navigate');
            let responseOptions = new ResponseOptions({ type: ResponseType.Error, body : {}, status: 401 });
            let error = new Response(responseOptions);
            spyOn(authHttp, 'get').and.returnValue(Observable.throw(error));
            service.get('url', {})
            .subscribe( null, (err) => {
                expect(err.status).toEqual(401);
                expect(router.navigate).toHaveBeenCalledWith(['login']);
            });
        });

        it ('should redirect to login if the response is unauthorized', () => {
            spyOn(router, 'navigate');
            let responseOptions = new ResponseOptions({ type: ResponseType.Error, body : {}, status: 403 });
            let error = new Response(responseOptions);
            spyOn(authHttp, 'get').and.returnValue(Observable.throw(error));
            service.get('url', {})
            .subscribe( null, (err) => {
                expect(err.status).toEqual(403);
                expect(router.navigate).toHaveBeenCalledWith(['login']);
            });
        });

        it ('should redirect to login if the response is unauthorized', () => {
            spyOn(router, 'navigate');
            let responseOptions = new ResponseOptions({ type: ResponseType.Error, body : {}, status: 0 });
            let error = new Response(responseOptions);
            spyOn(authHttp, 'get').and.returnValue(Observable.throw(error));
            service.get('url', {})
            .subscribe( null, (err) => {
                expect(err.status).toEqual(0);
                expect(router.navigate).toHaveBeenCalledWith(['login']);
            });
        });

        it ('should redirect to login if the response is unauthorized', () => {
            spyOn(router, 'navigate');
            spyOn(authHttp, 'get').and.returnValue(Observable.throw({message: 'No JWT present or has expired'}));
            service.get('url', {})
            .subscribe( null, (err) => {
                expect(err.message).toEqual('No JWT present or has expired');
                expect(router.navigate).toHaveBeenCalledWith(['login']);
            });
        });

        it ('should return the error if not unauthorized', () => {
            spyOn(router, 'navigate');
            let responseOptions = new ResponseOptions({ type: ResponseType.Error, body : {}, status: 404 });
            let error = new Response(responseOptions);
            spyOn(authHttp, 'get').and.returnValue(Observable.throw(error));
            service.get('url', {})
            .subscribe( null, (err) => {
                expect(err.status).toEqual(404);
                expect(router.navigate).not.toHaveBeenCalledWith();
            });
        });
    });

});
