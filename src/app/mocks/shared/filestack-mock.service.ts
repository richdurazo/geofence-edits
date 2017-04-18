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

}
