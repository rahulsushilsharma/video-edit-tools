import { AfterViewInit, Component } from '@angular/core';
import { LoadVideoService } from '../../services/load-video.service';

@Component({
  selector: 'app-video-trim',
  templateUrl: './video-trim.component.html',
  styleUrls: ['./video-trim.component.css'],
})
export class VideoTrimComponent implements AfterViewInit{
  seek_steps: number | undefined;
  video_duration: number | undefined;
  constructor(public videoPlayer: LoadVideoService) {}
  ngAfterViewInit(): void {
    
  }

  ngAfterContentInit() {
    this.seek_steps = 1 / 60;
    this.video_duration = this.videoPlayer.video.duration;
  }

  forward(val: any) {
    console.log(val);
    this.videoPlayer.video.currentTime = val;
    console.log(this.videoPlayer.video);
  }
  backward(val: any) {
    console.log(val);
    // this.videoPlayer.videoPlayer.video_player.nativeElement.currentTime = val;
    this.videoPlayer.video.currentTime = val;

  }
}
