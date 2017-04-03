import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RouterModule, Router } from '@angular/router';

import { RouterMockService } from '../mocks/router/router-mock.service';

import { AuthService } from '../auth/auth.service';
import { AuthMockService } from '../mocks/auth/auth-mock.service';

import { AppNavigationComponent } from './app-navigation.component';

describe('AppNavigationComponent', () => {
  let component: AppNavigationComponent;
  let fixture: ComponentFixture<AppNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppNavigationComponent ],
      imports: [RouterModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: AuthService, useClass: AuthMockService },
        { provide: Router, useClass: RouterMockService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNavigationComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
