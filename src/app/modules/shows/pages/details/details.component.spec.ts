import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SearchFacade } from 'src/app/core/facades/search.facade';

import { DetailsComponent } from './details.component';
import SpyObj = jasmine.SpyObj;

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let searchFacadeStub: SpyObj<SearchFacade>;

  beforeEach(async () => {
    const searchFacadeSpy = jasmine.createSpyObj('SearchFacade', [
      'searchShow',
      'selectShow',
    ]);
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: SearchFacade,
          useValue: searchFacadeSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({
              get: (key: string) => {
                const params: { [key: string]: string } = {
                  id: '123',
                };
                return params[key];
              },
            }),
          },
        },
      ],
      declarations: [DetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    searchFacadeStub = TestBed.inject(SearchFacade) as SpyObj<SearchFacade>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchFacade.selectShow with the id param OnInit', () => {
    expect(searchFacadeStub.selectShow).toHaveBeenCalledWith('123');
  });
});
