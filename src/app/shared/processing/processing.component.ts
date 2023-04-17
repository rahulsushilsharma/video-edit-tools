import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadFfmpegService } from '../../services/load-ffmpeg.service';
import { UiControlsService } from 'src/app/services/ui-controls.service';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss'],
})
export class ProcessingComponent implements OnInit {
  @ViewChild('log_container') log_container: any;

  data: any[] = [];
  constructor(public ffmpeg: LoadFfmpegService,public UiControles:UiControlsService) {}
  ngOnInit() {
    this.ffmpeg.logStream.subscribe((data) => {
      this.data.push(data);
      console.log(data);
      this.log_container.nativeElement.scrollTop =
        this.log_container.nativeElement.scrollHeight;
    });
  }

  // exit() {
  //   console.log('exiting  the process');

  //   this.ffmpeg.exit();
  //   this.UiControles.ProgressComponentViewToggle = false
  // }
}
