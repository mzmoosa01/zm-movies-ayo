import { Routes } from "@angular/router";
import { SearchResultsComponent } from "./components/search-results/search-results.component";
import { SearchComponent } from "./pages/search/search.component";

export const routes: Routes = [
    {path: '', component: SearchComponent},
    {path: 'results', component: SearchResultsComponent}
]