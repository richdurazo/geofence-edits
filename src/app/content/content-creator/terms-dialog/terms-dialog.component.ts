import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-terms-dialog',
    templateUrl: './terms-dialog.component.html',
    styleUrls: ['./terms-dialog.component.scss']
})
export class TermsDialogComponent implements OnInit {

    model: any;

    constructor(public dialogRef: MdDialogRef<TermsDialogComponent>, @Optional() @Inject(MD_DIALOG_DATA) private data: any) {
        this.model = {
            terms: this.data
        };
    }

    ngOnInit() {
    }

    public submitForm (form) {
        if (form.valid) {
            this.dialogRef.close(this.model.terms);
        }
    }
}
