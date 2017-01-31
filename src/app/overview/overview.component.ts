import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {

    constructor(private auth: AuthService) { }

    ngOnInit() {
        console.log('OverviewComponent fired');
    }

    fetchUser () {
        this.auth.getUser();
    }

    processSuccess (data) {
        console.log('user data', data);
    }

}
