import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadFfmpegService } from '.././services/load-ffmpeg.service';
import { LoadVideoService } from '.././services/load-video.service';
import { fetchFile } from '@ffmpeg/ffmpeg';
import { UiControlsService } from '../services/ui-controls.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],

})
export class FileInputComponent {
  constructor(
    public ffmpeg: LoadFfmpegService,
    public loadVideo: LoadVideoService,
    private domSanitizer: DomSanitizer,
    public UiControls: UiControlsService,
    private snackBar: SnackbarService
  ) {
    this.updateVideo()
  }


  async updateVideo() {
    this.snackBar.openSnackBar('downloading dependicies...', 'ok', 'right', 'top', 5000)

    await this.ffmpeg.load();
    this.snackBar.openSnackBar(' dependicies downloaded', 'ok', 'right', 'top', 5000)

  }
  isDragOver = false;
  async downloadFile(value: string) {
    console.log(value);
    //'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
    let blob = await this.loadVideo.downloadVideo(value);
    this.loadVideo.videoBlobUrl = this.domSanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(blob)
    );
    this.loadVideo.mediaInfo = {
      clean_name: 'downloaded_file',
      name: 'downloaded_file.mp4',
      size: 12345,
      type: 'video/mp4',
    };
    await this.ffmpeg.load();
    let file = await fetchFile(blob);
    this.ffmpeg.ffmpeg.FS('writeFile', this.loadVideo.mediaInfo.name, file);
    this.UiControls.components.FileInputComponentViewToggle = true;
  }
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
    console.log(files[0]);
    this.loadVideo.mediaInfo = this.setFileMeta(files[0]);

    await this.ffmpeg.load();
    let file = await fetchFile(files[0]);
    this.ffmpeg.ffmpeg.FS('writeFile', this.loadVideo.mediaInfo.name, file);
    this.UiControls.components.FileInputComponentViewToggle = true;
    this.UiControls.components.TrimComponentViewToggle = true;
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    this.loadVideo.videoBlobUrl = this.domSanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(file)
    );
    console.log(file);
    this.loadVideo.mediaInfo = this.setFileMeta(file);
    await this.ffmpeg.load();
    let file1 = await fetchFile(file);
    this.ffmpeg.ffmpeg.FS('writeFile', this.loadVideo.mediaInfo.name, file1);
    this.UiControls.components.FileInputComponentViewToggle = true;
    this.UiControls.components.TrimComponentViewToggle = true;
  }
  setFileMeta(file: any) {
    let name: string = file.name.trim().replace(/[^0-9a-zA-Z.]/g, '');
    const nameArr = name.split('.');
    const ext = nameArr.pop();
    name = nameArr.join('_') + '.' + ext;
    console.log({
      name: name,
      size: file.size,
      type: file.type,
    });

    return {
      clean_name: name.split('.')[0],
      name: name,
      size: file.size,
      type: file.type,
    };
  }

  setFilesInFileSystem() { }
}
