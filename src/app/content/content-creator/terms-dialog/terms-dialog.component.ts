import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { TermsApiService } from './terms-api.service';

@Component({
    selector: 'app-terms-dialog',
    templateUrl: './terms-dialog.component.html',
    styleUrls: ['./terms-dialog.component.scss']
})

export class TermsDialogComponent implements OnInit {

    model: any;

    constructor(public dialogRef: MdDialogRef<TermsDialogComponent>, public termsApi: TermsApiService, @Optional() @Inject(MD_DIALOG_DATA) private id: any) {
        console.log('id', id);
        this.model = {
            body: ''
        };
    }

    ngOnInit() {
        if (this.id) {
            this.termsApi.getTerms(this.id)
            .subscribe(data => {
                this.model = data;
            });
        }
    }

    public submitForm (form) {
        console.log('this.model', this.model);
        if (form.valid && !this.id) {
            this.termsApi.createTerms(this.model)
            .subscribe(data => {
                console.log('submitForm data', data);
                this.processSuccess(data);
            });
        }
    }

    public processSuccess (data) {
        this.dialogRef.close(this.model);
    }
}
