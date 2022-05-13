import { searchType } from "./search.type";

export interface SearchForm {
    title: string;
    type: searchType;
    year?: number;
}