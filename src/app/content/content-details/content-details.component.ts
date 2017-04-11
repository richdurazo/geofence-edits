import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContentApiService } from '../shared/content-api.service';
import { ContentModel } from '../shared/content.model';

@Component({
    selector: 'app-content-details',
    templateUrl: './content-details.component.html',
    styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent implements OnInit {

    content: ContentModel;

    id: string;

    contentType: string;

    private sub: any;

    constructor(private route: ActivatedRoute, private contentApi: ContentApiService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log('this.id', this.id);

            this.getContent();
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private getContent () {
        this.contentApi.getContent(this.id)
        .subscribe(data => {
            this.content = data;
            this.contentType = data.type;
            console.log('this.content', this.content);
        });
    }

}
