import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { GlobalError } from 'src/app/models/error.model';
import { GetShowResponse } from 'src/app/models/get-show-response.model';
import { SearchResponse } from 'src/app/models/search-response.model';
import { SearchResult } from 'src/app/models/search-result.model';
import { SearchType } from 'src/app/models/search.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private api = environment.apiUrl;

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
    page: number = 1
  ): Observable<SearchResponse> {
    let query = '&s=' + `*${title}*` + '&type=' + type + '&page=' + page;
    query = year ? query + '&y=' + year : query;
    const url = this.api + query;
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
            throw new GlobalError(data.Error ? data.Error : 'Unknown Error!');
          }
          return {
            results: data.Search,
            totalResults: Number(data.totalResults),
          };
        })
      );
  }

  /**
   * Get a show by the imdbId
   * @param imdbID
   * @returns Observable<GetShowResponse>
   */
  public getShow(imdbID: string): Observable<GetShowResponse> {
    const url = this.api + `&plot=full&i=${imdbID}`;
    return this._http.get<GetShowResponse>(url).pipe(
      catchError((err) => {
        throw new GlobalError('Selected show not found!');
      })
    );
  }
}
