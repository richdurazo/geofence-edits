import { Injectable } from '@angular/core';

@Injectable()
export class AuthCustomHttpServiceMock {

    constructor() {}

    get () {
      return false;
    }

    post () {
      return false;
    }

    delete () {
      return false;
    }

}
