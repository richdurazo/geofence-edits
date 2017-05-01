import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TriggerApiService } from '../../triggers/shared/trigger-api.service';
import { TriggerApiMockService } from '../../mocks/triggers/trigger-api-mock.service';
import { ContentApiService } from '../shared/content-api.service';
import { ContentApiMockService } from '../../mocks/content/content-api-mock.service';

import { ContentGroupComponent } from './content-group.component';

describe('ContentGroupComponent', () => {
    let component: ContentGroupComponent;
    let fixture: ComponentFixture<ContentGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ContentGroupComponent ],
            imports: [
                FormsModule
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                { provide: ContentApiService, useClass: ContentApiMockService },
                { provide: TriggerApiService, useClass: TriggerApiMockService }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContentGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
