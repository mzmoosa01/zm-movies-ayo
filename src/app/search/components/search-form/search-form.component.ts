import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  public searchForm: FormGroup;

  public constructor() {
    this.searchForm = new FormGroup({
      title: new FormControl('', Validators.required),
      type: new FormControl(''),
      year: new FormControl('', Validators.pattern('^(19|20)\d{2}$'))
    });
  }
}
