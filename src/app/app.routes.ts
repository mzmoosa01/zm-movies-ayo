import { Routes } from "@angular/router";
import { SearchFormComponent } from "./components/search-form/search-form.component";

export const routes: Routes = [
     {path: '', pathMatch: 'full', redirectTo: 'search'},
     {path: 'search', component: SearchFormComponent, data: {
          searchType: 'movie'
     }},
     {path: 'search/series', component: SearchFormComponent, data: {
          searchType: 'series'
     }},

     {path: 'search/episode', component: SearchFormComponent, data: {
          searchType: 'episode'
     }},
     //TODO: 404 page
     {path: '**', pathMatch: 'full', redirectTo: 'search'},
];