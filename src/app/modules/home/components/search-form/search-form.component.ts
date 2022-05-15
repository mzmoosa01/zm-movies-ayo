import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchForm } from 'src/app/models/search-form.model';
import { SearchType } from 'src/app/models/search.type';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  public searchForm: FormGroup;
  @Input() public searchType: SearchType | null = 'movie';

  @Output() searchShow: EventEmitter<SearchForm> =
    new EventEmitter<SearchForm>();

  public constructor() {
    this.searchForm = new FormGroup({
      title: new FormControl('', Validators.required),
      year: new FormControl('', [
        Validators.pattern(/^(19|20)[\d]{2,2}$/),
        Validators.max(new Date().getFullYear()),
      ]),
    });
  }

  public hasError(formControlName: string): boolean {
    return this.searchForm.controls[formControlName].invalid;
  }

  public getYearErrorMessage(): string {
    const yearControl = this.searchForm.controls['year'];
    if (yearControl.hasError('pattern')) {
      return 'Please enter a valid year.';
    }

    return yearControl.hasError('max')
      ? 'You cannot enter a year greater than the current year.'
      : '';
  }

  public submitForm(): void {
    if (this.searchForm.valid) {
      console.log('submitting');
      const data: SearchForm = {
        title: this.searchForm.controls['title'].value,
        type: this.searchType || 'movie',
        year: this.searchForm.controls['year'].value,
      };
      this.searchShow.emit(data);
    }
  }
}
