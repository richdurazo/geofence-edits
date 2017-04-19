import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';

import { TermsDialogComponent } from './terms-dialog/terms-dialog.component';

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
    ];

    contentType: string;

    contentUuid: string;

    scratcherEnabled: boolean;

    limitEnabled: boolean;

    redemptionFormat: string;

    heroOfferImageConfig: any;

    heroOfferImageExists: boolean = false;

    heroOfferImageModified: number;

    heroScratcherImageExists: boolean = false;

    heroScratcherImageConfig: any;

    overlayScratcherImageExists: boolean = false;

    overlayScratcherImageConfig: any;

    walletImageConfig: any;

    constructor (
        private contentApi: ContentApiService,
        private uuidApi: UuidApiService,
        private filestack: FilestackService,
        private dateUtils: DateUtilsService,
        private dialog: MdDialog
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

    public launchTerms () {
        let config = {
            data: this.content.terms || '',
            disableClose: true
        };
        let dialogRef = this.dialog.open(TermsDialogComponent, config);
        dialogRef.afterClosed().subscribe(result => {
            this.content.terms = result;
        });
    }

    public setDate (key, event) {
        this.content[key] = new Date(event);
    }

    public setType (event) {
        this.contentType = event;
        this.setModelDefaults(this.contentType);
    }

    public submitForm (form) {
        // console.log('submitForm this.content', JSON.stringify(this.content, null, 2));
        if (!form.valid) { return; }
        var obj = Object.assign({}, this.content);
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

    public fetchUuid () {
        this.uuidApi.fetchUuid()
        .subscribe(
            data => {
                this.contentUuid = data.uuid;
                this.setImageConfig();
            }
        )
    }

    private setImageConfig () {
        this.heroOfferImageConfig = this.filestack.createImageConfig('hero-offer', this.contentUuid, 2/1);
        this.heroScratcherImageConfig = this.filestack.createImageConfig('hero-scratcher', this.contentUuid, 2/1);
        this.overlayScratcherImageConfig = this.filestack.createImageConfig('overlay-scratcher', this.contentUuid, 9/10);
        this.walletImageConfig = this.filestack.createImageConfig('wallet', this.contentUuid, 1/1);
    }

    private setModelDefaults (type: string) {
        this.content = new ContentModel(this.contentUuid, type, '', '', '', new Date(), new Date());
    }

}
