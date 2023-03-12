import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ShellComponent } from './shell/shell.component';
import { VideoTrimComponent } from './video-trim/video-trim.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ExtractAudioComponent } from './extract-audio/extract-audio.component';
import { ProcessingComponent } from './processing/processing.component';

const components: any = [ShellComponent,VideoTrimComponent,SidebarComponent,ExtractAudioComponent];

const modules = [
  CommonModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatButtonModule,

];

@NgModule({
  declarations: [...components, ProcessingComponent],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
