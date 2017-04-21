import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SortableListItemComponent } from './sortable-list-item.component';

describe('SortableListItemComponent', () => {
  let component: SortableListItemComponent;
  let fixture: ComponentFixture<SortableListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          SortableListItemComponent
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
    fixture = TestBed.createComponent(SortableListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
