import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { Observable } from "rxjs/Rx";

import { TargetApiService } from '../../shared/target-api.service';
import { TargetApiMockService } from '../../mocks/target/target-api-mock.service';

import { TargetTypeaheadComponent } from './target-typeahead.component';

describe('TargetTypeaheadComponent', () => {
    let component: TargetTypeaheadComponent;
    let fixture: ComponentFixture<TargetTypeaheadComponent>;
    let targetApi: TargetApiService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TargetTypeaheadComponent
            ],
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                MaterialModule
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                { provide: TargetApiService, useClass: TargetApiMockService }
            ]
        })
        .compileComponents();

        targetApi = TestBed.get(TargetApiService);
        spyOn(targetApi, 'fetchTargets').and.returnValue(Observable.of([{foo: 'bar'}]));
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TargetTypeaheadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
