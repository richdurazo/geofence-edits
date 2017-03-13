import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerCreatorComponent } from './trigger-creator.component';

describe('TriggerCreatorComponent', () => {
  let component: TriggerCreatorComponent;
  let fixture: ComponentFixture<TriggerCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
