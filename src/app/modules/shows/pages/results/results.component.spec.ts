import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject } from 'rxjs';
import { SearchFacade } from 'src/app/core/facades/search.facade';
import { searchResponseMock } from 'src/app/mocks/search-response.mock';
import { SearchResponse } from 'src/app/models/search-response.model';

import { ResultsComponent } from './results.component';

import SpyObj = jasmine.SpyObj;

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let searchResults$ = new Subject<SearchResponse>();
  let searchFacadeStub: SpyObj<SearchFacade>;
  let routerStub: SpyObj<Router>;

  beforeEach(async () => {
    const searchFacadeSpy = jasmine.createSpyObj('SearchFacade', [
      'searchShows',
      'selectShow',
    ]);
    searchFacadeSpy['searchResults$'] = searchResults$;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: SearchFacade,
          useValue: searchFacadeSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              get: (key: string) => {
                const params: { [key: string]: string } = {
                  title: 'title',
                  type: 'series',
                  year: '2022',
                  page: '2',
                };
                return params[key];
              },
            }),
          },
        },
      ],
      declarations: [ResultsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    searchFacadeStub = TestBed.inject(SearchFacade) as SpyObj<SearchFacade>;
    routerStub = TestBed.inject(Router) as SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set searchResults$ and totalResults from searchFacade.searchResults$ observable', () => {
    searchResults$.next({
      results: searchResponseMock.Search,
      totalResults: Number(searchResponseMock.totalResults),
    });
    expect(component.totalResults).toBe(
      Number(searchResponseMock.totalResults)
    );
    component.searchResults$.subscribe((results) => {
      expect(results).toEqual(searchResponseMock.Search);
    });
  });

  it('should call searchFacade.searchShows() onInit with params from the queryParamMap', () => {
    component.ngOnInit();
    expect(searchFacadeStub.searchShows).toHaveBeenCalledWith(
      'title',
      'series',
      '2022',
      2
    );
  });

  describe('nextPage()', () => {
    const event: PageEvent = {
      pageIndex: 1,
      pageSize: 10,
      length: 100,
    };
    it('should set the page property to pageEvent.pageIndex + 1', () => {
      component.nextPage(event);
      expect(component.page).toBe(event.pageIndex + 1);
    });

    it('should call router.navigate with the same query params and new page param', () => {
      component.nextPage(event);
      expect(routerStub.navigate.calls.mostRecent().args[0]).toEqual([]);
      expect(routerStub.navigate.calls.mostRecent().args[1]).toEqual(
        jasmine.objectContaining({ queryParamsHandling: 'merge' })
      );
      expect(routerStub.navigate.calls.mostRecent().args[1]).toEqual(
        jasmine.objectContaining({
          queryParams: {
            page: event.pageIndex + 1,
          },
        })
      );
    });
  });
});
