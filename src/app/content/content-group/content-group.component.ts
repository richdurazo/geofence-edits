import { Component, OnInit, Input } from '@angular/core';

import { TriggerApiService } from '../../triggers/shared/trigger-api.service';
import { ContentApiService } from '../shared/content-api.service';
import { ContentModel } from '../shared/content.model';

import { ContentGroupModel } from '../shared/content-group.model';

@Component({
    selector: 'app-content-group',
    templateUrl: './content-group.component.html',
    styleUrls: ['./content-group.component.scss']
})
export class ContentGroupComponent implements OnInit {

    @Input() contentGroup: ContentGroupModel;

    @Input() trigger: any;

    contentOptions: ContentModel[] = [];

    groupContent: ContentModel[] = [];

    selectedContent: ContentModel;

    creating: boolean = true;

    constructor(public contentApi: ContentApiService, public triggerApi: TriggerApiService) { }

    ngOnInit() {
        if (!this.contentGroup) {
            this.contentGroup = new ContentGroupModel('');
        } else {
            this.getContent();
            this.getGroupContent();
            this.creating = false;
        }
    }

    public submitForm (form) {
        if (form.valid) {
            this.contentApi.createContentGroup(this.contentGroup)
            .subscribe(data => {
                console.log('data', data);
                this.attachContentGroup(data);
            })
        }
    }

    public attachContentGroup (data) {
        this.triggerApi.attachContentGroup(this.trigger.id, data.id)
        .subscribe(data => {
            console.log('attachContentGroup data', data);
        })
    }

    public setContent (event) {
        console.log('event', event);
        this.selectedContent = event;
    }

    public attachContent () {
        this.contentApi.attachContentToGroup(this.contentGroup.id, this.selectedContent.id)
        .subscribe(data => {
            console.log('attachContent data', data);
            this.groupContent = data;
        });
    }

    public getContent () {
        this.contentApi.getContent()
        .subscribe(data => {
            this.contentOptions = data;
            console.log('this.contentOptions', this.contentOptions);
        });
    }

    public getGroupContent () {
        this.contentApi.getGroupContent(this.contentGroup.id)
        .subscribe(data => {
            this.groupContent = data;
        })
    }

}
