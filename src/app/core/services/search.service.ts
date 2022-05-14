import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchForm } from 'src/app/models/search-form.model';
import { searchResult } from 'src/app/models/search-result.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public api = 'http://www.omdbapi.com';

  constructor(private readonly _http: HttpClient) { }

  public searchShow(searchForm: SearchForm, page: number = 1): Observable<searchResult[]> {
    let query = '?apikey=5146c919&s=' + searchForm.title + '&type=' + searchForm.type + '&page=' + page;
    query = searchForm.year ? query + '&y=' + searchForm.year:query;
    const url = this.api + query;
    return this._http.get<{Search: searchResult[]}>(url).pipe(map(data => data.Search));
  }
}
