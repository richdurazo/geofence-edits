import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { FilestackService } from '../filestack.service';

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss']
})

export class FileUploaderComponent implements OnInit {

    mediaPath: string;

    @Input() config;

    @Input()  imageExists: boolean;

    @Output() onUpload = new EventEmitter<boolean>();

    stagedPhoto: any;

    constructor ( private filestack: FilestackService ) {}

    ngOnInit () {
        this.mediaPath = this.config.pickerOptions.storeTo.container + this.filestack.generateSaveFilePath(this.config.uuid, this.config.type);
        console.log('imageExists', this.imageExists);
    }

    showUploader () {
        console.log('this.config', this.config);
        this.filestack.pick(this.config.pickerOptions).then((results) => {
            console.log('results', results);
            this.imageExists = !!results.filesUploaded[0];
            this.emitUploadEvent(this.imageExists);
        });
    }

    emitUploadEvent(loaded: boolean) {
      this.onUpload.emit(loaded);
      this.imageExists = true;
    }
}
