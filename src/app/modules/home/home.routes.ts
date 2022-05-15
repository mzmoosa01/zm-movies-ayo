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
        // data: {
        //   searchType: 'movie',
        // },
      },
      // {
      //   path: 'search/series',
      //   component: SearchComponent,
      //   data: {
      //     searchType: 'series',
      //   },
      // },
      // {
      //   path: 'search/episode',
      //   component: SearchComponent,
      //   data: {
      //     searchType: 'episode',
      //   },
      // },
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
