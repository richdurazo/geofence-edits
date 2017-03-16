import { TestBed, inject } from '@angular/core/testing';

import { DateUtilsService } from './date-utils.service';

let service: DateUtilsService;

describe('DateUtilsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DateUtilsService,
                moment
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

        it('should return false', () => {
            // spyOn(moment, 'format');
            console.log("service.formatSQLDate(new Date('2016-11-22 12:00:00'))", service.formatSQLDate(new Date('2016-11-22 12:00:00')));
            console.log("new Date('2016-11-22 12:00:00')", new Date('2016-11-22 12:00:00'));
            // expect(moment.format).toHaveBeenCalled();
        })
    });
});
