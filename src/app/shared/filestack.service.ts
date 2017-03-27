import { Injectable } from '@angular/core';

declare var filestack : any;

@Injectable()
export class FilestackService {

    uploader: any;

    constructor() { }

    public initFilestack () {
        console.log('initFilestack');
        this.uploader = filestack.init("AvaR6kK0SgKYNBoMsEPjAz");
        console.log('this.uploader', this.uploader);
    }

    public pick (config) {
        return this.uploader.pick(config);
    }

}
