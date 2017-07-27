import { TriggerApiService } from './../../shared/trigger-api.service';
import { TriggerApiMockService } from './../../../mocks/triggers/trigger-api-mock.service';
import { MapsAPILoader } from '@agm/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconCreatorComponent } from './beacon-creator.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BeaconCreatorComponent', () => {
  let component: BeaconCreatorComponent;
  let fixture: ComponentFixture<BeaconCreatorComponent>;
  let triggerApi: TriggerApiMockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconCreatorComponent ],
      imports: [
          ReactiveFormsModule
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
    fixture = TestBed.createComponent(BeaconCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
