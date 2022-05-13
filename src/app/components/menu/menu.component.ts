import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public isSmallDevice:boolean = false;
  public menuItems = [
    { title: 'movies', routerLink: '/movies', icon: 'movie' },
    { title: 'tv shows', routerLink: '/tvshows', icon: 'tv' },
    { title: 'tv episodes', routerLink: '/episodes', icon: 'video_library' },
  ]

  ngOnInit() {
    (window.innerWidth < 960) ? this.isSmallDevice = true : this.isSmallDevice = false;
  }
  
  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.isSmallDevice = true : this.isSmallDevice = false;
  }

}
