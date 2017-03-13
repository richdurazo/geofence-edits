import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignCreatorFormComponent } from './campaign-creator-form.component';

describe('CampaignCreatorFormComponent', () => {
  let component: CampaignCreatorFormComponent;
  let fixture: ComponentFixture<CampaignCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignCreatorFormComponent ]
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
