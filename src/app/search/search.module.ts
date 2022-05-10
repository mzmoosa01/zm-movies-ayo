import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { SearchComponent } from './pages/search/search.component';
import { routes } from './search.routes';
import { SearchFormComponent } from './components/search-form/search-form.component';

@NgModule({
  declarations: [
    SearchComponent,
    SearchFormComponent
],
  imports: [
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      MaterialModule
  ],
  providers: [],
})
export class SearchModule { }