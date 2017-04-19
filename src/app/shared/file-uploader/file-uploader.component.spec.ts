import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FilestackMockService } from '../../mocks/shared/filestack-mock.service';
import { FilestackService } from '../filestack.service';

import { FileUploaderComponent } from './file-uploader.component';

@Component({
    selector: 'test-component-wrapper',
    template: '<app-file-uploader [config]="config" ngDefaultControl></app-file-uploader>'
})
class TestComponentWrapper {
    config = {
        uuid: 'foo',
        key: 'bar',
        type: 'yolo',
        pickerOptions: {
            storeTo: {
                container: 'bucket'
            }
        }
    };
}


describe('FileUploaderComponent', () => {
    let component: TestComponentWrapper;
    let fixture: ComponentFixture<TestComponentWrapper>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            declarations: [
                FileUploaderComponent,
                TestComponentWrapper
            ],
            providers: [
                { provide: FilestackService, useClass: FilestackMockService }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentWrapper);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
