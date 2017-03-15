import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from "rxjs/Rx";
import { FormsModule } from '@angular/forms';

import { CampaignApiService } from '../shared/campaign-api.service';
import { CampaignApiMockService } from '../../mocks/campaigns/campaign-api-mock.service';

import { DateUtilsService } from '../../shared/date-utils.service';
import { DateUtilsMockService } from '../../mocks/shared/date-utils-mock.service';

import { CampaignCreatorFormComponent } from './campaign-creator-form.component';

describe('CampaignCreatorFormComponent', () => {
    let component: CampaignCreatorFormComponent;
    let fixture: ComponentFixture<CampaignCreatorFormComponent>;
    let campaignApi: CampaignApiMockService;
    let dateUtils: DateUtilsMockService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ CampaignCreatorFormComponent ],
            providers: [
                { provide: CampaignApiService, useClass: CampaignApiMockService },
                { provide: DateUtilsService, useClass: DateUtilsMockService }
            ]
        })
        .compileComponents();

        campaignApi = TestBed.get(CampaignApiService);
        dateUtils = TestBed.get(DateUtilsService);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CampaignCreatorFormComponent);
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

        it('should set up a CampaignModel and set some defaults', () => {
            expect(component.campaign.constructor.name).toEqual('CampaignModel');
            expect(component.campaign.name).toEqual('');
            expect(component.campaign.description).toEqual('');
            expect(component.campaign.status).toEqual(0);
            expect(component.campaign.start_at instanceof Date).toBeTruthy();
            expect(component.campaign.end_at instanceof Date).toBeTruthy();
        });
    });

    describe('checkStatus', () => {
        it('should have a checkStatus function', () => {
            expect(component.checkStatus).toBeTruthy();
            expect(typeof component.checkStatus).toEqual('function');
        });

        it('should set the status of the campaign to 1 if passed true', () => {
            expect(component.campaign.status).toEqual(0);
            component.checkStatus(true);
            expect(component.campaign.status).toEqual(1);
        });

        it('should set the status of the campaign to 0 if passed false', () => {
            component.campaign.status = 1;
            expect(component.campaign.status).toEqual(1);
            component.checkStatus(false);
            expect(component.campaign.status).toEqual(0);
        });
    });

    describe('submitForm', () => {
        it('should have a submitForm function', () => {
            expect(component.submitForm).toBeTruthy();
            expect(typeof component.submitForm).toEqual('function');
        });

        it('should format the request and call the CampaignApiService', () => {
          spyOn(dateUtils, 'formatSQLDate').and.returnValue('foo');
          spyOn(campaignApi, 'createCampaign').and.returnValue(Observable.of({foo: 'bar'}));
          spyOn(component, 'processSuccess');
          expect(dateUtils.formatSQLDate).not.toHaveBeenCalled();
          expect(campaignApi.createCampaign).not.toHaveBeenCalled();
          expect(component.processSuccess).not.toHaveBeenCalled();
          component.submitForm();
          expect(dateUtils.formatSQLDate).toHaveBeenCalled();
          expect(campaignApi.createCampaign).toHaveBeenCalledWith({ name: '', description: '', status: 0, start_at: 'foo', end_at: 'foo' });
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
