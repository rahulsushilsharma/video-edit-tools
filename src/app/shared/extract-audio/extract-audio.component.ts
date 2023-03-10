// import { Component } from '@angular/core';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LoadVideoService } from '../../services/load-video.service';
import { LoadFfmpegService } from '../../services/load-ffmpeg.service';
import { fetchFile } from '@ffmpeg/ffmpeg';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-extract-audio',
  templateUrl: './extract-audio.component.html',
  styleUrls: ['./extract-audio.component.css'],
})
export class ExtractAudioComponent implements AfterViewInit {
  @ViewChild('start_thumb') start_thumb: any;
  @ViewChild('end_thumb') end_thumb: any;
  seek_steps: number | undefined;
  video_duration: number | undefined;
  clip_data = {
    start_clip: '',
    end_clip: '',
    calc_start: '',
    calc_end: '',
    length: '',
  };
  file!: Uint8Array;
  out_video!: SafeUrl;
  constructor(
    public videoPlayer: LoadVideoService,
    private domSanitizer: DomSanitizer,
    public ffmpeg: LoadFfmpegService
  ) {}

  ngAfterViewInit(): void {}

  ngAfterContentInit() {
    this.seek_steps = 1 / 60;
    this.video_duration = this.videoPlayer.video.duration;
  }

  timeout(ms: number | undefined) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async extract() {
    this.file = await fetchFile(this.videoPlayer.videoBlob);
    let start = new Date().getTime();
    this.ffmpeg.ffmpeg.FS('writeFile', 'test.mp4', this.file);
    let end = new Date().getTime();
    console.log('write file completed', end - start);

    this.ffmpeg.ffmpeg.FS('mkdir', '/out');

    start = new Date().getTime();
    await this.ffmpeg.ffmpeg.run(
      '-i',
      'test.mp4',
      '-q:a',
      '0',
      '-map',
      'a',
      'out/extract_audio.mp3'
    );
    end = new Date().getTime();
    console.log('image extracted old file file completed', end - start);

    const da = this.ffmpeg.ffmpeg.FS('readFile', 'out/extract_audio.mp3');
    let video = new Blob([da]);
    this.out_video = this.domSanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(video)
    );
    this.downLoadFile(video);
  }

  /**
   * Method is use to download file.
   * @param data - Array Buffer data
   */
  downLoadFile(data: any) {
    var downloadURL = window.URL.createObjectURL(data);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = 'audio.mp3';
    link.click();
  }
}
