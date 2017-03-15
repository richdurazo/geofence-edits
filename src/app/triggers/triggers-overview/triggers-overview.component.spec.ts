import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from "rxjs/Rx";

import { TriggerApiService } from '../shared/trigger-api.service';
import { TriggerApiMockService } from '../../mocks/triggers/trigger-api-mock.service';

import { TriggersOverviewComponent } from './triggers-overview.component';

describe('TriggersOverviewComponent', () => {
  let component: TriggersOverviewComponent;
  let fixture: ComponentFixture<TriggersOverviewComponent>;
  let triggerApi: TriggerApiMockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggersOverviewComponent ],
      providers: [
          { provide: TriggerApiService, useClass: TriggerApiMockService }
      ]
    })
    .compileComponents();

    triggerApi = TestBed.get(TriggerApiService);
    spyOn(triggerApi, 'getTriggers').and.returnValue(Observable.of([]));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
