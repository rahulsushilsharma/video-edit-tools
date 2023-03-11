import { Component, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoadFfmpegService } from '../services/load-ffmpeg.service';
import { LoadVideoService } from '../services/load-video.service';
import { fetchFile } from '@ffmpeg/ffmpeg';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent {
  video: SafeUrl | undefined;

  @ViewChild('video_player') video_player: any;
  constructor(
    private domSanitizer: DomSanitizer,
    public loadVideo: LoadVideoService,
    public ffmpeg:LoadFfmpegService
  ) {
    this.updateVideo();
  }

  async updateVideo() {
    let blob = await this.loadVideo.downloadVideo(
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
    );
    this.video = this.domSanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(blob)
    );

    console.log(this.video_player.nativeElement);
    this.loadVideo.video = this.video_player.nativeElement;
    await this.ffmpeg.load()
    let file = await fetchFile(blob);
    this.ffmpeg.ffmpeg.FS('writeFile', 'test.mp4', file);
  }
}
