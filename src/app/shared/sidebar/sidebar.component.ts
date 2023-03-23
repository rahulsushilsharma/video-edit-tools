import { Component, ViewChild } from '@angular/core';
import { UiControlsService } from 'src/app/services/ui-controls.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @ViewChild('navbar') navbar!: any;
  @ViewChild('nav_') nav_!: any;
  @ViewChild('cover') cover!: any;

  constructor(public UiControls: UiControlsService) {}
  ngAfterViewInit(): void {
    console.log(this.navbar.nativeElement);
  }

  expand() {
    this.navbar.nativeElement.classList.add('expand');
    this.nav_.nativeElement.classList.add('expand');
    this.cover.nativeElement.classList.remove('hide');

  }
  colapse(){
    this.navbar.nativeElement.classList.remove('expand');
    this.nav_.nativeElement.classList.remove('expand');
    this.cover.nativeElement.classList.add('hide');

  }
}
