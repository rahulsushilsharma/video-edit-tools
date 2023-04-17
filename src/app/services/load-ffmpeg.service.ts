import { Injectable, ViewChild } from '@angular/core';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { UiControlsService } from '.././services/ui-controls.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoadFfmpegService {
  logStream!: Observable<any>;
  logs: any[] = [];
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
    try {
      await this.ffmpeg.load();
    } catch {
      console.log('ffmpeg already loaded');
    }
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
    this.logStream = new Observable((observer) => {
      this.ffmpeg.setLogger(({ type, message }) => {
        if (type == 'ffout') this.log.ffout += message + '\n';
        if (type == 'fferr') observer.next(message);
        if (type == 'info') this.log.info += message + '\n';

        /*
         * type can be one of following:
         *
         * info: internal workflow debug messages
         * fferr: ffmpeg native stderr output
         * ffout: ffmpeg native stdout output
         */
      });
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
  getFileType(dir: string) {
    if (dir.split('.').at(-1) == 'mp4') {
      return 'video';
    }
    return 'folder';
  }

  listDir_(path: string) {
    let currentDir: {
      path: string;
      folderName: string;
      type: string;
    }[] = [];
    try {
      console.log(currentDir);

      let newDir = this.listDir(path);

      for (let dir of newDir) {
        if (!['tmp', 'home', 'dev', 'proc'].includes(dir)) {
          let data = currentDir.push({
            path: `${path}/${dir}`,
            folderName: dir,
            type: this.getFileType(dir),
          });
        }
      }
    } catch {
      currentDir = [
        {
          path: `./`,
          folderName: '.',
          type: this.getFileType('.'),
        },
        {
          path: `../`,
          folderName: '..',
          type: this.getFileType('..'),
        },
      ];

      console.log('path is not explorable');
    }

    return currentDir;
  }

  createDir(dirName: string) {
    try {
      this.ffmpeg.FS('mkdir', dirName);
      return { status: 'success', msg: 'dir created' };
    } catch {
      return { status: 'failure', msg: 'unable to make a dir' };
    }
  }

  
}
