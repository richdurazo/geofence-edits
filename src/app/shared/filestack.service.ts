import { Injectable } from '@angular/core';

declare var filestack : any;

@Injectable()
export class FilestackService {

    uploader: any;

    constructor() { }

    public initFilestack () {
        this.uploader = filestack.init('AfK7thvLTRoyjflG6yqz3z');
    }

    public pick (config) {
        return this.uploader.pick(config);
    }

    // NOTE: Force crop isn't quite ready just yet in the v3 picker,
    // it should be ready before this needs to be in production,
    // if not we can roll back to v2
    public createImageConfig (key, uuid, ratio) {
        return {
            key: key,
            uuid: uuid,
            type: 'image',
            pickerOptions: {
                accept: 'image/*',
                maxFiles: 1,
                uploadInBackground: false,
                storeTo: {
                    location: 's3',
                    container: 'garythebucket',
                    region: 'us-west-1',
                    access: 'public',
                    path: this.generateSaveFilePath(uuid, key, 'image')
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

    public createMediaConfig (key, uuid) {
        return {
            key: key,
            uuid: uuid,
            type: 'video',
            pickerOptions: {
                accept: 'video/mp4',
                maxFiles: 1,
                uploadInBackground: false,
                storeTo: {
                    location: 's3',
                    container: 'garythebucket',
                    region: 'us-west-1',
                    access: 'public',
                    path: this.generateSaveFilePath(uuid, key, 'video')
                }
            }
        };
    }

    public createCsvConfig (key, uuid) {
        return {
            key: key,
            uuid: uuid,
            type: 'csv',
            pickerOptions: {
                accept: ['.csv'],
                maxFiles: 1,
                uploadInBackground: false,
                storeTo: {
                    location: 's3',
                    container: 'garythebucket',
                    region: 'us-west-1',
                    access: 'public',
                    path: this.generateSaveFilePath(uuid, key, 'csv')
                }
            }
        };
    }


    public generateSaveFilePath (uuid, key, type) {
        let ext;
        if (type === 'image') {
            ext = '.jpg';
        } else if (type === 'video') {
            ext = '.mp4';
        } else if (type === 'csv') {
            ext = '.csv';
        }
        return '/' + uuid[0] + '/' + uuid[1] + '/' + uuid + '/' + type + '/' + key + ext;
    }

}
