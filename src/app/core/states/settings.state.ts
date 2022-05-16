import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsState {
  private readonly _darkMode = new BehaviorSubject<boolean>(false);

  public darkMode$ = this._darkMode.asObservable();

  /**
   * Toggles the dark mode observable
   */
  public toggleDarkMode() {
    this._darkMode.next(!this._darkMode.value);
  }
}
