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
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTooltip } from '@angular/material/tooltip';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileInputComponent } from './file-input/file-input.component';

const components: any = [
  ShellComponent,
  VideoTrimComponent,
  SidebarComponent,
  ExtractAudioComponent,
  ProcessingComponent,
  SnackbarComponent,
  FileInputComponent,

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
  MatTooltipModule,
  MatSnackBarModule,
  MatFormFieldModule,



];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class SharedModule { }
