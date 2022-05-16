import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SettingsFacade } from 'src/app/core/facades/settings.facade';

@Component({
  selector: 'app-search',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public changeDarkMode(): void {
    this.settingsFacade.toggleDarkMode();
  }

  constructor(public readonly settingsFacade: SettingsFacade) {}
}
