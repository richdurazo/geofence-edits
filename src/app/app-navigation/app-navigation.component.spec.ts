import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { RouterModule, Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { AuthMockService } from '../mocks/auth/auth-mock.service';

import { AppNavigationComponent } from './app-navigation.component';

describe('AppNavigationComponent', () => {
  let component: AppNavigationComponent;
  let fixture: ComponentFixture<AppNavigationComponent>;
  let authService: AuthMockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppNavigationComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: AuthService, useClass: AuthMockService }
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavigationComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logOut', () => {
      it('should call the logOut method on the AuthService', () => {
          spyOn(authService, 'logOut');
          expect(authService.logOut).not.toHaveBeenCalled();
          component.logOut();
          expect(authService.logOut).toHaveBeenCalled();
      });
  });
});
