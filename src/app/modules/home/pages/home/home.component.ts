import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { SearchFacade } from 'src/app/core/facades/search.facade';
import { SearchForm } from 'src/app/models/search-form.model';
import { SearchType } from 'src/app/models/search.type';

@Component({
  selector: 'app-search',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
