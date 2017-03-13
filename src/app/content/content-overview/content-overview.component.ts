import { Component, OnInit } from '@angular/core';

import { ContentApiService } from '../shared/content-api.service';
import { ContentModel } from '../shared/content.model';

@Component({
  selector: 'app-content-overview',
  templateUrl: './content-overview.component.html',
  styleUrls: ['./content-overview.component.scss']
})
export class ContentOverviewComponent implements OnInit {

    content: ContentModel[] = [];

  constructor(private contentApi: ContentApiService) { }

  ngOnInit() {
      this.contentApi.getContent()
      .subscribe(
          data => this.processGetSuccess(data)
      )
  }

  processGetSuccess (data) {
      console.log('content data', data);
      this.content = data;
  }

  deleteItem (idx) {
      console.log('idx', idx);
      console.log('this.content[idx]', this.content[idx]);
      this.contentApi.deleteContent(this.content[idx])
      .subscribe(
          data => this.processDeleteSuccess(data, idx)
      )
  }

  processDeleteSuccess (data, idx) {
      console.log('processDeleteSuccess data', data);
      this.content.splice(1, idx);
  }

}
