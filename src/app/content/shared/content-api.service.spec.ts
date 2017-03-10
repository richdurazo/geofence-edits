import { TestBed, inject } from '@angular/core/testing';

import { ContentApiService } from './content-api.service';

describe('ContentApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentApiService]
    });
  });

  it('should ...', inject([ContentApiService], (service: ContentApiService) => {
    expect(service).toBeTruthy();
  }));
});
