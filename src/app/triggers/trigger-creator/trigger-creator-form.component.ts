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

    @Input() parentCampaign: CampaignModel;

    @Output() onCreate: EventEmitter<any> = new EventEmitter();

    beacon: BeaconModel;

    beacons: BeaconModel[] = [];

    deliveryPreset: DeliveryPresetModel;

    geofence: GeofenceModel;

    trigger: TriggerModel;

    triggerMediaConfig: any;

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

    public submitForm (form) {
        if (!form.valid) {
            return;
        }
        var obj = Object.assign({}, this.trigger);
        console.log(obj)

        if (obj.type === "touch") {

        this.triggerApi.createTouchTrigger(obj)
            .subscribe(data => {
                this.processSuccess(data.trigger);
            });
        }
        if (this.triggerType === "geofence") {
            console.log(obj)
            this.triggerApi.createGeofenceTrigger(obj)
                .subscribe(data => {
                    this.attachPreset(data.trigger.id);
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
    }

    public presetCreated(data) {
        this.deliveryPreset = data;
        this.trigger.delivery_preset_id = data.id;
    }

    public setType (event, form) {
        this.triggerType = event;
        console.log(event);
        if (!this.trigger) {
            this.trigger = new TriggerModel(this.triggerName, this.triggerType, this.triggerUuid, this.campaign_id, null);
        } else {
            this.trigger.type = this.triggerType;
        }
        if (this.parentCampaign) {
            this.trigger.campaign_id = this.parentCampaign.id;
        }
        this.trigger = new TriggerModel(this.triggerName, this.triggerType, this.triggerUuid, this.campaign_id, null);

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

}
