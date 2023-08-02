import { TestBed } from '@angular/core/testing';

import { FotoService } from './photo.service';

describe('FotoService', () => {
  let service: FotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
