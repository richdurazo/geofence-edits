import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconCreatorComponent } from './beacon-creator.component';

describe('BeaconCreatorComponent', () => {
  let component: BeaconCreatorComponent;
  let fixture: ComponentFixture<BeaconCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
