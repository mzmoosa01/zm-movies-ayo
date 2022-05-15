import { Injectable } from '@angular/core';
import { SearchState } from '../states/search.state';

@Injectable({
  providedIn: 'root',
})
export class SearchFacade {
  constructor(private readonly _state: SearchState) {}

  public selectedShow$ = this._state.selectedShow$;

  public searchShows = this._state.searchShows.bind(this._state);
  public selectShow = this._state.selectShow.bind(this._state);
}
