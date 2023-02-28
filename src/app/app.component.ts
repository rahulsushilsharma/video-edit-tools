import { Component, ElementRef, ViewChild } from '@angular/core';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

const ffmpeg = createFFmpeg();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('video_player') video_player: any;
  @ViewChild('seek') seek: any;
  @ViewChild('output') output: any;
  title = 'video edit tools';
  url: any[] = [];
  progress = 0;
  video: any;
  ended = false;
  vid_blob: any;
  file: any;
  slider_value_start: number | undefined;
  slider_value_end: number | undefined;
  seek_steps: number | undefined;
  video_duration: number | undefined;

  constructor(private domSanitizer: DomSanitizer) {
    this.loadFfmpeg();
  }

  async downloadVideo(url: string) {
    let response = await fetch(url);

    const reader = response.body!.getReader();

    // Step 2: get total length
    const contentLength = response.headers.get('Content-Length') || '0';

    // Step 3: read the data
    let receivedLength = 0; // received that many bytes at the moment
    let chunks = []; // array of received binary chunks (comprises the body)
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;
      this.progress = (receivedLength / parseInt(contentLength)) * 100;
      console.log(
        `Received ${receivedLength} of ${contentLength}`,
        (receivedLength / parseInt(contentLength)) * 100
      );
    }
    return new Blob(chunks);
  }
  async loadFfmpeg() {
    let FileMeta = {};
    let meta: any = {};
    await ffmpeg.load();
    let count = 0;
    let found = false;
    let data: any[] = [];

    ffmpeg.setProgress(({ ratio }) => {
      console.log(ratio);
      this.progress = ratio * 100;
      /*
       * ratio is a float number between 0 to 1.
       */
    });
    ffmpeg.setLogger(({ type, message }) => {
      console.log(type, message);

      if (message.includes('Video: ')) {
        meta.fps = parseFloat(message.split(',')[4]);
        meta.res = message.split(',')[2];
      }

      /*
       * type can be one of following:
       *
       * info: internal workflow debug messages
       * fferr: ffmpeg native stderr output
       * ffout: ffmpeg native stdout output
       */
    });
    let res = await this.downloadVideo(
      'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    );
    this.vid_blob = res;
    this.video = this.domSanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(this.vid_blob)
    );
    this.progress = 100;

    this.file = await fetchFile(this.vid_blob);

    this.video_duration = this.video_player.nativeElement.duration;
    this.seek_steps = 1 / 23;
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
        this.video_player.nativeElement.currentTime -= 1 / 23;
        this.seek.nativeElement.scrollTop -= 70;
      } else if (event.deltaX > 0) {
        console.log('scrolling down');
        this.video_player.nativeElement.currentTime += 1 / 23;
        this.seek.nativeElement.scrollTop += 70;
      }
    }
  }
  forward(val: any) {
    console.log(val);
    this.video_player.nativeElement.currentTime = val;
  }
  backward(val: any) {
    console.log(val);
    this.video_player.nativeElement.currentTime = val;
  }
  async captureThumb() {
    let start = new Date().getTime();
    ffmpeg.FS('writeFile', 'test.mp4', this.file);
    let end = new Date().getTime();
    console.log('write file completed', end - start);

    // start  = new Date().getTime()
    // await ffmpeg.run('-i', 'test.mp4', '-vf', `fps=23`, `out/out%d.png`);
    // end  = new Date().getTime()
    // console.log('compress file completed' ,end - start);

    ffmpeg.FS('mkdir', '/out');

    start = new Date().getTime();
    await ffmpeg.run('-i', 'test.mp4', '-preset', 'ultrafast', `out/out%d.png`);
    end = new Date().getTime();
    console.log('image extracted old file file completed', end - start);

    // start  = new Date().getTime()
    // await ffmpeg.run('-i', 'test.mp4', `out/out%d.png`);
    // end  = new Date().getTime()
    // console.log('image extracted old file file completed' ,end - start);

    const da = ffmpeg.FS('readdir', '/out');
    console.log(da);

    for (const file of da) {
      if (file == '.' || file == '..') continue;
      let da_ = ffmpeg.FS('readFile', 'out/' + file);

      this.url.push(
        this.domSanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(new Blob([da_.buffer]))
        )
      );
    }
  }
}
