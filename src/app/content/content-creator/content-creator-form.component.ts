import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdDialog } from '@angular/material';

import { TermsDialogComponent } from './terms-dialog/terms-dialog.component';

import { FilestackService } from '../../shared/filestack.service';
import { UuidApiService } from '../../shared/uuid-api.service';
import { ContentModel } from '../shared/content.model';

@Component({
    selector: 'app-content-creator-form',
    templateUrl: './content-creator-form.component.html',
    styleUrls: ['./content-creator-form.component.scss']
})

export class ContentCreatorFormComponent implements OnInit {

    content: ContentModel;
    editMode = false;

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

    form: NgForm;

    constructor (
        private uuidApi: UuidApiService,
        private filestack: FilestackService,
        private dialog: MdDialog,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.fetchUuid();
        this.route.params
            .subscribe(
                (params: Params) => {
                this.editMode = params['id'] != null;
                console.log('editMode', this.editMode);
                this.initForm();
            });

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
            data: this.content.content_term_id,
            disableClose: true
        };
        let dialogRef = this.dialog.open(TermsDialogComponent, config);
        dialogRef.afterClosed().subscribe(result => {
            this.content.content_term_id = result.id;
        });
    }

    public setDate (key, event) {
        this.content[key] = new Date(event);
    }

    public setType (event, form) {
        this.form = form;
        this.contentType = event;
        this.setModelDefaults(this.contentType);
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

    public setImageConfig () {
        this.heroOfferImageConfig = this.filestack.createImageConfig('hero-offer', this.contentUuid, 2/1);
        this.heroScratcherImageConfig = this.filestack.createImageConfig('hero-scratcher', this.contentUuid, 2/1);
        this.overlayScratcherImageConfig = this.filestack.createImageConfig('overlay-scratcher', this.contentUuid, 9/10);
        this.walletImageConfig = this.filestack.createImageConfig('wallet', this.contentUuid, 1/1);
    }

    public setModelDefaults (type: string) {
        this.content = new ContentModel(this.contentUuid, type, '', '', '', new Date(), new Date());
    }

    public initForm() {
        if (this.editMode) {
            this.contentType = "offer";
        } else {
            console.log(this.editMode);
        }
    }

}
