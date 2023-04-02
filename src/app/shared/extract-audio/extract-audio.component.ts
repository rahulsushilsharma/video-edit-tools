// import { Component } from '@angular/core';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LoadVideoService } from '../../services/load-video.service';
import { LoadFfmpegService } from '../../services/load-ffmpeg.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-extract-audio',
  templateUrl: './extract-audio.component.html',
  styleUrls: ['./extract-audio.component.scss'],
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
    // this.video_duration = this.videoPlayer.video.duration;
  }

  timeout(ms: number | undefined) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async extract() {
    
    let start = new Date().getTime();
    
    await this.ffmpeg.runCommand(`-i ${this.videoPlayer.mediaInfo.name} -filter_complex showwavespic=s=1920x108 -frames:v 1 out/output.png`)
    // await this.ffmpeg.runCommand('-i test.mp4 -q:a 0 -map a out/extract_audio.mp3')
    console.log(this.ffmpeg.log);
    let end = new Date().getTime();
    console.log('time used :: ', end - start);

    const da = this.ffmpeg.ffmpeg.FS('readFile', 'out/output.png');
    let video = new Blob([da]);
    this.out_video = this.domSanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(video)
    );
    this.videoPlayer.audioWaveformUrl = this.out_video
    // this.downLoadFile(video);
  }

  /**
   * Method is use to download file.
   * @param data - Array Buffer data
   */
  downLoadFile(data: any) {
    var downloadURL = window.URL.createObjectURL(data);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = 'output.png';
    link.click();
  }
}
