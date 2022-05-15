import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, take, tap } from 'rxjs';
import { SearchFacade } from 'src/app/core/facades/search.facade';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public loading = true;
  constructor(
    public readonly searchFacade: SearchFacade,
    private readonly _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.queryParamMap
      .pipe(
        take(1),
        tap((params) => this.searchFacade.selectShow(params.get('id') || '')),
        finalize(() => (this.loading = false))
      )
      .subscribe();
  }
}
