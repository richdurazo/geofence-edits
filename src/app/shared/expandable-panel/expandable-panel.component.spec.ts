import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ExpandablePanelComponent } from './expandable-panel.component';

describe('ExpandablePanelComponent', () => {
  let component: ExpandablePanelComponent;
  let fixture: ComponentFixture<ExpandablePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandablePanelComponent ],
      schemas: [
          CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
          BrowserAnimationsModule,
          ReactiveFormsModule,
          FlexLayoutModule,
          MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
