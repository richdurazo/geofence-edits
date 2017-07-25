import { MdDialog } from '@angular/material';
import { DialogConfirmComponent } from './../../shared/dialog-confirm/dialog-confirm.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DateUtilsService } from '../../shared/date-utils.service';
import { ContentApiService } from '../shared/content-api.service';

import { ContentCreatorFormComponent } from './content-creator-form.component';
import { ContentModel } from '../shared/content.model';

@Component({
  selector: 'app-content-creator',
  templateUrl: './content-creator.component.html',
  styleUrls: ['./content-creator.component.scss']
})

export class ContentCreatorComponent implements OnInit {
    editMode = false;
    viewMode: boolean;
    id: any;
    content: ContentModel;
    barcode: any = null;
    codeOption: string;
    codeFormat: string;
    redemptionMethod: number;

    @ViewChild(ContentCreatorFormComponent)
    public creatorForm: ContentCreatorFormComponent;

    constructor(
        private dateUtils: DateUtilsService,
        private contentApi: ContentApiService,
        private router: Router,
        private route: ActivatedRoute,
        private dialog: MdDialog,
        ) { }

    ngOnInit() {
        this.route.params
                .subscribe(
                    (params: Params) => {
                        this.id = +params['id'];
                        this.viewMode = params['id'] != null;
                });

        if (this.viewMode) {
            this.creatorForm.viewMode = true;
            this.getContent();
        }

    }

    public submitForm(event) {
        const content = this.creatorForm.content;
        if (this.editMode) {
             this.barcode = content.redemption_code;
             this.codeFormat = content.redemption_code_format;
             this.redemptionMethod = content.redemption_method;
        } else {
            this.barcode = this.creatorForm.form.value.redemption_code;
            this.codeOption = this.creatorForm.form.value.codeOption;
            this.codeFormat = this.creatorForm.form.value.redemption_format;
            this.redemptionMethod = this.creatorForm.form.value.redemption_method;
        }

        if (this.redemptionMethod && this.redemptionMethod !== 1) {
            if (this.codeOption === 'manual' || this.barcode !== null) {
                switch (this.codeFormat) {
                    case 'CODABAR':
                    if (this.barcode.length < 3) {
                        alert('invalid redemption code');
                        return false;
                    }
                    if (['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D']
                        .indexOf(this.barcode[0]) === -1 || ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D']
                        .indexOf(this.barcode[this.barcode.length - 1]) === -1) {
                            alert('invald redemption code');
                            return false;
                        }
                        break;
                        case 'EAN_8':
                        if (this.barcode.length !== 8 || isNaN(this.barcode)) {
                            alert('invald redemption code');
                            return false;
                        }
                        break;
                        case 'EAN_13':
                        if (this.barcode.length !== 13 || isNaN(this.barcode)) {
                            alert('invald redemption code');
                            return false;
                        }
                        break;
                        case 'ITF':
                        case 'RSS_14':
                        if (isNaN(this.barcode)) {
                            alert('invald redemption code');
                            return false;
                        }
                        break;
                        case 'RSS_EXPANDED':
                        if (this.barcode.length < 14){
                            alert('invald redemption code');
                            return false;
                        }
                        break;
                        case 'UPC_A':
                        if (this.barcode.length !== 12 || isNaN(this.barcode)) {
                            alert('invald redemption code');
                            return false;
                        }
                        break;
                        case 'UPC_E':
                        if (this.barcode.length !== 6 || isNaN(this.barcode)) {
                            alert('invald redemption code');
                            return false;
                        }
                        break;
                        case 'CODE_39':
                        case 'CODE_93':
                        case 'CODE_128':
                        case 'QR_CODE':
                        case 'AZTEC':
                        case 'DATA_MATRIX':
                        case 'MAXICODE':
                        case 'PDF_417':
                        case 'UPC_EAN_EXTENSION':
                        if (this.barcode.length < 1) {
                            alert('invald redemption code');
                            return false;
                        }
                        break;
                        case 'OTHER':
                        break;
                        default:
                        alert('invalid format');
                        return false;
                }
            }
        }

        if (!this.creatorForm.form.valid) {
            this.creatorForm.form.onSubmit(event);
            alert('invalid Form')
            return;
        }

        let obj = Object.assign({}, this.creatorForm.content);
        obj.start_at = this.dateUtils.formatSQLDate(obj.start_at);
        obj.end_at = this.dateUtils.formatSQLDate(obj.end_at);

        if (!this.editMode) {
                this.contentApi.createContent(obj)
                    .subscribe(
                        data => this.processSuccess(data)
                    );
            } else {
                this.contentApi.updateContent(obj)
                    .subscribe(
                        data => this.processSuccess(data)
                    );
            }

    }

    processSuccess(data) {
        this.onCancel();
    }

    getContent() {
        this.contentApi.getContent(this.id)
            .subscribe(data => {
                this.creatorForm.content = data;
                this.initForm(this.creatorForm.content);
            });
    }

    public initForm(data) {
        this.creatorForm.form = this.creatorForm.editForm;
        this.creatorForm.contentUuid =  data.uuid;
        this.creatorForm.contentType = data.type;
        this.creatorForm.content.redemption_code = data.redemption_code;
        if (this.creatorForm.content.quantity) {
            this.creatorForm.limitEnabled = true;
        }
        if (this.creatorForm.content.scratcher_name) {
            this.creatorForm.scratcherEnabled = true;
            this.creatorForm.content.scratcher_enabled = true;
            this.creatorForm.setImageConfig();
        }
        if (data.redemption_code) {
            this.creatorForm.codeOption = 'manual';
            this.creatorForm.content.redemption_code = data.redemption_code;
        } else {
            this.creatorForm.codeOption = 'none';
        }

    }

    onCancel() {
        this.creatorForm.editMode = false;
        this.creatorForm.viewMode = true;
        this.editMode = false;
        this.viewMode = true;
              this.router.navigate(['content']);

    }

    onEditContent() {
        this.creatorForm.editMode = true;
        this.creatorForm.viewMode = false;
        this.editMode = true;
        this.viewMode = false;
    }

    public launchConfirmRemove () {
        let config = {
            disableClose: false
        };
        let dialogRef = this.dialog.open(DialogConfirmComponent, config);
        dialogRef.componentInstance.data = this.creatorForm.content;
    }

}
