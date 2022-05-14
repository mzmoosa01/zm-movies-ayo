import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { SearchFacade } from 'src/app/core/facades/search.facade';
import { SearchForm } from 'src/app/models/search-form.model';
import { searchType } from 'src/app/models/search.type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public searchType: Observable<searchType>;

  constructor(private _router: Router, private readonly _route: ActivatedRoute, private readonly _searchFacade: SearchFacade) { 
    this.searchType = this._route.data.pipe(map(data => data['searchType'] || 'movie'));
  }

  public searchShow(searchForm: SearchForm) {
    this._searchFacade.searchShows(searchForm).subscribe(() => this._router.navigateByUrl('search/results'));
  }
}