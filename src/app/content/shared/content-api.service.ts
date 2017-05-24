import { Injectable } from '@angular/core';
import { AuthCustomHttpService } from '../../auth/auth-custom-http.service';
import { AppSettings } from '../../app-settings';

@Injectable()
export class ContentApiService {

    constructor(private authCustomHttp: AuthCustomHttpService) { }

    // CONTENT ACTIONS
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

    // CONTENT GROUP ACTIONS
    createContentGroup (data) {
        return this.authCustomHttp.post(AppSettings.API_ROOT + '/content-group', data)
        .map(res => res.json())
    }

    getGroupContent (content_group_id) {
        return this.authCustomHttp.get(AppSettings.API_ROOT + '/content-group/' + content_group_id + '/content')
        .map(res => res.json())
    }

    updateContentGroup (data) {
        return this.authCustomHttp.put(AppSettings.API_ROOT + '/content-group/' + data.id, data)
        .map(res => res.json())
    }

    attachContentToGroup (content_group_id, content_id) {
        return this.authCustomHttp.post(AppSettings.API_ROOT + '/content-group/' + content_group_id + '/content/' + content_id, {})
        .map(res => res.json())
    }

    attachTargetToGroup (content_group_id, target_id) {
        return this.authCustomHttp.post(AppSettings.API_ROOT + '/content-group/' + content_group_id + '/content/' + target_id, {})
        .map(res => res.json())
    }
}
