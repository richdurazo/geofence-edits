import { Component, OnInit } from '@angular/core';

import { FilestackService } from '../shared/filestack.service';

import { UserApiService } from '../users/shared/user-api.service';
import { UserModel } from '../users/shared/user.model';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {

    user: UserModel;

    stagedPhoto: any;

    constructor(private userApiService: UserApiService, private filestack: FilestackService) { }

    ngOnInit() {
    }

    showPicker () {
        this.filestack.pick().then((results) => {
            console.log('results', results);
            this.stagedPhoto = results.filesUploaded[0];
        })
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
        this.user = new UserModel();
        for (var key in data.user) {
            this.user[key] = data.user[key];
        }
    }

}
