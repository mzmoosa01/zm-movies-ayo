import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

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
    // I had initially inncluded episode search but it seems the api does not support it.
    // {
    //   title: 'episodes',
    //   routerLink: 'search',
    //   queryParams: { type: 'episode' },
    //   icon: 'video_library',
    // },
  ];

  @Input() public isDarkMode: boolean | null = false;

  @Output() public setDarkMode = new EventEmitter<void>();

  public get darkModeButtonText(): string {
    return this.isDarkMode ? 'Light Mode' : 'Dark Mode';
  }

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

  public changeDarkMode(): void {
    this.setDarkMode.emit();
  }
}
