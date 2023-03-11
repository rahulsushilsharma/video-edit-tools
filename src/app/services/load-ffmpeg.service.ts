import { Injectable } from '@angular/core';
import { createFFmpeg } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root',
})
export class LoadFfmpegService {
  ffmpeg = createFFmpeg();
  progress!: number;
  loaded = false
  log = {
    info: '',
    fferr: '',
    ffout: '',
  };
  constructor() {}

  async load() {
    await this.ffmpeg.load();
    this.ffmpeg.setProgress(({ ratio }) => {
      this.progress = ratio * 100;
      console.log(this.progress);

      /*
       * ratio is a float number between 0 to 1.
       */
    });
    this.ffmpeg.setLogger(({ type, message }) => {
      if (type == 'ffout') this.log.ffout += message + '\n';
      if (type == 'fferr') this.log.fferr += message + '\n';
      if (type == 'info') this.log.info += message + '\n';

      /*
       * type can be one of following:
       *
       * info: internal workflow debug messages
       * fferr: ffmpeg native stderr output
       * ffout: ffmpeg native stdout output
       */
    });
    this.ffmpeg.FS('mkdir', '/out');
    this.loaded = true
  }

  async run(cmd: string) {
    let args = cmd.split(' ');
    await this.ffmpeg.run(...args);
  }
}
