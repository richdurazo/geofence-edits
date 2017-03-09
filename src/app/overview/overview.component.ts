import { Component, OnInit } from '@angular/core';

import { UserApiService } from '../users/shared/user-api.service';
import { UserModel } from '../users/shared/user.model';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {

    user: UserModel;

    constructor(private userApiService: UserApiService) { }

    ngOnInit() {
        console.log('OverviewComponent fired');
    }

    fetchUser () {
        this.userApiService.getUser()
        .subscribe(
            data => this.processSuccess(data),
            err => this.processError(err)
        )
    }

    processError (err) {
        console.log('overview component err', err);
    }

    processSuccess (data) {
        console.log('data', data);
        this.user = new UserModel();
        for (var key in data.user) {
            this.user[key] = data.user[key];
        }
    }

}
