import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FileUploaderComponent } from './file-uploader.component';

describe('FileUploaderComponent', () => {
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
          CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [ FileUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploaderComponent);
    component = TestBed.get(FileUploaderComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
