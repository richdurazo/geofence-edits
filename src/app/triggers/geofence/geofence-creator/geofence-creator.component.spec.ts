import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceCreatorComponent } from './geofence-creator.component';

describe('GeofenceCreatorComponent', () => {
  let component: GeofenceCreatorComponent;
  let fixture: ComponentFixture<GeofenceCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
