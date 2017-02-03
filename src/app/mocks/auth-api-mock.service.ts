import { Injectable } from '@angular/core';

@Injectable()
export class AuthApiMockService {

    constructor() {}

    public navigate () {
        return true;
    }

    public navigateByUrl (url) {
      return url;
    }


}
