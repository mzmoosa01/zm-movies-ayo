import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent, SearchFormComponent } from './components';
import { HomeComponent } from './pages';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { SearchComponent } from './pages/search/search.component';
import { RouterModule } from '@angular/router';
import { routes } from './home.routes';
import { ErrorSnackbarComponent } from './components/error-snackbar/error-snackbar.component';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    SearchFormComponent,
    SearchComponent,
    ErrorSnackbarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
})
export class HomeModule {}
