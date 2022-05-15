import { SearchType } from './search.type';

export interface SearchForm {
  title: string;
  type: SearchType;
  year?: number;
}
