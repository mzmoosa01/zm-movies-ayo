import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, Subject, takeUntil } from 'rxjs';
import { SearchResponse } from 'src/app/models/search-response.model';
import { SearchType } from 'src/app/models/search.type';
import { SearchService } from '../services/search.service';

@Injectable({
  providedIn: 'root',
})
export class SearchState implements OnDestroy {
  private readonly _destroy = new Subject<void>();

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

  public ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
