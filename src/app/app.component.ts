import { Component } from '@angular/core';
import { LoadVideoService } from './services/load-video.service';
import { LoadFfmpegService } from './services/load-ffmpeg.service';
import { UiControlsService } from './services/ui-controls.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'video edit tools';
  constructor(
    public ffmpeg: LoadFfmpegService,
    public UiControls: UiControlsService
  ) {}

}
