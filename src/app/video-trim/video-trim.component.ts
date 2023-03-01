import { Component, ViewChild } from '@angular/core';
import { LoadVideoService } from '../services/load-video.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';

@Component({
  selector: 'app-video-trim',
  templateUrl: './video-trim.component.html',
  styleUrls: ['./video-trim.component.css']
})
export class VideoTrimComponent {
  ngAfterViewInit() {
   
  }
  constructor(public videoPlayer: LoadVideoService){}

  
  seek_steps: number | undefined;
  video_duration: number | undefined;

  forward(val: any) {
    console.log(val);
    this.videoPlayer.videoPlayer.video_player.nativeElement.currentTime = val;
  }
  backward(val: any) {
    console.log(val);
    this.videoPlayer.videoPlayer.video_player.nativeElement.currentTime = val;
  }
}
