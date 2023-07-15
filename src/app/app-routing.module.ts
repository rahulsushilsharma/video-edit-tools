import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadFfmpegService } from './services/load-ffmpeg.service';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule {
  constructor(private LoadFfmpegService:LoadFfmpegService){

    this.LoadFfmpegService.load()

  }
 }
