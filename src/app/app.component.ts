import { Component } from '@angular/core';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'video edit tools';
  constructor() {
    this.loadFfmpeg()
  }
  
  async loadFfmpeg() {
    await ffmpeg.load();
  }
}
