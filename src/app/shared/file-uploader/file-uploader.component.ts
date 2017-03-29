import { Component, OnInit } from '@angular/core';

import { FilestackService } from '../filestack.service';

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

    stagedPhoto: any;

    constructor( private filestack: FilestackService ) { }

    ngOnInit() {
    }

    showUploader () {
        this.filestack.pick().then((results) => {
            console.log('results', results);
            this.stagedPhoto = results.filesUploaded[0];
        });
    }

}
