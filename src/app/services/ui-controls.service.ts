import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiControlsService {

  TrimComponentViewToggle: boolean = false
  ProgressComponentViewToggle : boolean = false
  constructor() { }
}
