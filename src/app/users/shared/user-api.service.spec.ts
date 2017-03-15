import { TestBed, async, inject } from '@angular/core/testing';

import { AuthCustomHttpService } from '../../auth/auth-custom-http.service';
import { AuthCustomHttpServiceMock } from '../../mocks/auth/auth-custom-http-mock.service';

import { UserApiService } from './user-api.service';

describe('UserApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserApiService,
        { provide: AuthCustomHttpService, useClass: AuthCustomHttpServiceMock }
      ]
    });
  });

  it('should exist', inject([UserApiService], (service: UserApiService) => {
    expect(service).toBeTruthy();
  }));
});
