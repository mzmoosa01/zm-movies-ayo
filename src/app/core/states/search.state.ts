import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, of, take } from 'rxjs';
import { SearchResponse } from 'src/app/models/search-response.model';
import { SearchType } from 'src/app/models/search.type';
import { ShowDetails } from 'src/app/models/show-details.model';
import { SearchService } from '../services/search.service';

@Injectable({
  providedIn: 'root',
})
export class SearchState {
  private readonly _loading = new BehaviorSubject<boolean>(true);
  private readonly _searchResults = new BehaviorSubject<
    SearchResponse | undefined
  >(undefined);
  private readonly _selectedShow = new BehaviorSubject<ShowDetails | undefined>(
    undefined
  );

  public selectedShow$ = this._selectedShow.asObservable();
  public searchResults$ = this._searchResults.asObservable();
  public loading$ = this._loading.asObservable();

  constructor(
    private readonly _service: SearchService,
    private readonly _router: Router
  ) {}

  /**
   * This calls api to search shows and stores the response in the searchResults$ observable
   * @param title
   * @param type
   * @param year
   * @param page defaults to 1
   * @returns
   */
  public searchShows(
    title: string,
    type: SearchType,
    year?: string,
    page = 1
  ): void {
    this._loading.next(true);
    this._service
      .searchShow(title, type, year, page)
      .pipe(
        take(1),
        catchError((err) => {
          this._router.navigate(['search'], {
            queryParams: { error: err.message },
          });
          return of(undefined);
        })
      )
      .subscribe((resp) => {
        this._searchResults.next(resp);
        this._loading.next(false);
      });
  }

  /**
   * Select a show and store it in the selectedShow observable
   * @param imdbID
   */
  public selectShow(imdbID: string): void {
    this._loading.next(true);
    this._service
      .getShow(imdbID)
      .pipe(
        take(1),
        map((resp) => {
          const showDetails: ShowDetails = {
            title: resp.Title,
            rated: resp.Rated,
            poster: resp.Poster,
            genres: resp.Genre.trim().split(','),
            plot: resp.Plot,
            directors: resp.Director,
            writers: resp.Writer,
            actors: resp.Actors,
            languages: resp.Language,
          };
          return showDetails;
        })
      )
      .subscribe((showDetails) => {
        this._selectedShow.next(showDetails);
        this._loading.next(false);
      });
  }
}
