import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiControlsService {

  TrimComponentViewToggle: boolean = false
  ProgressComponentViewToggle : boolean = false
  FileInputComponentViewToggle : boolean = false
  FileSystemComponentViewToggle :boolean = false
  constructor() { }
}
