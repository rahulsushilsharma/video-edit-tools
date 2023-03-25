import { AfterViewInit, Component } from '@angular/core';
import { LoadFfmpegService } from '../services/load-ffmpeg.service';

@Component({
  selector: 'app-file-system',
  templateUrl: './file-system.component.html',
  styleUrls: ['./file-system.component.css'],
})
export class FileSystemComponent implements AfterViewInit{
  currentDir : string[] = []
  constructor(public ffmpeg: LoadFfmpegService) {
  }
  ngAfterViewInit(): void {
    // this.readFiles()

  }

  readFiles(dir: string){
    console.log(dir);
    this.currentDir = this.ffmpeg.listDir(dir)
    
    
  }
}
