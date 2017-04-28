import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Observable } from "rxjs/Rx";

import { FilestackService } from '../../shared/filestack.service';
import { FilestackMockService } from '../../mocks/shared/filestack-mock.service';

import { CampaignApiService } from '../../campaigns/shared/campaign-api.service';
import { CampaignApiMockService } from '../../mocks/campaigns/campaign-api-mock.service';

import { UuidApiService } from '../../shared/uuid-api.service';
import { UuidApiMockService } from '../../mocks/shared/uuid-api-mock.service';

import { TriggerApiService } from '../shared/trigger-api.service';
import { TriggerApiMockService } from '../../mocks/triggers/trigger-api-mock.service';

import { TriggerCreatorFormComponent } from './trigger-creator-form.component';

describe('TriggerCreatorFormComponent', () => {
    let component: TriggerCreatorFormComponent;
    let fixture: ComponentFixture<TriggerCreatorFormComponent>;
    let campaignApi: CampaignApiMockService;
    let triggerApi: TriggerApiMockService;
    let uuidApi: UuidApiMockService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ TriggerCreatorFormComponent ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                { provide: FilestackService, useClass: FilestackMockService },
                { provide: CampaignApiService, useClass: CampaignApiMockService },
                { provide: TriggerApiService, useClass: TriggerApiMockService },
                { provide: UuidApiService, useClass: UuidApiMockService }
            ]
        })
        .compileComponents();

        triggerApi = TestBed.get(TriggerApiService);
        uuidApi = TestBed.get(UuidApiService);
        campaignApi = TestBed.get(CampaignApiService);
        spyOn(uuidApi, 'fetchUuid').and.returnValue(Observable.of({uuid: 'foo'}));
        spyOn(campaignApi, 'getCampaigns').and.returnValue(Observable.of([{uuid: 'foo'}, {uuid: 'bar'}]));
        spyOn(campaignApi, 'getCampaignTriggers').and.returnValue(Observable.of([{uuid: 'foo'}, {uuid: 'bar'}]));
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

        it('should call fetchUuid', () => {
            spyOn(component, 'fetchUuid');
            component.ngOnInit();
            expect(component.fetchUuid).toHaveBeenCalled();
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
          component.trigger = { name: '', value: 0, campaign_id: '', type: '' };
          component.submitForm({valid: true});
          expect(triggerApi.createTrigger).toHaveBeenCalledWith({ name: '', value: 0, campaign_id: '', type: '' });
          expect(component.processSuccess).toHaveBeenCalledWith({ foo: 'bar' });
        });
    });

    describe('processSuccess', () => {
        it('should have a processSuccess function', () => {
            expect(component.processSuccess).toBeTruthy();
            expect(typeof component.processSuccess).toEqual('function');
        });

        // it('should handle the response from a successful create call', () => {
        //     component.processSuccess({foo: 'bar', campaign_id: 1});
        // });
    });
});
