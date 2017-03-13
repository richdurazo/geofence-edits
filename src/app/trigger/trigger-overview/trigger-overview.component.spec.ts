import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerOverviewComponent } from './trigger-overview.component';

describe('TriggerOverviewComponent', () => {
  let component: TriggerOverviewComponent;
  let fixture: ComponentFixture<TriggerOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
