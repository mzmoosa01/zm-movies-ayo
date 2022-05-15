import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { SearchForm } from 'src/app/models/search-form.model';
import { SearchType } from 'src/app/models/search.type';
import { ErrorSnackbarComponent } from '../../components/error-snackbar/error-snackbar.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public searchType!: Observable<SearchType>;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _snackBar: MatSnackBar
  ) {
    this.searchType = this._route.queryParamMap.pipe(
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
