import { TestBed, inject } from '@angular/core/testing';

import { AuthCustomHttpService } from '../auth/auth-custom-http.service';
import { AuthCustomHttpServiceMock } from '../mocks/auth/auth-custom-http-mock.service';

import { TargetApiService } from './target-api.service';

describe('TargetApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          TargetApiService,
          { provide: AuthCustomHttpService, useClass: AuthCustomHttpServiceMock }
      ]
    });
  });

  it('should be created', inject([TargetApiService], (service: TargetApiService) => {
    expect(service).toBeTruthy();
  }));
});
