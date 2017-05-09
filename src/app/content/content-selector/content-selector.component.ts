import { Component, OnInit } from '@angular/core';

import { ContentApiService } from '../shared/content-api.service';
import { ContentModel } from '../shared/content.model';

@Component({
    selector: 'app-content-selector',
    templateUrl: './content-selector.component.html',
    styleUrls: ['./content-selector.component.scss']
})
export class ContentSelectorComponent implements OnInit {

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
}
