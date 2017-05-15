import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { DateUtilsService } from '../../shared/date-utils.service';

import { ContentCreatorFormComponent } from '../content-creator/content-creator-form.component';
import { ContentApiService } from '../shared/content-api.service';
import { ContentModel } from '../shared/content.model';

@Component({
    selector: 'app-content-selector',
    templateUrl: './content-selector.component.html',
    styleUrls: ['./content-selector.component.scss']
})
export class ContentSelectorComponent implements OnInit {

    @ViewChild(ContentCreatorFormComponent)
    public creatorForm: ContentCreatorFormComponent;

    content: ContentModel[] = [];

    selectedContent: ContentModel;

    viewInit: boolean = false;

    tabIndex: number = 0;

    constructor( private contentApi: ContentApiService, public dialogRef: MdDialogRef<ContentSelectorComponent>, private dateUtils: DateUtilsService, public changeDetector: ChangeDetectorRef ) { }

    ngOnInit() {
        this.getContent();
    }

    indexChange (event) {
        this.tabIndex = event;
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

    closeSelectWithData () {
        this.dialogRef.close(this.selectedContent);
    }

    public submitForm (event) {
        if (!this.creatorForm.form.valid) {
            this.creatorForm.form.onSubmit(event);
            return;
        }
        var obj = Object.assign({}, this.creatorForm.content);
        obj.start_at = this.dateUtils.formatSQLDate(obj.start_at);
        obj.end_at = this.dateUtils.formatSQLDate(obj.end_at);
        this.contentApi.createContent(obj)
        .subscribe(
            data => this.processSuccess(data)
        )
    }

    processSuccess (data) {
        this.selectedContent = data;
        this.closeSelectWithData();
    }

}
