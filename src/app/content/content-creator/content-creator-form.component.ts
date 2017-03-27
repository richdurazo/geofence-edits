import { Component, OnInit } from '@angular/core';

import { DateUtilsService } from '../../shared/date-utils.service';
import { ContentApiService } from '../shared/content-api.service';
import { ContentModel } from '../shared/content.model';

@Component({
    selector: 'app-content-creator-form',
    templateUrl: './content-creator-form.component.html',
    styleUrls: ['./content-creator-form.component.scss']
})
export class ContentCreatorFormComponent implements OnInit {

    content: ContentModel;

    contentType: string;

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

    constructor (private contentApi: ContentApiService, private dateUtils: DateUtilsService) {}

    ngOnInit() {
        this.setModelDefaults();
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
        ]
    }

    public typeChange (event) {
        console.log('event, this.contentType', event, this.contentType);
    }

    public submitForm (form) {
        if (!form.valid) { return; }
        var obj = JSON.parse(JSON.stringify(this.content));
        obj.start_at = this.dateUtils.formatSQLDate(obj.start_at);
        obj.end_at = this.dateUtils.formatSQLDate(obj.end_at);
        this.contentApi.createContent(obj)
        .subscribe(
            data => this.processSuccess(data)
        )
    }

    processSuccess (data) {
        console.log('saved content data', data);
    }


    private setModelDefaults () {
        this.content = new ContentModel();
        this.content.name = '';
        this.content.description = '';
        this.content.start_at = new Date();
        this.content.end_at = new Date();
    }

}
