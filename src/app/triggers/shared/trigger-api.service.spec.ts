import { TestBed, inject } from '@angular/core/testing';

import { AuthCustomHttpService } from '../../auth/auth-custom-http.service';
import { AuthCustomHttpServiceMock } from '../../mocks/auth/auth-custom-http-mock.service';

import { TriggerApiService } from './trigger-api.service';

describe('TriggerApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TriggerApiService,
                { provide: AuthCustomHttpService, useClass: AuthCustomHttpServiceMock }
            ]
        });
    });

    it('should ...', inject([TriggerApiService], (service: TriggerApiService) => {
        expect(service).toBeTruthy();
    }));
});
