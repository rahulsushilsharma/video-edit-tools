import { TestBed } from '@angular/core/testing';

import { LoadFfmpegService } from './load-ffmpeg.service';

describe('LoadFfmpegService', () => {
  let service: LoadFfmpegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadFfmpegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
