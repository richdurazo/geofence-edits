/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContentApiMockService } from './content-api-mock.service';

let contentApiMockService;

describe('ContentApiMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentApiMockService]
    });

    contentApiMockService = TestBed.get(ContentApiMockService);
  });

  it('should exist', () => {
    expect(contentApiMockService).toBeTruthy();
  });

  describe('getContent', () => {
    it('should be a function', () => {
      expect(typeof contentApiMockService.getContent).toEqual('function');
    });

    it('should return false', () => {
      expect(contentApiMockService.getContent()).toEqual(false);
    })
  });

  describe('createContent', () => {
    it('should be a function', () => {
      expect(typeof contentApiMockService.createContent).toEqual('function');
    });

    it('should return false', () => {
      expect(contentApiMockService.createContent()).toEqual(false);
    })
  });

  describe('deleteContent', () => {
    it('should be a function', () => {
      expect(typeof contentApiMockService.deleteContent).toEqual('function');
    });

    it('should return false', () => {
      expect(contentApiMockService.deleteContent()).toEqual(false);
    })
  });
});
