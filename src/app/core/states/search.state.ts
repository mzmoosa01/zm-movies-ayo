import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from "rxjs";
import { SearchForm } from "src/app/models/search-form.model";
import { searchResult } from "src/app/models/search-result.model";
import { SearchService } from "../services/search.service";


@Injectable({
    providedIn: 'root'
  })
  export class SearchState implements OnDestroy {
    
    private readonly _searchResults = new BehaviorSubject<searchResult[]>([]);
    private readonly _destroy = new Subject<void>();

    /**
     * The search results observable contains the response from the api call
     */
    public searchResult$ = this._searchResults.asObservable();

    constructor(private readonly _service: SearchService){}

    /**
     * This calls api to search shows and stores the response in the searchResults$ observable
     * @param searchForm The search request in the search form structure
     */
    public searchShows(searchForm: SearchForm): Observable<searchResult[]> {
        return this._service.searchShow(searchForm).pipe(
                takeUntil(this._destroy),
                tap(resp => this._searchResults.next(resp))
            );
    }

    public ngOnDestroy(): void {
        this._destroy.next();
        this._destroy.complete();
    }

  }