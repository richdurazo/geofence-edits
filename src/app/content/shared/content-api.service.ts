import { Injectable } from '@angular/core';
import { AuthCustomHttpService } from '../../auth/auth-custom-http.service';
import { AppSettings } from '../../app-settings';

@Injectable()
export class ContentApiService {

    constructor(private authCustomHttp: AuthCustomHttpService) { }

    getContent (uuid?: string) {
        if (uuid) {
            return this.authCustomHttp.get(AppSettings.API_ROOT + '/content/' + uuid)
            .map(res => res.json());
        } else {
            return this.authCustomHttp.get(AppSettings.API_ROOT + '/content')
            .map(res => res.json());
        }
    }

    createContent (data) {
        return this.authCustomHttp.post(AppSettings.API_ROOT + '/content', data)
        .map(res => res.json())
    }

    deleteContent (data) {
        return this.authCustomHttp.delete(AppSettings.API_ROOT + '/content/' + data.id)
        .map(res => res.json())
    }

}
