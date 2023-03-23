import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTrimComponent } from './video-trim.component';

describe('VideoTrimComponent', () => {
  let component: VideoTrimComponent;
  let fixture: ComponentFixture<VideoTrimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoTrimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoTrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
