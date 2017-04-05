import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { FilestackService } from '../filestack.service';

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss']
})

export class FileUploaderComponent implements OnInit {

    mediaPath: string;

    @Input() lastModified: number;

    @Input() config: any;

    @Input()  imageExists: boolean;

    @Output() onUpload = new EventEmitter<boolean>();

    @Output() onChange = new EventEmitter<number>();

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
            this.lastModified = new Date().getTime();
            this.onUpload.emit(this.imageExists);
            this.onChange.emit(this.lastModified);
        });
    }

}
