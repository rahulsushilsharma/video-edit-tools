import { AfterViewInit, Component } from '@angular/core';
import { LoadFfmpegService } from '../services/load-ffmpeg.service';

@Component({
  selector: 'app-file-system',
  templateUrl: './file-system.component.html',
  styleUrls: ['./file-system.component.css'],
})
export class FileSystemComponent implements AfterViewInit {
  currentDir = [{
    'path':``,
    'folderName':''
  }];
  constructor(public ffmpeg: LoadFfmpegService) {}
  ngAfterViewInit(): void {
    // this.readFiles()
  }

  initialRead() {
    let dirList = this.ffmpeg.listDir('./');
    for(let dir of dirList){
      this.currentDir.push({
        'path':dir,
        'folderName':dir
      })
    }
  }
  readFiles(path: string) {
    this.currentDir = [{
      'path':``,
      'folderName':''
    }];
    try {
      console.log(this.currentDir);

      let newDir = this.ffmpeg.listDir(path);

      for (let dir of newDir) {
        this.currentDir.push(
          {
            'path':`${path}/${dir}`,
            'folderName':dir
          }
          );
      }
    } catch {
      this.currentDir = [{
        'path':`./`,
        'folderName':'.'
      },{
        'path':`../`,
        'folderName':'..'
      }];

      console.log('path is not explorable');
    } // console.log(this.path, dir);
    // }
    // this.ffmpeg.exploreDirectory(path);
  }
}
