import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';
import { SearchForm } from 'src/app/models/search-form.model';
import { SearchResponse } from 'src/app/models/search-response.model';
import { SearchResult } from 'src/app/models/search-result.model';
import { SearchType } from 'src/app/models/search.type';
import { SearchService } from '../services/search.service';

@Injectable({
  providedIn: 'root',
})
export class SearchState implements OnDestroy {
  private readonly _destroy = new Subject<void>();

  constructor(private readonly _service: SearchService) {}

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
  ): Observable<SearchResponse> {
    return (
      this._service
        .searchShow(title, type, year, page)
        //Not sure if this would work better in the component and http calls complete so it might be unnecessary
        .pipe(takeUntil(this._destroy))
    );
  }

  public ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}
