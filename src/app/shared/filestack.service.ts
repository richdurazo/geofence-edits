import { Injectable } from '@angular/core';

declare var filestack : any;

@Injectable()
export class FilestackService {

    uploader: any;

    constructor() { }

    public initFilestack () {
        this.uploader = filestack.init("AfK7thvLTRoyjflG6yqz3z");
    }

    public pick (config) {
        return this.uploader.pick(config);
    }

    // NOTE: Force crop isn't quite ready just yet in the v3 picker,
    // it should be ready before this needs to be in production,
    // if not we can roll back to v2
    public createConfig (type, uuid, ratio) {
        return {
            type: type,
            uuid: uuid,
            pickerOptions: {
                accept: 'image/*',
                maxFiles: 1,
                uploadInBackground: false,
                storeTo: {
                    location: 's3',
                    container: 'garythebucket',
                    access: 'public',
                    path: this.generateSaveFilePath(uuid, type)
                },
                transformOptions: {
                    transformations: {
                        crop: {
                            aspectRatio: ratio
                        }
                    }
                }
            }
        };
    }

    public generateSaveFilePath (uuid, type) {
        return '/' + uuid[0] + '/' + uuid[1] + '/' + uuid + '/image/' + type + '.jpg';
    }

}
