import { Injectable } from '@angular/core';
import { createFFmpeg } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root',
})
export class LoadFfmpegService {
  ffmpeg = createFFmpeg();
  progress!: number;
  log = ''
  constructor() {
    this.ffmpeg.load();
    this.ffmpeg.setProgress(({ ratio }) => {
      console.log(ratio);
      this.progress = ratio * 100;
      /*
       * ratio is a float number between 0 to 1.
       */
    });
    this.ffmpeg.setLogger(({ type, message }) => {
      if (type == 'ffout') this.log+=message+'\n';
      else console.log(type, message);

      /*
       * type can be one of following:
       *
       * info: internal workflow debug messages
       * fferr: ffmpeg native stderr output
       * ffout: ffmpeg native stdout output
       */
    });
    
  }
  async run(cmd:string){
    let args = cmd.split(' ')
    await this.ffmpeg.run(...args)
  }
}
