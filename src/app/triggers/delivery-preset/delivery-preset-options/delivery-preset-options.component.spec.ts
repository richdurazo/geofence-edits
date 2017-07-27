import { TriggerApiService } from './../../shared/trigger-api.service';
import { TriggerApiMockService } from './../../../mocks/triggers/trigger-api-mock.service';
import { UuidApiMockService } from './../../../mocks/shared/uuid-api-mock.service';
import { UuidApiService } from './../../../shared/uuid-api.service';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPresetOptionsComponent } from './delivery-preset-options.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DeliveryPresetOptionsComponent', () => {
  let component: DeliveryPresetOptionsComponent;
  let fixture: ComponentFixture<DeliveryPresetOptionsComponent>;
  let uuidApi: UuidApiService;
  let triggerApi: TriggerApiMockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPresetOptionsComponent ],

      imports: [
          FormsModule
      ],
      schemas: [
          CUSTOM_ELEMENTS_SCHEMA
      ],
        providers: [
            { provide: UuidApiService, useClass: UuidApiMockService },
            { provide: TriggerApiService, useClass: TriggerApiMockService}

        ]
    })
    .compileComponents();
     uuidApi = TestBed.get(UuidApiService);
     triggerApi = TestBed.get(TriggerApiService)

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPresetOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
