import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { map, of } from 'rxjs';
import { getShowMock } from 'src/app/mocks/get-show-response.mock';
import { searchResponseMock } from 'src/app/mocks/search-response.mock';
import { ShowDetails } from 'src/app/models/show-details.model';
import { SearchService } from '../services/search.service';
import { SearchState } from './search.state';

import SpyObj = jasmine.SpyObj;

describe('SearchState', () => {
  let state: SearchState;
  let searchServiceStub: SpyObj<SearchService>;
  let routerStub: SpyObj<Router>;

  beforeEach(() => {
    const searchServiceSpy = jasmine.createSpyObj('SearchService', [
      'searchShow',
      'getShow',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchService,
          useValue: searchServiceSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    });
    state = TestBed.inject(SearchState);
    searchServiceStub = TestBed.inject(SearchService) as SpyObj<SearchService>;
    routerStub = TestBed.inject(Router) as SpyObj<Router>;
  });

  it('should be created', () => {
    expect(state).toBeTruthy();
  });

  describe('searchShows()', () => {
    it('should set the observable to the correct response', () => {
      const serviceResp = {
        results: searchResponseMock.Search,
        totalResults: Number(searchResponseMock.totalResults),
      };
      searchServiceStub.searchShow.and.returnValue(of(serviceResp));

      state.searchShows('', 'movie');

      state.searchResults$.subscribe((results) => {
        expect(results).toEqual(serviceResp);
      });
    });

    it('should navigate to "/search" with error message on error', () => {
      const message = 'this is an error';
      const returnedObs = of(undefined).pipe(
        map(() => {
          throw new Error(message);
        })
      );
      searchServiceStub.searchShow.and.returnValue(returnedObs);

      state.searchShows('', 'movie');

      expect(routerStub.navigate).toHaveBeenCalledWith(['search'], {
        queryParams: { error: message },
      });

      state.searchResults$.subscribe((results) => {
        expect(results).toBe(undefined);
      });
    });
  });

  describe('selectShow()', () => {
    it('should map the GetShowResponse to the showDetails observable', () => {
      searchServiceStub.getShow.and.returnValue(of(getShowMock));
      const expectedVal: ShowDetails = {
        title: getShowMock.Title,
        rated: getShowMock.Rated,
        poster: getShowMock.Poster,
        genres: getShowMock.Genre.trim().split(','),
        plot: getShowMock.Plot,
        directors: getShowMock.Director,
        writers: getShowMock.Writer,
        actors: getShowMock.Actors,
        languages: getShowMock.Language,
      };

      state.selectShow('1234');

      state.selectedShow$.subscribe((show) => {
        expect(show).toEqual(expectedVal);
      });
    });
  });
});
