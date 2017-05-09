import { Component, OnInit } from '@angular/core';

import { ContentApiService } from '../../shared/content-api.service';
import { ContentModel } from '../../shared/content.model';
@Component({
    selector: 'app-content-list',
    templateUrl: './content-list.component.html',
    styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {

    content: ContentModel[] = [];

    constructor(private contentApi: ContentApiService) { }

    ngOnInit() {
        this.getContent();
    }

    getContent () {
        this.contentApi.getContent()
        .subscribe(
            data => this.processGetSuccess(data)
        )
    }

    processGetSuccess (data) {
        this.content = data;
    }

    deleteItem (idx) {
        this.contentApi.deleteContent(this.content[idx])
        .subscribe(
            data => this.processDeleteSuccess(data, idx)
        )
    }

    processDeleteSuccess (data, idx) {
        this.content.splice(idx, 1);
    }

}
