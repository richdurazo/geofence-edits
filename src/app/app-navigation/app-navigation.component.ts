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
            subroutes: []
        },
        {
            route: "/campaigns",
            name: "Campaigns",
            subroutes: [
                {
                    route: "/campaigns/create",
                    name: "Create"
                }
            ]
        },
        {
            route: "/content",
            name: "Content",
            subroutes: [
                {
                    route: "/content/create",
                    name: "Create"
                }
            ]
        },
        {
            route: "/triggers",
            name: "Trigger",
            subroutes: [
                {
                    route: "/triggers/create",
                    name: "Create"
                }
            ]
        }
    ];

    ngOnInit() {
        this.router.events.subscribe(event => {
            let self = this;
            if(event instanceof NavigationEnd && event.urlAfterRedirects !== '/login') {
                let routeObj = this.routes.filter(( obj ) => {
                  return obj.route === event.urlAfterRedirects || self.checkSubroutes(obj.subroutes, event.urlAfterRedirects);
                });
                this.activeRoute = routeObj[0].name;
            }
        });
    }

    checkSubroutes (subroutes, url) {
        var bool = false;
        subroutes.forEach((item) => {
            if (item.route === url) {
                bool = true;
            }
        });
        return bool;
    }

    logOut () {
        this.authService.logOut();
    }



}
