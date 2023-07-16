import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UiControlsService {

  components: components = {
    'TrimComponentViewToggle': true,
    'ProgressComponentViewToggle': false,
    'FileInputComponentViewToggle': false,
    'FileSystemComponentViewToggle': false,
    'FormatConverterComponentViewToggle': false,
    'AudioExtractionComponentViewToggle': false,
  }
  constructor() { }

  toggleComponent(component: keyof components) {
    for (const comp in this.components) {
      if (comp == 'ProgressComponentViewToggle' || comp == 'FileInputComponentViewToggle')continue
        if (comp == component) this.components[component] = true
        else this.components[comp as keyof components] = false
    }
  }

}

interface components {
  TrimComponentViewToggle: boolean;
  ProgressComponentViewToggle: boolean;
  FileInputComponentViewToggle: boolean;
  FileSystemComponentViewToggle: boolean;
  FormatConverterComponentViewToggle: boolean;
  AudioExtractionComponentViewToggle: boolean;
}