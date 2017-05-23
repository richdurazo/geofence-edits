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
        if (form.valid && !this.id) {
            this.termsApi.createTerms(this.model)
            .subscribe(data => {
                this.processSuccess(data);
            });
        }
    }

    public processSuccess (data) {
        this.dialogRef.close(data);
    }
}
