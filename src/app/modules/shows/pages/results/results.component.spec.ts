import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SearchFacade } from 'src/app/core/facades/search.facade';

import { ResultsComponent } from './results.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async () => {
    const searchFacadeSpy = jasmine.createSpyObj('SearchFacade', [
      'searchShow',
      'getShow',
    ]);
    searchFacadeSpy['searchResults$'] = of(undefined);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: SearchFacade,
          useValue: searchFacadeSpy,
        },
      ],
      declarations: [ResultsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
