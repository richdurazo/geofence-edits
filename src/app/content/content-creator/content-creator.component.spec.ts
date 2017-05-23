import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from "rxjs/Rx";

import { RouterModule, Router } from '@angular/router';
import { RouterMockService } from '../../mocks/router/router-mock.service';

import { ContentApiService } from '../shared/content-api.service';
import { ContentApiMockService } from '../../mocks/content/content-api-mock.service';

import { DateUtilsService } from '../../shared/date-utils.service';
import { DateUtilsMockService } from '../../mocks/shared/date-utils-mock.service';

import { ContentCreatorFormComponent } from './content-creator-form.component';


import { ContentCreatorComponent } from './content-creator.component';
import { ContentModel } from '../shared/content.model';

@Component({
    selector: 'app-content-creator-form',
})

export class ContentCreatorFormComponentMock {

    content: ContentModel;

    contentType: string;

    form: NgForm;

    constructor (

    ) {}

    ngOnInit() {
        return false;
    }

    public launchTerms () {
        return false;
    }

    public setDate (key, event) {
        return false;
    }

    public setType (event, form) {
        return false;
    }

    public fetchUuid () {
        return false;
    }

    public setImageConfig () {
        return false;
    }

    public setModelDefaults (type: string) {
        return false;
    }

}


describe('ContentCreatorComponent', () => {
    let component: ContentCreatorComponent;
    let fixture: ComponentFixture<ContentCreatorComponent>;
    let contentApi: ContentApiMockService;
    let dateUtils: DateUtilsMockService;
    let creatorForm: ContentCreatorFormComponentMock;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            declarations: [
                ContentCreatorComponent
            ],
            providers: [
                { provide: ContentCreatorFormComponent, useClass: ContentCreatorFormComponentMock },
                { provide: ContentApiService, useClass: ContentApiMockService },
                { provide: Router, useClass: RouterMockService },
                { provide: DateUtilsService, useClass: DateUtilsMockService },
            ]
        })
        .compileComponents();

        contentApi = TestBed.get(ContentApiService);
        dateUtils = TestBed.get(DateUtilsService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentCreatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });
    //
    // describe('submitForm', () => {
    //     it('should have a submitForm function', () => {
    //         expect(component.submitForm).toBeTruthy();
    //         expect(typeof component.submitForm).toEqual('function');
    //     });
    //
    //     it('should format the request and call the ContentApiService', () => {
    //         spyOn(dateUtils, 'formatSQLDate').and.returnValue('foo');
    //         spyOn(contentApi, 'createContent').and.returnValue(Observable.of({foo: 'bar'}));
    //         spyOn(component, 'processSuccess');
    //         expect(dateUtils.formatSQLDate).not.toHaveBeenCalled();
    //         expect(contentApi.createContent).not.toHaveBeenCalled();
    //         expect(component.processSuccess).not.toHaveBeenCalled();
    //         component.creatorForm.content = new ContentModel('yolobro', 'foo', '', '', '', new Date('1/1/17'), new Date ('2/1/17'));
    //         component.submitForm({valid: true});
    //         expect(dateUtils.formatSQLDate).toHaveBeenCalled();
    //         expect(contentApi.createContent).toHaveBeenCalledWith({ uuid: 'yolobro', type: 'foo', name: '', display_name: '', description: '', start_at: 'foo', end_at: 'foo', scratcher_enabled: false });
    //         expect(component.processSuccess).toHaveBeenCalledWith({ foo: 'bar' });
    //     });
    // });
    //
    // describe('processSuccess', () => {
    //     it('should have a processSuccess function', () => {
    //         expect(component.processSuccess).toBeTruthy();
    //         expect(typeof component.processSuccess).toEqual('function');
    //     });
    //
    //     it('should handle the response from a successful create call', () => {
    //         component.processSuccess({foo: 'bar'});
    //     });
    // });
});
