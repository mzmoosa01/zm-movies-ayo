import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map, Observable, switchMap, take, tap } from 'rxjs';
import { SearchFacade } from 'src/app/core/facades/search.facade';
import { SearchResult } from 'src/app/models/search-result.model';
import { SearchType } from 'src/app/models/search.type';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  public searchResults!: Observable<SearchResult[]>;
  public title = '';
  public type: SearchType = 'movie';
  public year: string | undefined = undefined;
  public page = 1;
  public totalResults = 0;
  public itemsPerPage = 10;
  public loading = true;

  public get pageIndex() {
    return this.page - 1;
  }

  constructor(
    public readonly searchFacade: SearchFacade,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {
    this.searchResults = this._route.queryParamMap.pipe(
      take(1),
      switchMap((params) => {
        this.title = params.get('title') || '';
        this.type = (params.get('type') as SearchType) || 'movie';
        this.year = params.get('year') || undefined;
        this.page = Number(params.get('page') || 1);
        return this._getResults();
      })
    );
  }

  public nextPage(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        page: this.page,
      },
      queryParamsHandling: 'merge',
    });
  }

  private _getResults(): Observable<SearchResult[]> {
    return this.searchFacade
      .searchShows(this.title, this.type, this.year, this.page)
      .pipe(
        take(1),
        map((resp) => {
          if (resp) {
            this.totalResults = resp.totalResults;
            this.loading = false;
            return resp.results;
          }
          this.loading = false;
          return [];
        })
      );
  }
}
