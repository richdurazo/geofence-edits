import { Component, OnInit } from '@angular/core';

import { DateUtilsService } from '../../shared/date-utils.service';
import { FilestackService } from '../../shared/filestack.service';
import { UuidApiService } from '../../shared/uuid-api.service';
import { ContentApiService } from '../shared/content-api.service';
import { ContentModel } from '../shared/content.model';

@Component({
    selector: 'app-content-creator-form',
    templateUrl: './content-creator-form.component.html',
    styleUrls: ['./content-creator-form.component.scss']
})
export class ContentCreatorFormComponent implements OnInit {

    content: ContentModel;

    contentTypes: [
        {
            value: "offer",
            viewValue: "Offer"
        },
        {
            value: "prize",
            viewValue: "Prize"
        },
        {
            value: "message",
            viewValue: "Message"
        }
    ];

    contentType: string;

    contentUuid: string;

    scratcherEnabled: boolean;

    limitEnabled: boolean;

    redemptionFormat: string;

    redemptionFormats: [
        {
            value: "format1",
            viewValue: "Format 1"
        },
        {
            value: "format2",
            viewValue: "Format 2"
        },
        {
            value: "format3",
            viewValue: "Format 3"
        }
    ]

    redemptionMethods: [
        {
            value: "online",
            viewValue: "Online"
        },
        {
            value: "store",
            viewValue: "In Store"
        },
        {
            value: "both",
            viewValue: "Online & In Store"
        }
    ]

    heroImageConfig: any;

    walletImageConfig: any;

    constructor (
        private contentApi: ContentApiService,
        private uuidApi: UuidApiService,
        private filestack: FilestackService,
        private dateUtils: DateUtilsService
    ) {}

    ngOnInit() {
        this.fetchUuid();
        this.contentTypes = [
            {
                value: "offer",
                viewValue: "Offer"
            },
            {
                value: "prize",
                viewValue: "Prize"
            },
            {
                value: "message",
                viewValue: "Message"
            }
        ];

        this.redemptionMethods = [
            {
                value: "online",
                viewValue: "Online"
            },
            {
                value: "store",
                viewValue: "In Store"
            },
            {
                value: "both",
                viewValue: "Online & In Store"
            }
        ];

        this.redemptionFormats = [
            {
                value: "format1",
                viewValue: "Format 1"
            },
            {
                value: "format2",
                viewValue: "Format 2"
            },
            {
                value: "format3",
                viewValue: "Format 3"
            }
        ];
    }

    public setDate (key, event) {
        console.log('key, event', key, event);
        this.content[key] = new Date(event);
    }

    public setType (event) {
        console.log('setType event', event);
        this.contentType = event;
        this.setModelDefaults(this.contentType);
    }

    public submitForm (form) {
        console.log('submitForm this.content', this.content);
        if (!form.valid) { return; }
        var obj = JSON.parse(JSON.stringify(this.content));
        obj.start_at = this.dateUtils.formatSQLDate(obj.start_at);
        obj.end_at = this.dateUtils.formatSQLDate(obj.end_at);
        this.contentApi.createContent(obj)
        .subscribe(
            data => this.processSuccess(data)
        )
    }

    processSuccess (data) {
        console.log('saved content data', data);
    }

    private fetchUuid () {
        this.uuidApi.fetchUuid()
        .subscribe(
            data => {
                this.contentUuid = data.uuid;
                this.heroImageConfig = this.filestack.createConfig('hero', this.contentUuid, 2/1);
                this.walletImageConfig = this.filestack.createConfig('wallet', this.contentUuid, 1/1);
            }
        )
    }

    private setModelDefaults (type: string) {
        this.content = new ContentModel(this.contentUuid, type, '', '', '', new Date(), new Date());
        console.log('this.content', this.content);
    }

}
