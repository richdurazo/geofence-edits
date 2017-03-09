import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CampaignsComponent } from './campaigns/campaigns-component/campaigns.component';
import { CampaignsOverviewComponent } from './campaigns/campaigns-overview/campaigns-overview.component';
import { CampaignCreatorComponent } from './campaigns/campaign-creator/components/campaign-creator.component';
import { CampaignCreatorFormComponent } from './campaigns/campaign-creator/components/campaign-creator-form.component';
import { CampaignApiService } from './campaigns/shared/campaign-api.service';
import { UserApiService } from './users/shared/user-api.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        OverviewComponent,
        PageNotFoundComponent,
        CampaignsComponent,
        CampaignCreatorComponent,
        CampaignsOverviewComponent,
        CampaignCreatorFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
        CampaignApiService,
        UserApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
