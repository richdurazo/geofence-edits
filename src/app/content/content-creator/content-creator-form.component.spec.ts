import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from "rxjs/Rx";

import { ContentApiService } from '../shared/content-api.service';
import { ContentApiMockService } from '../../mocks/content/content-api-mock.service';

import { DateUtilsService } from '../../shared/date-utils.service';
import { DateUtilsMockService } from '../../mocks/shared/date-utils-mock.service';

import { ContentCreatorFormComponent } from './content-creator-form.component';

describe('ContentCreatorFormComponent', () => {
  let component: ContentCreatorFormComponent;
  let fixture: ComponentFixture<ContentCreatorFormComponent>;
  let contentApi: ContentApiMockService;
  let dateUtils: DateUtilsMockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCreatorFormComponent ],
      schemas: [
          CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: ContentApiService, useClass: ContentApiMockService },
        { provide: DateUtilsService, useClass: DateUtilsMockService }
      ],
      imports: [FormsModule]
    })
    .compileComponents();

    contentApi = TestBed.get(ContentApiService);
    dateUtils = TestBed.get(DateUtilsService);
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

      it('should set up a ContentModel and set some defaults', () => {
          expect(component.content.constructor.name).toEqual('ContentModel');
          expect(component.content.name).toEqual('');
          expect(component.content.description).toEqual('');
          expect(component.content.start_at instanceof Date).toBeTruthy();
          expect(component.content.end_at instanceof Date).toBeTruthy();
      });
  });

  describe('submitForm', () => {
      it('should have a submitForm function', () => {
          expect(component.submitForm).toBeTruthy();
          expect(typeof component.submitForm).toEqual('function');
      });

      it('should format the request and call the ContentApiService', () => {
        spyOn(dateUtils, 'formatSQLDate').and.returnValue('foo');
        spyOn(contentApi, 'createContent').and.returnValue(Observable.of({foo: 'bar'}));
        spyOn(component, 'processSuccess');
        expect(dateUtils.formatSQLDate).not.toHaveBeenCalled();
        expect(contentApi.createContent).not.toHaveBeenCalled();
        expect(component.processSuccess).not.toHaveBeenCalled();
        component.submitForm({valid: true});
        expect(dateUtils.formatSQLDate).toHaveBeenCalled();
        expect(contentApi.createContent).toHaveBeenCalledWith({ name: '', description: '', start_at: 'foo', end_at: 'foo' });
        expect(component.processSuccess).toHaveBeenCalledWith({ foo: 'bar' });
      });
  });

  describe('processSuccess', () => {
      it('should have a processSuccess function', () => {
          expect(component.processSuccess).toBeTruthy();
          expect(typeof component.processSuccess).toEqual('function');
      });

      it('should handle the response from a successful create call', () => {
          component.processSuccess({foo: 'bar'});
      });
  });

});
