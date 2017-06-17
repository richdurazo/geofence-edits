import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDetailsEditComponent } from './content-details-edit.component';

describe('ContentDetailsEditComponent', () => {
  let component: ContentDetailsEditComponent;
  let fixture: ComponentFixture<ContentDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
