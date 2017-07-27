import { TriggerApiMockService } from './../../../mocks/triggers/trigger-api-mock.service';
import { TriggerApiService } from './../../shared/trigger-api.service';
import { MapsAPILoader } from '@agm/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceCreatorComponent } from './geofence-creator.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GeofenceCreatorComponent', () => {
  let component: GeofenceCreatorComponent;
  let fixture: ComponentFixture<GeofenceCreatorComponent>;
  let triggerApi: TriggerApiMockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceCreatorComponent ],
      imports: [
         ReactiveFormsModule, 
      ],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
          MapsAPILoader,
          { provide: TriggerApiService, useClass: TriggerApiMockService}
      ]
    })
    .compileComponents();
    triggerApi = TestBed.get(TriggerApiService)

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
