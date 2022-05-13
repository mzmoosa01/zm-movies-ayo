import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { searchType } from 'src/app/models/search.type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public searchType: Observable<searchType>;

  constructor(private readonly _route: ActivatedRoute) { 
    this.searchType = this._route.data.pipe(map(data => data['searchType'] || 'movie'));
  }

}
