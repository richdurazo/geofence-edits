import { Component, OnInit, Input } from '@angular/core';
import {MdDialog} from '@angular/material';

import { TriggerApiService } from '../../triggers/shared/trigger-api.service';
import { ContentSelectorComponent } from '../content-selector/content-selector.component';
import { ContentApiService } from '../shared/content-api.service';
import { ContentModel } from '../shared/content.model';

import { ContentGroupModel } from '../shared/content-group.model';

@Component({
    selector: 'app-content-group-details',
    templateUrl: './content-group-details.component.html',
    styleUrls: ['./content-group-details.component.scss']
})
export class ContentGroupDetailsComponent implements OnInit {

    @Input() contentGroup: ContentGroupModel;

    @Input() trigger: any;

    contentOptions: ContentModel[] = [];

    groupContent: ContentModel[] = [];

    selectedContent: ContentModel;

    constructor(public contentApi: ContentApiService, public triggerApi: TriggerApiService, private dialog: MdDialog) { }

    ngOnInit() {
        this.getGroupContent();
    }

    public setContent (event) {
        this.selectedContent = event;
    }

    public attachContent () {
        this.contentApi.attachContentToGroup(this.contentGroup.id, this.selectedContent.id)
        .subscribe(data => {
            this.groupContent = data;
        });
    }

    public getGroupContent () {
        this.contentApi.getGroupContent(this.contentGroup.id)
        .subscribe(data => {
            this.groupContent = data;
        })
    }

    public launchSelector () {
        let config = {
            disableClose: false
        };
        let dialogRef = this.dialog.open(ContentSelectorComponent, config);
        dialogRef.afterClosed().subscribe(result => {
            if (!!result) {
                this.selectedContent = result;
                this.attachContent();
            }
        });
    }

}
