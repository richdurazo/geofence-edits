import { AudioModel } from './../shared/audio.model';
import { DeliveryPresetModel } from './../shared/delivery-preset.model';
import { GeofenceModel } from './../shared/geofence.model';
import { BeaconModel } from './../shared/beacon.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CampaignModel } from '../../campaigns/shared/campaign.model';
import { CampaignApiService } from '../../campaigns/shared/campaign-api.service';

import { FilestackService } from '../../shared/filestack.service';
import { UuidApiService } from '../../shared/uuid-api.service';
import { TriggerApiService } from '../shared/trigger-api.service';
import { TriggerModel } from '../shared/trigger.model';

@Component({
    selector: 'app-trigger-creator-form',
    templateUrl: './trigger-creator-form.component.html',
    styleUrls: ['./trigger-creator-form.component.scss']
})
export class TriggerCreatorFormComponent implements OnInit {

    @Input() editTrigger: TriggerModel;

    @Input() parentCampaign: CampaignModel;

    @Input() presetDelivery: DeliveryPresetModel;

    @Output() onCreate: EventEmitter<any> = new EventEmitter();

    @Input() lastModified: number;

    audio: AudioModel;

    beacon: BeaconModel;

    beacons: BeaconModel[] = [];

    deliveryPreset: DeliveryPresetModel;

    geofence: GeofenceModel;

    editMode: boolean;

    filename: string;

    trigger: TriggerModel;

    triggerMediaConfig: any;

    triggerMediaModified: number;

    triggerMediaExists: boolean = false;

    triggerType: string;

    triggerCampaign: CampaignModel;

    triggerName: string = '';

    campaigns: CampaignModel[];

    campaign_id: number;

    triggerTypes: [
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

    triggerUuid: string;

    constructor( private uuidApi: UuidApiService,
                 private triggerApi: TriggerApiService,
                 private campaignApi: CampaignApiService,
                 private filestack: FilestackService
                 ) { }

    ngOnInit() {
        this.fetchUuid();

        if (!this.parentCampaign) {
            this.getCampaigns();
        } else {
            this.campaign_id = this.parentCampaign.id;
        }
        if(this.editTrigger) {
            this.editMode = true;
            this.trigger = this.editTrigger;
            this.setTriggerType(this.trigger.triggerable_type);
            this.deliveryPreset = this.presetDelivery;
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
    }


    public fetchUuid () {
        this.uuidApi.fetchUuid()
        .subscribe(
            data => {
                this.triggerUuid = data.uuid;
                this.triggerMediaConfig = this.filestack.createMediaConfig('audio-trigger', this.triggerUuid);
            }
        )
    }


    setTriggerType(str) {
        let substring: string;
        const types: Array<string> = ['geofence', 'audio', 'touch', 'beacon'];
        if (str !== undefined) {
            for (let type of types) {
                substring = type;
                if (str.toLowerCase().includes(substring)) {
                    this.triggerType = substring;
                    this.trigger.type = substring;
                    this.initType(this.trigger.type);
                }
            }
        }

    }

    initType(type) {
        if (type === 'geofence') {
            this.getGeofenceTrigger(this.trigger.triggerable_id)
        }

    }

    getGeofenceTrigger(id) {
        this.triggerApi.getGeofenceTrigger(id)
            .subscribe(data => {
                this.geofence = data;
            })
    }

    public submitForm (form) {
        if (!form.valid) {
            return;
        }

        var obj = Object.assign({}, this.trigger);

        if (this.triggerType  === "touch") {

            this.triggerApi.createTouchTrigger(obj)
                .subscribe(data => {
                    this.processSuccess(data.trigger);
                });
        }
        if (this.triggerType === "geofence") {
            this.triggerApi.createGeofenceTrigger(obj)
                .subscribe(data => {
                    this.attachPreset(data.trigger.id);
            });
        }

        if (this.triggerType === "beacon") {
            this.triggerApi.createBeaconTrigger(obj)
                .subscribe(data => {
                    this.processSuccess(data.trigger);
                });
        }

        if (this.triggerType === "audio") {
            this.audio.name = this.trigger.name;
            let obj = Object.assign({}, this.audio);
            this.triggerApi.createAudioTrigger(obj)
                .subscribe(data => {
                    this.processSuccess(data.trigger);
                });
            }
    }

    attachPreset(id) {
        this.trigger.id = id;
        this.trigger.delivery_preset_id = this.deliveryPreset.id;
        this.triggerApi.updateTrigger(this.trigger)
            .subscribe(data => {
                this.processSuccess(this.trigger);
            });
    }

    processSuccess (data) {
        if (this.onCreate) {
            this.onCreate.emit(data);
        }
    }

    public presetSelected(data) {
        this.deliveryPreset = data;
        this.trigger.delivery_preset_id = data.id;
        if (this.audio) {
            this.audio.delivery_preset_id = data.id
        }
    }

    public presetCreated(data) {
        this.deliveryPreset = data;
        this.trigger.delivery_preset_id = data.id;
        if (this.audio) {
            this.audio.delivery_preset_id = data.id
        }
    }

    public setType (event) {
        this.triggerType = event;

        if (!this.trigger) {
            this.trigger = new TriggerModel(this.triggerName, this.triggerType, this.triggerUuid, this.campaign_id, null);
        } else {
            this.trigger.type = this.triggerType;
        }
        if (this.parentCampaign) {
            this.trigger.campaign_id = this.parentCampaign.id;
        }
        this.trigger = new TriggerModel(this.triggerName, this.triggerType, this.triggerUuid, this.campaign_id, null);
        if (event === "audio") {
            this.setAudioFileName()
         }
    }

    setAudioFileName() {
        let uuid = this.triggerUuid;
        this.filename = 'https://s3-us-west-1.amazonaws.com/garythebucket' + '/' + uuid[0] + '/' + uuid[1] + '/' + uuid + '/' + 'video' + '/' + 'audio-trigger.mp4';
        this.trigger.file_name = this.filename;
        console.log(this.trigger.file_name)
        this.audio = new AudioModel(this.triggerName, uuid, null, this.campaign_id, this.trigger.file_name);
    }

    public setCampaign (data) {
        this.trigger.campaign_id = data.id;
    }

    public getCampaigns () {
        this.campaignApi.getCampaigns()
        .subscribe(
            (data) => {
                this.campaigns = data;
            }
        );
    }

    public geofenceCreated (data) {
        this.geofence = data;
        this.trigger.address = this.geofence.address;
        this.trigger.geometry = data.geometry;
        this.trigger.radius = data.radius;
        this.trigger.type = data.type;
    }
    public beaconCreated (data) {
        this.beacons.push(data);
        this.beacon = data;
        this.trigger.active = data.active;
        this.trigger.client_id = data.client_id;
        this.trigger.address = data.address;
        this.trigger.latitude = data.latitude;
        this.trigger.longitude = data.longitude;
        this.trigger.unique_id = data.unique_id;
        this.trigger.vendor = data.vendor;

    }

}
