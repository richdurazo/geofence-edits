import { GeofenceModel } from './../shared/geofence.model';
import { AudioModel } from './../shared/audio.model';
import { FilestackService } from './../../shared/filestack.service';
import { MdDialog } from '@angular/material';
import { DialogConfirmComponent } from './../../shared/dialog-confirm/dialog-confirm.component';
import { BeaconModel } from './../shared/beacon.model';
import { DeliveryPresetApiService } from './../delivery-preset/delivery-preset-api.service';
import { DeliveryPresetModel } from './../shared/delivery-preset.model';
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, animate, transition, style } from '@angular/animations';


import { ContentGroupModel } from '../../content/shared/content-group.model';

import { TriggerApiService } from '../shared/trigger-api.service';
import { TriggerModel } from '../shared/trigger.model';

@Component({
  selector: 'app-trigger-details',
  templateUrl: './trigger-details.component.html',
  styleUrls: ['./trigger-details.component.scss'],
    animations: [
      trigger('expandChange', [
          state('true' ,
              style({ height: '0', display : 'none' }),
          ),
          state('false',
              style({ height: '*', display: '*' })
          ),
          transition('void => *', style({ height: '0' })
          ),
          transition('true => false', [
                style({overflow: 'hidden'}),
                animate('.25s ease-out', style({height: '*'})),
          ]),
          transition('false => true', [
                style({overflow: 'hidden'}),
                animate('.25s ease-out', style({height: '0'})),
          ]),
      ]),
      trigger('iconChange', [
          state('true',
              style({ transform: 'rotate( -180deg )' })
          ),
          state('false',
              style({ transform: 'rotate( 0deg )' })
          ),
          transition('void => *', style({ transform: 'rotate( 0deg )' })
          ),
          transition('* => *', animate('.25s'))
      ])
  ]
})
export class TriggerDetailsComponent implements OnInit {
    beacon: BeaconModel;

    @Input() trigger: TriggerModel;

    @Output() onRemove: EventEmitter<any> = new EventEmitter();

    @Output() onChange: EventEmitter<any> = new EventEmitter();
   
    google: any;

    geofence: GeofenceModel;

    id: string;

    isExpanded: boolean = false;

    delete: boolean;

    audio: AudioModel;

    deliveryPresetId: number;

    triggerType: string;

    contentGroups: ContentGroupModel[];

    adding: boolean = false;

    editing: boolean;

    editMode: boolean;

    deliveryPreset: DeliveryPresetModel;

    @Input() deliveryPresets: DeliveryPresetModel[];

    triggerMediaExists: boolean = true;

    triggerMediaConfig: any;

    presetOption: string = 'usePreset'; 

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
                private deliveryPresetApi: DeliveryPresetApiService,
                private dialog: MdDialog,
                private filestack: FilestackService) { }

    ngOnInit() {

        if (this.trigger) {
            this.initTrigger(this.trigger.delivery_preset_id);
            this.setTriggerType(this.trigger.triggerable_type);
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
        this.getTriggerContentGroups(id);
        this.getDeliveryPreset(id);
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
                    if (this.triggerType === 'audio') {
                        this.setMediaConfig();
                    }
                    if (this.triggerType === 'beacon') {
                        this.setBeaconOptions();
                    }
                    if (this.triggerType === 'geofence') {
                        this.setGeofenceOptions();
                    }
                }
            }
        }

    }

    setMediaConfig() {
        this.triggerMediaConfig = this.filestack.createMediaConfig('audio-trigger', this.trigger.uuid);

    }

    private getTrigger () {
        this.triggerApi.getTrigger(this.id)
        .subscribe(data => {
            this.setTriggerType(data.triggerable_type);
            this.trigger = data;
            this.initTrigger(this.trigger.delivery_preset_id);
        });
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

    public getDeliveryPreset(id) {
        for (let preset of this.deliveryPresets) {
            if (id === preset.id) {
                this.deliveryPreset = preset;
                this.deliveryPreset.id = id;
                    this.onChange.emit(this.deliveryPreset);
            }
        }
    }

    toggleExpanded () {
        this.isExpanded = !this.isExpanded;
    }

    public submitForm(form) {
        var obj = Object.assign({}, this.trigger);

        if (this.triggerType === form.value.type) {
            switch (form.value.type) {
                case 'touch':
                this.triggerApi.updateTrigger(obj)
                    .subscribe(data => {
                        this.processSuccess(data);
                    })
                break;
                case 'audio':
                this.triggerApi.updateTrigger(obj)
                    .subscribe(data => {
                        this.processSuccess(data)
                    })
                break;
                case 'beacon':
                console.log('beacon', form)
                break;
                case 'geofence':
                console.log('geofence', form)
                break;
            }
        } else {
            console.log('type change');
            // Handle the case where user is editing and wants to chage the trigger type
        }

    }
    processSuccess(data) {
        this.editing = false;
    }
    onCancel(form) {
        this.editMode = true;
            if (this.onChange) {
            this.onChange.emit(this.editMode)
        }
    }

    onDelete() {
        this.triggerApi.deleteTrigger(this.trigger)
            .subscribe(data => {
                if(data) {
                    this.processDelete(this.trigger.id)
                }
            })
    }

    setBeaconOptions() {
        this.triggerApi.getBeaconTrigger(this.trigger.triggerable_id)
            .subscribe(data => {
                this.beacon = data;
                this.processTrigger(this.beacon)
            });
    }
    setGeofenceOptions() {
        this.triggerApi.getGeofenceTrigger(this.trigger.triggerable_id)
            .subscribe(data => {
                this.geofence = data;
                this.processTrigger(this.geofence)
            });
    }
    onEdit() {
        this.editing = true;
    }

    processTrigger(data) {
        console.log(data, 'emit beacon')
        if (this.onChange) {
            this.onChange.emit(data);
        }
    }
    emitPreset(data) {
        if (this.onChange) {
            this.onChange.emit(data);
        }
    }
    public launchConfirmRemove () {
        let config = {
            disableClose: false
        };
        let dialogRef = this.dialog.open(DialogConfirmComponent, config);
        dialogRef.componentInstance.data = this.trigger;
        dialogRef.afterClosed().subscribe( result => {
            this.delete = result;
            console.log(result, this.delete);
            if (this.delete) {
                this.processDelete(this.trigger);
            }
        })
    }

    public processDelete(item) {

        this.triggerApi.deleteTrigger(this.trigger)
            .subscribe(data => {
                if(data) {
                    this.processDelete(this.trigger.id);
                }
            });
    }
    setEditMode() {
        this.editMode = false;
        if (this.onChange) {
            this.onChange.emit(this.editMode)
        }
    }
}
