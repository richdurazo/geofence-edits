import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './app-navigation.component.html',
    styleUrls: ['./app-navigation.component.scss']
})
export class AppNavigationComponent implements OnInit {

    constructor(private authService: AuthService) { }

    routes = [
        {
            route: "/overview",
            name: "Overview"
        },
        {
            route: "/campaigns",
            name: "Campaigns"
        },
        {
            route: "/campaigns/create",
            name: "Campaign Creator"
        },
        {
            route: "/content",
            name: "Content"
        },
        {
            route: "/content/create",
            name: "Content Creator"
        },
        {
            route: "/triggers",
            name: "Trigger"
        },
        {
            route: "/triggers/create",
            name: "Trigger Creator"
        }
    ];

    ngOnInit() {
    }

    logOut () {
        this.authService.logOut();
    }

}
