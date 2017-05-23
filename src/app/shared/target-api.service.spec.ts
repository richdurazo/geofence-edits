import { TestBed, inject } from '@angular/core/testing';

import { TargetApiService } from './target-api.service';

describe('TargetApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TargetApiService]
    });
  });

  it('should be created', inject([TargetApiService], (service: TargetApiService) => {
    expect(service).toBeTruthy();
  }));
});
