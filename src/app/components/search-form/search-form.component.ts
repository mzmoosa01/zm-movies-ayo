import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {

  public searchForm: FormGroup;
  public searchType: Observable<string>;

  public constructor(private readonly _route: ActivatedRoute) {
    this.searchType = this._route.data.pipe(map(data => data['searchType']))

    this.searchForm = new FormGroup({
      title: new FormControl('', Validators.required),
      year: new FormControl('', [Validators.pattern(/^(19|20)[\d]{2,2}$/), Validators.max(new Date().getFullYear())])
    });
  }

  public hasError(formControlName: string) {
    return this.searchForm.controls[formControlName].invalid;
  }

  public getYearErrorMessage() {
    const yearControl = this.searchForm.controls['year'];
    if(yearControl.hasError('pattern')) {
      return 'Please enter a valid year.'
    }

    return yearControl.hasError('max') ? 'You cannot enter a year greater than the current year.':''
  }
}
