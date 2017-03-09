import { TestBed, inject } from '@angular/core/testing';

import { AuthCustomHttpService } from './auth-custom-http.service';

describe('AuthCustomHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthCustomHttpService]
    });
  });

  it('should ...', inject([AuthCustomHttpService], (service: AuthCustomHttpService) => {
    expect(service).toBeTruthy();
  }));
});
