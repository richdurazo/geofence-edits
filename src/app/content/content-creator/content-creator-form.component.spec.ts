import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ContentApiService } from '../shared/content-api.service';
import { ContentApiMockService } from '../../mocks/content/content-api-mock.service';

import { ContentCreatorFormComponent } from './content-creator-form.component';

describe('ContentCreatorFormComponent', () => {
  let component: ContentCreatorFormComponent;
  let fixture: ComponentFixture<ContentCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCreatorFormComponent ],
      providers: [
        { provide: ContentApiService, useClass: ContentApiMockService }
      ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
