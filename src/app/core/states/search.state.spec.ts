import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchService } from '../services/search.service';

import { SearchState } from './search.state';

describe('SearchState', () => {
  let service: SearchState;

  beforeEach(() => {
    const searchServiceSpy = jasmine.createSpyObj('SearchService', [
      'searchShow',
      'getShow',
    ]);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: SearchService,
          useValue: searchServiceSpy,
        },
      ],
    });
    service = TestBed.inject(SearchState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
