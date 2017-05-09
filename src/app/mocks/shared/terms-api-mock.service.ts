import { Injectable } from '@angular/core';

@Injectable()
export class TermsApiMockService {

    constructor() {}

    getTerms () {
      return false;
    }

    createTerms () {
      return false;
    }

}
//
// // CONTENT ACTIONS
// getTerms (id?: string) {
//     if (id) {
//         return this.authCustomHttp.get(AppSettings.API_ROOT + '/content-term/' + id)
//         .map(res => res.json());
//     } else {
//         return this.authCustomHttp.get(AppSettings.API_ROOT + '/content-term')
//         .map(res => res.json());
//     }
// }
//
// createTerms (data) {
//     return this.authCustomHttp.post(AppSettings.API_ROOT + '/content-term', data)
//     .map(res => res.json())
// }
//
// updateTerms (data) {
//     return this.authCustomHttp.put(AppSettings.API_ROOT + '/content-term/' + data.id, data)
//     .map(res => res.json())
// }
//
// deleteTerms (data) {
//     return this.authCustomHttp.delete(AppSettings.API_ROOT + '/content-term/' + data.id)
//     .map(res => res.json())
// }
