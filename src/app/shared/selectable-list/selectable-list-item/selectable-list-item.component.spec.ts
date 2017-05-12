import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SelectableListItemComponent } from './selectable-list-item.component';

@Component({
    selector: 'test-component-wrapper',
    template: '<app-selectable-list-item [item]="content"></app-selectable-list-item>'
})
class TestComponentWrapper {
    content = { id: 1, name: 'foo' }
}

describe('SelectableListItemComponent', () => {
    let component: SelectableListItemComponent;
    let fixture: ComponentFixture<TestComponentWrapper>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SelectableListItemComponent,
                TestComponentWrapper
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            imports: [
                RouterTestingModule
            ]
        })
        .compileComponents();
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
