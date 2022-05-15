import { Routes } from "@angular/router";

export const routes: Routes = [
     {path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
     // {path: 'search', component: SearchComponent, data: {
     //      searchType: 'movie'
     // }},
     // {path: 'search/series', component: SearchComponent, data: {
     //      searchType: 'series'
     // }},

     // {path: 'search/episode', component: SearchComponent, data: {
     //      searchType: 'episode'
     // }},
     // {
     //      path: 'search/results', loadChildren: () => import('./modules/shows/shows.module').then(m => m.ShowsModule)
     // },
     // //TODO: 404 page
     // {path: '**', pathMatch: 'full', redirectTo: ''},
];