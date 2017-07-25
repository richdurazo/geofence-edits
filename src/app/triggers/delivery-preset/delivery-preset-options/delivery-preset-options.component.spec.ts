import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPresetOptionsComponent } from './delivery-preset-options.component';

describe('DeliveryPresetOptionsComponent', () => {
  let component: DeliveryPresetOptionsComponent;
  let fixture: ComponentFixture<DeliveryPresetOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPresetOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPresetOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
