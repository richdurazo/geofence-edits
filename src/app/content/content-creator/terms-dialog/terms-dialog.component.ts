import { Router } from '@angular/router';
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

    editMode: boolean;

    viewMode: boolean;

    constructor (public dialogRef: MdDialogRef<TermsDialogComponent>,
                 public termsApi: TermsApiService,
                 @Optional() @Inject(MD_DIALOG_DATA) private id: any,
                 private router: Router) {
                    this.model = {
                        body: ''
                    };
    }

    ngOnInit() {
        if (this.id) {
            this.termsApi.getTerms(this.id)
            .subscribe(data => {
                this.model = data;
                this.id = data.id;
            });
        }
    }

    public submitForm (form) {
        if (form.valid && !this.id) {
            this.termsApi.createTerms(this.model)
            .subscribe(data => {
                this.processSuccess(data);
                console.log('new', data)

            });
        } else {
            this.termsApi.updateTerms(this.model)
            .subscribe(data => {
                this.processSuccess(this.model);
                console.log('edit', data)
            });
        }
    }

    public processSuccess (data) {
        this.dialogRef.close(data);
    }

    onCancel() {
        this.dialogRef.close();
    }
}
