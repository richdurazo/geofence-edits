import { TermsApiMockService } from './../../mocks/shared/terms-api-mock.service';
import { TermsApiService } from './../content-creator/terms-dialog/terms-api.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { TermsDialogComponent } from './../content-creator/terms-dialog/terms-dialog.component';
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
   dialogRef: MdDialogRef<any> | null;

    content: ContentModel;

    id: string;

    content_term_id: number;

    redemptionMethod: any;

    contentTerms: string;

    contentTermsId: number;

    private sub: any;

    redemptionMethods: any;

    constructor(private route: ActivatedRoute,
                private contentApi: ContentApiService,
                private router: Router,
                private dialog: MdDialog,
                private termsApi: TermsApiService ) { }

    ngOnInit() {
        this.sub = this.route.params
          .subscribe(
              (params: Params) => {
                  this.id = params['id'];
                    this.getContent();
                });

        this.redemptionMethods = ['Online', 'In Store', 'Online & In Store'];

    }


    private getContent () {
        this.contentApi.getContent(this.id)
        .subscribe(
            (content: ContentModel) => {
            this.content = content;
            this.content_term_id = content.content_term_id;
            this.redemptionMethod = this.redemptionMethods[content.redemption_method - 1];
            this.getContentTerms(content.content_term_id);
        });
    }
    onEditContent() {
        this.router.navigate(['edit'], {relativeTo: this.route});
    }
    removeItem() {
    console.log('delete me', this.content);
    console.log('delete me', this.contentTermsId);
    if (this.contentTermsId) {
        this.deleteTerms(this.content.content_term_id);
        this.deleteContent(this.content);
    } else {
        this.deleteContent(this.content);
    }
      this.router.navigate(['../'], {relativeTo: this.route});


    }

    getContentTerms(termsId) {
        this.termsApi.getTerms(termsId)
            .subscribe(data => {
                console.log(data)
                this.contentTerms = data.body;
                this.contentTermsId = data.id;
            })
    }

    deleteTerms(contentTermsId) {
        this.termsApi.deleteTerms(contentTermsId)
            .subscribe(data => {
                console.log(data);
            })
    }

    launchTermsView() {
        let config = {
            data: this.content.content_term_id,
            disableClose: false
        };
        let dialogRef = this.dialog.open(TermsDialogComponent, config);
        dialogRef
            .afterClosed()
            .subscribe(result => {
            });
    }

    deleteContent(content) {
     this.contentApi.deleteContent(content)
         .subscribe(data => {
             console.log(data);
         })

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
