import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadFfmpegService } from '.././services/load-ffmpeg.service';
import { LoadVideoService } from '.././services/load-video.service';
import { fetchFile } from '@ffmpeg/ffmpeg';
import { UiControlsService } from '../services/ui-controls.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
})
export class FileInputComponent {
  constructor(
    public ffmpeg: LoadFfmpegService,
    public loadVideo: LoadVideoService,
    private domSanitizer: DomSanitizer,
    public UiControls :UiControlsService
  ) {}
  async updateVideo() {
    await this.ffmpeg.load();

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

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }
 
  async handleFileUpload(files: FileList): Promise<void> {
    this.loadVideo.videoBlobUrl = this.domSanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(files[0])
    );
    await this.ffmpeg.load();
    let file = await fetchFile(files[0]);
    this.ffmpeg.ffmpeg.FS('writeFile', 'test.mp4', file);
    this.UiControls.FileInputComponentViewToggle = true


  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    this.loadVideo.videoBlobUrl = this.domSanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(file)
    );
    await this.ffmpeg.load();
    let file1 = await fetchFile(file);
    this.ffmpeg.ffmpeg.FS('writeFile', 'test.mp4', file1);
    this.UiControls.FileInputComponentViewToggle = true
  }
}
