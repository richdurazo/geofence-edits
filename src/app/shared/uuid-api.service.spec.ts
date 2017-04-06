import { TestBed, inject } from '@angular/core/testing';

import { UuidApiService } from './uuid-api.service';

describe('UuidApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UuidApiService]
    });
  });

  it('should ...', inject([UuidApiService], (service: UuidApiService) => {
    expect(service).toBeTruthy();
  }));
});
