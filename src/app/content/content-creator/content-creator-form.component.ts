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
            value: 'AZTEC',
            viewValue: 'AZTEC'
        },
        {
            value: 'CODABAR',
            viewValue: 'CODABAR'
        },
        {
            value: 'CODE_39',
            viewValue: 'CODE 39'
        },
        {
            value: 'CODE_93',
            viewValue: 'CODE 93'
        },
        {
            value: 'CODE_128',
            viewValue: 'CODE 128'
        },
        {
            value: 'DATA_MATRIX',
            viewValue: 'DATA MATRIX'
        },
        {
            value: 'EAN_8',
            viewValue: 'EAN 8'
        },
        {
            value: 'EAN_13',
            viewValue: 'EAN 13'
        },
        {
            value: 'ITF',
            viewValue: 'ITF'
        },
        {
            value: 'MAXICODE',
            viewValue: 'MAXICODE'
        },
        {
            value: 'PDF_417',
            viewValue: 'PDF 417'
        },
        {
            value: 'QR_CODE',
            viewValue: 'QR CODE'
        },
        {
            value: 'RSS_14',
            viewValue: 'RSS 14'
        },
        {
            value: 'RSS_EXPANDED',
            viewValue: 'RSS EXPANDED'
        },
        {
            value: 'UPC_A',
            viewValue: 'UPC A'
        },
        {
            value: 'UPC_E',
            viewValue: 'UPC E'
        },
        {
            value: 'UPC_EAN_EXTENSION',
            viewValue: 'UPC EAN EXTENSION'
        },
        {
            value: 'OTHER',
            viewValue: 'Other'
        }
    ];


    redemptionMethods: [
        {
            value: 1,
            viewValue: "Online"
        },
        {
            value: 2,
            viewValue: "In Store"
        },
        {
            value: 3,
            viewValue: "Online & In Store"
        }
    ];

    redemptionCodeOptions = [
            {
                value: "none",
                viewValue: "None"
            },
            {
                value: "manual",
                viewValue: "Manual"
            },
            {
                value: "upload",
                viewValue: "Upload"
            }
        ];

    contentType: string;

    codeOption: string;

    contentUuid: string;

    scratcherEnabled: boolean;

    limitEnabled: boolean;

    redemptionFormat: string;

    redemption_method: number;

    heroOfferImageConfig: any;

    heroOfferImageExists: boolean = false;

    heroOfferImageModified: number;

    heroScratcherImageExists: boolean = false;

    heroScratcherImageConfig: any;

    overlayScratcherImageExists: boolean = false;

    overlayScratcherImageConfig: any;

    walletImageConfig: any;

    csvFileConfig: any;

    csvFileExists: boolean = false;

    form: NgForm;

    constructor (
        private uuidApi: UuidApiService,
        private filestack: FilestackService,
        private dialog: MdDialog,
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
                value: 1,
                viewValue: "Online"
            },
            {
                value: 2,
                viewValue: "In Store"
            },
            {
                value: 3,
                viewValue: "Online & In Store"
            }
        ];

        this.redemptionFormats = [
            {
                value: 'AZTEC',
                viewValue: 'AZTEC'
            },
            {
                value: 'CODABAR',
                viewValue: 'CODABAR'
            },
            {
                value: 'CODE_39',
                viewValue: 'CODE 39'
            },
            {
                value: 'CODE_93',
                viewValue: 'CODE 93'
            },
            {
                value: 'CODE_128',
                viewValue: 'CODE 128'
            },
            {
                value: 'DATA_MATRIX',
                viewValue: 'DATA MATRIX'
            },
            {
                value: 'EAN_8',
                viewValue: 'EAN 8'
            },
            {
                value: 'EAN_13',
                viewValue: 'EAN 13'
            },
            {
                value: 'ITF',
                viewValue: 'ITF'
            },
            {
                value: 'MAXICODE',
                viewValue: 'MAXICODE'
            },
            {
                value: 'PDF_417',
                viewValue: 'PDF 417'
            },
            {
                value: 'QR_CODE',
                viewValue: 'QR CODE'
            },
            {
                value: 'RSS_14',
                viewValue: 'RSS 14'
            },
            {
                value: 'RSS_EXPANDED',
                viewValue: 'RSS EXPANDED'
            },
            {
                value: 'UPC_A',
                viewValue: 'UPC A'
            },
            {
                value: 'UPC_E',
                viewValue: 'UPC E'
            },
            {
                value: 'UPC_EAN_EXTENSION',
                viewValue: 'UPC EAN EXTENSION'
            },
            {
                value: 'OTHER',
                viewValue: 'Other'
            }
        ];

        this.redemptionCodeOptions = [
            {
                value: "none",
                viewValue: "None"
            },
            {
                value: "manual",
                viewValue: "Manual"
            },
            {
                value: "upload",
                viewValue: "Upload"
            }
        ];


    }

    public launchTerms () {
        let config = {
            data: this.content.content_term_id,
            disableClose: false
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
        this.csvFileConfig = this.filestack.createCsvConfig('csv', this.contentUuid);

    }

    public setModelDefaults (type: string) {
        this.content = new ContentModel(
            this.contentUuid,
            type,
            '',
            '',
            '',
            new Date(),
            new Date(),
            false,
            null,
            ''
            );
    }

}
