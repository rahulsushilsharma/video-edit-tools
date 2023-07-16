import { Component } from '@angular/core';
import { LoadFfmpegService } from '../services/load-ffmpeg.service';
import { LoadVideoService } from '../services/load-video.service';

@Component({
  selector: 'app-format-convortor',
  templateUrl: './format-convortor.component.html',
  styleUrls: ['./format-convortor.component.scss']
})
export class FormatConvortorComponent {
  file!: Uint8Array;

  formats = ['.mp4','.mov','.ogg','.avi','.flv','mkv','.webm']
  selectedFormat!:string
  constructor(
    public videoPlayer: LoadVideoService,
    public ffmpeg: LoadFfmpegService
  ) {}

 

  timeout(ms: number | undefined) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  formatSelected(event: any){
    console.log(event);
    this.selectedFormat = event
    
  }

  async convert() {
    
    let start = new Date().getTime();
    
    // await this.ffmpeg.runCommand(`-i ${this.videoPlayer.mediaInfo.name}  out/output${this.selectedFormat}`)
    await this.ffmpeg.ffmpeg.run(`-i`, `${this.videoPlayer.mediaInfo.name}`,  `out/output${this.selectedFormat}`)
    // await this.ffmpeg.runCommand('-i test.mp4 -q:a 0 -map a out/extract_audio.mp3')
    console.log(this.ffmpeg.log);
    let end = new Date().getTime();
    console.log('time used :: ', end - start);

    const da = this.ffmpeg.ffmpeg.FS('readFile', `out/output${this.selectedFormat}`);
    let video = new Blob([da]);
    
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
    link.download = `output${this.selectedFormat}`;
    link.click();
  }
}
