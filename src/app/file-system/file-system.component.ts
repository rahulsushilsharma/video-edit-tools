import { AfterViewInit, Component } from '@angular/core';
import { LoadFfmpegService } from '../services/load-ffmpeg.service';

@Component({
  selector: 'app-file-system',
  templateUrl: './file-system.component.html',
  styleUrls: ['./file-system.component.css'],
})
export class FileSystemComponent implements AfterViewInit {
  currentDir: {
    path: string;
    folderName: string;
    type: string;
    icon: string;
  }[] = [];

  assetList = {
    video: '../../assets/video.svg',
    audio: '../../assets/audio.svg',
    image: '../../assets/image.svg',
    folder: '../../assets/folder.svg',
  };
  showAddFile = false
  constructor(public ffmpeg: LoadFfmpegService) {}
  ngAfterViewInit(): void {
    // this.readFiles()
  }


  createFolder(value:any){
    console.log(value);
    this.ffmpeg.createDir(value)
    
  }
  toggleAddFile(){
    if(this.showAddFile) this.showAddFile = false
    else this.showAddFile = true
  }

  initialRead() {

    let dirList = this.ffmpeg.listDir_('./');
    for (let dir of dirList) {
      if (!['tmp', 'home', 'dev', 'proc'].includes(dir.folderName)) {
        
        if(dir.type == 'video')this.currentDir.push({...dir,icon:this.assetList.video});
        if(dir.type == 'audio')this.currentDir.push({...dir,icon:this.assetList.audio});
        if(dir.type == 'image')this.currentDir.push({...dir,icon:this.assetList.image});
        if(dir.type == 'folder')this.currentDir.push({...dir,icon:this.assetList.folder});
      }
    }
    console.log(this.currentDir);
  }
  readFiles(path: string) {
    this.currentDir = []
     let dirList = this.ffmpeg.listDir_(path);
    for (let dir of dirList) {
      if (!['tmp', 'home', 'dev', 'proc'].includes(dir.folderName)) {
        
        if(dir.type == 'video')this.currentDir.push({...dir,icon:this.assetList.video});
        if(dir.type == 'audio')this.currentDir.push({...dir,icon:this.assetList.audio});
        if(dir.type == 'image')this.currentDir.push({...dir,icon:this.assetList.image});
        if(dir.type == 'folder')this.currentDir.push({...dir,icon:this.assetList.folder});
      }
    }
    console.log(this.currentDir);

    //   {
    //     path: ``,
    //     folderName: '',
    //   },
    // ];
    // try {
    //   console.log(this.currentDir);

    //   let newDir = this.ffmpeg.listDir(path);

    //   for (let dir of newDir) {
    //     if (!['tmp', 'home', 'dev', 'proc'].includes(dir)) {
    //       this.currentDir.push({
    //         path: `${path}/${dir}`,
    //         folderName: dir,
    //       });
    //     }
    //   }
    // } catch {
    //   this.currentDir = [
    //     {
    //       path: `./`,
    //       folderName: '.',
    //     },
    //     {
    //       path: `../`,
    //       folderName: '..',
    //     },
    //   ];

    //   console.log('path is not explorable');
    // } // console.log(this.path, dir);
    // }
    // this.ffmpeg.exploreDirectory(path);
  }
}
