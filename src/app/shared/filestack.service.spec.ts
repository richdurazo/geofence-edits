import { TestBed, inject } from '@angular/core/testing';

import { FilestackService } from './filestack.service';

describe('FilestackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilestackService]
    });
  });

  it('should ...', inject([FilestackService], (service: FilestackService) => {
    expect(service).toBeTruthy();
  }));
});
