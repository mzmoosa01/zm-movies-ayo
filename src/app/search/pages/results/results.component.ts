import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { SearchFacade } from 'src/app/core/facades/search.facade';
import { searchResult } from 'src/app/models/search-result.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public searchResults: Observable<searchResult[]>

  constructor(public readonly searchFacade: SearchFacade, private readonly _router: Router) { 
    this.searchResults = searchFacade.searchResults$.pipe(map(results => {
      if(results) {
        return results
      }
      else {
        this._router.navigateByUrl('/');
        return [];
      }
    }))
  }

  ngOnInit(): void {
  }

}
