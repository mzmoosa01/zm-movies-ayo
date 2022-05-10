import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { routes } from './search.routes';

@NgModule({
  declarations: [
    SearchComponent
],
  imports: [
      RouterModule.forChild(routes)
  ],
  providers: [],
})
export class SearchModule { }