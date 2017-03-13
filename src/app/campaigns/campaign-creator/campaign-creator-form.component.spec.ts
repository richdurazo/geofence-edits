import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CampaignApiService } from '../shared/campaign-api.service';
import { CampaignApiMockService } from '../../mocks/campaigns/campaign-api-mock.service';

import { CampaignCreatorFormComponent } from './campaign-creator-form.component';

describe('CampaignCreatorFormComponent', () => {
    let component: CampaignCreatorFormComponent;
    let fixture: ComponentFixture<CampaignCreatorFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ CampaignCreatorFormComponent ],
            providers: [
                { provide: CampaignApiService, useClass: CampaignApiMockService }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CampaignCreatorFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
