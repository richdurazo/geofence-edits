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
            accept: 'image/*',
            maxFiles: 1,
            uploadInBackground: false,
            storeTo: {
                location: 's3',
                access: 'public',
                // path: '/thing/something.JPG'
            },
            transformOptions: {
                transformations: {
                    crop: {
                        aspectRatio: 2/1
                    },
                    rotate: true
                },
                // NOTE: Force crop isn't quite ready just yet in the v3 picker,
                // it should be ready before this needs to be in production,
                // if not we can roll back to v2
                // minDimensions: [300, 150],
                // maxDimensions: [300, 150]
            },
            onFileSelected: function(file) {
              console.log('file', file);
              if (file.size > 2097152) {
                throw new Error('Please select a file smaller than ' + 2097152 / 1024 / 1024 + 'MB');
              }
            }
        });
    }

}
