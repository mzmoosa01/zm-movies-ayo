import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SearchResponse } from 'src/app/models/search-response.model';
import { SearchResult } from 'src/app/models/search-result.model';
import { SearchType } from 'src/app/models/search.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public api = `http://www.omdbapi.com?apikey=${environment.apiKey}`;

  constructor(private readonly _http: HttpClient) {}

  /**
   * Calls the api to search for a show
   * @param title
   * @param type
   * @param year
   * @param page
   * @return searchResult[]
   */
  public searchShow(
    title: string,
    type: SearchType,
    year?: string,
    page?: number
  ): Observable<SearchResponse> {
    let query = '&s=' + `*${title}*` + '&type=' + type + '&page=' + page;
    query = year ? query + '&y=' + year : query;
    const url = this.api + query;
    console.log(url);
    return this._http
      .get<{
        Search: SearchResult[];
        totalResults: string;
        Response: string;
        Error?: string;
      }>(url)
      .pipe(
        map((data) => {
          if (data.Response === 'False') {
            throw new Error(data.Error ? data.Error : 'Unknown Error!');
          }
          return {
            results: data.Search,
            totalResults: Number(data.totalResults),
          };
        })
      );
  }
}
