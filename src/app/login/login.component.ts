import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

interface Credentials {
    email: string,
    password: string
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    credentials: Credentials;

    invalid_credentials:boolean;

    constructor (private authService: AuthService, private router: Router) {}

    ngOnInit () {
        this.invalid_credentials = false;
        this.credentials = {
            email: '',
            password: ''
        };
    }

    onLogin (form) {
        console.log('form', form);
        if (!form.valid) {return;}
        console.log('credentials', this.credentials);
        console.log('typeof credentials', typeof this.credentials);
        this.authService.login(this.credentials, this.processSuccess.bind(this), this.processError.bind(this));
    }

    processSuccess (data) {
        this.router.navigate(['/overview']);
    }

    processError (error) {
        let new_error = JSON.parse(error._body);
        if (typeof new_error === 'object' && new_error.hasOwnProperty('error') && new_error.error === 'invalid_credentials') {
            this.invalid_credentials = true;
        }
    }
}
