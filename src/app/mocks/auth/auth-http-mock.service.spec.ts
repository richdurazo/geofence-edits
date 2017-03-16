import { TestBed, async, inject } from '@angular/core/testing';
import { AuthHttpMockService } from './auth-http-mock.service';

let authHttpMockService;

describe('AuthHttpMockService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthHttpMockService]
        });

        authHttpMockService = TestBed.get(AuthHttpMockService);
    });

    it('should exist', () => {
        expect(authHttpMockService).toBeTruthy();
    });

    describe('setGlobalHeaders', () => {
        it('should be a function', () => {
            expect(typeof authHttpMockService.setGlobalHeaders).toEqual('function');
        });

        it('should return false', () => {
            expect(authHttpMockService.setGlobalHeaders()).toEqual(false);
        });
    });

    describe('get', () => {
        it('should be a function', () => {
            expect(typeof authHttpMockService.get).toEqual('function');
        });

        it('should return false', () => {
            expect(authHttpMockService.get()).toEqual(false);
        });
    });

    describe('post', () => {
        it('should be a function', () => {
            expect(typeof authHttpMockService.post).toEqual('function');
        });

        it('should return false', () => {
            expect(authHttpMockService.post()).toEqual(false);
        });
    });

    describe('put', () => {
        it('should be a function', () => {
            expect(typeof authHttpMockService.put).toEqual('function');
        });

        it('should return false', () => {
            expect(authHttpMockService.put()).toEqual(false);
        });
    });

    describe('patch', () => {
        it('should be a function', () => {
            expect(typeof authHttpMockService.patch).toEqual('function');
        });

        it('should return false', () => {
            expect(authHttpMockService.patch()).toEqual(false);
        });
    });

    describe('delete', () => {
        it('should be a function', () => {
            expect(typeof authHttpMockService.delete).toEqual('function');
        });

        it('should return false', () => {
            expect(authHttpMockService.delete()).toEqual(false);
        });
    });

});
