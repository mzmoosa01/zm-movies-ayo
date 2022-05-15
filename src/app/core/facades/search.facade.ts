import { Injectable } from '@angular/core';
import { SearchState } from '../states/search.state';

@Injectable({
  providedIn: 'root',
})
export class SearchFacade {
  constructor(private readonly _state: SearchState) {}

  //   public searchResults$ = this._state.searchResult$;

  public searchShows = this._state.searchShows.bind(this._state);
}
