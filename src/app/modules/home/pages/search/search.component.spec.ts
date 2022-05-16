import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SearchForm } from 'src/app/models/search-form.model';

import { SearchComponent } from './search.component';
import SpyObj = jasmine.SpyObj;

//These tests could be improved

describe('SearchComponent when queryParams are null', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSnackBarModule],
      providers: [
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({ get: () => null }),
          },
        },
      ],
      declarations: [SearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set searchType to movie for null params', () => {
    component.searchType.subscribe((type) => {
      expect(type).toBe('movie');
    });
  });
});

describe('SearchComponent when type queryParam has a value', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let routerStub: SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSnackBarModule],
      providers: [
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
                  type: 'series',
                };
                return params[key];
              },
            }),
          },
        },
      ],
      declarations: [SearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    routerStub = TestBed.inject(Router) as SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should set the searchType to the type query param', () => {
    component.searchType.subscribe((type) => {
      expect(type).toBe('series');
    });
  });

  describe('searchShow()', () => {
    it('should navigate to the results page with the correct query params when year is null', () => {
      const searchForm: SearchForm = {
        title: 'title',
        type: 'series',
      };
      component.searchShow(searchForm);
      expect(routerStub.navigate).toHaveBeenCalledWith(['search', 'results'], {
        queryParams: { title: searchForm.title, type: searchForm.type },
      });
    });
  });
});

describe('SearchComponent when there is an error queryParam', () => {
  let fixture: ComponentFixture<SearchComponent>;
  let snackbarStub: SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const snackbarSpy = jasmine.createSpyObj('MatSnackbar', [
      'openFromComponent',
    ]);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: MatSnackBar,
          useValue: snackbarSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              get: (key: string) => {
                const params: { [key: string]: string } = {
                  error: 'Error message',
                };
                return params[key];
              },
            }),
          },
        },
      ],
      declarations: [SearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    snackbarStub = TestBed.inject(MatSnackBar) as SpyObj<MatSnackBar>;
    fixture.detectChanges();
  });

  it('should open the error snackbar', () => {
    expect(snackbarStub.openFromComponent).toHaveBeenCalled();
  });
});
