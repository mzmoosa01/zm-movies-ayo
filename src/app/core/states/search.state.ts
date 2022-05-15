import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  Subject,
  take,
  takeUntil,
} from 'rxjs';
import { SearchResponse } from 'src/app/models/search-response.model';
import { SearchType } from 'src/app/models/search.type';
import { ShowDetails } from 'src/app/models/show-details.model';
import { SearchService } from '../services/search.service';

@Injectable({
  providedIn: 'root',
})
export class SearchState implements OnDestroy {
  private readonly _selectedShow = new BehaviorSubject<ShowDetails | undefined>(
    undefined
  );
  private readonly _destroy = new Subject<void>();

  public selectedShow$ = this._selectedShow.asObservable();

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
  ): Observable<SearchResponse | undefined> {
    return this._service.searchShow(title, type, year, page).pipe(
      //Not sure if this would work better in the component and http calls complete so it might be unnecessary
      takeUntil(this._destroy),
      catchError((err) => {
        this._router.navigate(['search'], {
          queryParams: { error: err.message },
        });
        return of(undefined);
      })
    );
  }

  /**
   * Select a show and store it in the selectedShow observable
   * @param imdbID
   */
  public selectShow(imdbID: string): void {
    //I will use a different technique for state management here, just to show versatility.
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
          this._selectedShow.next(showDetails);
          return showDetails;
        })
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
