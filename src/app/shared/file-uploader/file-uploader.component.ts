import { Component, OnInit, Input } from '@angular/core';

import { FilestackService } from '../filestack.service';

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

    @Input() config;

    stagedPhoto: any;

    constructor( private filestack: FilestackService ) { }

    ngOnInit() {
        console.log('this.config', this.config);
    }

    showUploader () {
        this.filestack.pick(this.config.pickerOptions).then((results) => {
            console.log('results', results);
            this.stagedPhoto = results.filesUploaded[0];
        });
    }

}
