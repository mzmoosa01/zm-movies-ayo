import { Routes } from "@angular/router";
import { SearchFormComponent } from "./components/search-form/search-form.component";
import { SearchComponent } from "./pages/search/search.component";

export const routes: Routes = [
     {path: '', pathMatch: 'full', redirectTo: 'search'},
     {path: 'search', component: SearchComponent, data: {
          searchType: 'movie'
     }},
     {path: 'search/series', component: SearchComponent, data: {
          searchType: 'series'
     }},

     {path: 'search/episode', component: SearchComponent, data: {
          searchType: 'episode'
     }},
     {
          path: 'search/results', loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
     },
     //TODO: 404 page
     {path: '**', pathMatch: 'full', redirectTo: 'search'},
];