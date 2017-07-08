import { Injectable } from '@angular/core';
import { AuthCustomHttpService } from '../../../auth/auth-custom-http.service';
import { AppSettings } from '../../../app-settings';

@Injectable()
export class TermsApiService {

    constructor(private authCustomHttp: AuthCustomHttpService) { }

    // TERMS ACTIONS
    getTerms (id?: string) {
        if (id) {
            return this.authCustomHttp.get(AppSettings.API_ROOT + '/content-terms/' + id)
            .map(res => res.json());
        } else {
            return this.authCustomHttp.get(AppSettings.API_ROOT + '/content-terms')
            .map(res => res.json());
        }
    }

    createTerms (data) {
        return this.authCustomHttp.post(AppSettings.API_ROOT + '/content-terms', data)
        .map(res => res.json())
    }

    updateTerms (data) {
        return this.authCustomHttp.put(AppSettings.API_ROOT + '/content-terms/' + data.id, data)
        .map(res => res.json())
    }

    deleteTerms (id) {
        return this.authCustomHttp.delete(AppSettings.API_ROOT + '/content-terms/' + id)
        .map(res => res.json())
    }

}
