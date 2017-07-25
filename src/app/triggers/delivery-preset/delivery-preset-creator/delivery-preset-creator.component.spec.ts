import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPresetCreatorComponent } from './delivery-preset-creator.component';

describe('DeliveryPresetCreatorComponent', () => {
  let component: DeliveryPresetCreatorComponent;
  let fixture: ComponentFixture<DeliveryPresetCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPresetCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPresetCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
