import { Component } from '@angular/core';
import { map } from 'rxjs';
import { SettingsFacade } from './core/facades/settings.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public readonly settingsFacade: SettingsFacade) {}
}
