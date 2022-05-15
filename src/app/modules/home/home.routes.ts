import { Routes } from '@angular/router';
import { HomeComponent, SearchComponent } from './pages';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'search/results',
        loadChildren: () =>
          import('src/app/modules/shows/shows.module').then(
            (m) => m.ShowsModule
          ),
      },
      { path: '**', redirectTo: 'search' },
    ],
  },
];
