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
      this.data = {
          terms: this.dialogRef.config.data
      };
  }

  public submitForm (form) {
      if (form.valid) {
          this.dialogRef.close(this.data.terms);
      }
  }
}
