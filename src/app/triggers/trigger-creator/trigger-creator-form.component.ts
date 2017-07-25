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

        this.triggerApi.createTrigger(obj)
        .subscribe(
            data => this.processSuccess(data)
        )
    }

    processSuccess (data) {
        if (this.onCreate) {
            this.onCreate.emit(data);
        }
    }

    public setType (event, form) {
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

}
