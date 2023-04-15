import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ShellComponent } from './shell/shell.component';
import { VideoTrimComponent } from './video-trim/video-trim.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ExtractAudioComponent } from './extract-audio/extract-audio.component';
import { ProcessingComponent } from './processing/processing.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
const components: any = [
  ShellComponent,
  VideoTrimComponent,
  SidebarComponent,
  ExtractAudioComponent,
  ProcessingComponent,
];

const modules = [
  CommonModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
