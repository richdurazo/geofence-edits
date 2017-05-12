import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './app-navigation.component.html',
    styleUrls: ['./app-navigation.component.scss']
})
export class AppNavigationComponent implements OnInit {

    campaignDetails: boolean = false;

    constructor(private authService: AuthService, private router: Router) { }

    routes = [
        {
            route: "/overview",
            name: "Overview",
            icon: "dashboard",
            subroutes: []
        },
        {
            route: "/campaigns",
            name: "Campaigns",
            icon: "date_range",
            subroutes: [
                {
                    route: "/campaigns/create",
                    name: "Create",
                    icon: "assessment"
                }
            ]
        },
        {
            route: "/content",
            name: "Content",
            icon: "perm_media",
            subroutes: [
                {
                    route: "/content/create",
                    name: "Create",
                    icon: "edit"
                }
            ]
        },
        {
            route: "/triggers",
            name: "Trigger",
            icon: "memory",
            subroutes: [
                {
                    route: "/triggers/create",
                    name: "Create",
                    icon: "add_location"
                }
            ]
        }
    ];

    ngOnInit() {
        this.router.events.subscribe(event => {
            let self = this;
            if(event instanceof NavigationEnd && event.urlAfterRedirects !== '/login') {
                var urlArr = event.urlAfterRedirects.split('/');
                if (urlArr.length === 3 && urlArr[1] === 'campaigns' && urlArr[2] !== 'create') {
                    this.campaignDetails = true;
                } else {
                    this.campaignDetails = false;
                }
            }
        });
    }

    logOut () {
        this.authService.logOut();
    }



}
