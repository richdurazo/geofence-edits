import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from "rxjs/Rx";

import { TriggerApiService } from '../shared/trigger-api.service';
import { TriggerApiMockService } from '../../mocks/triggers/trigger-api-mock.service';

import { TriggersOverviewComponent } from './triggers-overview.component';

describe('TriggersOverviewComponent', () => {
  let component: TriggersOverviewComponent;
  let fixture: ComponentFixture<TriggersOverviewComponent>;
  let triggerApi: TriggerApiMockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggersOverviewComponent ],
      providers: [
          { provide: TriggerApiService, useClass: TriggerApiMockService }
      ]
    })
    .compileComponents();

    triggerApi = TestBed.get(TriggerApiService);
    spyOn(triggerApi, 'getTriggers').and.returnValue(Observable.of([{foo:'bar'}, {hay: 'guyz'}]));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggersOverviewComponent);
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

      it('should call getTriggers', () => {
        spyOn(component, 'getTriggers');
        component.ngOnInit();
        expect(component.getTriggers).toHaveBeenCalled();
      });
  });

  describe('getTriggers', () => {
      it('should have a getTriggers function', () => {
          expect(component.getTriggers).toBeTruthy();
          expect(typeof component.getTriggers).toEqual('function');
      });

      it('should call the TriggerApi and pass the response to processGetSuccess', () => {
          spyOn(component, 'processGetSuccess');
          expect(component.processGetSuccess).not.toHaveBeenCalled();
          component.getTriggers();
          expect(triggerApi.getTriggers).toHaveBeenCalled();
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
          expect(component.triggers).toEqual({foo: 'bar'});
      });
  });

  describe('deleteItem', () => {
      it('should have a deleteItem function', () => {
          expect(component.deleteItem).toBeTruthy();
          expect(typeof component.deleteItem).toEqual('function');
      });

      it('should call the TriggerApi and pass the response to processGetSuccess', () => {
          spyOn(component, 'processDeleteSuccess');
          spyOn(triggerApi, 'deleteTrigger').and.returnValue(Observable.of({}));
          expect(component.processDeleteSuccess).not.toHaveBeenCalled();
          expect(triggerApi.deleteTrigger).not.toHaveBeenCalled();
          component.deleteItem(0);
          expect(triggerApi.deleteTrigger).toHaveBeenCalled();
          expect(component.processDeleteSuccess).toHaveBeenCalledWith({}, 0);
      });
  });

  describe('processDeleteSuccess', () => {
      it('should have a processDeleteSuccess function', () => {
          expect(component.processDeleteSuccess).toBeTruthy();
          expect(typeof component.processDeleteSuccess).toEqual('function');
      });

      it('should handle the response from a successful delete call and remove the item from the array', () => {
          expect(component.triggers).toEqual([{foo: 'bar'}, {hay: 'guyz'}]);
          component.processDeleteSuccess({foo: 'bar'}, 0);
          expect(component.triggers).toEqual([{hay: 'guyz'}]);
      });
  });
});
