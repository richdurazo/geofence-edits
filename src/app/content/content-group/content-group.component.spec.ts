import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentGroupComponent } from './content-group.component';

describe('ContentGroupComponent', () => {
  let component: ContentGroupComponent;
  let fixture: ComponentFixture<ContentGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
