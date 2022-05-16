import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { catchError, of } from 'rxjs';
import { getShowMock } from 'src/app/mocks/get-show-response.mock';
import {
  searchResponseErrorMock,
  searchResponseMock,
} from 'src/app/mocks/search-response.mock';

import { environment } from 'src/environments/environment';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpController: HttpTestingController;
  const api = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SearchService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchShow()', () => {
    it('should build the query string correctly without opional params', () => {
      service.searchShow('title', 'movie').subscribe((res) => {
        expect(res).toEqual({
          results: searchResponseMock.Search,
          totalResults: Number(searchResponseMock.totalResults),
        });
      });

      const req = httpController.expectOne(
        `${api}&s=*title*&type=movie&page=1`
      );
      req.flush(searchResponseMock);
    });

    it('should build the query string correctly for all params', () => {
      service.searchShow('title', 'series', '2022', 3).subscribe((res) => {
        expect(res).toEqual({
          results: searchResponseMock.Search,
          totalResults: Number(searchResponseMock.totalResults),
        });
      });

      const req = httpController.expectOne(
        `${api}&s=*title*&type=series&page=3&y=2022`
      );
      req.flush(searchResponseMock);
    });

    it('should throw an error for error response', () => {
      service
        .searchShow('title', 'movie')
        .pipe(
          catchError((err) => {
            expect(err.message).toBe('Too many results.');
            return of(undefined);
          })
        )
        .subscribe();

      const req = httpController.expectOne(
        `${api}&s=*title*&type=movie&page=1`
      );
      req.flush(searchResponseErrorMock);
    });
  });

  describe('getShow', () => {
    it('should submit the correct Id to the request', () => {
      const imdbID = '1234';
      service.getShow(imdbID).subscribe((resp) => {
        expect(resp).toEqual(getShowMock);
      });
      const req = httpController.expectOne(`${api}&plot=full&i=${imdbID}`);
      req.flush(getShowMock);
    });
  });
});
