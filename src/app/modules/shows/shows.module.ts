import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent, ShowDetailsComponent } from './components'
import { ResultsComponent } from './pages'
import { MaterialModule } from '../../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './shows.routes';



@NgModule({
  declarations: [SearchResultsComponent, ShowDetailsComponent, ResultsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ShowsModule { }
