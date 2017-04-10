import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-terms-dialog',
  templateUrl: './terms-dialog.component.html',
  styleUrls: ['./terms-dialog.component.scss']
})
export class TermsDialogComponent implements OnInit {

    data: any;

  constructor(public dialogRef: MdDialogRef<TermsDialogComponent>) {
   }

  ngOnInit() {
      console.log('this.dialogRef', this.dialogRef);
      this.data = {
          terms: this.dialogRef.config.data
      };
  }

  public submitForm (form) {
      if (form.valid) {
          console.log('this.data.terms', this.data.terms);
          this.dialogRef.close(this.data.terms);
      }
  }
}
