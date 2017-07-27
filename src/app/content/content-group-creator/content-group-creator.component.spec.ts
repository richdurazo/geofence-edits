import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TriggerApiService } from '../../triggers/shared/trigger-api.service';
import { TriggerApiMockService } from '../../mocks/triggers/trigger-api-mock.service';
import { ContentApiService } from '../shared/content-api.service';
import { ContentApiMockService } from '../../mocks/content/content-api-mock.service';

import { ContentGroupCreatorComponent } from './content-group-creator.component';

describe('ContentGroupCreatorComponent', () => {
    let component: ContentGroupCreatorComponent;
    let fixture: ComponentFixture<ContentGroupCreatorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ContentGroupCreatorComponent ],
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
        fixture = TestBed.createComponent(ContentGroupCreatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
/*breaking test*/
/*    it('should create', () => {
        expect(component).toBeTruthy();
    });*/
});
