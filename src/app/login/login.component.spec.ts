/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, NG_VALIDATORS, Validator, AbstractControl, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';
import { AuthMockService } from '../mocks/auth-mock.service';
import { RouterMockService } from '../mocks/router-mock.service';

describe('LoginComponent', () => {
    let comp:    LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;
    let authService;
    let router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
            imports: [
                FormsModule
            ],
            providers:[
                {provide: AuthService, useClass: AuthMockService },
                {provide: Router, useClass: RouterMockService }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        comp = fixture.debugElement.componentInstance;
        // AuthService from the root injector
        authService = fixture.debugElement.injector.get(AuthService);
        router = fixture.debugElement.injector.get(Router);
    });

    it('should create', () => {
        expect(comp).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should have and init function', () => {
            expect(comp.ngOnInit).toBeTruthy();
            expect(typeof comp.ngOnInit).toEqual('function');
        });

        it('should set some defaults', () => {
            expect(comp.credentials).toBeUndefined();
            expect(comp.invalid_credentials).toBeUndefined();
            comp.ngOnInit();
            expect(comp.credentials).toEqual({ email: '', password: '' });
            expect(comp.invalid_credentials).toEqual(false);
        });
    });

    describe('login', () => {
        it('should have a login function', () => {
            expect(comp.login).toBeTruthy();
            expect(typeof comp.login).toEqual('function');
        });

        it('should return false if it is passed an invalid form object', () => {
            spyOn(authService, 'login');
            let form = {
                valid: false
            };
            expect(comp.login(form)).toEqual(false);
            expect(authService.login).not.toHaveBeenCalled();
        });

        it('should call the login method on the AuthService if it is passed a valid form object', () => {
            spyOn(authService, 'login');
            let form = {
                valid: true
            };
            comp.login(form)
            expect(authService.login).toHaveBeenCalled();
        });
    });
});
