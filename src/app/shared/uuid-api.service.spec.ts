import { TestBed, inject } from '@angular/core/testing';
import { AuthCustomHttpService } from '../auth/auth-custom-http.service';
import { AuthCustomHttpServiceMock } from '../mocks/auth/auth-custom-http-mock.service';

import { UuidApiService } from './uuid-api.service';

describe('UuidApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          UuidApiService,
          { provide: AuthCustomHttpService, useClass: AuthCustomHttpServiceMock }
      ]
    });
  });

  it('should ...', inject([UuidApiService], (service: UuidApiService) => {
    expect(service).toBeTruthy();
  }));
});
