import { Component, Input } from '@angular/core';
import { SearchResult } from 'src/app/models/search-result.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  @Input() results: SearchResult[] | null = [];

  public getPoster(posterUrl: string) {
    return posterUrl === 'N/A' ? 'assets/img/no_image_avail.png' : posterUrl;
  }
}
