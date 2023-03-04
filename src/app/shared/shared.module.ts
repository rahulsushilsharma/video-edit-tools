import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ShellComponent } from './shell/shell.component';
import { VideoTrimComponent } from './video-trim/video-trim.component';
import {MatSidenavModule} from '@angular/material/sidenav';

const components: any = [ShellComponent,VideoTrimComponent];

const modules = [
  CommonModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatProgressBarModule,
  MatSidenavModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
