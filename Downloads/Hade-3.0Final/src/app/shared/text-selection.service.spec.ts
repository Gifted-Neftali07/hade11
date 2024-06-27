import { TestBed } from '@angular/core/testing';

import { TextSelectionService } from './text-selection.service';

describe('TextSelectionService', () => {
  let service: TextSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
