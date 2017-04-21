import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { AuthService } from '../auth/auth.service';

class Credentials {
    constructor (public email: string, public password: string) {}
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    invalid_credentials: boolean;
    credentials = new Credentials('', '');

    constructor (private authService: AuthService, private router: Router) {}

    ngOnInit () {
        this.invalid_credentials = false;
    }

    login (form) {
        if (!form.valid) { return false; }
        this.authService.login(this.credentials, this.processSuccess.bind(this), this.processError.bind(this));
    }

    processSuccess () {
        let url = this.authService.getRedirectUrl();

        if (!!url && url !== '') {
            this.router.navigate([url]);
        } else {
            this.router.navigate(['overview']);
        }
    }

    processError (error) {
        if (typeof error === 'object' && error.hasOwnProperty('error') && error.error === 'invalid_credentials') {
            this.invalid_credentials = true;
        }
    }
}
