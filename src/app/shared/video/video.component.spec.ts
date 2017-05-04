import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilestackService } from '../../shared/filestack.service';
import { FilestackMockService } from '../../mocks/shared/filestack-mock.service';

import { VideoComponent } from './video.component';

describe('VideoComponent', () => {
  let component: VideoComponent;
  let fixture: ComponentFixture<VideoComponent>;
  let filestack: FilestackMockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoComponent ],
      providers: [
          { provide: FilestackService, useClass: FilestackMockService }
      ]
    })
    .compileComponents();

    filestack = TestBed.get(FilestackService);

    spyOn(filestack, 'generateSaveFilePath');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
