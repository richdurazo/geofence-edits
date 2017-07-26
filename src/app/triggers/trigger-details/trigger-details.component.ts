import { DeliveryPresetApiService } from './../delivery-preset/delivery-preset-api.service';
import { DeliveryPresetModel } from './../shared/delivery-preset.model';
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContentGroupModel } from '../../content/shared/content-group.model';

import { TriggerApiService } from '../shared/trigger-api.service';
import { TriggerModel } from '../shared/trigger.model';

@Component({
  selector: 'app-trigger-details',
  templateUrl: './trigger-details.component.html',
  styleUrls: ['./trigger-details.component.scss']
})
export class TriggerDetailsComponent implements OnInit {

    @Input() trigger: TriggerModel;

    @Output() onRemove: EventEmitter<any> = new EventEmitter();


    id: string;

    deliveryPresetId: number;

    triggerType: string;

    contentGroups: ContentGroupModel[];

    adding: boolean = false;

    deliveryPreset: DeliveryPresetModel;

    deliveryPresets: DeliveryPresetModel[];

    presetOption: string;

    createPresetMode: boolean;

        triggerTypes = [
            {
                value: 'touch',
                viewValue: 'Touch'
            },
            {
                value: 'beacon',
                viewValue: 'Beacon'
            },
            {
                value: 'geofence',
                viewValue: 'Geofence'
            },
            {
                value: 'audio',
                viewValue: 'Audio'
            }
        ];
        deliveryModes = [
            {
                value: 0,
                viewValue: 'Name'
            },
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
        deliveryPresetOptions = [
            {
                value: 'usePreset',
                viewValue: 'Use Delivery Preset'
            },
            {
                value: 'createPreset',
                viewValue: 'Create New Delivery Preset'
            }
        ];

    private sub: any;

    constructor(private route: ActivatedRoute, 
                private triggerApi: TriggerApiService,
                private deliveryPresetApi: DeliveryPresetApiService) { }

    ngOnInit() {
        console.log('this', this.trigger)
        if (this.trigger) {
            this.initTrigger(this.trigger.delivery_preset_id);
            this.setTriggerType(this.trigger.triggerable_type)

        } else {
            this.sub = this.route.params.subscribe(params => {
                this.id = params['id'];
                this.getTrigger();
            });
        }
        this.triggerTypes = [
            {
                value: 'touch',
                viewValue: 'Touch'
            },
            {
                value: 'beacon',
                viewValue: 'Beacon'
            },
            {
                value: 'geofence',
                viewValue: 'Geofence'
            },
            {
                value: 'audio',
                viewValue: 'Audio'
            }
        ];
            this.deliveryModes = [
            {
                value: 0,
                viewValue: 'Name'
            },
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
        this.deliveryPresetOptions = [
            {
                value: 'usePreset',
                viewValue: 'Use Delivery Preset'
            },
            {
                value: 'createPreset',
                viewValue: 'Create Delivery Preset'
            }
        ];

    }

    initTrigger(id) {
        this.getContentGroups(id);
        this.getDeliveryPreset(id);
        this.getDeliveryPresets();
        this.presetOption = 'usePreset';
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    setTriggerType(str) {
        let substring: string;
        const types: Array<string> = ['geofence', 'audio', 'touch', 'beacon'];
        if (str !== undefined) {
        for (let type of types) {
            substring = type;
            if (str.toLowerCase().includes(substring)) {
                this.triggerType = substring;
            }
        }
        }

    }

    private getTrigger () {
        this.triggerApi.getTrigger(this.id)
        .subscribe(data => {
            this.setTriggerType(data.triggerable_type);
            this.trigger = data;
            this.initTrigger(this.trigger.delivery_preset_id);
        });
    }

    public getContentGroups (id) {
        this.triggerApi.getTriggerContentGroups(id)
        .subscribe(data => {
            this.contentGroups = data;
        });
    }

    public contentCreated (data) {
        this.contentGroups.push(data);
        this.adding = false;
    }

    public getDeliveryPreset(id) {
    this.deliveryPresetApi.getDeliveryPreset(id)
        .subscribe(data => {
            this.deliveryPreset = data;
            this.trigger.delivery_preset_id = data.id;
                            this.presetOption = 'usePreset';
                        console.log('dp data', this.deliveryPreset)

        })
    }

    public getDeliveryPresets() {
        this.triggerApi.getDeliveryPresets()
        .subscribe(
            data => {
                this.deliveryPresets = data;
                console.log('dps', this.deliveryPresets)
            }
        );
    }
    setDeliveryPreset(event) {
        console.log(event)
        this.trigger.delivery_preset_id = event;
        this.initTrigger(event)
        

    }
    setDeliveryPresetOption(event) {
        this.presetOption = event;
        if (this.presetOption === 'createPreset') {
            this.createPresetMode = true;
        } else {
            if (this.presetOption === 'usePreset') {
                this.getDeliveryPresets();
            }
        }
    }

    public submitForm(form) {
        console.log(form)
    }
    onCancel(form) {
/*        this.initTrigger(this.trigger.delivery_preset_id)
        console.log('reset form', form)*/
    }

    onDelete() {
        this.triggerApi.deleteTrigger(this.trigger.id)
            .subscribe(data => {
                if(data) {
                    this.processDelete(this.trigger.id)
                }
            })
    }

    processDelete(data) {
        if(this.onRemove) {
            this.onRemove.emit(data)
        }
    }    
    
    public presetCreated(data) {
        this.deliveryPreset = data;
        this.deliveryPresets.push(data);
        this.setDeliveryPreset(data.id);
        this.deliveryPreset.id = data.id;
        this.presetOption = "usePreset";
        console.log(data)
    }

}
