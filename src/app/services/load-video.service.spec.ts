import { TestBed } from '@angular/core/testing';

import { LoadVideoService } from './load-video.service';

describe('LoadVideoService', () => {
  let service: LoadVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
