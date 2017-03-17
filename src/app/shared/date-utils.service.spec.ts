import { TestBed, inject } from '@angular/core/testing';

import { DateUtilsService } from './date-utils.service';

let service: DateUtilsService;

describe('DateUtilsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DateUtilsService
            ]
        });

        service = TestBed.get(DateUtilsService);
    });

    it('should ...', () => {
        expect(service).toBeTruthy();
    });

    describe('formatSQLDate', () => {
        it('should be a function', () => {
            expect(typeof service.formatSQLDate).toEqual('function');
        });

        it('should format the date', () => {
            expect(service.formatSQLDate(new Date('2016-11-22 12:00:00'))).toEqual('2016-11-22 12:00:00');
        })
    });
});
