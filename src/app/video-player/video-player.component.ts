import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoadFfmpegService } from '../services/load-ffmpeg.service';
import { LoadVideoService } from '../services/load-video.service';
import { fetchFile } from '@ffmpeg/ffmpeg';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements AfterViewInit{
  video: SafeUrl | undefined;
  ShowPlayer = false

  @ViewChild('video_player') video_player: any;
  constructor(
    private domSanitizer: DomSanitizer,
    public loadVideo: LoadVideoService,
    public ffmpeg:LoadFfmpegService
  ) {
    this.updateVideo();
    
  }
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    // this.ShowPlayer = false

  }

  async updateVideo() {
    await this.ffmpeg.load()

    // let blob = await this.loadVideo.downloadVideo(
    //   'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
    // );
    
  }
  isDragOver = false;

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer!.files;
    this.handleFileUpload(files);
    this.isDragOver = false;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  async handleFileUpload(files: FileList) {
    // handle file upload logic
    console.log(files[0]);
    
    this.video = this.domSanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(files[0])
    );
    this.ShowPlayer = true

    console.log(this.video_player);
    this.loadVideo.video = this.video_player.nativeElement;
    let file = await fetchFile(files[0]);
    this.ffmpeg.ffmpeg.FS('writeFile', 'test.mp4', file);
  }
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    this.video = this.domSanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(file)
    );
    this.ShowPlayer = true

    console.log(this.video_player);
    this.loadVideo.video = this.video_player.nativeElement;
    let file1 = await fetchFile(file);
    this.ffmpeg.ffmpeg.FS('writeFile', 'test.mp4', file1);
  }
}
