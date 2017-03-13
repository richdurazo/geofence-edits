import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerCreatorFormComponent } from './trigger-creator-form.component';

describe('TriggerCreatorFormComponent', () => {
  let component: TriggerCreatorFormComponent;
  let fixture: ComponentFixture<TriggerCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
