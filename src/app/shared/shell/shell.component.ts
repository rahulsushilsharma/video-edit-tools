import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent {
  @ViewChild ('drawer') drawer : any
  showFiller = false
  trim_= false
  trim(){
    this.trim_ = true
    this.drawer.toggle()
  }
}
