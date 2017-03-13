import { TestBed, inject } from '@angular/core/testing';

import { TriggerApiService } from './trigger-api.service';

describe('TriggerApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TriggerApiService]
    });
  });

  it('should ...', inject([TriggerApiService], (service: TriggerApiService) => {
    expect(service).toBeTruthy();
  }));
});
