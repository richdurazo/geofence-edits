import { ContentCreatorFormComponent } from './../content-creator/content-creator-form.component';
import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-content-details',
    templateUrl: './content-details.component.html',
    styleUrls: ['./content-details.component.scss']
})
export class ContentDetailsComponent implements OnInit {
    @Input() content: any;
    @ViewChild(ContentCreatorFormComponent)
    public creatorForm: ContentCreatorFormComponent;

    id: string;

    constructor() { }

    ngOnInit() {
    }

}
