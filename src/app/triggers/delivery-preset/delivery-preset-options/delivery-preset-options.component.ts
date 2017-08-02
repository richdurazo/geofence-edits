import { DeliveryPresetApiService } from './../delivery-preset-api.service';
import { ContentGroupModel } from './../../../content/shared/content-group.model';
import { TriggerApiService } from './../../shared/trigger-api.service';
import { DeliveryPresetModel } from './../../shared/delivery-preset.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-delivery-preset-options',
  templateUrl: './delivery-preset-options.component.html',
  styleUrls: ['./delivery-preset-options.component.scss']
})
export class DeliveryPresetOptionsComponent implements OnInit {
    
    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    @Input() presetDelivery: DeliveryPresetModel;

    adding: boolean = false;

    contentGroup: ContentGroupModel;

    contentGroups: ContentGroupModel[];

    @Input() deliveryPresets: DeliveryPresetModel[];

    @Input() deliveryPreset: DeliveryPresetModel;

    editing: boolean = false;

    presetName: string;

    presetMode: any;

    @Input() presetOption: string;

    form: NgForm;

    deliveryPresetOptions = [
       {
           value: 'usePreset',
           viewValue: 'Use Delivery Preset'
       },
       {
           value: 'createPreset',
           viewValue: 'Create Delivery Preset'
       }
    ];
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

    constructor( private triggerApi: TriggerApiService,
                 private deliveryPresetApi: DeliveryPresetApiService ) { }

    ngOnInit() {
        if (this.deliveryPreset) {
            this.presetName = this.deliveryPreset.name;
            this.getTriggerContentGroups(this.deliveryPreset.id)
        } else {
        this.presetName = '';
        this.deliveryPreset = new DeliveryPresetModel(0, this.presetName, 0, '')
        }


        if (this.presetDelivery) {
            this.presetOption = "usePreset";
            this.deliveryPreset = this.presetDelivery;
        }
    }

    setDeliveryPresetOption(event) {
        this.presetOption = event;
    }

    setDeliveryPreset(event) {
        for (let preset of this.deliveryPresets) {
            if (event === preset.id) {
                this.deliveryPreset = preset;
                this.deliveryPreset.id = event;
                if (this.onSelect) {
                    this.onSelect.emit(this.deliveryPreset);
                }
            }
        }
        this.getTriggerContentGroups(event);
    }

    public getTriggerContentGroups (id) {
        this.triggerApi.getTriggerContentGroups(id)
        .subscribe(data => {
            this.contentGroups = data;
        });
    }

    public contentCreated (data) {
        this.contentGroups.push(data);
        this.adding = false;
    }
    public presetCreated(data) {
      this.deliveryPresets.push(data);
      this.deliveryPreset = data;
      this.presetOption = "usePreset";
      this.setDeliveryPreset(data.id)
      this.deliveryPreset.id = data.id;
      this.onSelect.emit(data)
      this.presetName = data.name;
      this.editing = true;
    }
}
