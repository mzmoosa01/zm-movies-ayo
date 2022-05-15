import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public isSmallDevice: boolean = false;
  public menuItems = [
    {
      title: 'movies',
      routerLink: 'search',
      queryParams: { type: 'movie' },
      icon: 'movie',
    },
    {
      title: 'series',
      routerLink: 'search',
      queryParams: { type: 'series' },
      icon: 'tv',
    },
    {
      title: 'episodes',
      routerLink: 'search',
      queryParams: { type: 'series' },
      icon: 'video_library',
    },
  ];

  ngOnInit() {
    window.innerWidth < 960
      ? (this.isSmallDevice = true)
      : (this.isSmallDevice = false);
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    window.innerWidth < 960
      ? (this.isSmallDevice = true)
      : (this.isSmallDevice = false);
  }
}
