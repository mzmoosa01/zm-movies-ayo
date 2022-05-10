import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { SearchComponent } from './pages/search/search.component';
import { routes } from './search.routes';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SearchComponent,
    SearchFormComponent,
    SearchResultsComponent
],
  imports: [
      CommonModule,
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      MaterialModule
  ],
  providers: [],
})
export class SearchModule { }