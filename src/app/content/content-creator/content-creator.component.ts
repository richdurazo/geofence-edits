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
    id: string;
    @ViewChild(ContentCreatorFormComponent)
    public creatorForm: ContentCreatorFormComponent;

  constructor(
      private dateUtils: DateUtilsService,
      private contentApi: ContentApiService,
      private router: Router,
     private route: ActivatedRoute,

  ) { }

  ngOnInit() {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = params['id'];
                    this.editMode = params['id'] != null;
            });
      if (this.editMode) {

          this.initForm();

      }

  }

  public submitForm (event) {
      if (!this.creatorForm.form.valid) {
          this.creatorForm.form.onSubmit(event);
          return;
      }
      var obj = Object.assign({}, this.creatorForm.content);
      obj.start_at = this.dateUtils.formatSQLDate(obj.start_at);
      obj.end_at = this.dateUtils.formatSQLDate(obj.end_at);
      console.log('submitted form', obj);
      this.contentApi.createContent(obj)
      .subscribe(
          data => this.processSuccess(data)
      )
  }

  processSuccess (data) {
      this.router.navigate(['content', data.id]);
  }

  public updateForm(event) {
      console.log('update', event);
  }

    public initForm() {
        this.contentApi.getContent(this.id)
        .subscribe(
            (data) => {
                console.log('data', data);
            this.creatorForm.content = data;
            this.creatorForm.contentType = data.type;

                                console.log('creatorForm', this.creatorForm.content);

        });
/*        if (this.editMode) {
            this.contentType = "offer";
        } else {
            console.log(this.editMode);
        }*/
    }
    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

}
