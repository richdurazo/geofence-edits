declare var moment: any;
///<reference path="../../../../node_modules/moment/moment.d.ts" />
import { Component, OnInit } from '@angular/core';

import { ContentApiService } from '../shared/content-api.service';
import { ContentModel } from '../shared/content.model';

@Component({
    selector: 'app-content-creator-form',
    templateUrl: './content-creator-form.component.html',
    styleUrls: ['./content-creator-form.component.scss']
})
export class ContentCreatorFormComponent implements OnInit {

    content: ContentModel;

    constructor (private contentApi: ContentApiService) {}

    ngOnInit() {
        this.content = new ContentModel();
        this.setModelDefaults();
        console.log('this.content', this.content);
    }

    public submitForm () {
        var obj = JSON.parse(JSON.stringify(this.content));
        obj.start_at = moment(new Date(obj.start_at)).format("YYYY-MM-DD HH:mm:ss");
        obj.end_at = moment(new Date(obj.end_at)).format("YYYY-MM-DD HH:mm:ss");
        this.contentApi.createContent(obj)
        .subscribe(
            data => this.processSuccess(data)
        )
    }

    processSuccess (data) {
        console.log('saved content data', data);
    }


    private setModelDefaults () {
        this.content.name = '';
        this.content.description = '';
        this.content.start_at = new Date();
        this.content.end_at = new Date();
    }

}
