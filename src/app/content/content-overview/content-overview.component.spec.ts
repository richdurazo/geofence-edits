import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from "rxjs/Rx";

import { ContentApiService } from '../shared/content-api.service';
import { ContentApiMockService } from '../../mocks/content/content-api-mock.service';

import { ContentOverviewComponent } from './content-overview.component';

describe('ContentOverviewComponent', () => {
  let component: ContentOverviewComponent;
  let fixture: ComponentFixture<ContentOverviewComponent>;
  let contentApi: ContentApiMockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentOverviewComponent ],
      providers: [
        { provide: ContentApiService, useClass: ContentApiMockService }
      ]
    })
    .compileComponents();

    contentApi = TestBed.get(ContentApiService);
    spyOn(contentApi, 'getContent').and.returnValue(Observable.of([]));
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
