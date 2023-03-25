import { AfterViewInit, Component } from '@angular/core';
import { LoadFfmpegService } from '../services/load-ffmpeg.service';

@Component({
  selector: 'app-file-system',
  templateUrl: './file-system.component.html',
  styleUrls: ['./file-system.component.css'],
})
export class FileSystemComponent implements AfterViewInit {
  currentDir: string[] = [];
  path: string = '';
  lastDir: string = '';
  constructor(public ffmpeg: LoadFfmpegService) {}
  ngAfterViewInit(): void {
    // this.readFiles()
  }

  readFiles(dir: string) {
  //   if (dir == '../') {
  //     let temp = this.path.split('/');

  //     temp.pop();


  //     this.path = temp.join('/');
  //     console.log(temp,this.path);

  //     if (this.path == '.') this.path = './';
  //     this.currentDir = this.ffmpeg.listDir(this.path);
  //   } else {
  //     this.path += dir;
  //     if (this.path == '.') this.path = './';
  //     this.currentDir = this.ffmpeg.listDir(this.path);
  //   }

  //   // console.log(this.path, dir);
  // }
  this.ffmpeg.exploreDirectory(dir)
  }
}
