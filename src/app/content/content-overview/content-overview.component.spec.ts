import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentApiService } from '../shared/content-api.service';
import { ContentApiMockService } from '../../mocks/content/content-api-mock.service';

import { ContentOverviewComponent } from './content-overview.component';

describe('ContentOverviewComponent', () => {
  let component: ContentOverviewComponent;
  let fixture: ComponentFixture<ContentOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentOverviewComponent ],
      providers: [
        { provide: ContentApiService, useClass: ContentApiMockService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
