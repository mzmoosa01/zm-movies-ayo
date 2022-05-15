import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { SearchForm } from 'src/app/models/search-form.model';
import { SearchType } from 'src/app/models/search.type';
import { ErrorSnackbarComponent } from '../../components/error-snackbar/error-snackbar.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy {
  public searchType!: Observable<SearchType>;

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _snackBar: MatSnackBar
  ) {
    this.searchType = this._route.queryParamMap.pipe(
      takeUntil(this._destroy$),
      map((params) => {
        this._handleError(params.get('error'));
        return (params.get('type') as SearchType) || 'movie';
      })
    );
  }

  public searchShow(searchForm: SearchForm) {
    let queryParams = searchForm.year
      ? {
          title: searchForm.title,
          type: searchForm.type,
          year: searchForm.year,
        }
      : { title: searchForm.title, type: searchForm.type };
    this._router.navigate(['search', 'results'], { queryParams });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _handleError(message: string | null) {
    if (message) {
      this._snackBar.openFromComponent(ErrorSnackbarComponent, {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['error-snackbar'],
        data: {
          errorMessage: message,
          onClose: () => this._snackBar.dismiss(),
        },
      });
    }
  }
}
