import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SelectableListItemComponent } from './selectable-list-item.component';

describe('SelectableListItemComponent', () => {
  let component: SelectableListItemComponent;
  let fixture: ComponentFixture<SelectableListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          SelectableListItemComponent
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
    fixture = TestBed.createComponent(SelectableListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
