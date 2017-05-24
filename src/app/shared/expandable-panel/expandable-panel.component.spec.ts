import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


import { ContentApiService } from '../../content/shared/content-api.service';
import { ContentApiMockService } from '../../mocks/content/content-api-mock.service';

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
          ReactiveFormsModule,
          FormsModule,
          FlexLayoutModule,
          MaterialModule
      ],
      providers: [
          { provide: ContentApiService, useClass: ContentApiMockService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandablePanelComponent);
    component = fixture.componentInstance;
    // quick and dirty mock of @Input
    component.item = {name: 'stuff'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
