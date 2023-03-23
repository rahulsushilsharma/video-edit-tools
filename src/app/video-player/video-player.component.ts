import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LoadVideoService } from '../services/load-video.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements AfterViewInit{
  @ViewChild('video_player') video_player: any;
  constructor(public loadVideo: LoadVideoService) {}
  ngAfterViewInit(): void {
    this.loadVideo.video = this.video_player.nativeElement
  }
}
