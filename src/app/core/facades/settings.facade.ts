import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { SettingsState } from '../states/settings.state';

@Injectable({
  providedIn: 'root',
})
export class SettingsFacade {
  constructor(private readonly _state: SettingsState) {}

  public darkMode$ = this._state.darkMode$;

  public lightMode$ = this._state.darkMode$.pipe(map((val) => !val));

  public toggleDarkMode = this._state.toggleDarkMode.bind(this._state);
}
