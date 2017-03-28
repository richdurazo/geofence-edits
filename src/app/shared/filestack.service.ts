import { Injectable } from '@angular/core';

declare var filestack : any;

@Injectable()
export class FilestackService {

    uploader: any;

    constructor() { }

    public initFilestack () {
        console.log('initFilestack');
        this.uploader = filestack.init("AfK7thvLTRoyjflG6yqz3z");
        console.log('this.uploader', this.uploader);
    }

    public pick () {
        return this.uploader.pick({
            maxFiles: 1,
            storeTo: {
                location: 's3',
                access: 'public',
                // container: 'garythebucket',
                path: '/GARYSUCKS.JPG'
            }
        });
    }

}
