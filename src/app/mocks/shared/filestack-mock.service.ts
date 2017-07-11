import { Injectable } from '@angular/core';

@Injectable()
export class FilestackMockService {

    constructor() {}

    public pick () {
        return false;
    }

    public generateSaveFilePath () {
        return false;
    }

    public createMediaConfig () {
        return false;
    }

    public createImageConfig () {
        return false;
    }
    public createCsvConfig () {
        return false;
    }
}
