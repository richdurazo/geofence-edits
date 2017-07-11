import { RouterMockService } from './../../../mocks/router/router-mock.service';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from "rxjs/Rx";

import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRefMock, MD_DIALOG_DATA_MOCK } from '../../../mocks/shared/md-dialog-ref-mock.service';

import { TermsApiService } from './terms-api.service';
import { TermsApiMockService } from '../../../mocks/shared/terms-api-mock.service';

import { TermsDialogComponent } from './terms-dialog.component';

describe('TermsDialogComponent', () => {
    let component: TermsDialogComponent;
    let fixture: ComponentFixture<TermsDialogComponent>;
    let termsApi: TermsApiMockService;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TermsDialogComponent
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            imports: [
                FormsModule
            ],
            providers: [
                { provide: MdDialogRef, useClass: MdDialogRefMock },
                { provide: MD_DIALOG_DATA, useClass: MD_DIALOG_DATA_MOCK },
                { provide: TermsApiService, useClass: TermsApiMockService },
                { provide: Router, useClass: RouterMockService}

            ]
        })
        .compileComponents();

        termsApi = TestBed.get(TermsApiService);
        router = TestBed.get(Router);


        spyOn(termsApi, 'getTerms').and.returnValue(Observable.of({hay: 'guyz'}));
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TermsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
