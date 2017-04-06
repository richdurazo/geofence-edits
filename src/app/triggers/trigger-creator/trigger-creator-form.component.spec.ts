import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Observable } from "rxjs/Rx";

import { TriggerApiService } from '../shared/trigger-api.service';
import { TriggerApiMockService } from '../../mocks/triggers/trigger-api-mock.service';

import { TriggerCreatorFormComponent } from './trigger-creator-form.component';

describe('TriggerCreatorFormComponent', () => {
    let component: TriggerCreatorFormComponent;
    let fixture: ComponentFixture<TriggerCreatorFormComponent>;
    let triggerApi: TriggerApiMockService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ TriggerCreatorFormComponent ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                { provide: TriggerApiService, useClass: TriggerApiMockService }
            ]
        })
        .compileComponents();

        triggerApi = TestBed.get(TriggerApiService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TriggerCreatorFormComponent);
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

        it('should call setModelDefaults', () => {
            expect(component.trigger.constructor.name).toEqual('TriggerModel');
            expect(component.trigger.name).toEqual('');
            expect(component.trigger.campaign_id).toEqual('');
        });
    });

    describe('submitForm', () => {
        it('should have a submitForm function', () => {
            expect(component.submitForm).toBeTruthy();
            expect(typeof component.submitForm).toEqual('function');
        });

        it('should format the request and call the TriggerApiService', () => {
          spyOn(triggerApi, 'createTrigger').and.returnValue(Observable.of({foo: 'bar'}));
          spyOn(component, 'processSuccess');
          expect(triggerApi.createTrigger).not.toHaveBeenCalled();
          expect(component.processSuccess).not.toHaveBeenCalled();
          component.submitForm({valid: true});
          expect(triggerApi.createTrigger).toHaveBeenCalledWith({ name: '', value: '', campaign_id: '' });
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
