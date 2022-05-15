import { SearchResult } from './search-result.model';

export interface SearchResponse {
  results: SearchResult[];
  totalResults: number;
}
