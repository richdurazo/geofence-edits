import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { ContentApiService } from '../shared/content-api.service';
import { ContentModel } from '../shared/content.model';

@Component({
    selector: 'app-content-selector',
    templateUrl: './content-selector.component.html',
    styleUrls: ['./content-selector.component.scss']
})
export class ContentSelectorComponent implements OnInit {

    content: ContentModel[] = [];

    selectedContent: ContentModel;

    constructor(private contentApi: ContentApiService, public dialogRef: MdDialogRef<ContentSelectorComponent>) { }

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

    contentSelected(event: any) {
        this.selectedContent = event;
    }

    submit () {
        this.dialogRef.close(this.selectedContent);
    }
}
