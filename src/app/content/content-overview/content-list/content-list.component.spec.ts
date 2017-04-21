import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from "rxjs/Rx";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ContentApiService } from '../../shared/content-api.service';
import { ContentApiMockService } from '../../../mocks/content/content-api-mock.service';

import { ContentListComponent } from './content-list.component';

describe('ContentListComponent', () => {
  let component: ContentListComponent;
  let fixture: ComponentFixture<ContentListComponent>;
  let contentApi: ContentApiMockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentListComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: ContentApiService, useClass: ContentApiMockService }
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();

    contentApi = TestBed.get(ContentApiService);
    spyOn(contentApi, 'getContent').and.returnValue(Observable.of([{foo:'bar'}, {hay: 'guyz'}]));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentListComponent);
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

      it('should call getContent', () => {
        spyOn(component, 'getContent');
        component.ngOnInit();
        expect(component.getContent).toHaveBeenCalled();
      });
  });

  describe('getContent', () => {
      it('should have a getContent function', () => {
          expect(component.getContent).toBeTruthy();
          expect(typeof component.getContent).toEqual('function');
      });

      it('should call the ContentApi and pass the response to processGetSuccess', () => {
          spyOn(component, 'processGetSuccess');
          expect(component.processGetSuccess).not.toHaveBeenCalled();
          component.getContent();
          expect(contentApi.getContent).toHaveBeenCalled();
          expect(component.processGetSuccess).toHaveBeenCalledWith([{ foo: 'bar' }, { hay: 'guyz' }]);
      });
  });

  describe('processGetSuccess', () => {
      it('should have a processGetSuccess function', () => {
          expect(component.processGetSuccess).toBeTruthy();
          expect(typeof component.processGetSuccess).toEqual('function');
      });

      it('should handle the response from a successful create call', () => {
          component.processGetSuccess({foo: 'bar'});
          expect(component.content).toEqual({foo: 'bar'});
      });
  });

  describe('deleteItem', () => {
      it('should have a deleteItem function', () => {
          expect(component.deleteItem).toBeTruthy();
          expect(typeof component.deleteItem).toEqual('function');
      });

      it('should call the ContentApi and pass the response to processGetSuccess', () => {
          spyOn(component, 'processDeleteSuccess');
          spyOn(contentApi, 'deleteContent').and.returnValue(Observable.of({}));
          expect(component.processDeleteSuccess).not.toHaveBeenCalled();
          expect(contentApi.deleteContent).not.toHaveBeenCalled();
          component.deleteItem(0);
          expect(contentApi.deleteContent).toHaveBeenCalled();
          expect(component.processDeleteSuccess).toHaveBeenCalledWith({}, 0);
      });
  });

  describe('processDeleteSuccess', () => {
      it('should have a processDeleteSuccess function', () => {
          expect(component.processDeleteSuccess).toBeTruthy();
          expect(typeof component.processDeleteSuccess).toEqual('function');
      });

      it('should handle the response from a successful delete call and remove the item from the array', () => {
          expect(component.content).toEqual([{foo: 'bar'}, {hay: 'guyz'}]);
          component.processDeleteSuccess({foo: 'bar'}, 0);
          expect(component.content).toEqual([{hay: 'guyz'}]);
      });
  });
});
