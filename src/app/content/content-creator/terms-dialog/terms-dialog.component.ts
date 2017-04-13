import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-terms-dialog',
  templateUrl: './terms-dialog.component.html',
  styleUrls: ['./terms-dialog.component.scss']
})
export class TermsDialogComponent implements OnInit {

    terms: any;

  constructor(public dialogRef: MdDialogRef<TermsDialogComponent>, @Inject(MD_DIALOG_DATA) private data: any) {
      this.data = {
          terms: data
      };
   }

  ngOnInit() {
  }

  public submitForm (form) {
      if (form.valid) {
          this.dialogRef.close(this.data.terms);
      }
  }
}
