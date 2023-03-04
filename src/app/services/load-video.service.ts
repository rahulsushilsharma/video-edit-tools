import { Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadVideoService {
  VideoDownloadProgress!: number;
  videoBlob!: Blob;
  video: any;

  constructor() {}

  async downloadVideo(url: string) {
    let response = await fetch(url);
    const reader = response.body!.getReader();
    const contentLength = response.headers.get('Content-Length') || '0';
    let receivedLength = 0; // received that many bytes at the moment
    let chunks = []; // array of received binary chunks (comprises the body)
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      receivedLength += value.length;

      this.VideoDownloadProgress =
        (receivedLength / parseInt(contentLength)) * 100;
      // console.log(
      //   `Received ${receivedLength} of ${contentLength}`,
      //   (receivedLength / parseInt(contentLength)) * 100
      // );
    }
    this.videoBlob = new Blob(chunks);
    return this.videoBlob;
  }
}
