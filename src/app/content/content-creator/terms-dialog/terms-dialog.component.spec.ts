import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRefMock, MD_DIALOG_DATA_MOCK } from '../../../mocks/shared/md-dialog-ref-mock.service';

import { TermsDialogComponent } from './terms-dialog.component';

describe('TermsDialogComponent', () => {
  let component: TermsDialogComponent;
  let fixture: ComponentFixture<TermsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsDialogComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        FormsModule
    ],
    providers: [
        { provide: MdDialogRef, useClass: MdDialogRefMock },
        { provide: MD_DIALOG_DATA, useClass: MD_DIALOG_DATA_MOCK }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
