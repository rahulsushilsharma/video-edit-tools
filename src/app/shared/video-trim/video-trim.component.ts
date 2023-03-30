import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LoadVideoService } from '../../services/load-video.service';
import { LoadFfmpegService } from '../../services/load-ffmpeg.service';
// import { fetchFile } from '@ffmpeg/ffmpeg';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-trim',
  templateUrl: './video-trim.component.html',
  styleUrls: ['./video-trim.component.css'],
})
export class VideoTrimComponent implements AfterViewInit {
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

  forward(val: any) {
    this.videoPlayer.video.currentTime = val;
    this.drawToCanvas(this.start_thumb.nativeElement);
    this.clip_data.calc_start = val.toString();

    let milisec = val.toString().split('.')[1];
    this.clip_data.start_clip = this.toTime(val) + '.' + milisec;
  }
  backward(val: any) {
    this.videoPlayer.video.currentTime = val;
    this.drawToCanvas(this.end_thumb.nativeElement);
    this.clip_data.calc_end = val.toString();

    let milisec = val.toString().split('.')[1];
    this.clip_data.end_clip = this.toTime(val) + '.' + milisec;

    this.clip_data.length =
      parseFloat(val) - parseFloat(this.clip_data.calc_end) + '';
  }
  timeout(ms: number | undefined) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async drawToCanvas(canvas: any) {
    var ctx = canvas.getContext('2d');
    canvas.width = this.videoPlayer.video.width / 2.5;
    canvas.height = this.videoPlayer.video.height / 3;
    await new Promise((resolve) => setTimeout(resolve, 100));
    ctx.drawImage(this.videoPlayer.video, 0, 0, canvas.width, canvas.height);
  }
  async trim() {
    let start = new Date().getTime();
    await this.ffmpeg.ffmpeg.run(
      '-i',
      this.videoPlayer.mediaInfo.name,
      '-ss',
      this.clip_data.start_clip,
      '-to',
      this.clip_data.end_clip,
      '-c:v',
      'libx264',
      '-c:a',
      'aac',
      `out/output2.mp4`
    );
    let end = new Date().getTime();
    console.log('time used :: ', end - start);

    const da = this.ffmpeg.ffmpeg.FS('readFile', 'out/output2.mp4');
    let video = new Blob([da]);
    this.out_video = this.domSanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(video)
    );
    // console.log(da);
    this.downLoadFile(video);
  }
  toTime(seconds: number) {
    var date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substring(11, 19);
  }
  /**
   * Method is use to download file.
   * @param data - Array Buffer data
   * @param type - type of the document.
   */
  downLoadFile(data: any) {
    var downloadURL = window.URL.createObjectURL(data);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = 'trim.mp4';
    link.click();
  }
}
