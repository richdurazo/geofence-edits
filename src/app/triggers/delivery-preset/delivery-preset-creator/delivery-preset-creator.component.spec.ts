import { UuidApiMockService } from './../../../mocks/shared/uuid-api-mock.service';
import { UuidApiService } from './../../../shared/uuid-api.service';
import { FormsModule } from '@angular/forms';
import { DeliveryPresetApiService } from './../delivery-preset-api.service';
import { DeliveryPresetApiMockService } from './../../../mocks/triggers/delivery-preset-api-mock.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { DeliveryPresetCreatorComponent } from './delivery-preset-creator.component';

describe('DeliveryPresetCreatorComponent', () => {
  let component: DeliveryPresetCreatorComponent;
  let fixture: ComponentFixture<DeliveryPresetCreatorComponent>;
  let deliveryPresetApi: DeliveryPresetApiMockService;
  let uuidApi: UuidApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPresetCreatorComponent ],
      imports: [
          FormsModule
      ],
      schemas: [
          CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
          { provide: DeliveryPresetApiService, useClass: DeliveryPresetApiMockService},
          { provide: UuidApiService, useClass: UuidApiMockService }

      ]
    })
    .compileComponents();
    deliveryPresetApi = TestBed.get(DeliveryPresetApiService);
    uuidApi = TestBed.get(UuidApiService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPresetCreatorComponent);
    component = fixture.componentInstance;
    spyOn(component.onCreate, 'emit')
    fixture.detectChanges();
  });

/*  it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
