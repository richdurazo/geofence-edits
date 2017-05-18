import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
          ReactiveFormsModule
      ],
      providers: [
          FormControl
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
