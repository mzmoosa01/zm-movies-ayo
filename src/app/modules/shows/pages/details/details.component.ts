import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { SearchFacade } from 'src/app/core/facades/search.facade';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  constructor(
    public readonly searchFacade: SearchFacade,
    private readonly _route: ActivatedRoute
  ) {
    this._route.queryParamMap
      .pipe(take(1))
      .subscribe((params) =>
        this.searchFacade.selectShow(params.get('id') || '')
      );
  }
}
