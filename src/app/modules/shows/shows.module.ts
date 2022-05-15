import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent, ShowDetailsComponent } from './components';
import { ResultsComponent, DetailsComponent } from './pages';
import { MaterialModule } from '../../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './shows.routes';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    SearchResultsComponent,
    ShowDetailsComponent,
    ResultsComponent,
    DetailsComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class ShowsModule {}
