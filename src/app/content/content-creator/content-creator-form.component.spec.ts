import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCreatorFormComponent } from './content-creator-form.component';

describe('ContentCreatorFormComponent', () => {
  let component: ContentCreatorFormComponent;
  let fixture: ComponentFixture<ContentCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCreatorFormComponent ]
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
