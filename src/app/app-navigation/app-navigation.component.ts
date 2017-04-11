import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './app-navigation.component.html',
    styleUrls: ['./app-navigation.component.scss']
})
export class AppNavigationComponent implements OnInit {

    activeRoute: string;

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
                let routeObj = this.routes.filter(( obj ) => {
                  return obj.route.split("/")[1] === event.urlAfterRedirects.split("/")[1];
                });
                this.activeRoute = routeObj[0].name;
            }
        });
    }

    logOut () {
        this.authService.logOut();
    }



}
