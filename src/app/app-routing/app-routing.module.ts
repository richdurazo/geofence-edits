import { NgModule } from '@angular/core';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { AppComponent } from '../app.component';

import { AppNavigationComponent } from '../app-navigation/app-navigation.component';

import { CampaignsComponent } from '../campaigns/campaigns-component/campaigns.component';
import { CampaignCreatorComponent } from '../campaigns/campaign-creator/campaign-creator.component';
import { CampaignsOverviewComponent } from '../campaigns/campaigns-overview/campaigns-overview.component';

import { ContentComponent } from '../content/content-component/content.component';
import { ContentCreatorComponent } from '../content/content-creator/content-creator.component';
import { ContentOverviewComponent } from '../content/content-overview/content-overview.component';

import { TriggersComponent } from '../triggers/triggers-component/triggers.component';
import { TriggerCreatorComponent } from '../triggers/trigger-creator/trigger-creator.component';
import { TriggersOverviewComponent } from '../triggers/triggers-overview/triggers-overview.component';

import { LoginComponent } from '../login/login.component';
import { OverviewComponent } from '../overview/overview.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

import { AuthService } from '../auth/auth.service';
import { AuthApiService } from '../auth/auth-api.service';
import { AuthGuardService } from '../auth/auth-guard.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'Authorization',
        tokenGetter: (() => localStorage.getItem('id_token')),
        // globalHeaders: [{'Content-Type':'application/json'}, {'Access-Control-Allow-Origin': 'GET, POST, PUT, DELETE'}, {'Access-Control-Allow-Origin': '*'}],
    }), http, options);
}

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: AppNavigationComponent,
        children: [
            {
                path: 'overview',
                component: OverviewComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'campaigns',
                component: CampaignsComponent,
                canActivate: [AuthGuardService],
                children: [
                    {
                        path: '',
                        component: CampaignsOverviewComponent
                    },
                    {
                        path: 'create',
                        component: CampaignCreatorComponent
                    }
                ]
            },
            {
                path: 'content',
                component: ContentComponent,
                canActivate: [AuthGuardService],
                children: [
                    {
                        path: '',
                        component: ContentOverviewComponent
                    },
                    {
                        path: 'create',
                        component: ContentCreatorComponent
                    }
                ]
            },
            {
                path: 'triggers',
                component: TriggersComponent,
                canActivate: [AuthGuardService],
                children: [
                    {
                        path: '',
                        component: TriggersOverviewComponent
                    },
                    {
                        path: 'create',
                        component: TriggerCreatorComponent
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
            },
            {
                path: '**',
                component: PageNotFoundComponent,
                canActivate: [AuthGuardService]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthService,
        AuthGuardService,
        AuthApiService,
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }
    ]
})
export class AppRoutingModule { }
