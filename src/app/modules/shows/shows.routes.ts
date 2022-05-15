import { Routes } from '@angular/router';
import { ResultsComponent, DetailsComponent } from './pages';

export const routes: Routes = [
  { path: '', component: ResultsComponent },
  { path: 'details', component: DetailsComponent },
];
