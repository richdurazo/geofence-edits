import { DeliveryPresetApiService } from './../delivery-preset/delivery-preset-api.service';
import { DeliveryPresetApiMockService } from './../../mocks/triggers/delivery-preset-api-mock.service';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from "rxjs/Rx";

import { TriggerApiService } from '../shared/trigger-api.service';
import { TriggerApiMockService } from '../../mocks/triggers/trigger-api-mock.service';

import { TriggerDetailsComponent } from './trigger-details.component';

describe('TriggerDetailsComponent', () => {
    let component: TriggerDetailsComponent;
    let fixture: ComponentFixture<TriggerDetailsComponent>;
    let triggerApi: TriggerApiMockService;
    let deliveryPresetApi: DeliveryPresetApiMockService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TriggerDetailsComponent ],
            imports: [
                RouterTestingModule, FormsModule, MaterialModule
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                { provide: TriggerApiService, useClass: TriggerApiMockService },
                { provide: DeliveryPresetApiService, useClass: DeliveryPresetApiMockService }
            ]
        })
        .compileComponents();
        triggerApi = TestBed.get(TriggerApiService);
        deliveryPresetApi = TestBed.get(DeliveryPresetApiService);
        spyOn(triggerApi, 'getTrigger').and.returnValue(Observable.of({uuid: 'foo'}));
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TriggerDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

/*    it('should create', () => {
        expect(component).toBeTruthy();
    });*/
});
