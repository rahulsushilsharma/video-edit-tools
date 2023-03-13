import { Component } from '@angular/core';
import { LoadVideoService } from '.././services/load-video.service';
@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
})
export class FileInputComponent {
  isDragOver = false;
  ShowPlayer = false;
  constructor(public loadVideo :LoadVideoService){}

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer!.files;
    // this.handleFileUpload(files);
    this.loadVideo.video = files
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

  // async handleFileUpload(files: FileList) {
  //   // handle file upload logic
  //   console.log(files[0]);

  //   this.video = this.domSanitizer.bypassSecurityTrustUrl(
  //     URL.createObjectURL(files[0])
  //   );
  //   this.ShowPlayer = true

  //   console.log(this.video_player);
  //   this.loadVideo.video = this.video_player.nativeElement;
  //   let file = await fetchFile(files[0]);
  //   this.ffmpeg.ffmpeg.FS('writeFile', 'test.mp4', file);
  // }
  async onFileSelected(event: any) {
    // const file = event.target.files[0];
    this.loadVideo.video = event.target.files

    // this.video = this.domSanitizer.bypassSecurityTrustUrl(
    //   URL.createObjectURL(file)
    // );
    // this.ShowPlayer = true

    // console.log(this.video_player);
    // this.loadVideo.video = this.video_player.nativeElement;
    // let file1 = await fetchFile(file);
    // this.ffmpeg.ffmpeg.FS('writeFile', 'test.mp4', file1);
  }
}
