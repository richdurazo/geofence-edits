import { Injectable } from '@angular/core';

declare var filestack : any;

@Injectable()
export class FilestackService {

    uploader: any;

    constructor() { }

    public initFilestack () {
        this.uploader = filestack.init("AfK7thvLTRoyjflG6yqz3z");
    }

    public pick () {
        return this.uploader.pick({
            maxFiles: 1,
            storeTo: {
                location: 's3',
                access: 'public',
                path: '/thing/something.JPG'
            }
        });
    }

}
