import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from "rxjs/Rx";

import { CampaignApiService } from '../shared/campaign-api.service';
import { CampaignApiMockService } from '../../mocks/campaigns/campaign-api-mock.service';

import { CampaignsOverviewComponent } from './campaigns-overview.component';

describe('CampaignsOverviewComponent', () => {
  let component: CampaignsOverviewComponent;
  let fixture: ComponentFixture<CampaignsOverviewComponent>;
  let campaignApi: CampaignApiMockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsOverviewComponent ],
      providers: [
          { provide: CampaignApiService, useClass: CampaignApiMockService }
      ]
    })
    .compileComponents();

    campaignApi = TestBed.get(CampaignApiService);
    spyOn(campaignApi, 'getCampaigns').and.returnValue(Observable.of([{foo:'bar'}, {foo:'bar'}]));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
