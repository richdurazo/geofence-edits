import { Injectable } from '@angular/core';

@Injectable()
export class RouterMockService {

    constructor() {}

    public navigate () {
        return true;
    }


}
