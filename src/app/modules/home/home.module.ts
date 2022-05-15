import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent, SearchFormComponent } from './components';
import { HomeComponent } from './pages';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { SearchComponent } from './pages/search/search.component';
import { RouterModule } from '@angular/router';
import { routes } from './home.routes';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    SearchFormComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
})
export class HomeModule {}
