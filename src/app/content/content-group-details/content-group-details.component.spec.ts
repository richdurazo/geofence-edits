import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from "rxjs/Rx";

import { MdDialog } from '@angular/material';
import { MdDialogMock } from '../../mocks/shared/md-dialog-mock.service';

import { TriggerApiService } from '../../triggers/shared/trigger-api.service';
import { TriggerApiMockService } from '../../mocks/triggers/trigger-api-mock.service';

import { ContentApiService } from '../shared/content-api.service';
import { ContentApiMockService } from '../../mocks/content/content-api-mock.service';

import { ContentGroupDetailsComponent } from './content-group-details.component';

describe('ContentGroupDetailsComponent', () => {
    let component: ContentGroupDetailsComponent;
    let fixture: ComponentFixture<TestComponentWrapper>;
    let contentApi: ContentApiMockService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ContentGroupDetailsComponent,
                TestComponentWrapper
            ],
            imports: [
                FormsModule
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                { provide: ContentApiService, useClass: ContentApiMockService },
                { provide: TriggerApiService, useClass: TriggerApiMockService },
                { provide: MdDialog, useClass: MdDialogMock }
            ]
        })
        .compileComponents();

        contentApi = TestBed.get(ContentApiService);
        spyOn(contentApi, 'getGroupContent').and.returnValue(Observable.of([]));

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentWrapper);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
  selector: 'test-component-wrapper',
  template: '<app-content-group-details [contentGroup]="contentGroup"></app-content-group-details>'
})
class TestComponentWrapper {
    contentGroup = { id: 1, name: 'foo' }
}
