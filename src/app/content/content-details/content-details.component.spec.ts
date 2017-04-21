import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from "rxjs/Rx";

import { ContentApiService } from '../shared/content-api.service';
import { ContentApiMockService } from '../../mocks/content/content-api-mock.service';

import { ContentDetailsComponent } from './content-details.component';

describe('ContentDetailsComponent', () => {
  let component: ContentDetailsComponent;
  let fixture: ComponentFixture<ContentDetailsComponent>;
  let contentApi: ContentApiMockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDetailsComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [
        RouterTestingModule
    ],
    providers: [
        { provide: ContentApiService, useClass: ContentApiMockService }
    ]
    })
    .compileComponents();

    contentApi = TestBed.get(ContentApiService);
    spyOn(contentApi, 'getContent').and.returnValue(Observable.of([{foo:'bar'}, {hay: 'guyz'}]));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
