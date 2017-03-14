import { TestBed, inject } from '@angular/core/testing';
import { AuthHttp } from 'angular2-jwt';

import { RouterMockService } from '../mocks/router/router-mock.service';
import { AuthHttpMockService } from '../mocks/auth/auth-http-mock.service';

import { RouterModule, Router, RouterStateSnapshot } from '@angular/router';
import { AuthCustomHttpService } from './auth-custom-http.service';

describe('AuthCustomHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          AuthCustomHttpService,
          { provide: AuthHttp, useClass: AuthHttpMockService },
          { provide: Router, useClass: RouterMockService}
      ]
    });
  });

  it('should ...', inject([AuthCustomHttpService], (service: AuthCustomHttpService) => {
    expect(service).toBeTruthy();
  }));
});
