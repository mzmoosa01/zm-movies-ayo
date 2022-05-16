import { TestBed } from '@angular/core/testing';

import { SettingsState } from './settings.state';

describe('SettingsService', () => {
  let service: SettingsState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle dark mode observable', () => {
    service.toggleDarkMode();
    service.darkMode$.subscribe((mode) => {
      expect(mode).toBeTrue;
    });
  });
});
