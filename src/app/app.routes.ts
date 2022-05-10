import { Routes } from "@angular/router";

export const routes: Routes = [
     {path: '', pathMatch: 'full', redirectTo: 'search'},
     {path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule)}
];