import { Component, OnInit } from '@angular/core';

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

    trigger: TriggerModel;

    triggerMediaConfig: any;

    triggerMediaExists: boolean = false;

    triggerType: string;

    triggerTypes: [
        {
            value: "touch",
            viewValue: "Touch"
        },
        {
            value: "watermark",
            viewValue: "Audio Watermark"
        },
        {
            value: "fingerprint",
            viewValue: "Audio Fingerprint"
        },
        {
            value: "beacon",
            viewValue: "Beacon"
        }
    ];

    triggerUuid: string;

    constructor(private uuidApi: UuidApiService, private triggerApi: TriggerApiService, private filestack: FilestackService) { }

    ngOnInit() {
        this.fetchUuid();

        this.triggerTypes = [
            {
                value: "touch",
                viewValue: "Touch"
            },
            {
                value: "watermark",
                viewValue: "Audio Watermark"
            },
            {
                value: "fingerprint",
                viewValue: "Audio Fingerprint"
            },
            {
                value: "beacon",
                viewValue: "Beacon"
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
        console.log('this.trigger', this.trigger);
        var obj = Object.assign({}, this.trigger);

        this.triggerApi.createTrigger(obj)
        .subscribe(
            data => this.processSuccess(data)
        )
    }

    processSuccess (data) {
        console.log('saved trigger data', data);
    }

    public setType (event) {
        this.triggerType = event;

        if (!this.trigger) {
            this.trigger = new TriggerModel('', event);
        } else {
            this.trigger.type = this.triggerType;
        }

        this.getTriggerValue();
    }

    public getTriggerValue () {
        if (!this.trigger.value && (this.trigger.type === 'watermark' || this.trigger.type === 'touch')) {
            this.triggerApi.getTriggerValue()
            .subscribe(
                data => {
                    this.trigger.value = data.trigger.value;
                }
            )
        } else if (this.trigger.value && (this.trigger.type === 'fingerprint' || this.trigger.type === 'beacon')) {
            this.trigger.value = null;
        }

    }

}
