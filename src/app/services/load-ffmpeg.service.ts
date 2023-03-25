import { Injectable } from '@angular/core';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { UiControlsService } from '.././services/ui-controls.service';

@Injectable({
  providedIn: 'root',
})
export class LoadFfmpegService {
  ffmpeg = createFFmpeg();
  progress!: number;
  loaded = false;
  log = {
    info: '',
    fferr: '',
    ffout: '',
  };
  constructor(public UiControls: UiControlsService) {}

  async load() {
    await this.ffmpeg.load();
    this.ffmpeg.setProgress(({ ratio }) => {
      this.progress = ratio * 100;
      console.log(this.progress);
      if (this.progress > 0 && this.progress < 100)
        this.UiControls.ProgressComponentViewToggle = true;
      else this.UiControls.ProgressComponentViewToggle = false;

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
    this.loaded = true;
  }

  /**
   *
   * Run a ffmpeg command directly
   * @param {string} cmd
   * @return {*}  {Promise<void>}
   * @memberof LoadFfmpegService
   */
  async runCommand(cmd: string): Promise<void> {
    let args = cmd.split(' ');
    await this.ffmpeg.run(...args);
  }

  listDir(path: string) {
    if (this.ffmpeg.isLoaded()) return this.ffmpeg.FS('readdir', path);
    else return [] as string[];

  }
  exploreDirectory(path: string) {
    // list the contents of the directory
    const entries = this.ffmpeg.FS('readdir', path);
    console.log(entries);
    
    // iterate over the entries
    for (const entry of entries) {
      // print the name and type of the entry
      if(entry ==='null')continue
      const name = entry
      let type = ''
      if(entry.split('.').length>=2)type = 'file';
      else type = 'directory'

      console.log(`${name} (${type})`);
  
      // recursively explore subdirectories
      if (type === "directory") {
        this.exploreDirectory(`${path}/${name}`);
      }
    }
  }
}
