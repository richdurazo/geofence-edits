import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdDialog } from '@angular/material';

import { FilestackService } from '../../shared/filestack.service';
import { UuidApiService } from '../../shared/uuid-api.service';
import { ContentModel } from '../../content/shared/content.model';

@Component({
    selector: 'app-content-creator-form',
})

export class ContentCreatorFormComponentMock implements OnInit {

    content: ContentModel;

    contentType: string;

    form: NgForm;

    constructor (

    ) {}

    ngOnInit() {
        return false;
    }

    public launchTerms () {
        return false;
    }

    public setDate (key, event) {
        return false;
    }

    public setType (event, form) {
        return false;
    }

    public fetchUuid () {
        return false;
    }

    public setImageConfig () {
        return false;
    }

    public setModelDefaults (type: string) {
        return false;
    }

}
