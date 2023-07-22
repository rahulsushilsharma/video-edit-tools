import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { SharedModule } from './shared/shared.module';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { FileSystemComponent } from './file-system/file-system.component';
import { FormatConvortorComponent } from './format-convortor/format-convortor.component';
import { ThumbGenratorComponent } from './thumb-genrator/thumb-genrator.component';
import { CombineMediaComponent } from './combine-media/combine-media.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    InitialPageComponent,
    FileSystemComponent,
    FormatConvortorComponent,
    ThumbGenratorComponent,
    CombineMediaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
