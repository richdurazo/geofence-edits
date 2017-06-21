import { NgForm } from '@angular/forms';
import { ContentModel } from './../shared/content.model';
import { ContentApiService } from './../shared/content-api.service';
import { ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-details-edit',
  templateUrl: './content-details-edit.component.html',
  styleUrls: ['./content-details-edit.component.scss']
})

export class ContentDetailsEditComponent implements OnInit {
  id: string;
  private sub: any;
  content: ContentModel;
  form: NgForm;
      contentTypes: [
        {
            value: "offer",
            viewValue: "Offer"
        },
        {
            value: "prize",
            viewValue: "Prize"
        },
        {
            value: "message",
            viewValue: "Message"
        }
    ];
    contentType: string;

  constructor(private route: ActivatedRoute,
              private contentApi: ContentApiService) { }
  ngOnInit() {
    this.sub = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.getContent();
        });
        this.contentTypes = [
            {
                value: "offer",
                viewValue: "Offer"
            },
            {
                value: "prize",
                viewValue: "Prize"
            },
            {
                value: "message",
                viewValue: "Message"
            }
        ];
  }

  private getContent() {
    this.contentApi.getContent(this.id)
      .subscribe(data => {
        this.content = data;
        this.contentType = this.content.type;

      });
  }

}
