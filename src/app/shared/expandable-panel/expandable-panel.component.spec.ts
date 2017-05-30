import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Observable } from "rxjs/Rx";

import { TargetApiService } from '../../shared/target-api.service';
import { TargetApiMockService } from '../../mocks/target/target-api-mock.service';

import { ContentApiService } from '../../content/shared/content-api.service';
import { ContentApiMockService } from '../../mocks/content/content-api-mock.service';

import { ExpandablePanelComponent } from './expandable-panel.component';

describe('ExpandablePanelComponent', () => {
  let component: ExpandablePanelComponent;
  let fixture: ComponentFixture<ExpandablePanelComponent>;
  let contentApi: ContentApiService;
  let targetApi: TargetApiService;

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
          { provide: ContentApiService, useClass: ContentApiMockService },
          { provide: TargetApiService, useClass: TargetApiMockService }
      ]
    })
    .compileComponents();

    contentApi = TestBed.get(ContentApiService);
    targetApi = TestBed.get(TargetApiService);

    spyOn(contentApi, 'getGroupTargets').and.returnValue(Observable.of([{foo: 'bar'}]));
    spyOn(targetApi, 'fetchTargets').and.returnValue(Observable.of([{foo: 'bar'}]));
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
