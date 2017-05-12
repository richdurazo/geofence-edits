import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DateUtilsService } from '../../shared/date-utils.service';
import { ContentApiService } from '../shared/content-api.service';

import { ContentCreatorFormComponent } from './content-creator-form.component';

@Component({
  selector: 'app-content-creator',
  templateUrl: './content-creator.component.html',
  styleUrls: ['./content-creator.component.scss']
})
export class ContentCreatorComponent implements OnInit {

    @ViewChild(ContentCreatorFormComponent)
    public creatorForm: ContentCreatorFormComponent;

  constructor(
      private dateUtils: DateUtilsService,
      private contentApi: ContentApiService,
      private router: Router
  ) { }

  ngOnInit() {
  }

  public submitForm (event) {
      if (!this.creatorForm.form.valid) {
          this.creatorForm.form.onSubmit(event);
          return;
      }
      var obj = Object.assign({}, this.creatorForm.content);
      obj.start_at = this.dateUtils.formatSQLDate(obj.start_at);
      obj.end_at = this.dateUtils.formatSQLDate(obj.end_at);
      this.contentApi.createContent(obj)
      .subscribe(
          data => this.processSuccess(data)
      )
  }

  processSuccess (data) {
      this.router.navigate(['content', data.id]);
  }


}
