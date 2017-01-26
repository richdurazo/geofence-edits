import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    {
        path: 'login', 
        component: LoginComponent 
    },
    {
        path: 'overview', 
        component: OverviewComponent 
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**', 
        component: PageNotFoundComponent 
    }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OverviewComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
      RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
