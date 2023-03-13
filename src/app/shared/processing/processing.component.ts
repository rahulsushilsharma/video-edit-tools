import { Component } from '@angular/core';
import { LoadFfmpegService } from '../../services/load-ffmpeg.service';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.css']
})
export class ProcessingComponent {
  constructor(public ffmpeg:LoadFfmpegService){}
}
