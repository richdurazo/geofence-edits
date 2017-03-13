import { TestBed, inject } from '@angular/core/testing';

import { AuthCustomHttpService } from '../../auth/auth-custom-http.service';
import { AuthCustomHttpServiceMock } from '../../mocks/auth/auth-custom-http-mock.service';

import { ContentApiService } from './content-api.service';

describe('ContentApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ContentApiService,
                { provide: AuthCustomHttpService, useClass: AuthCustomHttpServiceMock }
            ]
        });
    });

    it('should ...', inject([ContentApiService], (service: ContentApiService) => {
        expect(service).toBeTruthy();
    }));
});
