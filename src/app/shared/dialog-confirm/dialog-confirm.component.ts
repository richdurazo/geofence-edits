import { Router } from '@angular/router';
import { ContentApiService } from './../../content/shared/content-api.service';
import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  data: any;

  delete: boolean;

  constructor(public dialogRef: MdDialogRef<DialogConfirmComponent>,
              private contentApi: ContentApiService,
              private router: Router) { }

  ngOnInit() {
  }
}
