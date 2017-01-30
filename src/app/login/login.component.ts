import { Component, OnInit } from '@angular/core';
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

export class LoginComponent {

    credentials: Credentials;

    constructor(private auth: AuthService) {}

    onLogin (credentials) {
      console.log('credentials', credentials);
      this.auth.login(credentials);
    }
}
