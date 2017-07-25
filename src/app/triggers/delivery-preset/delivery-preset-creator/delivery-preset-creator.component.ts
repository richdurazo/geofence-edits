import { DeliveryPresetApiService } from './../delivery-preset-api.service';
import { NgForm } from '@angular/forms';
import { DeliveryPresetModel } from './../../shared/delivery-preset.model';
import { UuidApiService } from './../../../shared/uuid-api.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delivery-preset-creator',
  templateUrl: './delivery-preset-creator.component.html',
  styleUrls: ['./delivery-preset-creator.component.scss']
})

export class DeliveryPresetCreatorComponent implements OnInit {

  @Output() onCreate: EventEmitter<any> = new EventEmitter();

  deliveryPreset: DeliveryPresetModel;

  deliveryMode: number;

  uuid: string;

  presetCreated: boolean = false;

  deliveryModes = [
    {
        value: 1,
        viewValue: 'Standard'
    },
    {
        value: 2,
        viewValue: 'Multiple Offer'
    },
    {
        value: 3,
        viewValue: 'Sequential'
    },
    {
        value: 4,
        viewValue: 'Random'
    }
   ];
  constructor( private uuidApi: UuidApiService,
               private deliveryPresetApi: DeliveryPresetApiService) { }

  ngOnInit() {
        this.fetchUuid();

            this.deliveryModes = [
            {
                value: 1,
                viewValue: 'Standard'
            },
            {
                value: 2,
                viewValue: 'Multiple Offer'
            },
            {
                value: 3,
                viewValue: 'Sequential'
            },
            {
                value: 4,
                viewValue: 'Random'
            }
        ];
  }

  public fetchUuid () {
      if (!this.presetCreated) {
          this.uuidApi.fetchUuid()
          .subscribe(
               data => {
                   this.uuid = data.uuid;
          })
      }

    }

  public submitForm (form: NgForm) {
    let mode = form.value.deliveryMode;
    let name = form.value.presetName;

    if (form.valid) {
        this.deliveryPreset = new DeliveryPresetModel( null, name, mode, this.uuid );
        this.createDeliveryPreset(this.deliveryPreset);
      }
  }
  public createDeliveryPreset(data) {
    this.deliveryPresetApi.createDeliveryPreset(data)
          .subscribe(result => {
              this.processSuccess(result);
              this.presetCreated = true;
          });
  }

  public processSuccess (data) {
      this.presetCreated = true;
      if (this.onCreate) {
          this.onCreate.emit(data);
      }
  }

}
