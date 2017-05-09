import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from "rxjs/Rx";

import { CampaignApiService } from '../shared/campaign-api.service';
import { CampaignApiMockService } from '../../mocks/campaigns/campaign-api-mock.service';

import { CampaignDetailsComponent } from './campaign-details.component';

describe('CampaignDetailsComponent', () => {
    let component: CampaignDetailsComponent;
    let fixture: ComponentFixture<CampaignDetailsComponent>;
    let campaignApi: CampaignApiMockService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CampaignDetailsComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            imports: [
                RouterTestingModule
            ],
            providers: [
                { provide: CampaignApiService, useClass: CampaignApiMockService }
            ]
        })
        .compileComponents();

        campaignApi = TestBed.get(CampaignApiService);
        spyOn(campaignApi, 'getCampaign').and.returnValue(Observable.of([{foo:'bar'}, {hay: 'guyz'}]));
        spyOn(campaignApi, 'getCampaignTriggers').and.returnValue(Observable.of([{foo:'bar'}, {hay: 'guyz'}]));
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CampaignDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
