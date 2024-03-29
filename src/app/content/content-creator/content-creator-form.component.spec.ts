import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from "rxjs/Rx";

import { MdDialog } from '@angular/material';
import { MdDialogMock } from '../../mocks/shared/md-dialog-mock.service';

import { ContentModel } from '../shared/content.model';
import { ContentApiService } from '../shared/content-api.service';
import { ContentApiMockService } from '../../mocks/content/content-api-mock.service';

import { DateUtilsService } from '../../shared/date-utils.service';
import { DateUtilsMockService } from '../../mocks/shared/date-utils-mock.service';

import { FilestackService } from '../../shared/filestack.service';
import { FilestackMockService } from '../../mocks/shared/filestack-mock.service';

import { UuidApiService } from '../../shared/uuid-api.service';
import { UuidApiMockService } from '../../mocks/shared/uuid-api-mock.service';

import { ContentCreatorFormComponent } from './content-creator-form.component';

describe('ContentCreatorFormComponent', () => {
    let component: ContentCreatorFormComponent;
    let fixture: ComponentFixture<ContentCreatorFormComponent>;
    let contentApi: ContentApiMockService;
    let uuidApi: UuidApiMockService;
    let dateUtils: DateUtilsMockService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ContentCreatorFormComponent ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                { provide: ContentApiService, useClass: ContentApiMockService },
                { provide: DateUtilsService, useClass: DateUtilsMockService },
                { provide: FilestackService, useClass: FilestackMockService },
                { provide: UuidApiService, useClass: UuidApiMockService },
                { provide: MdDialog, useClass: MdDialogMock }
            ],
            imports: [
                FormsModule,
            ]
        })
        .compileComponents();

        contentApi = TestBed.get(ContentApiService);
        dateUtils = TestBed.get(DateUtilsService);
        uuidApi = TestBed.get(UuidApiService);
        spyOn(uuidApi, 'fetchUuid').and.returnValue(Observable.of({uuid: 'foo'}));
        // spyOn(contentApi, 'getGroupContent').and.returnValue(Observable.of([]));
        // spyOn(contentApi, 'getContent').and.returnValue(Observable.of([]));
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentCreatorFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should have an init function', () => {
            expect(component.ngOnInit).toBeTruthy();
            expect(typeof component.ngOnInit).toEqual('function');
        });


        it('should call fetchUuid', () => {
            spyOn(component, 'fetchUuid');
            component.ngOnInit();
            expect(component.fetchUuid).toHaveBeenCalled();
        });
    });

    describe('setType', () => {
        it('should set the contentType and call setModelDefaults with the value', () => {
            spyOn(component, 'setModelDefaults');
            expect(component.contentType).not.toBeDefined();
            expect(component.setModelDefaults).not.toHaveBeenCalled();
            component.setType('foo', {});
            expect(component.contentType).toEqual('foo');
            expect(component.setModelDefaults).toHaveBeenCalledWith('foo');
        });
    });

});
