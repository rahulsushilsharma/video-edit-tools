import { Component } from '@angular/core';
import { LoadFfmpegService } from '../services/load-ffmpeg.service';

@Component({
  selector: 'app-combine-media',
  templateUrl: './combine-media.component.html',
  styleUrls: ['./combine-media.component.scss']
})
export class CombineMediaComponent {

  constructor(public ffmpeg:LoadFfmpegService){
    this.ffmpeg.createDir("combineMedia")
  }
  
}
