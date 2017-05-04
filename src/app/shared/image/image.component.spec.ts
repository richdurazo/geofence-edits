import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilestackService } from '../../shared/filestack.service';
import { FilestackMockService } from '../../mocks/shared/filestack-mock.service';

import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let filestack: FilestackMockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageComponent ],
      providers: [
          { provide: FilestackService, useClass: FilestackMockService }
      ]
    })
    .compileComponents();


    filestack = TestBed.get(FilestackService);

    spyOn(filestack, 'generateSaveFilePath');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
