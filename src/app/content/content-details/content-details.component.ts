import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ContentApiService } from '../shared/content-api.service';
import { ContentModel } from '../shared/content.model';

@Component({
    selector: 'app-content-details',
    templateUrl: './content-details.component.html',
    styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent implements OnInit, OnDestroy {

    content: ContentModel[];

    id: string;

    private sub: any;

    constructor(private route: ActivatedRoute,
                private contentApi: ContentApiService,
                private router: Router) { }

    ngOnInit() {
        this.sub = this.route.params
          .subscribe(
              (params: Params) => {
                  this.id = params['id'];
                    this.getContent();
                });
    }


    private getContent () {
        this.contentApi.getContent(this.id)
        .subscribe(
            (content: ContentModel[]) => {
            this.content = content;
        });
    }
    onEditContent() {
        console.log("form data to pass", this.content)
        this.router.navigate(['edit'], {relativeTo: this.route});
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
