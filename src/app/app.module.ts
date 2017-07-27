import { DeliveryPresetApiService } from './triggers/delivery-preset/delivery-preset-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule, Http, Headers, RequestOptions } from '@angular/http';
import 'hammerjs';
import * as moment from 'moment/moment.d';

import { AppComponent } from './app.component';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { CampaignsComponent } from './campaigns/campaigns-component/campaigns.component';
import { CampaignDetailsComponent } from './campaigns/campaign-details/campaign-details.component';
import { CampaignsListComponent } from './campaigns/campaigns-overview/campaigns-list/campaigns-list.component';
import { CampaignsOverviewComponent } from './campaigns/campaigns-overview/campaigns-overview.component';
import { CampaignCreatorComponent } from './campaigns/campaign-creator/campaign-creator.component';
import { CampaignCreatorFormComponent } from './campaigns/campaign-creator/campaign-creator-form.component';

import { ContentComponent } from './content/content-component/content.component';
import { ContentCreatorComponent } from './content/content-creator/content-creator.component';
import { ContentCreatorFormComponent } from './content/content-creator/content-creator-form.component';
import { ContentDetailsComponent } from './content/content-details/content-details.component';
import { ContentOverviewComponent } from './content/content-overview/content-overview.component';

import { ContentGroupCreatorComponent } from './content/content-group-creator/content-group-creator.component';
import { ContentGroupDetailsComponent } from './content/content-group-details/content-group-details.component';

import { TermsDialogComponent } from './content/content-creator/terms-dialog/terms-dialog.component';
import { TermsApiService } from './content/content-creator/terms-dialog/terms-api.service';

import { TriggersComponent } from './triggers/triggers-component/triggers.component';
import { TriggerDetailsComponent } from './triggers/trigger-details/trigger-details.component';
import { TriggerCreatorComponent } from './triggers/trigger-creator/trigger-creator.component';
import { TriggerCreatorFormComponent } from './triggers/trigger-creator/trigger-creator-form.component';
import { TriggersOverviewComponent } from './triggers/triggers-overview/triggers-overview.component';

import { AuthCustomHttpService } from './auth/auth-custom-http.service';
import { CampaignApiService } from './campaigns/shared/campaign-api.service';
import { ContentApiService } from './content/shared/content-api.service';
import { TargetApiService } from './shared/target-api.service';
import { TriggerApiService } from './triggers/shared/trigger-api.service';
import { UserApiService } from './users/shared/user-api.service';
import { UuidApiService } from './shared/uuid-api.service';

import { DateUtilsService } from './shared/date-utils.service';
import { FilestackService } from './shared/filestack.service';
import { FileUploaderComponent } from './shared/file-uploader/file-uploader.component';
import { ImageComponent } from './shared/image/image.component';
import { SelectableListComponent } from './shared/selectable-list/selectable-list.component';
import { SelectableListItemComponent } from './shared/selectable-list/selectable-list-item/selectable-list-item.component';
import { SortableListComponent } from './shared/sortable-list/sortable-list.component';
import { SortableListItemComponent } from './shared/sortable-list/sortable-list-item/sortable-list-item.component';
import { ContentListComponent } from './content/content-overview/content-list/content-list.component';
import { TriggerListComponent } from './triggers/triggers-overview/trigger-list/trigger-list.component';
import { VideoComponent } from './shared/video/video.component';
import { ExpandablePanelComponent } from './shared/expandable-panel/expandable-panel.component';
import { ContentRowComponent } from './content/content-row/content-row.component';
import { ContentSelectorComponent } from './content/content-selector/content-selector.component';
import { ChartComponent } from './shared/chart/chart.component';
import { TargetTypeaheadComponent } from './shared/target-typeahead/target-typeahead.component';
import { DialogConfirmComponent } from './shared/dialog-confirm/dialog-confirm.component';
import { DeliveryPresetOptionsComponent } from './triggers/delivery-preset/delivery-preset-options/delivery-preset-options.component';
import { DeliveryPresetCreatorComponent } from './triggers/delivery-preset/delivery-preset-creator/delivery-preset-creator.component';
import { GeofenceCreatorComponent } from './triggers/geofence/geofence-creator/geofence-creator.component';
import { AgmCoreModule } from '@agm/core';
import {} from '@types/googlemaps';
import { BeaconCreatorComponent } from './triggers/beacon/beacon-creator/beacon-creator.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        OverviewComponent,
        PageNotFoundComponent,
        CampaignsComponent,
        CampaignCreatorComponent,
        CampaignsOverviewComponent,
        CampaignCreatorFormComponent,
        ContentComponent,
        ContentCreatorComponent,
        ContentOverviewComponent,
        ContentCreatorFormComponent,
        TriggersComponent,
        TriggerCreatorComponent,
        TriggersOverviewComponent,
        TriggerCreatorFormComponent,
        AppNavigationComponent,
        FileUploaderComponent,
        CampaignsListComponent,
        SelectableListComponent,
        SelectableListItemComponent,
        SortableListComponent,
        SortableListItemComponent,
        TermsDialogComponent,
        ContentDetailsComponent,
        ImageComponent,
        TriggerDetailsComponent,
        CampaignDetailsComponent,
        ContentListComponent,
        TriggerListComponent,
        ContentGroupCreatorComponent,
        ContentGroupDetailsComponent,
        VideoComponent,
        ExpandablePanelComponent,
        ContentRowComponent,
        ContentSelectorComponent,
        ChartComponent,
        TargetTypeaheadComponent,
        DialogConfirmComponent,
        DeliveryPresetOptionsComponent,
        DeliveryPresetCreatorComponent,
        GeofenceCreatorComponent,
        BeaconCreatorComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterialModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDmBfBqrgXymd47v7N_u9dBzxLanZBi1CI',
            libraries: ['places']
        })
    ],
    providers: [
        AuthCustomHttpService,
        CampaignApiService,
        ContentApiService,
        DateUtilsService,
        FilestackService,
        TargetApiService,
        TermsApiService,
        TriggerApiService,
        UserApiService,
        UuidApiService,
        DeliveryPresetApiService
    ],
    entryComponents: [
        TermsDialogComponent,
        ContentSelectorComponent,
        DialogConfirmComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
