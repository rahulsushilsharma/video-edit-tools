import { Component, ElementRef, ViewChild } from '@angular/core';

import { fetchFile } from '@ffmpeg/ffmpeg';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { LoadVideoService } from './services/load-video.service';
import { LoadFfmpegService } from './services/load-ffmpeg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(VideoPlayerComponent) videoPlayer!: VideoPlayerComponent;
  @ViewChild('seek') seek: any;
  @ViewChild('output') output: any;

  title = 'video edit tools';
  url: any[] = [];
  video: any;
  ended = false;
  vid_blob: any;
  file: any;
  slider_value_start: number | undefined;
  slider_value_end: number | undefined;
  seek_steps: number | undefined;
  video_duration: number | undefined;
  trim_ = false;
  constructor(
    private domSanitizer: DomSanitizer,
    public loadVideo: LoadVideoService,
    public ffmpeg: LoadFfmpegService
  ) {}

  async loadFfmpeg() {
    let FileMeta = {};
    let meta: any = {};
    let count = 0;
    let found = false;
    let data: any[] = [];

    
    // let res = await this.downloadVideo(

    // );
    // this.vid_blob = res;
    // this.video = this.domSanitizer.bypassSecurityTrustUrl(
    //   URL.createObjectURL(this.vid_blob)
    // );
    // this.progress = 100;

    // this.file = await fetchFile(this.vid_blob);

    // ffmpeg -i input.mp4 -vf fps=1 out%d.png
    // data = data.replaceAll('Metadata:', '')
    // let nData = [];
    // for (const val of data) {
    //   if (
    //     val.includes('Video: ') ||
    //     val.includes('Duration: ') ||
    //     val.includes('Audio: ')
    //   )
    //     console.log(val.trim());
    //   if (val.includes('Video: ')) {
    //     meta.fps = parseFloat(val.split(',')[4]);
    //     meta.res = val.split(',')[2];
    //     console.log(meta);
    //     console.log();
    //   }
    // }
    // console.log(JSON.stringify(data), data);
    // console.log(da);
  }
  seekVideo(event: any) {
    if (event.deltaX !== 0) {
      if (event.deltaX < 0) {
        console.log('scrolling up');
        this.videoPlayer.video_player.nativeElement.currentTime -= 1 / 23;
        this.seek.nativeElement.scrollTop -= 70;
      } else if (event.deltaX > 0) {
        console.log('scrolling down');
        this.videoPlayer.video_player.nativeElement.currentTime += 1 / 23;
        this.seek.nativeElement.scrollTop += 70;
      }
    }
  }
  trim() {
    
    this.trim_ = true;
  }

  async captureThumb() {
    console.log(this.loadVideo.VideoDownloadProgress);

    // this.file =
    this.file = await fetchFile(this.loadVideo.videoBlob);
    let start = new Date().getTime();
    this.ffmpeg.ffmpeg.FS('writeFile', 'test.mp4', this.file);
    let end = new Date().getTime();
    console.log('write file completed', end - start);

    // start  = new Date().getTime()
    // await ffmpeg.run('-i', 'test.mp4', '-vf', `fps=23`, `out/out%d.png`);
    // end  = new Date().getTime()
    // console.log('compress file completed' ,end - start);

    this.ffmpeg.ffmpeg.FS('mkdir', '/out');

    start = new Date().getTime();
    await this.ffmpeg.ffmpeg.run('-i', 'test.mp4', '-preset', 'ultrafast', `out/out%d.png`);
    end = new Date().getTime();
    console.log('image extracted old file file completed', end - start);

    // start  = new Date().getTime()
    // await ffmpeg.run('-i', 'test.mp4', `out/out%d.png`);
    // end  = new Date().getTime()
    // console.log('image extracted old file file completed' ,end - start);

    const da = this.ffmpeg.ffmpeg.FS('readdir', '/out');
    console.log(da);

    for (const file of da) {
      if (file == '.' || file == '..') continue;
      let da_ = this.ffmpeg.ffmpeg.FS('readFile', 'out/' + file);

      this.url.push(
        this.domSanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(new Blob([da_.buffer]))
        )
      );
    }
  }
}
