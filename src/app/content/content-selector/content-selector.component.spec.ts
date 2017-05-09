import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from "rxjs/Rx";

import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRefMock, MD_DIALOG_DATA_MOCK } from '../../mocks/shared/md-dialog-ref-mock.service';

import { ContentApiService } from '../shared/content-api.service';
import { ContentApiMockService } from '../../mocks/content/content-api-mock.service';

import { ContentSelectorComponent } from './content-selector.component';

describe('ContentSelectorComponent', () => {
  let component: ContentSelectorComponent;
  let fixture: ComponentFixture<ContentSelectorComponent>;
  let contentApi: ContentApiMockService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          ContentSelectorComponent
      ],
      providers: [
          { provide: ContentApiService, useClass: ContentApiMockService },
          { provide: MdDialogRef, useClass: MdDialogRefMock }
      ],
      schemas: [
          CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();

    contentApi = TestBed.get(ContentApiService);
    // spyOn(contentApi, 'getGroupContent').and.returnValue(Observable.of([]));
    spyOn(contentApi, 'getContent').and.returnValue(Observable.of([]));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
